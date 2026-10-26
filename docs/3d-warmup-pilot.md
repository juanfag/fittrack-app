# FitTrack — Piloto de animación anatómica 3D

Estado: **en preparación; no integrado a Coach Live**. Versión estable conservada: v0.5.79.

## Ejercicio piloto
**Círculos de hombros hacia adelante y hacia atrás** (calentamiento, sin mancuernas).

No reutilizar la animación de curl de bíceps como si fuera calentamiento. No usar una animación de elevación lateral ni un movimiento genérico de brazos como demostración de círculos de hombros.

## Requisitos de animación
- Modelo humano anatómico 3D con esqueleto articulado y proporciones naturales.
- Tronco y cuello neutros; brazos relajados, codos suaves, pies estables.
- Elevación, desplazamiento anterior/posterior, descenso y retorno de hombros formando un círculo continuo; invertir el sentido para la segunda variante.
- No mover solamente los brazos de lado a lado ni levantar pesos.
- Activación muscular ilustrativa de deltoides y musculatura escapular, sin afirmar que sea medición real de activación.
- Bucle fluido sin saltos y velocidad cómoda; respetar la opción del sistema para reducir movimiento.
- Revisar en vistas frontal y lateral antes de publicar.
- Video/GLB con licencia comercial explícita y documentación de procedencia.

## Validación antes de integrar
1. Confirmar visualmente correspondencia entre nombre del ejercicio y movimiento real.
2. Revisar postura, amplitud, compensaciones, continuidad y sentido del movimiento.
3. Confirmar licencia del modelo, rig, animación y texturas.
4. Probar fluidez en Android, consumo de datos, carga y manejo sin conexión.
5. Solo entonces integrar a Coach Live; si el recurso no está disponible, mostrar guía escrita, **no** una animación incorrecta.
6. Validación del usuario en Android antes de reemplazar la versión estable.

## Fuentes candidatas para evaluar (no aprobadas)
- https://github.com/AssiamahS/opengym3d — proyecto de animaciones anatómicas; verificar cobertura del movimiento y licencias por recurso.
- https://github.com/heatsy-app/heatsy-body-model — modelo anatómico articulado, CC BY-SA 4.0; **no incluye las animaciones**.
- https://www.innerscene.com/tools/library/3d-parts/shoulder-rolls-dancing-3d-person-animated-2d27eb14 — animación CC0 de baile; **no usar sin validación técnica**.

## Integración futura
Definir un manifiesto por ejercicio con identificador, nombre, tipo de medio, ruta, licencia, músculos ilustrados, variante, revisión técnica y estado de aprobación. Solo medios con estado aprobado se mostrarán en Coach Live.
