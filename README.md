# Curso IA · versión modular

Esta carpeta contiene la versión modular actual del curso. Los temas permanecen embebidos en `index.html`, por lo que el proyecto puede abrirse directamente sin depender de cargas dinámicas mediante `fetch`.

## Estructura

```text
curso_IA_C_modular/
├── index.html
├── README.md
└── assets/
    ├── css/
    │   ├── base.css
    │   ├── glosario.css
    │   ├── tema-0-1.css
    │   ├── tema-0-2.css
    │   ├── unidad-1.css
    │   ├── tema-1-1.css
    │   ├── tema-1-2.css
    │   ├── tema-1-3.css
    │   ├── tema-1-4.css
    │   ├── unidad-2.css
    │   ├── tema-2-1.css
    │   ├── tema-2-2.css
    │   ├── tema-2-3.css
    │   └── integracion.css
    ├── js/
    │   ├── tailwind-config.js
    │   ├── tema-0-1.js
    │   ├── tema-0-2.js
    │   ├── unidad-1-shared.js
    │   ├── tema-1-1.js
    │   ├── tema-1-2.js
    │   ├── tema-1-3.js
    │   ├── tema-1-4.js
    │   ├── unidad-2-shared.js
    │   ├── tema-2-1.js
    │   ├── tema-2-2.js
    │   ├── tema-2-3.js
    │   ├── app.js
    │   └── glosario.js
    └── images/
        ├── ia_gen_transparente.png
        ├── ia_gen_transparente2.png
        ├── lumen1.png
        ├── lumen2.png
        ├── lumen3.png
        ├── lumen4.png
        └── README.txt
```

## Responsabilidad de los archivos principales

- `index.html`: estructura del curso, secciones principales y overlays de las Unidades 0–2.
- `base.css`: estilos de la página principal, navegación, curso, tarjetas, responsive y nieve.
- `integracion.css`: reglas puente entre el curso principal y los segmentos a pantalla completa.
- `unidad-1.css` / `unidad-1-shared.js`: componentes comunes de los temas de Unidad 1.
- `unidad-2.css` / `unidad-2-shared.js`: componentes comunes de los temas de Unidad 2.
- `tema-X-Y.css/js`: estilos y comportamiento específico de cada tema.
- `app.js`: `courseData`, navegación general, carrusel, tema claro/oscuro, nieve y API de navegación por títulos usada por el glosario.
- `glosario.css`: apariencia de la sección Glosario y sus tarjetas/buscador.
- `glosario.js`: único archivo que contiene los conceptos del glosario, su renderizado, filtro y vínculos a slides.

## Glosario

La opción **Glosario** aparece al final de la navbar superior. Para agregar nuevos términos sólo es necesario editar `assets/js/glosario.js` y añadir objetos al arreglo `glossaryData`:

```js
{
  'num': 4,
  'concepto': 'Nuevo concepto',
  'descripción': 'Definición del concepto...',
  'relacionados': [
    {
      'unit_title': 'Título de la unidad',
      'topic_title': 'Título del tema',
      'cards_title': 'Título de la tarjeta / slide'
    }
  ]
}
```

El buscador filtra por palabras presentes en `concepto` y `descripción`. Los vínculos de cada tarjeta buscan la unidad, tema y tarjeta por título y abren directamente el slide correspondiente. El resolvedor admite títulos abreviados cuando existe una coincidencia inequívoca por inclusión, por ejemplo `Taxonomía de la IA` frente a `Taxonomía de la IA: tipos, enfoques y origen`.

## Uso

1. Descomprime el ZIP.
2. Abre `index.html` en un navegador moderno.
3. Para desarrollo se recomienda servir la carpeta con un servidor local como Live Server.
4. En la cabecera principal puedes activar o desactivar la animación de nieve con el botón de copo.

## Dependencias externas

El proyecto conserva las dependencias CDN existentes:

- Font Awesome
- Tailwind CSS CDN
- Lucide

También conserva los recursos remotos ya utilizados por el contenido del curso.

## Unidad 1

La Unidad 1 se divide en cuatro segmentos modulares:

- `tema-1-1.css/js`: autonomía — predictiva, prescriptiva, agéntica y simulador determinista de agente.
- `tema-1-2.css/js`: objetivo — discriminativa, reglas, generativa y simulador de iteraciones.
- `tema-1-3.css/js`: capacidad — IA débil/fuerte, ANI, AGI y ASI.
- `tema-1-4.css/js`: disciplinas — Humanidades, Ciencias Biológicas, Ciencias Exactas e Ingenierías.

Los simuladores no ejecutan modelos de IA; son demostraciones locales en JavaScript para fines didácticos.

## Unidad 2

La Unidad 2, **Machine Learning y Deep Learning**, utiliza el mismo patrón de carrusel a pantalla completa:

- `tema-2-1.css/js`: fundamentos de ML, tipos de aprendizaje, flujo básico y quiz.
- `tema-2-2.css/js`: regresión, clasificación, métricas de desempeño y quiz.
- `tema-2-3.css/js`: clustering, reglas de asociación, reducción de dimensionalidad, métricas y quiz.

Los botones de Data Science siguen preparados como CTA visuales sin enlace definitivo. Los enlaces de laboratorio apuntan a la sección Laboratorio, preparada para integrar notebooks y simuladores posteriormente.
