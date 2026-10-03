(() => {
  const root = document.getElementById("ia-topic-segment");
  if (!root) return;

  /* =========================================================
     1) CARRUSEL PRINCIPAL · footer y navegación del Tema 0.2
     ========================================================= */
  const subtitles = [
    "Contenido generado por IA: texto, imágenes, videos, audio, documentos, código",
    "Percepción social de la IA",
    "Concepto general de IA",
    "IA en el imaginario colectivo",
    "Limitaciones iniciales",
    "Cuestionario"
  ];

  const track = root.querySelector("#iaTrack");
  const subtitle = root.querySelector("#iaDynamicSubtitle");
  const progressLabel = root.querySelector("#iaProgressLabel");
  const progressBar = root.querySelector("#iaProgressBar");
  const dotsWrap = root.querySelector("#iaDots");
  const prevBtn = root.querySelector("#iaPrevSlide");
  const nextBtn = root.querySelector("#iaNextSlide");
  const closeBtn = root.querySelector(".ia-seg-close");
  let currentSlide = 0;

  subtitles.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.className = "seg02-dot" + (i === 0 ? " is-active" : "");
    dotsWrap.appendChild(dot);
  });

  function renderSlide(animate = true) {
    if (!animate) track.style.transition = "none";
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    if (!animate) requestAnimationFrame(() => { track.style.transition = ""; });
    subtitle.textContent = subtitles[currentSlide];
    const pct = ((currentSlide + 1) / subtitles.length) * 100;
    progressLabel.textContent = `${currentSlide + 1} / ${subtitles.length}`;
    progressBar.style.width = `${pct}%`;
    root.querySelectorAll("#iaDots .seg02-dot").forEach((dot, i) => dot.classList.toggle("is-active", i === currentSlide));
    prevBtn.disabled = currentSlide === 0;
    nextBtn.disabled = currentSlide === subtitles.length - 1;
    const slide = root.querySelectorAll(".ia-slide")[currentSlide];
    if (slide) slide.scrollTop = 0;
  }

  function setSlide(index, animate = true) {
    currentSlide = Math.max(0, Math.min(Number(index) || 0, subtitles.length - 1));
    renderSlide(animate);
  }

  function closeSegment() {
    root.classList.add("is-closed");
    root.setAttribute("aria-hidden", "true");
    document.body.classList.remove("topic-segment-open");
  }

  prevBtn.addEventListener("click", () => setSlide(currentSlide - 1));
  nextBtn.addEventListener("click", () => setSlide(currentSlide + 1));
  closeBtn.addEventListener("click", closeSegment);

  window.openTema01Segment = (slideIndex = 0) => {
    root.classList.remove("is-closed");
    root.setAttribute("aria-hidden", "false");
    document.body.classList.add("topic-segment-open");
    setSlide(slideIndex, false);
    requestAnimationFrame(() => closeBtn.focus());
  };
  window.closeTema01Segment = closeSegment;

  document.addEventListener("keydown", (event) => {
    if (root.classList.contains("is-closed")) return;
    if (event.key === "Escape") closeSegment();
    if (!["TEXTAREA", "INPUT"].includes(document.activeElement.tagName)) {
      if (event.key === "ArrowRight") setSlide(currentSlide + 1);
      if (event.key === "ArrowLeft") setSlide(currentSlide - 1);
    }
  });

  /* =========================================================
     2) BASE DE 6 IMÁGENES · DEMO
     Cada recurso ya viene etiquetado con sourceType.
     Sustituye visual/label/why por tus recursos verificados.
     ========================================================= */

  function svgDataURI(svg) {
    return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
  }

  const imageLibrary = [
    {
      id: "img-ai-01",
      sourceType: "ia",
      label: "HECHO CON IA",
      why: "Recurso sintético de demostración.",
      src: "https://cdn.prod.website-files.com/6600e1eab90de089c2d9c9cd/670ef3902b5bf08884356b83_66d7a15ca54ee50c7a5a70b3_662c6c096969f513703d4001_2qOiA9T6_Fi5m_1024.webp"
      /*svgDataURI(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600">
          <defs><linearGradient id="g" x1="0" x2="1"><stop stop-color="#0f766e"/><stop offset="1" stop-color="#111827"/></linearGradient></defs>
          <rect width="900" height="600" fill="url(#g)"/>
          <circle cx="450" cy="265" r="150" fill="#5eead4" opacity=".22"/>
          <path d="M210 440 Q450 40 690 440" fill="none" stroke="#d9fffb" stroke-width="20" opacity=".78"/>
          <circle cx="390" cy="260" r="18" fill="#fff"/><circle cx="510" cy="260" r="18" fill="#fff"/>
          <path d="M380 350 Q450 390 520 350" fill="none" stroke="#fff" stroke-width="14" stroke-linecap="round"/>
          <text x="40" y="560" font-family="Arial" font-size="30" fill="#d9fffb">Retrato sintético · demo</text>
        </svg>`)*/
    },
    {
      id: "img-noai-01",
      sourceType: "no-ia",
      label: "NO IA",
      why: "Marcado como material no IA para la dinámica de demostración.",
      src: "https://static.vecteezy.com/system/resources/thumbnails/046/409/864/small/tropical-beach-with-vibrant-sunset-sky-photo.jpg"
      /*svgDataURI(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600">
          <rect width="900" height="600" fill="#0b1220"/>
          <rect x="80" y="90" width="740" height="420" rx="26" fill="#172033"/>
          <circle cx="275" cy="250" r="95" fill="#334155"/>
          <path d="M140 470 L340 300 L470 390 L590 260 L760 470Z" fill="#475569"/>
          <circle cx="690" cy="180" r="42" fill="#f8fafc" opacity=".75"/>
          <text x="40" y="560" font-family="Arial" font-size="30" fill="#cbd5e1">Fotografía / recurso convencional · demo</text>
        </svg>`)*/
    },
    {
      id: "img-ai-02",
      sourceType: "ia",
      label: "HECHO CON IA",
      why: "Recurso sintético de demostración.",
      src: "https://www.lavanguardia.com/files/content_image_mobile_filter/files/fp/uploads/2024/01/27/65b522a8a2348.r_d.887-849.jpeg"
      /*svgDataURI(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600">
          <rect width="900" height="600" fill="#05090c"/>
          <g opacity=".95">
            <circle cx="240" cy="290" r="150" fill="#14b8a6"/>
            <circle cx="470" cy="230" r="125" fill="#67e8f9" opacity=".7"/>
            <circle cx="620" cy="350" r="165" fill="#0f766e" opacity=".8"/>
          </g>
          <path d="M90 470 C220 180 500 120 810 430" fill="none" stroke="#fff" stroke-width="10" opacity=".48"/>
          <text x="40" y="560" font-family="Arial" font-size="30" fill="#d9fffb">Paisaje imposible · demo</text>
        </svg>`)*/
    },
    {
      id: "img-noai-02",
      sourceType: "no-ia",
      label: "NO IA",
      why: "Marcado como material no IA para la dinámica de demostración.",
      src: "https://i.pinimg.com/originals/71/8a/b0/718ab0e7537f97ef56e5fdba8afc6327.jpg"
      /*svgDataURI(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600">
          <rect width="900" height="600" fill="#08151a"/>
          <rect y="355" width="900" height="245" fill="#12343b"/>
          <circle cx="155" cy="140" r="55" fill="#fde68a"/>
          <path d="M0 380 L180 245 L335 360 L500 190 L900 390 L900 600 L0 600Z" fill="#1f5d61"/>
          <text x="40" y="560" font-family="Arial" font-size="30" fill="#ecfeff">Paisaje convencional · demo</text>
        </svg>`)*/
    },
    {
      id: "img-ai-03",
      sourceType: "ia",
      label: "HECHO CON IA",
      why: "Recurso sintético de demostración.",
      src: "https://img.magnific.com/psd-gratis/plantilla-banner-web-deliciosa-hamburguesa-menu-comida_106176-1446.jpg?semt=ais_hybrid&w=740&q=80"
      /*svgDataURI(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600">
          <rect width="900" height="600" fill="#071114"/>
          <g fill="none" stroke="#5eead4" opacity=".75">
            <circle cx="450" cy="300" r="210" stroke-width="9"/>
            <circle cx="450" cy="300" r="155" stroke-width="7"/>
            <circle cx="450" cy="300" r="100" stroke-width="5"/>
          </g>
          <path d="M330 300 L420 215 L545 285 L610 410 L410 430Z" fill="#14b8a6" opacity=".35"/>
          <text x="40" y="560" font-family="Arial" font-size="30" fill="#d9fffb">Arquitectura sintética · demo</text>
        </svg>`)*/
    },
    {
      id: "img-noai-03",
      sourceType: "no-ia",
      label: "NO IA",
      why: "Marcado como material no IA para la dinámica de demostración.",
      src: "https://template.canva.com/EAFXd6DAQRE/3/0/1600w-MOXJE_uEB8I.jpg"
      /*svgDataURI(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600">
          <rect width="900" height="600" fill="#0b1418"/>
          <rect x="145" y="100" width="610" height="390" rx="18" fill="#1f2937"/>
          <rect x="185" y="145" width="530" height="260" fill="#0f766e" opacity=".3"/>
          <rect x="250" y="420" width="400" height="30" rx="10" fill="#64748b"/>
          <text x="40" y="560" font-family="Arial" font-size="30" fill="#e2e8f0">Diseño tradicional · demo</text>
        </svg>`)*/
    }
  ];

  /* =========================================================
     3) BASE DE 4 VIDEOS · DEMO
     Nota: son URLs de ejemplo. Sustituir por videos reales
     verificados para la actividad definitiva.
     ========================================================= */
  const videoLibrary = [
    {
      id: "vid-ai-01",
      sourceType: "ia",
      label: "HECHO CON IA",
      why: "Etiquetado como IA para la dinámica de demostración.",
      src: "https://www.pexels.com/es-es/download/video/9795079/"/*"https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4"*/
    },
    {
      id: "vid-noai-01",
      sourceType: "no-ia",
      label: "NO IA",
      why: "Etiquetado como no IA para la dinámica de demostración.",
      src: "https://www.pexels.com/es-es/download/video/39077087/"/*"https://storage.googleapis.com/coverr-main/mp4/Footboys.mp4"*/
    },
    {
      id: "vid-ai-02",
      sourceType: "ia",
      label: "HECHO CON IA",
      why: "Etiquetado como IA para la dinámica de demostración.",
      src: "https://www.pexels.com/es-es/download/video/6153457/"/*"https://storage.googleapis.com/coverr-main/mp4/Night-Traffic.mp4"*/
    },
    {
      id: "vid-noai-02",
      sourceType: "no-ia",
      label: "NO IA",
      why: "Etiquetado como no IA para la dinámica de demostración.",
      src: "https://www.pexels.com/es-es/download/video/39082841/"/*"https://storage.googleapis.com/coverr-main/mp4/Rain-City.mp4"*/
    }
  ];

  function randomPair(library, previousKey) {
    const combinations = [];
    for (let i = 0; i < library.length; i++) {
      for (let j = i + 1; j < library.length; j++) {
        combinations.push([library[i], library[j]]);
      }
    }

    const valid = combinations.filter(pair => {
      const key = pair.map(x => x.id).sort().join("|");
      return key !== previousKey;
    });

    const pool = valid.length ? valid : combinations;
    return pool[Math.floor(Math.random() * pool.length)];
  }

  function pairKey(pair) {
    return pair.map(x => x.id).sort().join("|");
  }

  function flipCard(item, type) {
    const isVideo = type === "video";
    return `
      <div class="ia-flip ${isVideo ? "video" : ""}" tabindex="0" role="button"
           aria-label="Revelar si el recurso fue hecho con IA">
        <div class="ia-flip-inner">
          <div class="ia-flip-face ia-flip-front">
            ${
              isVideo
              ? `<video width=100% height=100% src="${item.src}" controls playsinline preload="metadata"></video>`
              : `<img src="${item.src}" alt="Recurso visual de demostración" width=100% height=100% />`
            }
            <div class="ia-flip-caption">Haz clic para revelar</div>
          </div>

          <div class="ia-flip-face ia-flip-back">
            <div>
              <span class="ia-answer-badge ${item.sourceType === "ia" ? "ai" : "noai"}">
                ${item.sourceType === "ia" ? "✨ " : "📷 "}${item.label}
              </span>
              <p class="ia-answer-text">${item.why}</p>
            </div>
          </div>
        </div>
      </div>`;
  }

  const imagePairBox = root.querySelector("#imagePair");
  const videoPairBox = root.querySelector("#videoPair");
  let previousImagePair = "";
  let previousVideoPair = "";

  function bindFlipCards(container) {
    container.querySelectorAll(".ia-flip").forEach(card => {
      const toggle = () => card.classList.toggle("is-flipped");

      card.addEventListener("click", e => {
        if (e.target.tagName === "VIDEO" || e.target.closest("video")) return;
        toggle();
      });

      card.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle();
        }
      });
    });
  }

  function renderImagePair() {
    const pair = randomPair(imageLibrary, previousImagePair);
    previousImagePair = pairKey(pair);
    imagePairBox.innerHTML = pair.map(item => flipCard(item, "image")).join("");
    bindFlipCards(imagePairBox);
  }

  function renderVideoPair() {
    const pair = randomPair(videoLibrary, previousVideoPair);
    previousVideoPair = pairKey(pair);
    videoPairBox.innerHTML = pair.map(item => flipCard(item, "video")).join("");
    bindFlipCards(videoPairBox);
  }

  root.querySelector("#newImagePair").addEventListener("click", renderImagePair);
  root.querySelector("#newVideoPair").addEventListener("click", renderVideoPair);

  /* =========================================================
     4) PERCEPCIÓN SOCIAL
     Guarda en localStorage para conservar la respuesta
     al recargar la página.
     ========================================================= */
  const form = root.querySelector("#perceptionForm");
  const responses = root.querySelector("#perceptionResponses");

  function showPerceptionCards(data) {
    responses.innerHTML = [
      ["¿Qué es la IA para ti?", data.q1],
      ["¿Crees que la IA piensa?", data.q2],
      ["¿Crees que la IA te quitará tu empleo?", data.q3]
    ].map(([q, a]) => `
      <article class="ia-card ia-response-card">
        <strong>${q}</strong>
        <p>${escapeHTML(a || "Sin respuesta")}</p>
      </article>
    `).join("");
  }

  function escapeHTML(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  root.querySelector("#savePerception").addEventListener("click", () => {
    const data = {
      q1: root.querySelector("#q1").value.trim(),
      q2: root.querySelector("#q2").value.trim(),
      q3: root.querySelector("#q3").value.trim()
    };

    if (!data.q1 || !data.q2 || !data.q3) {
      alert("Por favor, responde las tres preguntas antes de guardar.");
      return;
    }

    try { localStorage.setItem("iaTema01Percepcion", JSON.stringify(data)); } catch (_) {}
    form.style.display = "none";
    showPerceptionCards(data);
  });

  let saved = null;
  try { saved = localStorage.getItem("iaTema01Percepcion"); } catch (_) {}
  if (saved) {
    try {
      const data = JSON.parse(saved);
      form.style.display = "none";
      showPerceptionCards(data);
    } catch (_) {}
  }

  /* =========================================================
     5) EJEMPLOS DE IA
     ========================================================= */
  const examples = [
    {
      icon: "📈",
      title: "Proyección de ventas (forecast)",
      status: "IA",
      className: "ai",
      explanation: "Puede usar modelos estadísticos o de machine learning para aprender patrones y proyectar valores futuros."
    },
    {
      icon: "🎧",
      title: "Recomendaciones de Netflix, Spotify y RRSS",
      status: "IA",
      className: "ai",
      explanation: "Los sistemas de recomendación aprenden preferencias y patrones de usuarios para ordenar o sugerir contenido."
    },
    {
      icon: "🗺️",
      title: "Generación de rutas en Uber / Google Maps",
      status: "IA",
      className: "ai",
      explanation: "Puede combinar optimización, predicción de tráfico y aprendizaje automático para recomendar rutas."
    },
    {
      icon: "🔎",
      title: "Algoritmo de búsqueda de Google (PageRank)",
      status: "NO IA",
      className: "noai",
      explanation: "PageRank es principalmente un algoritmo matemático de ranking sobre enlaces; por sí solo no es un sistema de IA."
    },
    {
      icon: "🌐",
      title: "Google Translate (Google Traductor)",
      status: "NO SIEMPRE",
      className: "depende",
      explanation: "Google Translate pasó a incorporar traducción automática neuronal a partir de 2016; antes utilizaba principalmente traducción automática estadística."
    },
    {
      icon: "🙂",
      title: "Análisis de sentimientos",
      status: "IA",
      className: "ai",
      explanation: "Clasifica o estima emociones/opiniones a partir de texto usando técnicas de procesamiento de lenguaje natural."
    },
    {
      icon: "🧊",
      title: "Generación de modelos 3D",
      status: "NO IA",
      className: "noai",
      explanation: "El modelado 3D puede realizarse completamente con técnicas tradicionales; algunas herramientas actuales sí incorporan IA."
    },
    {
      icon: "🎮",
      title: "Creación de videojuegos",
      status: "DEPENDE",
      className: "depende",
      explanation: "Un videojuego no requiere IA, aunque puede integrarla en NPCs, generación de contenido, testing, animación o diseño."
    }
  ];

  const examplesGrid = root.querySelector("#examplesGrid");
  examplesGrid.innerHTML = examples.map(item => `
    <div class="ia-mini-flip" tabindex="0" role="button" aria-label="Revelar respuesta">
      <div class="ia-mini-inner">
        <div class="ia-mini-face ia-mini-front">
          <div>
            <span class="icon">${item.icon}</span>
            <strong>${item.title}</strong>
          </div>
        </div>
        <div class="ia-mini-face ia-mini-back">
          <div>
            <div class="status ${item.className}">${item.status}</div>
            <small>${item.explanation}</small>
          </div>
        </div>
      </div>
    </div>
  `).join("");

  examplesGrid.querySelectorAll(".ia-mini-flip").forEach(card => {
    const toggle = () => card.classList.toggle("is-flipped");
    card.addEventListener("click", toggle);
    card.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle();
      }
    });
  });



  /* =========================================================
     6) CUESTIONARIO · formato y funcionamiento del Tema 0.2
     ========================================================= */
  const iaQuiz = [
    {
      type:'Opción múltiple · una respuesta',
      q:'¿Cuál de las siguientes opciones describe mejor, de forma general, qué es la IA?',
      options:[
        'Un programa que necesariamente piensa y siente como una persona.',
        'Sistemas capaces de encontrar patrones, aprender de ejemplos y producir resultados útiles sin programar cada decisión posible.',
        'Cualquier software que ejecute instrucciones automáticamente.',
        'Únicamente los robots con apariencia humana.'
      ],
      answer:[1],
      why:'La definición más amplia del tema se centra en patrones, ejemplos y generación de resultados, no en conciencia ni apariencia humana.'
    },
    {
      type:'Verdadero o falso',
      q:'Una IA que responde de forma empática necesariamente siente emociones y posee conciencia moral.',
      options:['Verdadero','Falso'],
      answer:[1],
      why:'Que un sistema reconozca o simule emociones no implica que las experimente ni que posea una brújula moral propia.'
    },
    {
      type:'Opción múltiple · varias respuestas',
      q:'¿Cuáles de estos ejemplos se clasificaron como IA dentro del tema?',
      options:['Proyección de ventas (forecast)','Recomendaciones de Netflix, Spotify y redes sociales','PageRank por sí solo','Análisis de sentimientos'],
      answer:[0,1,3],
      multi:true,
      why:'Forecast, sistemas de recomendación y análisis de sentimientos aparecen como ejemplos de IA; PageRank por sí solo se presenta como un algoritmo matemático de ranking.'
    },
    {
      type:'Opción múltiple · una respuesta',
      q:'¿Por qué se hace una mención especial a Ex Machina dentro del imaginario colectivo sobre IA?',
      options:[
        'Porque demuestra exactamente cómo será la IA del futuro.',
        'Porque es la primera película de la historia que menciona inteligencia artificial.',
        'Porque permite discutir de forma relativamente sobria temas como manipulación, confianza, antropomorfización y objetivos no alineados.',
        'Porque presenta a la IA únicamente como una herramienta de automatización industrial.'
      ],
      answer:[2],
      why:'La recomendación se relaciona con los dilemas de interacción humano–máquina y con una representación menos fantástica de ciertos riesgos y percepciones.'
    },
    {
      type:'Opción múltiple · varias respuestas',
      q:'¿Qué afirmaciones ayudan a evitar mitos o simplificaciones sobre la IA?',
      options:[
        'Un sistema puede generar texto, imágenes, audio o video convincente sin que eso demuestre conciencia.',
        'Google Translate no ha usado siempre IA: el cambio clave hacia traducción neuronal ocurrió a partir de 2016.',
        'No todo algoritmo o software automático debe clasificarse automáticamente como IA.',
        'Si una IA reconoce emociones, entonces necesariamente las siente.'
      ],
      answer:[0,1,2],
      multi:true,
      why:'La actividad distingue entre apariencia de inteligencia, uso histórico de técnicas de IA y algoritmos convencionales. Simular o reconocer emociones no equivale a sentirlas.'
    }
  ];

  let iaQi = 0;
  const iaQuizState = iaQuiz.map(() => ({selected:[], checked:false, correct:false}));
  const iaQuizQ = root.querySelector('#iaQuizQuestion');
  const iaQuizO = root.querySelector('#iaQuizOptions');
  const iaQuizF = root.querySelector('#iaQuizFeedback');
  const iaQuizType = root.querySelector('#iaQuizType');
  const iaQuizCounter = root.querySelector('#iaQuizCounter');
  const iaQuizPrev = root.querySelector('#iaQuizPrev');
  const iaQuizNext = root.querySelector('#iaQuizNext');
  const iaScore = root.querySelector('#iaScore');
  const iaScoreOrb = root.querySelector('#iaScoreOrb');
  const iaMini = root.querySelector('#iaMiniProgress');

  function iaEqSet(a,b){
    const x=[...a].sort((m,n)=>m-n), y=[...b].sort((m,n)=>m-n);
    return x.length===y.length && x.every((v,i)=>v===y[i]);
  }
  function renderIaQuiz(){
    const item=iaQuiz[iaQi], state=iaQuizState[iaQi];
    iaQuizType.textContent=item.type;
    iaQuizCounter.textContent=`Pregunta ${iaQi+1} de ${iaQuiz.length}`;
    iaQuizQ.textContent=item.q;
    iaQuizF.className='seg02-result'+(state.checked?' show':'');
    iaQuizF.textContent=state.checked ? (state.correct?'✓ Correcto. ':'✦ Revisa esta idea. ')+item.why : '';
    iaQuizO.innerHTML=item.options.map((op,i)=>{
      let cls='seg02-option';
      if(state.checked && item.answer.includes(i)) cls+=' is-correct';
      else if(state.checked && state.selected.includes(i) && !item.answer.includes(i)) cls+=' is-wrong';
      return `<label class="${cls}">
        <input type="${item.multi?'checkbox':'radio'}" name="iaQuizChoice" value="${i}" ${state.selected.includes(i)?'checked':''} ${state.checked?'disabled':''}>
        <span>${op}</span>
      </label>`;
    }).join('');
    iaQuizO.querySelectorAll('input').forEach(inp=>inp.addEventListener('change',()=>{
      const value=Number(inp.value);
      if(item.multi){
        const set=new Set(state.selected);
        inp.checked?set.add(value):set.delete(value);
        state.selected=[...set];
      }else state.selected=[value];
    }));
    iaQuizPrev.disabled=iaQi===0;
    iaQuizNext.textContent=state.checked ? (iaQi===iaQuiz.length-1?'Reiniciar quiz':'Siguiente →') : 'Comprobar';
    renderIaQuizSide();
  }
  function renderIaQuizSide(){
    const score=iaQuizState.filter(s=>s.checked&&s.correct).length;
    iaScore.textContent=score;
    const degrees=(score/iaQuiz.length)*360;
    iaScoreOrb.style.background=`conic-gradient(#26cdbc ${degrees}deg,#173536 ${degrees}deg)`;
    iaMini.innerHTML=iaQuizState.map(s=>`<span class="seg02-mini-step ${s.checked?'done':''}"></span>`).join('');
  }
  iaQuizNext.addEventListener('click',()=>{
    const item=iaQuiz[iaQi], state=iaQuizState[iaQi];
    if(!state.checked){
      if(state.selected.length===0){
        iaQuizF.className='seg02-result show';
        iaQuizF.textContent='Selecciona al menos una respuesta antes de comprobar.';
        return;
      }
      state.correct=iaEqSet(state.selected,item.answer);
      state.checked=true;
      renderIaQuiz();
      return;
    }
    if(iaQi===iaQuiz.length-1){
      iaQuizState.forEach(s=>{s.selected=[];s.checked=false;s.correct=false});
      iaQi=0;renderIaQuiz();return;
    }
    iaQi++;renderIaQuiz();
  });
  iaQuizPrev.addEventListener('click',()=>{if(iaQi>0){iaQi--;renderIaQuiz()}});
  renderIaQuiz();

  /* Inicio */
  renderSlide(false);
  renderImagePair();
  renderVideoPair();
})();
