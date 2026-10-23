import{createClient}from'https://esm.sh/@supabase/supabase-js@2.57.0';
const db=createClient('https://gzmuiovgvczzbovlrvto.supabase.co','sb_publishable_wQX763UKqmqCqvD70UmxQQ_k1o9KNol');
const $=id=>document.getElementById(id),E=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const catalog=[
['Sentadilla goblet','Mancuernas','Piernas','Sostené una mancuerna frente al pecho, bajá con control y empujá el suelo al subir.'],
['Peso muerto rumano','Mancuernas','Piernas','Llevá la cadera atrás con espalda neutra y mancuernas cerca de las piernas.'],
['Press de pecho en suelo','Mancuernas','Pecho','Acostado boca arriba, empujá las mancuernas verticalmente con control.'],
['Remo inclinado','Mancuernas','Espalda','Incliná el torso con espalda neutra y llevá los codos hacia atrás.'],
['Press de hombros','Mancuernas','Hombros','Empujá las mancuernas por encima de la cabeza sin arquear la espalda.'],
['Curl de bíceps','Mancuernas','Brazos','Mantené los codos cerca del cuerpo y flexioná sin balancear el torso.'],
['Extensión de tríceps','Mancuernas','Brazos','Extendé el codo lentamente y evitá mover el hombro.'],
['Zancadas','Mancuernas','Piernas','Dá un paso y flexioná ambas rodillas con el tronco estable.'],
['Elevaciones laterales','Mancuernas','Hombros','Elevá los brazos a los lados sin encoger los hombros.'],
['Remo con banda','Bandas','Espalda','Anclá la banda de forma segura y tirá de los codos hacia atrás.'],
['Press de pecho con banda','Bandas','Pecho','Con la banda bien asegurada detrás, empujá al frente.'],
['Face pull con banda','Bandas','Hombros','Llevá la banda hacia el rostro separando las manos.'],
['Curl de bíceps con banda','Bandas','Brazos','Pisá la banda con seguridad y flexioná los codos.'],
['Sentadilla con banda','Bandas','Piernas','Mantené la tensión de la banda mientras bajás y subís.'],
['Caminata lateral con banda','Bandas','Piernas','Dá pasos laterales cortos manteniendo la tensión.'],
['Remo en TRX','TRX','Espalda','Con anclaje verificado, incliná el cuerpo y acercá el pecho a las manos.'],
['Sentadilla en TRX','TRX','Piernas','Usá las correas para mantener el equilibrio sin colgar todo el peso.'],
['Press de pecho en TRX','TRX','Pecho','Con el cuerpo inclinado, flexioná y extendé los brazos controladamente.'],
['Curl de bíceps en TRX','TRX','Brazos','Con el cuerpo inclinado, llevá las manos hacia la frente.'],
['Plancha en TRX','TRX','Core','Mantené el abdomen firme y la espalda alineada.'],
['Flexiones','Peso corporal','Pecho','Manos bajo los hombros, bajá con el tronco alineado.'],
['Sentadilla libre','Peso corporal','Piernas','Bajá dentro de tu rango cómodo manteniendo los talones apoyados.'],
['Puente de glúteos','Peso corporal','Piernas','Elevá la cadera contrayendo glúteos sin hiperextender la espalda.'],
['Plancha frontal','Peso corporal','Core','Apoyá antebrazos y mantené el tronco estable.'],
['Bird dog','Peso corporal','Core','En cuatro apoyos, extendé brazo y pierna contrarios sin girar la cadera.'],
['Dead bug','Peso corporal','Core','Boca arriba, alterná brazo y pierna opuestos manteniendo el abdomen activo.'],
['Elevación de talones','Peso corporal','Piernas','Subí sobre la punta de los pies y descendé lentamente.'],
['Step-up','Peso corporal','Piernas','Subí a un escalón estable y bajá con control.']
];
const days=['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo'];let planned=[],selected=[];
function renderCatalog(){const f=$('catalogFilter').value;const filtered=catalog.filter(x=>f==='all'||x[1]===f);$('catalogList').innerHTML=filtered.map(x=>'<div class="item"><b>'+E(x[0])+'</b><p class="small muted">'+E(x[1])+' · '+E(x[2])+'</p><p class="small">'+E(x[3])+'</p></div>').join('')}
$('catalogFilter').onchange=renderCatalog;renderCatalog();
$('catalogPick').innerHTML='<option value="">Escribir manualmente</option>'+catalog.map((x,i)=>'<option value="'+i+'">'+E(x[0])+' · '+E(x[1])+'</option>').join('');
$('catalogPick').onchange=()=>{const x=catalog[+$('catalogPick').value];if($('catalogPick').value!==''&&x){$('exercise').value=x[0];$('equipment').value=x[1]}};
async function refreshPlans(){const{data:{user}}=await db.auth.getUser();if(!user)return;const{data,error}=await db.from('training_plans').select('id,name,days_per_week').order('created_at',{ascending:false});if(error)throw error;planned=data||[];$('guidedPlan').innerHTML=planned.map(p=>'<option value="'+p.id+'">'+E(p.name)+'</option>').join('');$('guidedDay').innerHTML=days.map((d,i)=>'<option value="'+(i+1)+'">'+d+'</option>').join('')}
document.querySelectorAll('[data-page="train"]').forEach(b=>b.addEventListener('click',()=>refreshPlans().catch(showError)));document.querySelectorAll('[data-page="plans"]').forEach(b=>b.addEventListener('click',()=>setTimeout(()=>refreshPlans().catch(()=>{}),700)));refreshPlans().catch(()=>{});
function showError(e){$('guidedWorkout').textContent=e.message||String(e)}
$('startGuided').onclick=async()=>{try{await refreshPlans();const id=$('guidedPlan').value;if(!id)throw Error('Creá un plan primero');const day=+$('guidedDay').value;const{data:rows,error}=await db.from('training_plan_days').select('id').eq('plan_id',id).eq('weekday',day);if(error)throw error;if(!rows?.length){$('guidedWorkout').textContent='No hay ejercicios en este día. Podés agregar uno desde Planes.';return}const res=await db.from('training_plan_exercises').select('*').eq('day_id',rows[0].id).order('sort_order');if(res.error)throw res.error;selected=res.data||[];if(!selected.length){$('guidedWorkout').textContent='Este día todavía no tiene ejercicios.';return}const p=planned.find(x=>x.id===id);$('guidedWorkout').innerHTML='<h3>'+days[day-1]+(day>p.days_per_week?' · Día adicional':'')+'</h3><p class="muted small">Calentá 3–5 minutos antes de empezar. Registrá las repeticiones realizadas en cada serie.</p>'+selected.map((x,i)=>'<div class="card"><b>'+E(x.exercise_name)+'</b><p class="small muted">'+x.sets+' series · '+x.repetitions_min+' repeticiones · '+x.rest_seconds+' s de descanso</p>'+Array.from({length:x.sets},(_,j)=>'<label>Serie '+(j+1)+' · repeticiones realizadas</label><input type="number" min="0" max="999" value="'+x.repetitions_min+'" data-set="'+i+'-'+j+'">').join('')+'</div>').join('')+'<button id="finishGuided">Guardar sesión completa</button>';$('finishGuided').onclick=finish}catch(e){showError(e)}};
async function finish(){const b=$('finishGuided');b.disabled=true;try{const{data:{user}}=await db.auth.getUser();if(!user)throw Error('Iniciá sesión');const sets=[];for(let i=0;i<selected.length;i++){const x=selected[i];for(let j=0;j<x.sets;j++){const field=document.querySelector('[data-set="'+i+'-'+j+'"]');const reps=Number(field.value);if(!Number.isInteger(reps)||reps<0||reps>999)throw Error('Revisá las repeticiones de la serie '+(j+1));sets.push({user_id:user.id,exercise_name:x.exercise_name,equipment:x.equipment||'other',set_number:j+1,repetitions:reps})}}const s=await db.from('workout_sessions').insert({user_id:user.id,notes:'FitTrack rutina guiada'}).select('id').single();if(s.error)throw s.error;const res=await db.from('workout_sets').insert(sets.map(x=>({...x,session_id:s.data.id})));if(res.error){await db.from('workout_sessions').delete().eq('id',s.data.id);throw res.error}$('guidedWorkout').textContent='¡Sesión guardada! Podés consultar el historial más abajo.'}catch(e){showError(e)}finally{b.disabled=false}};
