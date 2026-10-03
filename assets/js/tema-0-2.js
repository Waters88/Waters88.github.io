(function(){
  const $ = (s,root=document)=>root.querySelector(s);
  const $$ = (s,root=document)=>Array.from(root.querySelectorAll(s));

  const overlay = $('#seg02Overlay');
  const closeBtn = $('#seg02Close');
  const prevBtn = $('#seg02Prev');
  const nextBtn = $('#seg02Next');
  const slides = $$('.seg02-slide');
  const subtitleEl = $('#seg02CurrentSubtitle');
  const progressBar = $('#seg02ProgressBar');
  const progressLabel = $('#seg02ProgressLabel');
  const dotsWrap = $('#seg02Dots');
  let currentSlide = 0;

  slides.forEach((_,i)=>{
    const d=document.createElement('span');
    d.className='seg02-dot'+(i===0?' is-active':'');
    dotsWrap.appendChild(d);
  });

  function setSlide(index){
    currentSlide=Math.max(0,Math.min(index,slides.length-1));
    slides.forEach((s,i)=>s.classList.toggle('is-active',i===currentSlide));
    $$('.seg02-dot',dotsWrap).forEach((d,i)=>d.classList.toggle('is-active',i===currentSlide));
    subtitleEl.textContent=slides[currentSlide].dataset.subtitle;
    progressBar.style.width=((currentSlide+1)/slides.length*100)+'%';
    progressLabel.textContent=(currentSlide+1)+' / '+slides.length;
    prevBtn.disabled=currentSlide===0;
    nextBtn.disabled=currentSlide===slides.length-1;
    slides[currentSlide].scrollTop=0;
    if(currentSlide===0){
      requestAnimationFrame(()=>requestAnimationFrame(()=>{
        revealVisibleTimeline();
        requestTimelineProgressUpdate();
      }));
      setTimeout(()=>{
        revealVisibleTimeline();
        requestTimelineProgressUpdate();
      },160);
    }
  }
  prevBtn.addEventListener('click',()=>setSlide(currentSlide-1));
  nextBtn.addEventListener('click',()=>setSlide(currentSlide+1));
  function closeTema02(){
    overlay.hidden=true;
    overlay.setAttribute('aria-hidden','true');
    document.body.classList.remove('topic-segment-open');
  }
  closeBtn.addEventListener('click',closeTema02);
  document.addEventListener('keydown',(e)=>{
    if(e.key==='Escape'&&!overlay.hidden) closeTema02();
    if(!overlay.hidden && e.key==='ArrowRight' && !['TEXTAREA','INPUT'].includes(document.activeElement.tagName)) setSlide(currentSlide+1);
    if(!overlay.hidden && e.key==='ArrowLeft' && !['TEXTAREA','INPUT'].includes(document.activeElement.tagName)) setSlide(currentSlide-1);
  });
  window.openTema02Segment=(slideIndex=0)=>{
    overlay.hidden=false;
    overlay.setAttribute('aria-hidden','false');
    document.body.classList.add('topic-segment-open');
    setSlide(slideIndex);
    requestAnimationFrame(()=>closeBtn.focus());
  };
  window.closeTema02Segment=closeTema02;

  /* Línea de tiempo vertical: calca funcional de linea_de_tiempo_ia_detallada.html */
  const timelineSection = document.getElementById('ai-timeline');
  const cursorGlow = document.getElementById('cursor-glow');
  const progressLine = document.getElementById('progress-line');
  const historySlide = timelineSection ? timelineSection.closest('.seg02-history-slide') : null;

  // 1. Inicializar íconos de Lucide
  if (window.lucide) {
    lucide.createIcons();
  }

  // 2. Lógica del Resplandor que sigue al cursor (Cursor Glow Effect)
  if (timelineSection && cursorGlow) {
    timelineSection.addEventListener('mousemove', (e) => {
      const rect = timelineSection.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      cursorGlow.style.left = `${x}px`;
      cursorGlow.style.top = `${y}px`;
    });

    timelineSection.addEventListener('mouseenter', () => cursorGlow.style.opacity = '1');
    timelineSection.addEventListener('mouseleave', () => cursorGlow.style.opacity = '0');
  }

  // 3. Lógica para animar los elementos al hacer scroll (Intersection Observer)
  const observerOptions = {
    root: historySlide,
    rootMargin: '0px',
    threshold: 0.15
  };

  const timelineRevealObserver = ('IntersectionObserver' in window) ? new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions) : null;

  document.querySelectorAll('#ai-timeline .timeline-item').forEach(item => {
    if (timelineRevealObserver) timelineRevealObserver.observe(item);
    else item.classList.add('visible');
  });

  // 4. Línea de progreso vertical.
  // El carrusel tiene su propio viewport con scroll (.seg02-history-slide).
  // La línea se llena hasta un punto de activación dentro de ese viewport;
  // al desplazarse el panel, timelineContainer cambia de posición y el trazo
  // crece en píxeles reales sobre toda la altura de la línea temporal.
  let timelineProgressRaf = 0;
  function updateTimelineProgress() {
    if (!timelineSection || !progressLine || !historySlide || !timelineContainer) return;
    if (overlay.hidden || !slides[0].classList.contains('is-active')) return;

    const slideRect = historySlide.getBoundingClientRect();
    const timelineRect = timelineContainer.getBoundingClientRect();
    const timelineHeight = timelineContainer.offsetHeight;
    if (!slideRect.height || !timelineHeight) return;

    // Punto visual desde el que la línea "lee" el avance del usuario.
    const activationY = slideRect.top + Math.min(180, slideRect.height * 0.28);
    const filledHeight = Math.max(0, Math.min(timelineHeight, activationY - timelineRect.top));
    const progress = timelineHeight ? filledHeight / timelineHeight : 0;

    progressLine.style.height = `${filledHeight}px`;
    progressLine.dataset.progress = String(Math.round(progress * 100));
  }

  function requestTimelineProgressUpdate(){
    if (timelineProgressRaf) cancelAnimationFrame(timelineProgressRaf);
    timelineProgressRaf = requestAnimationFrame(()=>{
      timelineProgressRaf = 0;
      updateTimelineProgress();
    });
  }

  if (historySlide) {
    historySlide.addEventListener('scroll', ()=>{
      requestTimelineProgressUpdate();
      revealVisibleTimeline();
    }, {passive:true});
  }
  window.addEventListener('resize', requestTimelineProgressUpdate);
  if (timelineSection) {
    timelineSection.querySelectorAll('img').forEach(img=>{
      if (!img.complete) img.addEventListener('load', requestTimelineProgressUpdate, {once:true});
    });
  }

  function revealVisibleTimeline(){
    updateTimelineProgress();
    if(!historySlide) return;
    const viewport = historySlide.getBoundingClientRect();
    document.querySelectorAll('#ai-timeline .timeline-item').forEach(item => {
      const r = item.getBoundingClientRect();
      const revealLimit = viewport.top + viewport.height * .96;
      if (r.top < revealLimit && r.bottom > viewport.top) item.classList.add('visible');
    });
  }

  requestAnimationFrame(() => {
    revealVisibleTimeline();
    updateTimelineProgress();
    if (window.lucide) lucide.createIcons();
  });

  /* Daily answers */
  const answerKeys=['seg02Q1','seg02Q2','seg02Q3'];
  const answerMeta=[
    ['🤖','IA en tu día a día'],
    ['🧰','Herramientas que conoces'],
    ['🏢','Empresas que conoces']
  ];
  const form=$('#seg02AnswerForm');
  const results=$('#seg02AnswerResults');
  const answerGrid=$('#seg02AnswerGrid');

  function renderAnswers(values){
    answerGrid.innerHTML=values.map((v,i)=>`
      <article class="seg02-answer-card">
        <div class="seg02-answer-icon">${answerMeta[i][0]}</div>
        <h3>${answerMeta[i][1]}</h3>
        <p>${escapeHtml(v || 'Sin respuesta')}</p>
      </article>`).join('');
    requestAnimationFrame(()=>$$('.seg02-answer-card',answerGrid).forEach(c=>c.classList.add('show')));
  }
  function escapeHtml(str){
    return String(str).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
  }
  $('#seg02SaveAnswers').addEventListener('click',()=>{
    const vals=answerKeys.map(id=>$('#'+id).value.trim());
    try{localStorage.setItem('tema02_respuestas',JSON.stringify(vals));}catch(e){}
    renderAnswers(vals);form.hidden=true;results.hidden=false;
  });
  $('#seg02EditAnswers').addEventListener('click',()=>{
    form.hidden=false;results.hidden=true;
  });
  try{
    const saved=JSON.parse(localStorage.getItem('tema02_respuestas')||'null');
    if(Array.isArray(saved)){
      saved.forEach((v,i)=>$('#'+answerKeys[i]).value=v||'');
      renderAnswers(saved);form.hidden=true;results.hidden=false;
    }
  }catch(e){}

  /* Matrices */
  const capabilityRows = [
    {logo:'https://cdn.jsdelivr.net/gh/selfhst/icons/png/openai.png',tool:'OpenAI – ChatGPT',country:'EE.UU.',model:'GPT-5.6 Sol (y variantes)',desc:'Líder absoluto en uso mundial (~5,3–5,6 mil millones de visitas mensuales y ~1.000 millones MAU). Chatbot generalista más completo: escritura, código, agentes, imágenes y búsqueda.'},
    {logo:'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/anthropic.png',tool:'Anthropic – Claude',country:'EE.UU.',model:'Claude Opus 5 / Claude Fable 5',desc:'Máxima puntuación en preferencia humana y razonamiento/coding. Excelente en documentos largos, escritura cuidadosa y tareas agenticas. Crecimiento muy rápido.'},
    {logo:'https://cdn.jsdelivr.net/npm/@lobehub/icons-static-png@latest/light/gemini-color.png',tool:'Google – Gemini',country:'EE.UU.',model:'Gemini 3.1 Pro / 3.x Flash',desc:'Segunda en tráfico global. Integración nativa en Search, Android y Workspace. Muy fuerte en multimodalidad y contexto largo.'},
    {logo:'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/grok-dark.png',tool:'xAI – Grok',country:'EE.UU.',model:'Grok 4.6 / 4.5',desc:'Chatbot de xAI integrado en X. Destaca por información en tiempo real, velocidad, menor censura y buena relación calidad-precio.'},
    {logo:'https://cdn.jsdelivr.net/npm/@lobehub/icons-static-png@latest/light/doubao-color.png',tool:'ByteDance – Doubao (豆包)',country:'China',model:'Doubao-Seed / modelos Ark',desc:'Líder absoluto de apps de IA en China (~324 millones MAU). Fuertemente integrado en el ecosistema Douyin/TikTok. Multimodal y muy usado en el día a día.'},
    {logo:'https://cdn.jsdelivr.net/npm/@lobehub/icons-static-png@latest/light/qwen-color.png',tool:'Alibaba – Qwen / Tongyi Qianwen (千问)',country:'China',model:'Qwen 3.8-Max',desc:'Una de las familias open-source más descargadas del mundo (>3 mil millones). Excelente rendimiento en benchmarks y muy competitiva en precio. Disponible también vía Quark.'},
    {logo:'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/deepseek.png',tool:'DeepSeek',country:'China',model:'DeepSeek V4 Pro',desc:'Modelo chino de mayor impacto global en tráfico web. Muy fuerte en razonamiento, matemáticas y código, con precios extremadamente competitivos.'},
    {logo:'https://cdn.jsdelivr.net/npm/@lobehub/icons-static-png@latest/light/kimi-color.png',tool:'Moonshot AI – Kimi',country:'China',model:'Kimi K3',desc:'Modelo chino de alto rendimiento que compite en el top de LMArena. Especialmente bueno en contexto ultra-largo y tareas de investigación.'},
    {logo:'https://cdn.jsdelivr.net/gh/selfhst/icons/png/microsoft-copilot.png',tool:'Microsoft – Copilot',country:'EE.UU.',model:'Modelos propios + GPT',desc:'Asistente integrado en Windows, Office 365, Edge y Bing. Amplia adopción empresarial y de productividad.'},
    {logo:'https://cdn.jsdelivr.net/npm/@lobehub/icons-static-png@latest/light/yuanbao-color.png',tool:'Tencent – Yuanbao (元宝)',country:'China',model:'Hunyuan (modelos propios)',desc:'Asistente de Tencent integrado en WeChat y su ecosistema. Alto volumen de usuarios en China y fuerte en escenarios sociales y de productividad.'},
    {logo:'https://cdn.simpleicons.org/metaai/9844FF',tool:'Meta – Meta AI',country:'EE.UU.',model:'Muse Spark / Llama 4',desc:'Asistente gratuito integrado en WhatsApp, Instagram y Messenger. Fuerte en uso casual y modelos open-weight de alto rendimiento (Muse Spark aparece alto en LMArena).'}
  ];

  const complementRows = [
    ['ChatGPT','Sí','Sí (Sora)','Sí','Sí','Sí','Sí','Muy fuerte','Completitud general'],
    ['Gemini','Excelente','Sí (Veo)','Excelente','Sí','Sí','Parcial','Fuerte','Multimodal + ecosistema Google'],
    ['Claude','Limitado','No','Sí','Sí','Sí','Parcial','Muy fuerte','Razonamiento y escritura'],
    ['Grok','Sí','Sí','Sí (+ X)','Sí','Limitado','Parcial','Bueno','Tiempo real + X'],
    ['Doubao (ByteDance)','Sí (Seedream)','Excelente (Seedance)','Muy fuerte','Sí','Sí','Sí','Fuerte (desktop)','Multimodal + volumen en China'],
    ['Qwen / Quark (Alibaba)','Sí','Sí (Wan)','Fuerte','Sí','Sí','Sí','Muy fuerte (UI-Agent)','Long context + open-source'],
    ['DeepSeek','Limitado','Limitado','Sí','Sí','Limitado','Parcial','Fuerte (runtime)','Razonamiento + coste'],
    ['Kimi (Moonshot)','Limitado','Limitado','Sí','Excelente','Parcial','Parcial','Fuerte (swarms)','Documentos largos e investigación'],
    ['Yuanbao (Tencent)','Sí','Limitado','Fuerte','Sí','Limitado','Parcial','Bueno','Integración WeChat'],
    ['Meta AI','Sí','Limitado','Sí','Limitado','Limitado','Limitado','Básico','Integración WhatsApp / Instagram / Messenger + uso gratuito masivo'],
    ['Microsoft Copilot','Sí','Limitado','Sí (Bing)','Sí','Sí (dentro de Office)','Sí (vía Power Automate)','Fuerte (Office + Windows)','Integración profunda con Microsoft 365 y productividad empresarial']
  ];
  const logoMap={
    'ChatGPT':'https://cdn.jsdelivr.net/gh/selfhst/icons/png/openai.png',
    'Gemini':'https://cdn.jsdelivr.net/npm/@lobehub/icons-static-png@latest/light/gemini-color.png',
    'Claude':'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/anthropic.png',
    'Grok':'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/grok-dark.png',
    'Doubao (ByteDance)':'https://cdn.jsdelivr.net/npm/@lobehub/icons-static-png@latest/light/doubao-color.png',
    'Qwen / Quark (Alibaba)':'https://cdn.jsdelivr.net/npm/@lobehub/icons-static-png@latest/light/qwen-color.png',
    'DeepSeek':'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/deepseek.png',
    'Kimi (Moonshot)':'https://cdn.jsdelivr.net/npm/@lobehub/icons-static-png@latest/light/kimi-color.png',
    'Yuanbao (Tencent)':'https://cdn.jsdelivr.net/npm/@lobehub/icons-static-png@latest/light/yuanbao-color.png',
    'Meta AI':'https://cdn.simpleicons.org/metaai/9844FF',
    'Microsoft Copilot':'https://cdn.jsdelivr.net/gh/selfhst/icons/png/microsoft-copilot.png'
  };

  $('#seg02MatrixCap').innerHTML=`
    <table class="seg02-table">
      <thead><tr><th>Empresa / Herramienta</th><th>País</th><th>Mejor modelo actual (ago 2026)</th><th>Descripción</th></tr></thead>
      <tbody>${capabilityRows.map(r=>`<tr>
        <td><div class="seg02-toolcell"><img src="${r.logo}" alt="${r.tool}" class="seg02-logo"><span>${r.tool}</span></div></td>
        <td>${r.country}</td><td><span class="seg02-cap-chip yes">✦ ${r.model}</span></td><td>${r.desc}</td>
      </tr>`).join('')}</tbody>
    </table>`;

  function capChip(v){
    const l=String(v).toLowerCase();
    let cls='yes';
    if(l==='no'||l.includes('limitado')||l.includes('básico')) cls='no';
    else if(l.includes('parcial')||l.includes('bueno')) cls='partial';
    return `<span class="seg02-cap-chip ${cls}">${v}</span>`;
  }
  $('#seg02MatrixComp').innerHTML=`
    <table class="seg02-table">
      <thead><tr><th>Plataforma</th><th>Imagen</th><th>Vídeo</th><th>Búsqueda web</th><th>Deep Research</th><th>Canvas</th><th>Tareas programadas</th><th>Agentes / Computer Use</th><th>Fortaleza principal</th></tr></thead>
      <tbody>${complementRows.map(r=>`<tr>
        <td><div class="seg02-toolcell"><img src="${logoMap[r[0]]||'AI'}" alt="${r.tool}" class="seg02-logo"><span>${r[0]}</span></div></td>
        ${r.slice(1,8).map(v=>`<td>${capChip(v)}</td>`).join('')}
        <td>${r[8]}</td>
      </tr>`).join('')}</tbody>
    </table>`;

  $$('.seg02-tab').forEach(btn=>btn.addEventListener('click',()=>{
    $$('.seg02-tab').forEach(b=>b.classList.toggle('is-active',b===btn));
    $('#seg02MatrixCap').hidden=btn.dataset.matrix!=='cap';
    $('#seg02MatrixComp').hidden=btn.dataset.matrix!=='comp';
  }));

  /* Cases */
  const cases = {
    industry:[
      ['⚡','Google DeepMind — Optimización energética en centros de datos','Google utilizó IA para controlar los sistemas de refrigeración de sus centros de datos, logrando reducir hasta 40% la energía utilizada para enfriamiento y alrededor de 15% del consumo energético asociado a estas instalaciones.'],
      ['💬','Klarna — Atención al cliente con IA generativa','Klarna implementó asistentes de IA para atender consultas de clientes a gran escala. Su sistema llegó a gestionar alrededor del 80% de los chats de atención, reduciendo tiempos de respuesta y generando importantes ahorros operativos.'],
      ['🌱','John Deere — Agricultura de precisión con See & Spray','John Deere utiliza visión artificial para identificar malezas en tiempo real y aplicar herbicida únicamente donde es necesario. La tecnología ha permitido reducir significativamente el uso de productos químicos y mejorar la eficiencia de las labores agrícolas.'],
      ['📦','Amazon — IA y robótica en centros logísticos','Amazon combina inteligencia artificial con una flota de más de un millón de robots para gestionar inventarios, transportar productos y optimizar rutas internas. Esta automatización ha reducido tiempos de procesamiento y mejorado la eficiencia de sus centros de distribución.'],
      ['🔧','BlueScope + Siemens — Mantenimiento predictivo','BlueScope implementó sistemas de IA para analizar el comportamiento de maquinaria industrial y anticipar posibles fallas. El proyecto permitió evitar aproximadamente 1,950 horas de paros no planeados y decenas de interrupciones completas en procesos productivos.']
    ],
    education:[
      ['🤖','Georgia Tech — Jill Watson','Georgia Tech desarrolló Jill Watson, uno de los primeros asistentes docentes basados en IA. El sistema responde preguntas frecuentes de los estudiantes, brinda apoyo académico y permite que los profesores se concentren en actividades de mayor valor educativo.'],
      ['🧠','Khan Academy — Khanmigo','Khan Academy creó Khanmigo, un tutor basado en IA generativa que guía al estudiante mediante preguntas y explicaciones personalizadas en lugar de simplemente entregar respuestas. Su uso se ha extendido a millones de estudiantes, docentes y familias.'],
      ['⚛️','Harvard — Tutor de IA en cursos de Física','Investigadores de Harvard evaluaron un tutor de IA en estudiantes universitarios de Física. Los alumnos que utilizaron el sistema mostraron mayores ganancias de aprendizaje en menos tiempo que quienes recibieron únicamente clases presenciales tradicionales.'],
      ['🏫','Arizona State University — ChatGPT Edu a escala universitaria','Arizona State University se convirtió en una de las primeras universidades en integrar IA generativa de forma institucional. Ha desarrollado cientos de proyectos educativos con IA, utilizados por estudiantes, profesores, investigadores y personal administrativo.'],
      ['🗣️','Duolingo — Aprendizaje personalizado mediante IA','Duolingo utiliza IA para adaptar ejercicios, dificultad y contenidos al desempeño de cada estudiante. Sus modelos de personalización permiten ofrecer experiencias de aprendizaje distintas para millones de usuarios, ajustándose continuamente al progreso individual.']
    ],
    science:[
      ['🧬','AlphaFold 2 — Predicción de estructuras de proteínas','DeepMind logró predecir con gran precisión la estructura tridimensional de proteínas. Su base de datos contiene más de 200 millones de estructuras predichas y el trabajo fue reconocido con el Premio Nobel de Química 2024, transformando áreas como biología molecular y descubrimiento de medicamentos.'],
      ['💎','GNoME — Descubrimiento de nuevos materiales','Google DeepMind utilizó redes neuronales para descubrir 2.2 millones de nuevas estructuras cristalinas, incluyendo alrededor de 381,000 materiales potencialmente estables, acelerando enormemente la búsqueda de materiales para baterías, electrónica y otras tecnologías.'],
      ['🌦️','GenCast — Predicción meteorológica mediante IA','DeepMind desarrolló un modelo generativo capaz de producir pronósticos meteorológicos globales de hasta 15 días. En evaluaciones publicadas en Nature, GenCast superó al sistema probabilístico del ECMWF en 97.2% de las variables analizadas.'],
      ['🧪','Halicin — Descubrimiento de nuevos antibióticos','Investigadores del MIT utilizaron deep learning para analizar enormes bibliotecas de moléculas e identificar Halicin, un compuesto con potente actividad antibacteriana. El descubrimiento demostró que la IA puede encontrar candidatos a medicamentos que podrían pasar desapercibidos mediante métodos tradicionales.'],
      ['∑','IA resolviendo problemas abiertos de matemáticas — Conjeturas de Erdős','En 2026, la IA comenzó a participar directamente en la resolución de problemas matemáticos abiertos. Un modelo de OpenAI logró refutar una conjetura de Erdős, estudiada durante décadas. Estos resultados marcan uno de los primeros ejemplos claros de IA contribuyendo a generar nuevo conocimiento matemático, y no únicamente reproduciendo matemáticas conocidas.']
    ]
  };
  const caseGrid=$('#seg02CaseGrid');
  function renderCases(type){
    caseGrid.innerHTML=cases[type].map((r,i)=>`
      <article class="seg02-flip-card" tabindex="0" role="button" aria-label="Girar tarjeta: ${escapeHtml(r[1])}">
        <div class="seg02-flip-inner">
          <div class="seg02-flip-face seg02-flip-front">
            <div class="seg02-case-icon">${r[0]}</div>
            <div class="seg02-case-index">CASO 0${i+1}</div>
            <h3>${r[1]}</h3>
            <div class="seg02-flip-hint">Toca para ver la descripción ↻</div>
          </div>
          <div class="seg02-flip-face seg02-flip-back">
            <div class="seg02-case-index">DESCRIPCIÓN</div>
            <p>${r[2]}</p>
            <div class="seg02-flip-hint">Toca para volver ↻</div>
          </div>
        </div>
      </article>`).join('');
    $$('.seg02-flip-card',caseGrid).forEach(card=>{
      card.addEventListener('click',()=>card.classList.toggle('is-flipped'));
      card.addEventListener('keydown',e=>{
        if(e.key==='Enter'||e.key===' '){e.preventDefault();card.classList.toggle('is-flipped')}
      });
    });
  }
  renderCases('industry');
  $$('.seg02-case-btn').forEach(btn=>btn.addEventListener('click',()=>{
    $$('.seg02-case-btn').forEach(b=>b.classList.toggle('is-active',b===btn));
    renderCases(btn.dataset.case);
  }));

  /* Quiz */
  const quiz = [
    {
      type:'Opción múltiple · una respuesta',
      q:'¿Qué acontecimiento suele considerarse el nacimiento formal del campo de la Inteligencia Artificial?',
      options:['El Test de Turing de 1950','El taller de Dartmouth de 1956','La victoria de Deep Blue en 1997','La publicación del Transformer en 2017'],
      answer:[1],
      why:'El taller de Dartmouth de 1956 consolidó el término “Artificial Intelligence” como campo de investigación.'
    },
    {
      type:'Verdadero o falso',
      q:'John Deere utiliza visión artificial en See & Spray para identificar malezas y aplicar herbicida de forma selectiva.',
      options:['Verdadero','Falso'],
      answer:[0],
      why:'Verdadero. La IA permite detectar malezas en tiempo real y reducir aplicaciones innecesarias.'
    },
    {
      type:'Opción múltiple · varias respuestas',
      q:'Según la Matriz de Capacidades, ¿cuáles de estas empresas o plataformas corresponden a China?',
      options:['Doubao / ByteDance','Qwen / Alibaba','DeepSeek','Kimi / Moonshot','Yuanbao / Tencent','Anthropic / Claude'],
      answer:[0,1,2,3,4],
      multi:true,
      why:'Doubao, Qwen, DeepSeek, Kimi y Yuanbao aparecen como actores de China; Anthropic figura como empresa de EE.UU.'
    },
    {
      type:'Opción múltiple · una respuesta',
      q:'¿Qué caso científico está asociado con la predicción de estructuras tridimensionales de proteínas?',
      options:['GNoME','GenCast','AlphaFold 2','Halicin'],
      answer:[2],
      why:'AlphaFold 2 transformó la predicción de estructuras de proteínas y aceleró la investigación biomolecular.'
    },
    {
      type:'Verdadero o falso',
      q:'La arquitectura Transformer apareció en 2017 y se convirtió en una base central para los grandes modelos generativos modernos.',
      options:['Verdadero','Falso'],
      answer:[0],
      why:'Verdadero. La arquitectura Transformer redefinió el procesamiento de lenguaje y después impulsó gran parte de la IA generativa.'
    }
  ];

  let qi=0;
  const quizState=quiz.map(()=>({selected:[],checked:false,correct:false}));
  const quizQ=$('#seg02QuizQuestion'), quizO=$('#seg02QuizOptions'), quizF=$('#seg02QuizFeedback');
  const quizType=$('#seg02QuizType'), quizCounter=$('#seg02QuizCounter');
  const quizPrev=$('#seg02QuizPrev'), quizNext=$('#seg02QuizNext');
  const scoreEl=$('#seg02Score'), scoreOrb=$('#seg02ScoreOrb'), mini=$('#seg02MiniProgress');

  function eqSet(a,b){
    const x=[...a].sort((m,n)=>m-n), y=[...b].sort((m,n)=>m-n);
    return x.length===y.length && x.every((v,i)=>v===y[i]);
  }
  function renderQuiz(){
    const item=quiz[qi], state=quizState[qi];
    quizType.textContent=item.type;
    quizCounter.textContent=`Pregunta ${qi+1} de ${quiz.length}`;
    quizQ.textContent=item.q;
    quizF.className='seg02-result'+(state.checked?' show':'');
    quizF.textContent=state.checked ? (state.correct?'✓ Correcto. ':'✦ Revisa esta idea. ')+item.why : '';
    quizO.innerHTML=item.options.map((op,i)=>{
      let cls='seg02-option';
      if(state.checked && item.answer.includes(i)) cls+=' is-correct';
      else if(state.checked && state.selected.includes(i) && !item.answer.includes(i)) cls+=' is-wrong';
      return `<label class="${cls}">
        <input type="${item.multi?'checkbox':'radio'}" name="seg02QuizChoice" value="${i}" ${state.selected.includes(i)?'checked':''} ${state.checked?'disabled':''}>
        <span>${op}</span>
      </label>`;
    }).join('');
    $$('input',quizO).forEach(inp=>inp.addEventListener('change',()=>{
      const v=Number(inp.value);
      if(item.multi){
        const set=new Set(state.selected);
        inp.checked?set.add(v):set.delete(v);
        state.selected=[...set];
      }else state.selected=[v];
    }));
    quizPrev.disabled=qi===0;
    quizNext.textContent = state.checked ? (qi===quiz.length-1?'Reiniciar quiz':'Siguiente →') : 'Comprobar';
    renderQuizSide();
  }
  function renderQuizSide(){
    const checked=quizState.filter(s=>s.checked).length;
    const score=quizState.filter(s=>s.checked&&s.correct).length;
    scoreEl.textContent=score;
    const degrees=(score/quiz.length)*360;
    scoreOrb.style.background=`conic-gradient(#26cdbc ${degrees}deg,#173536 ${degrees}deg)`;
    mini.innerHTML=quizState.map(s=>`<span class="seg02-mini-step ${s.checked?'done':''}"></span>`).join('');
  }
  quizNext.addEventListener('click',()=>{
    const item=quiz[qi], state=quizState[qi];
    if(!state.checked){
      if(state.selected.length===0){quizF.className='seg02-result show';quizF.textContent='Selecciona al menos una respuesta antes de comprobar.';return}
      state.correct=eqSet(state.selected,item.answer);
      state.checked=true;renderQuiz();return;
    }
    if(qi===quiz.length-1){
      quizState.forEach(s=>{s.selected=[];s.checked=false;s.correct=false});qi=0;renderQuiz();return;
    }
    qi++;renderQuiz();
  });
  quizPrev.addEventListener('click',()=>{if(qi>0){qi--;renderQuiz()}});
  renderQuiz();

  setSlide(0);
  revealVisibleTimeline();
})();
