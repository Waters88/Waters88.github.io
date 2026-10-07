/* =========================================================
   GLOSARIO · datos editables + renderizado y búsqueda
   ---------------------------------------------------------
   Para agregar conceptos manualmente, añade objetos al arreglo
   `glossaryData` respetando esta estructura:
   {
     'num': 4,
     'concepto': 'Nuevo concepto',
     'descripción': 'Definición...',
     'relacionados': [
       {
         'unit_title': 'Título de la unidad',
         'topic_title': 'Título del tema',
         'cards_title': 'Título de la tarjeta / slide'
       }
     ]
   }
   ========================================================= */
(() => {
  const glossaryData = [
    {
      'num': 1,
      'concepto': 'Inteligencia Artificial',
      'descripción': 'La IA es una forma de construir sistemas capaces de encontrar patrones, aprender de ejemplos y producir una respuesta útil —como una predicción, una recomendación, texto, imágenes o acciones— sin que una persona tenga que programar de forma explícita cada decisión posible.',
      'relacionados': [
        {
          'unit_title': 'Alfabetización inicial: ¿qué entendemos por IA?',
          'topic_title': 'Concepto, percepción y mitos de la IA',
          'cards_title': 'Concepto general de IA'
        }
      ]
    },
    {
      'num': 2,
      'concepto': 'Machine Learning',
      'descripción': 'Es el conjunto de métodos que permite a un sistema ajustar modelos a partir de ejemplos en lugar de programar cada decisión de forma explícita.',
      'relacionados': [
        {
          'unit_title': 'Taxonomía de la IA',
          'topic_title': 'Clasificación por nivel de autonomía',
          'cards_title': 'IA predictiva'
        },
        {
          'unit_title': 'Taxonomía de la IA',
          'topic_title': 'Clasificación por objetivo',
          'cards_title': 'IA discriminativa'
        },
        {
          'unit_title': 'Machine Learning y Deep Learning',
          'topic_title': 'Fundamentos de aprendizaje automático',
          'cards_title': 'Definición de ML'
        }
      ]
    },
    {
      'num': 3,
      'concepto': 'Aprendizaje supervisado',
      'descripción': 'Es el conjunto de métodos que permite a un sistema ajustar modelos a partir de ejemplos en lugar de programar cada decisión de forma explícita.',
      'relacionados': [
        {
          'unit_title': 'Taxonomía de la IA',
          'topic_title': 'Clasificación por nivel de autonomía',
          'cards_title': 'IA predictiva'
        },
        {
          'unit_title': 'Machine Learning y Deep Learning',
          'topic_title': 'Fundamentos de aprendizaje automático',
          'cards_title': 'Tipos de aprendizaje'
        },
        {
          'unit_title': 'Machine Learning y Deep Learning',
          'topic_title': 'Aprendizaje supervisado',
          'cards_title': 'Regresión'
        }
      ]
    }
  ];

  window.GLOSSARY_DATA = glossaryData;

  const root = document.getElementById('glossaryGrid');
  const input = document.getElementById('glossarySearch');
  const clearButton = document.getElementById('glossaryClear');
  const count = document.getElementById('glossaryCount');
  const empty = document.getElementById('glossaryEmpty');

  if (!root || !input) return;

  const escapeHTML = (value) => String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

  const normalize = (value) => String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

  function relationLabel(relation) {
    return `${relation.unit_title} · ${relation.topic_title} · ${relation.cards_title}`;
  }

  function renderRelation(relation, conceptIndex, relationIndex) {
    const resolution = typeof window.resolveCourseRelation === 'function'
      ? window.resolveCourseRelation(relation)
      : null;

    const disabled = !resolution;
    return `
      <button
        class="glossary-related-link${disabled ? ' is-unavailable' : ''}"
        type="button"
        data-glossary-concept="${conceptIndex}"
        data-glossary-related="${relationIndex}"
        ${disabled ? 'disabled' : ''}
        aria-label="${escapeHTML(disabled ? `Contenido no localizado: ${relationLabel(relation)}` : `Abrir ${relation.cards_title}`)}"
      >
        <span class="glossary-related-path">
          <span><i class="fa-solid fa-layer-group"></i>${escapeHTML(relation.unit_title)}</span>
          <i class="fa-solid fa-chevron-right glossary-path-arrow" aria-hidden="true"></i>
          <span><i class="fa-solid fa-book-open"></i>${escapeHTML(relation.topic_title)}</span>
          <i class="fa-solid fa-chevron-right glossary-path-arrow" aria-hidden="true"></i>
          <span class="glossary-related-slide"><i class="fa-solid fa-up-right-from-square"></i>${escapeHTML(relation.cards_title)}</span>
        </span>
        <span class="glossary-open-label">${disabled ? 'No localizado' : 'Abrir slide'}</span>
      </button>`;
  }

  function render(items) {
    const sorted = [...items].sort((a, b) => Number(a.num || 0) - Number(b.num || 0));
    root.innerHTML = sorted.map((item) => {
      const sourceIndex = glossaryData.indexOf(item);
      const related = Array.isArray(item.relacionados) ? item.relacionados : [];
      return `
        <article class="card glossary-card">
          <div class="glossary-card-top">
            <span class="glossary-number">${String(item.num ?? '').padStart(2, '0')}</span>
            <span class="glossary-related-count"><i class="fa-solid fa-link"></i>${related.length} ${related.length === 1 ? 'relación' : 'relaciones'}</span>
          </div>
          <div class="glossary-concept-row">
            <span class="glossary-icon"><i class="fa-solid fa-book-bookmark"></i></span>
            <h3>${escapeHTML(item.concepto)}</h3>
          </div>
          <br>
          <p class="glossary-description">${escapeHTML(item['descripción'] ?? item.descripcion ?? '')}</p>
          <br>
          <div class="glossary-related-block">
            <div class="glossary-related-heading">
              <i class="fa-solid fa-route"></i>
              <strong>Relacionado con</strong>
            </div>
            <div class="glossary-related-list">
              ${related.length
                ? related.map((relation, relationIndex) => renderRelation(relation, sourceIndex, relationIndex)).join('')
                : '<span class="glossary-no-related">Sin vínculos relacionados todavía.</span>'}
            </div>
          </div>
        </article>`;
    }).join('');

    if (count) count.textContent = `${sorted.length} ${sorted.length === 1 ? 'concepto' : 'conceptos'}`;
    if (empty) empty.hidden = sorted.length > 0;
  }

  function applyFilter() {
    const terms = normalize(input.value).split(/\s+/).filter(Boolean);
    const filtered = glossaryData.filter((item) => {
      if (!terms.length) return true;
      const searchable = normalize(`${item.concepto} ${item['descripción'] ?? item.descripcion ?? ''}`);
      return terms.every((term) => searchable.includes(term));
    });
    render(filtered);
    clearButton?.classList.toggle('is-visible', Boolean(input.value.trim()));
  }

  root.addEventListener('click', (event) => {
    const button = event.target.closest('[data-glossary-concept][data-glossary-related]');
    if (!button || button.disabled) return;

    const conceptIndex = Number(button.dataset.glossaryConcept);
    const relationIndex = Number(button.dataset.glossaryRelated);
    const relation = glossaryData[conceptIndex]?.relacionados?.[relationIndex];
    if (!relation || typeof window.openCourseRelation !== 'function') return;

    window.openCourseRelation(relation);
  });

  input.addEventListener('input', applyFilter);
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && input.value) {
      input.value = '';
      applyFilter();
    }
  });

  clearButton?.addEventListener('click', () => {
    input.value = '';
    input.focus();
    applyFilter();
  });

  render(glossaryData);
})();
