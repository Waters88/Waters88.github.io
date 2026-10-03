# Curso IA · versión modular

Esta carpeta reorganiza `curso_IA_C_unidad0_integrado_nieve_timeline_fix.html` sin convertir los segmentos en cargas dinámicas, por lo que puede abrirse directamente desde `index.html`.

## Estructura

```text
curso_IA_C_modular/
├── index.html
├── README.md
└── assets/
    ├── css/
    │   ├── base.css
    │   ├── tema-0-1.css
    │   ├── tema-0-2.css
    │   └── integracion.css
    ├── js/
    │   ├── tailwind-config.js
    │   ├── tema-0-1.js
    │   ├── tema-0-2.js
    │   └── app.js
    └── images/
        └── README.txt
```

## Responsabilidad de cada archivo

- `index.html`: estructura HTML completa del curso y de los segmentos embebidos.
- `base.css`: estilos originales de la página principal, navegación, curso, tarjetas, responsive y nieve.
- `tema-0-1.css`: estilos encapsulados del Tema 0.1.
- `tema-0-2.css`: estilos encapsulados del Tema 0.2 y línea de tiempo.
- `integracion.css`: reglas que conectan los segmentos con el curso principal, incluida la superposición de nieve y correcciones de la línea de tiempo.
- `tema-0-1.js`: carrusel, actividades, almacenamiento y cuestionario del Tema 0.1.
- `tema-0-2.js`: carrusel, matrices, casos, cuestionario y comportamiento de la línea de tiempo del Tema 0.2.
- `app.js`: datos de la Unidad 0, navegación general, carrusel del curso, tema claro/oscuro y efecto de nieve.
- `tailwind-config.js`: configuración usada por Tailwind CDN para evitar `preflight`.

## Uso

1. Descomprime el ZIP.
2. Abre `index.html` en un navegador moderno.
3. Para desarrollo es recomendable servir la carpeta con un servidor local (por ejemplo Live Server), aunque la estructura evita depender de `fetch` para los temas.

## Dependencias externas

El proyecto mantiene las dependencias CDN originales:
- Font Awesome
- Tailwind CSS CDN
- Lucide

También conserva imágenes/videos remotos referenciados por los contenidos.

## Agregar nuevas unidades

Para mantener la misma organización, se recomienda crear por cada nuevo tema:
- `assets/css/tema-X-Y.css`
- `assets/js/tema-X-Y.js`

y mantener su HTML dentro de `index.html`. Después agrega su función de apertura en `courseData` dentro de `assets/js/app.js`.
