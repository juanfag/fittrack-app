#!/usr/bin/env python3
"""Render an original 6-second FitTrack recovery MP4 for the GitHub Pages app."""
from PIL import Image, ImageDraw, ImageFont
import math, os, subprocess, tempfile
W,H,FPS,SECONDS=480,720,15,6
OUT="assets/exercise-videos/descanso-fittrack.mp4"
os.makedirs(os.path.dirname(OUT),exist_ok=True)
font="/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
bold="/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
def face(path,size): return ImageFont.truetype(path,size)
def centered(draw,y,text,fill,ft):
    box=draw.textbbox((0,0),text,font=ft)
    draw.text(((W-(box[2]-box[0]))/2,y),text,fill=fill,font=ft)
with tempfile.TemporaryDirectory() as folder:
    for frame in range(FPS*SECONDS):
        t=frame/FPS
        im=Image.new("RGB",(W,H),(10,31,29))
        d=ImageDraw.Draw(im)
        centered(d,94,"DESCANSO",(185,247,108),face(bold,42))
        centered(d,153,"Respira y recupera",(219,235,231),face(font,22))
        cx,cy=240,337
        breath=math.sin(2*math.pi*t/SECONDS)
        for j in range(17):
            r=122+j*2.3+3*breath
            d.ellipse((cx-r,cy-r,cx+r,cy+r),outline=(20+j//2,65+j*3,53+j*2),width=1)
        radius=94+9*breath
        d.ellipse((cx-radius,cy-radius,cx+radius,cy+radius),fill=(21,75,61),outline=(184,249,112),width=6)
        wave=[]
        for x in range(-55,56,2):
            y=12*math.sin(x/11+2*math.pi*t/SECONDS)
            wave.append((cx+x,cy+y))
        d.line(wave,fill=(195,255,164),width=5,joint="curve")
        centered(d,512,"Prepara tu siguiente serie",(224,239,234),face(font,22))
        centered(d,647,"FitTrack  •  Coach Live",(142,172,167),face(font,18))
        im.save(os.path.join(folder,f"{frame:04d}.png"))
    subprocess.run(["ffmpeg","-hide_banner","-loglevel","error","-y","-framerate",str(FPS),"-i",os.path.join(folder,"%04d.png"),"-c:v","libx264","-pix_fmt","yuv420p","-movflags","+faststart","-crf","30",OUT],check=True)
print("Created",OUT,os.path.getsize(OUT),"bytes")
