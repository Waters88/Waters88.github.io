const courseData = [
      {
        unit: "Unidad 0",
        title: "Alfabetización inicial: ¿qué entendemos por IA?",
        icon: "fa-brain",
        topics: [
          {
            title: "Concepto, percepción y mitos de la IA",
            description: "Explora qué entendemos por IA, cómo la percibimos, qué mitos la rodean y cuáles son sus capacidades y limitaciones actuales.",
            progress: 15,
            segmentOpen: "openTema01Segment",
            cards: [
              { label: "Subtema 1", title: "Contenido generado por IA", text: "Texto, imágenes, videos, audio, documentos y código: observa ejemplos y distingue contenido generado con IA.", bullets: ["Texto e imágenes", "Video y audio", "Documentos y código"], slideIndex: 0 },
              { label: "Subtema 2", title: "Percepción social de la IA", text: "Reflexiona sobre qué es la IA para ti, si consideras que piensa y cómo imaginas su impacto en el empleo.", bullets: ["Percepción personal", "¿La IA piensa?", "Impacto laboral"], slideIndex: 1 },
              { label: "Subtema 3", title: "Concepto general de IA", text: "Compara distintas definiciones y construye una idea práctica de lo que llamamos inteligencia artificial.", bullets: ["Definiciones clave", "Patrones y aprendizaje", "Agentes y resultados"], slideIndex: 2 },
              { label: "Subtema 4", title: "IA en el imaginario colectivo", text: "Contrasta la IA real con la representación de películas, historias y expectativas culturales.", bullets: ["Ciencia ficción", "Antropomorfización", "Ex Machina"], slideIndex: 3 },
              { label: "Subtema 5", title: "Limitaciones iniciales", text: "Identifica qué puede hacer la IA, qué no implica necesariamente inteligencia y dónde suelen aparecer simplificaciones.", bullets: ["Capacidades reales", "Algoritmo vs IA", "Google Translate desde 2016"], slideIndex: 4 },
              { label: "Quiz", title: "Cuestionario", text: "Comprueba los conceptos principales con cinco preguntas y retroalimentación inmediata.", bullets: ["Opción única", "Selección múltiple", "Verdadero o falso"], slideIndex: 5 }
            ]
          },
          {
            title: "Historia, ejemplos y panorama general",
            description: "Recorre la evolución de la IA, identifica usos cotidianos, compara herramientas y empresas, y revisa casos relevantes en industria, educación y ciencia.",
            progress: 30,
            segmentOpen: "openTema02Segment",
            cards: [
              { label: "Subtema 1", title: "Evolución histórica", text: "Una línea de tiempo vertical e interactiva recorre los hitos, personajes y cambios tecnológicos que marcaron la historia de la IA.", bullets: ["Hitos y personajes", "Modelos y arquitecturas", "Historia hacia 2026"], slideIndex: 0 },
              { label: "Subtema 2", title: "Ejemplos cotidianos", text: "Registra cómo utilizas la IA, qué herramientas conoces y qué empresas identificas en el ecosistema actual.", bullets: ["Usos diarios", "Herramientas", "Empresas"], slideIndex: 1 },
              { label: "Subtema 3", title: "Principales herramientas y empresas de IA", text: "Compara capacidades y complementos de las principales plataformas y actores de IA.", bullets: ["Matriz de capacidades", "Matriz de complementos", "Plataformas"], slideIndex: 2 },
              { label: "Subtema 4", title: "Casos relevantes", text: "Explora casos de éxito representativos de la IA en industria, educación y ciencia.", bullets: ["Industria", "Educación", "Ciencia"], slideIndex: 3 },
              { label: "Quiz", title: "Cuestionario", text: "Evalúa lo aprendido con cinco preguntas interactivas de distintos formatos.", bullets: ["Historia", "Herramientas y empresas", "Casos de éxito"], slideIndex: 4 }
            ]
          }
        ]
      },
      {
        unit: "Unidad 1",
        title: "Taxonomía de la IA: tipos, enfoques y origen",
        icon: "fa-diagram-project",
        topics: [
          {
            title: "Clasificación por nivel de autonomía",
            description: "Distingue IA predictiva, prescriptiva y agéntica mediante definiciones, diagramas, gráficas y un simulador de agente.",
            progress: 42,
            segmentOpen: "openTema11Segment",
            cards: [
              { label: "Subtema 1", title: "IA predictiva", text: "Modelos que analizan datos históricos para identificar patrones y pronosticar resultados probables.", bullets: ["Machine Learning", "Supervisado", "No supervisado"], slideIndex: 0 },
              { label: "Subtema 2", title: "IA prescriptiva", text: "Modelos que combinan predicción, objetivos y restricciones para sugerir acciones que optimizan un resultado.", bullets: ["Optimización", "Simulación", "Aprendizaje por refuerzo"], slideIndex: 1 },
              { label: "Subtema 3", title: "IA agéntica", text: "Sistemas orientados a objetivos capaces de planificar varios pasos, usar herramientas y observar resultados.", bullets: ["Agentes de IA", "Componentes", "Nuevo paradigma"], slideIndex: 2 },
              { label: "Quiz", title: "Cuestionario", text: "Comprueba los conceptos principales con cinco preguntas y retroalimentación inmediata.", bullets: ["Opción única", "Selección múltiple", "Verdadero o falso"], slideIndex: 3 }
            ]
          },
          {
            title: "Clasificación por objetivo",
            description: "Compara IA discriminativa, sistemas basados en reglas e IA generativa, incluyendo aprendizaje supervisado/no supervisado y LLM.",
            progress: 52,
            segmentOpen: "openTema12Segment",
            cards: [
              { label: "Subtema 1", title: "IA discriminativa", text: "Modelos que distinguen, clasifican o etiquetan datos existentes y relaciones entre ellos.", bullets: ["Machine Learning", "Supervisado", "No supervisado"], slideIndex: 0 },
              { label: "Subtema 2", title: "IA basada en reglas", text: "Sistemas que ejecutan lógica humana preprogramada del tipo si X, entonces Y.", bullets: ["Lógica", "Reglas", "Toma de decisiones"], slideIndex: 1 },
              { label: "Subtema 3", title: "IA generativa (GenIA)", text: "Modelos entrenados para producir contenido nuevo a partir de patrones aprendidos y contexto.", bullets: ["GenIA", "LLM", "Prompt"], slideIndex: 2 },
              { label: "Quiz", title: "Cuestionario", text: "Comprueba los conceptos principales con cinco preguntas y retroalimentación inmediata.", bullets: ["Opción única", "Selección múltiple", "Verdadero o falso"], slideIndex: 3 }
            ]
          },
          {
            title: "Clasificación por nivel de capacidad",
            description: "Explora IA débil/fuerte y la escala ANI, AGI y ASI, distinguiendo capacidades actuales de categorías hipotéticas.",
            progress: 62,
            segmentOpen: "openTema13Segment",
            cards: [
              { label: "Subtema 1", title: "IA débil", text: "Sistemas diseñados para tareas específicas y acotadas.", bullets: ["Débil", "Acotada", "Actualidad"], slideIndex: 0 },
              { label: "Subtema 2", title: "IA fuerte", text: "Concepto teórico de una IA con capacidades cognitivas generales comparables a las humanas.", bullets: ["Fuerte", "Razonamiento", "Futuro"], slideIndex: 1 },
              { label: "Subtema 3", title: "ANI · IA Estrecha", text: "IA especializada en tareas o dominios delimitados, como traducción, voz o lenguaje.", bullets: ["Traductores", "Asistentes de voz", "LLM"], slideIndex: 2 },
              { label: "Subtema 4", title: "AGI · IA General", text: "Hipótesis de una IA capaz de aprender y transferir habilidades en una amplia variedad de tareas intelectuales.", bullets: ["General", "Humana", "Hipotética"], slideIndex: 3 },
              { label: "Subtema 5", title: "ASI · Superinteligencia", text: "Concepto teórico de una inteligencia que superaría ampliamente las capacidades humanas generales.", bullets: ["Superinteligencia", "Automejora", "Teoría"], slideIndex: 4 },
              { label: "Quiz", title: "Cuestionario", text: "Comprueba los conceptos principales con cinco preguntas y retroalimentación inmediata.", bullets: ["ANI", "AGI", "ASI"], slideIndex: 5 }
            ]
          },
          {
            title: "¿Qué disciplinas dan vida a la Inteligencia Artificial?",
            description: "Relaciona Humanidades, Ciencias Biológicas, Ciencias Exactas e Ingenierías con la construcción y comprensión de la IA.",
            progress: 72,
            segmentOpen: "openTema14Segment",
            cards: [
              { label: "Subtema 1", title: "Disciplinas que construyen la IA", text: "Mapa de las principales disciplinas que aportan ideas, métodos y tecnología a la IA.", bullets: ["Ciencias", "Humanidades", "Conocimiento"], slideIndex: 0 },
              { label: "Subtema 2", title: "Humanidades y Ciencias Biológicas", text: "Aportes de filosofía, psicologías, lingüística, biología y neurociencia.", bullets: ["Filosofía", "Biología", "Psicología"], slideIndex: 1 },
              { label: "Subtema 3", title: "Ciencias Exactas e Ingeniería", text: "Aportes de matemáticas, teoría de juegos, computación, datos, cibernética y robótica.", bullets: ["Matemáticas", "Computación", "Robótica"], slideIndex: 2 },
              { label: "Quiz", title: "Cuestionario", text: "Comprueba los conceptos principales con cinco preguntas y retroalimentación inmediata.", bullets: ["Opción única", "Selección múltiple", "Verdadero o falso"], slideIndex: 3 }
            ]
          }
        ]
      }
      ,{
        unit: "Unidad 2",
        title: "Machine Learning y Deep Learning",
        icon: "fa-network-wired",
        topics: [
          {
            title: "Fundamentos de aprendizaje automático",
            description: "Comprende qué es Machine Learning, sus principales tipos de aprendizaje y el flujo básico desde los datos hasta el despliegue.",
            progress: 80,
            segmentOpen: "openTema21Segment",
            cards: [
              { label: "Subtema 1", title: "Definición de ML", text: "Permite a las computadoras aprender de los datos y tomar decisiones sin necesidad de ser programadas explícitamente para cada tarea.", bullets: ["Machine Learning", "Big Data", "Data Science"], slideIndex: 0 },
              { label: "Subtema 2", title: "Tipos de aprendizaje", text: "Supervisado, no supervisado, semisupervisado y por refuerzo: cuatro paradigmas para aprender de datos y experiencia.", bullets: ["Supervisado y NO Supervisado", "Semisupervisado", "Por Refuerzo"], slideIndex: 1 },
              { label: "Subtema 3", title: "Flujo básico de ML", text: "Proceso secuencial desde la definición del problema y los datos hasta el despliegue y monitoreo del modelo.", bullets: ["Input / Output", "Modelo", "Parámetro"], slideIndex: 2 },
              { label: "Quiz", title: "Cuestionario", text: "Comprueba los conceptos principales con cinco preguntas y retroalimentación inmediata.", bullets: ["Opción única", "Selección múltiple", "Verdadero o falso"], slideIndex: 3 }
            ]
          },
          {
            title: "Aprendizaje supervisado",
            description: "Explora regresión, clasificación y las métricas esenciales para medir el desempeño de modelos supervisados.",
            progress: 90,
            segmentOpen: "openTema22Segment",
            cards: [
              { label: "Subtema 1", title: "Regresión", text: "Predice un valor numérico continuo a partir de variables de entrada.", bullets: ["Regresión Lineal, No Lineal y Polinómica", "Árboles y Bosques", "SVR"], slideIndex: 0 },
              { label: "Subtema 2", title: "Clasificación", text: "Predice una etiqueta, categoría o clase específica de forma automática.", bullets: ["Regresión Logística", "KNN", "SVM y Naive Bayes"], slideIndex: 1 },
              { label: "Subtema 3", title: "Evaluación de desempeño", text: "Selecciona métricas de regresión o clasificación según el tipo de error y objetivo del problema.", bullets: ["MAE, MSE, RMSE, MAPE, R²", "Matriz de confusión", "Precision, Recall, F1, ROC-AUC"], slideIndex: 2 },
              { label: "Quiz", title: "Cuestionario", text: "Comprueba los conceptos principales con cinco preguntas y retroalimentación inmediata.", bullets: ["Opción única", "Selección múltiple", "Verdadero o falso"], slideIndex: 3 }
            ]
          },
          {
            title: "Aprendizaje NO supervisado",
            description: "Aprende a descubrir grupos, asociaciones y representaciones compactas cuando no existe una etiqueta objetivo explícita.",
            progress: 100,
            segmentOpen: "openTema23Segment",
            cards: [
              { label: "Subtema 1", title: "Agrupamiento (Clustering)", text: "Junta los datos en grupos según su parecido y permite descubrir segmentos ocultos.", bullets: ["K-Means", "DBSCAN", "Jerárquico", "GMM"], slideIndex: 0 },
              { label: "Subtema 2", title: "Reglas de asociación", text: "Encuentra reglas para saber qué elementos ocurren juntos con frecuencia.", bullets: ["Apriori", "FP-Growth", "ECLAT"], slideIndex: 1 },
              { label: "Subtema 3", title: "Reducción de dimensionalidad", text: "Simplifica datos con muchas variables intentando conservar su información clave.", bullets: ["PCA", "t-SNE", "UMAP", "Autoencoders"], slideIndex: 2 },
              { label: "Subtema 4", title: "Evaluación de desempeño", text: "Evalúa clustering, reglas de asociación y reducción de dimensionalidad con métricas específicas.", bullets: ["Silhouette Score", "Support / Lift", "Explained Variance"], slideIndex: 3 },
              { label: "Quiz", title: "Cuestionario", text: "Comprueba los conceptos principales con cinco preguntas y retroalimentación inmediata.", bullets: ["Opción única", "Selección múltiple", "Verdadero o falso"], slideIndex: 4 }
            ]
          }
        ]
      }
      // Para futuras unidades: agrega otro objeto con topics que definan `segmentOpen`
      // y, en cada tarjeta, `slideIndex`. No se requiere reactivar contenido genérico.
    ];

    const $ = (selector) => document.querySelector(selector);
    const $$ = (selector) => document.querySelectorAll(selector);

    const unitsMenu = $("#unitsMenu");
    const syllabusList = $("#syllabusList");
    const hero = $("#hero");
    const heroUnit = $("#heroUnit");
    const heroTheme = $("#heroTheme");
    const heroTopic = $("#heroTopic");
    const heroDescription = $("#heroDescription");
    const courseSectionTitle = $("#courseSectionTitle");
    const courseSectionDescription = $("#courseSectionDescription");
    const currentLessonName = $("#currentLessonName");
    const currentLessonMeta = $("#currentLessonMeta");
    const progressFill = $("#progressFill");
    const progressPercent = $("#progressPercent");
    const carouselTitle = $("#carouselTitle");
    const carouselSubtitle = $("#carouselSubtitle");
    const lessonCarousel = $("#lessonCarousel");
    const startTopicButton = $("#startTopicButton");
    const toast = $("#toast");

    let selectedUnitIndex = 0;
    let selectedTopicIndex = 0;
    let currentSection = "home";

    function init() {
      renderLeftMenu();
      renderSyllabus();
      selectTopic(0, 0, false);
      bindEvents();
      updateHeroVisibility();
      updateSidebarControl();
    }

    function renderLeftMenu() {
      unitsMenu.innerHTML = courseData.map((unit, unitIndex) => `
        <div class="unit ${unitIndex === 0 ? "open" : ""}">
          <button class="unit-button" data-unit-toggle="${unitIndex}">
            <span class="unit-icon"><i class="fa-solid ${unit.icon}"></i></span>
            <span class="unit-name">
              <strong>${unit.unit}</strong>
              <small>${unit.title}</small>
            </span>
            <i class="fa-solid fa-chevron-down"></i>
          </button>

          <div class="topics">
            <div class="topics-inner">
              ${unit.topics.map((topic, topicIndex) => `
                <button class="topic-link ${unitIndex === 0 && topicIndex === 0 ? "active" : ""}"
                  data-unit="${unitIndex}"
                  data-topic="${topicIndex}">
                  <span class="unit-bullet"><i class="fa-solid fa-circle-dot"></i></span>
                  <span>${topic.title}</span>
                </button>
              `).join("")}
            </div>
          </div>
        </div>
      `).join("");
    }

    function renderSyllabus() {
      syllabusList.innerHTML = courseData.map((unit, unitIndex) => {
        const tags = [...new Set(
          unit.topics.flatMap(topic =>
            (topic.cards || []).flatMap(card => card.bullets || [])
          )
        )].slice(0, 7);

        const topicLabel = `${unit.topics.length} ${unit.topics.length === 1 ? "tema" : "temas"}`;

        return `
          <article class="syllabus-module ${unitIndex === 0 ? "open" : ""}">
            <button
              class="syllabus-module-header"
              type="button"
              data-syllabus-toggle="${unitIndex}"
              aria-expanded="${unitIndex === 0 ? "true" : "false"}"
              aria-controls="syllabus-module-${unitIndex}"
            >
              <span class="syllabus-module-icon">
                <i class="fa-solid ${unit.icon}"></i>
              </span>

              <span class="syllabus-module-copy">
                <h3>${unit.unit}: ${unit.title}</h3>
                <p>${topicLabel} · Explora el contenido y abre cada tema directamente en el curso.</p>
              </span>

              <span class="syllabus-module-actions">
                <span class="syllabus-count"><i class="fa-solid fa-layer-group"></i>${topicLabel}</span>
                <span class="syllabus-chevron"><i class="fa-solid fa-chevron-down"></i></span>
              </span>
            </button>

            <div class="syllabus-module-content" id="syllabus-module-${unitIndex}">
              <div class="syllabus-module-inner">
                <div class="syllabus-module-body">
                  <div class="syllabus-divider"></div>

                  <div class="syllabus-content-heading">
                    <strong><i class="fa-solid fa-list-check"></i> Contenido de la unidad</strong>
                    <span>Selecciona un tema para ir a su contenido interactivo</span>
                  </div>

                  <div class="syllabus-topic-list">
                    ${unit.topics.map((topic, topicIndex) => `
                      <div class="syllabus-topic-row">
                        <span class="syllabus-topic-number">${String(topicIndex + 1).padStart(2, "0")}</span>
                        <div class="syllabus-topic-copy">
                          <strong>${topic.title}</strong>
                          <p>${topic.description}</p>
                        </div>
                        <button
                          class="syllabus-topic-open"
                          type="button"
                          data-syllabus-unit="${unitIndex}"
                          data-syllabus-topic="${topicIndex}"
                          aria-label="Abrir ${topic.title} en la sección Curso"
                        >
                          Ver tema <i class="fa-solid fa-arrow-right"></i>
                        </button>
                      </div>
                    `).join("")}
                  </div>

                  ${tags.length ? `
                    <div class="syllabus-tags" aria-label="Conceptos relacionados">
                      ${tags.map(tag => `
                        <span class="syllabus-tag"><i class="fa-solid fa-circle"></i>${tag}</span>
                      `).join("")}
                    </div>
                  ` : ""}
                </div>
              </div>
            </div>
          </article>
        `;
      }).join("");
    }

    function bindEvents() {
      unitsMenu.addEventListener("click", (event) => {
        const toggle = event.target.closest("[data-unit-toggle]");
        const topicButton = event.target.closest("[data-unit]");

        if (toggle) {
          const unitElement = toggle.closest(".unit");
          const unitIndex = Number(toggle.dataset.unitToggle);
          const isDesktop = !window.matchMedia("(max-width: 980px)").matches;

          // En escritorio, si el panel está contraído, al tocar una unidad
          // se expande la vista completa y se muestran sus temas.
          if (isDesktop && document.body.classList.contains("sidebar-collapsed")) {
            document.body.classList.remove("sidebar-collapsed");
            $$(".unit").forEach((item, index) => {
              item.classList.toggle("open", index === unitIndex);
            });
            updateSidebarControl();
            return;
          }

          unitElement.classList.toggle("open");
        }

        if (topicButton) {
          const unitIndex = Number(topicButton.dataset.unit);
          const topicIndex = Number(topicButton.dataset.topic);
          selectTopic(unitIndex, topicIndex, true);
          setSection("curso");
          document.body.classList.remove("mobile-sidebar-open");
        }
      });

      syllabusList.addEventListener("click", (event) => {
        const moduleToggle = event.target.closest("[data-syllabus-toggle]");
        const topicButton = event.target.closest("[data-syllabus-unit][data-syllabus-topic]");

        if (moduleToggle) {
          const unitIndex = Number(moduleToggle.dataset.syllabusToggle);
          const selectedModule = moduleToggle.closest(".syllabus-module");
          const shouldOpen = !selectedModule.classList.contains("open");

          $$(".syllabus-module").forEach((module, index) => {
            const isOpen = index === unitIndex && shouldOpen;
            module.classList.toggle("open", isOpen);
            const header = module.querySelector("[data-syllabus-toggle]");
            if (header) header.setAttribute("aria-expanded", String(isOpen));
          });
        }

        if (topicButton) {
          const unitIndex = Number(topicButton.dataset.syllabusUnit);
          const topicIndex = Number(topicButton.dataset.syllabusTopic);
          selectTopic(unitIndex, topicIndex, true);
          setSection("curso");
        }
      });

      $$(".nav-pill").forEach((button) => {
        button.addEventListener("click", () => setSection(button.dataset.section));
      });

      $("#collapseSidebar").addEventListener("click", () => {
        if (window.matchMedia("(max-width: 980px)").matches) {
          document.body.classList.remove("mobile-sidebar-open");
        } else {
          document.body.classList.toggle("sidebar-collapsed");
        }
        updateSidebarControl();
      });

      $("#mobileMenuButton").addEventListener("click", () => {
        document.body.classList.remove("sidebar-collapsed");
        document.body.classList.toggle("mobile-sidebar-open");
        updateSidebarControl();
      });

      window.addEventListener("resize", updateSidebarControl);

      $("#themeToggle").addEventListener("click", () => {
        const html = document.documentElement;
        const nextTheme = html.dataset.theme === "dark" ? "light" : "dark";
        html.dataset.theme = nextTheme;

        $("#themeToggle span").innerHTML = nextTheme === "dark"
          ? '<i class="fa-solid fa-moon"></i>'
          : '<i class="fa-solid fa-sun"></i>';
      });

      $("#prevCard").addEventListener("click", () => {
        lessonCarousel.scrollBy({ left: -340, behavior: "smooth" });
      });

      $("#nextCard").addEventListener("click", () => {
        lessonCarousel.scrollBy({ left: 340, behavior: "smooth" });
      });
      startTopicButton.addEventListener("click", () => openSelectedTopicSegment(0));

      lessonCarousel.addEventListener("click", (event) => {
        const openButton = event.target.closest("[data-topic-slide]");
        if (!openButton) return;
        openSelectedTopicSegment(Number(openButton.dataset.topicSlide));
      });

      $("#enrollButton").addEventListener("click", showToast);
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          document.body.classList.remove("mobile-sidebar-open");
          updateSidebarControl();
        }
      });
    }

    function updateSidebarControl() {
      const icon = $("#collapseIcon");
      const button = $("#collapseSidebar");

      if (!icon || !button) return;

      const isMobile = window.matchMedia("(max-width: 980px)").matches;
      const isCollapsed = document.body.classList.contains("sidebar-collapsed");

      if (isMobile) {
        icon.className = "fa-solid fa-xmark";
        button.title = "Cerrar menú lateral";
        button.setAttribute("aria-label", "Cerrar menú lateral");
      } else {
        icon.className = isCollapsed ? "fa-solid fa-angles-right" : "fa-solid fa-angles-left";
        button.title = isCollapsed ? "Expandir unidades y temas" : "Contraer a sólo unidades";
        button.setAttribute("aria-label", button.title);
      }
    }

    function setSection(sectionName) {
      currentSection = sectionName;

      $$(".nav-pill").forEach((button) => {
        button.classList.toggle("active", button.dataset.section === sectionName);
      });

      $$(".section").forEach((section) => {
        section.classList.toggle("active", section.id === `section-${sectionName}`);
      });

      updateHeroVisibility();

      if (sectionName === "curso") {
        hero.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }

    window.openCourseSection = setSection;

    // API pública mínima para componentes externos del curso (p. ej. Glosario).
    // Resuelve títulos de unidad/tema/tarjeta y abre directamente el slide asociado.
    function normalizeCourseTitle(value) {
      return String(value ?? "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, " ")
        .trim();
    }

    function courseTitleMatches(actual, requested) {
      const a = normalizeCourseTitle(actual);
      const b = normalizeCourseTitle(requested);
      return Boolean(a && b && (a === b || a.includes(b) || b.includes(a)));
    }

    function resolveCourseRelation(relation = {}) {
      const requestedUnit = relation.unit_title ?? relation.unitTitle ?? relation.unit;
      const requestedTopic = relation.topic_title ?? relation.topicTitle ?? relation.topic;
      const requestedCard = relation.cards_title ?? relation.card_title ?? relation.cardTitle ?? relation.card;

      const unitIndex = courseData.findIndex((unit) =>
        courseTitleMatches(unit.title, requestedUnit) || courseTitleMatches(unit.unit, requestedUnit)
      );
      if (unitIndex < 0) return null;

      const topicIndex = courseData[unitIndex].topics.findIndex((topic) =>
        courseTitleMatches(topic.title, requestedTopic)
      );
      if (topicIndex < 0) return null;

      const topic = courseData[unitIndex].topics[topicIndex];
      const cardIndex = topic.cards.findIndex((card) => courseTitleMatches(card.title, requestedCard));
      if (cardIndex < 0) return null;

      const card = topic.cards[cardIndex];
      return {
        unitIndex,
        topicIndex,
        cardIndex,
        slideIndex: Number.isFinite(Number(card.slideIndex)) ? Number(card.slideIndex) : cardIndex,
        unit: courseData[unitIndex],
        topic,
        card
      };
    }

    function openCourseRelation(relation = {}) {
      const resolved = resolveCourseRelation(relation);
      if (!resolved) return false;

      selectTopic(resolved.unitIndex, resolved.topicIndex, true);
      setSection("curso");
      document.body.classList.remove("mobile-sidebar-open");

      const opener = window[resolved.topic.segmentOpen];
      if (typeof opener !== "function") return false;
      opener(resolved.slideIndex);
      return true;
    }

    window.CourseData = courseData;
    window.resolveCourseRelation = resolveCourseRelation;
    window.openCourseRelation = openCourseRelation;

    function updateHeroVisibility() {
      hero.classList.toggle("show", currentSection === "curso");
    }

    function selectTopic(unitIndex, topicIndex, shouldOpenUnit) {
      selectedUnitIndex = unitIndex;
      selectedTopicIndex = topicIndex;

      const unit = courseData[unitIndex];
      const topic = unit.topics[topicIndex];

      if (shouldOpenUnit) {
        $$(".unit").forEach((unitElement, index) => {
          if (index === unitIndex) unitElement.classList.add("open");
        });
      }

      $$(".topic-link").forEach((button) => {
        const isActive = Number(button.dataset.unit) === unitIndex && Number(button.dataset.topic) === topicIndex;
        button.classList.toggle("active", isActive);
      });

      heroUnit.textContent = `${unit.unit} · ${unit.title}`;
      const splitTitle = topic.title.split(" ");
      heroTheme.textContent = splitTitle.slice(0, Math.ceil(splitTitle.length / 2)).join(" ");
      heroTopic.textContent = splitTitle.slice(Math.ceil(splitTitle.length / 2)).join(" ") || "IA";
      heroDescription.textContent = topic.description;

      currentLessonName.textContent = `${unit.unit} · Tema ${topicIndex + 1}`;
      currentLessonMeta.textContent = topic.title;
      courseSectionTitle.textContent = topic.title;
      courseSectionDescription.textContent = topic.description;
      carouselTitle.textContent = `${topic.title}`;
      carouselSubtitle.textContent = `${unit.unit}: ${unit.title}`;

      progressFill.style.width = `${topic.progress}%`;
      progressPercent.textContent = `${topic.progress}%`;
      startTopicButton.disabled = !topic.segmentOpen || typeof window[topic.segmentOpen] !== "function";
      startTopicButton.title = startTopicButton.disabled ? "Contenido pendiente" : `Abrir ${topic.title}`;

      renderLessonCards(topic.cards);
    }

    function renderLessonCards(cards) {
      lessonCarousel.innerHTML = cards.map((card, index) => `
        <article class="lesson-card">
          <div class="lesson-step">
            <i class="fa-solid fa-book-open-reader"></i>
            ${card.label}
          </div>
          <h4>${card.title}</h4>
          <p>${card.text}</p>

          <div class="mini-list">
            ${(card.bullets || []).map(item => `
              <span><i class="fa-solid fa-check"></i>${item}</span>
            `).join("")}
          </div>

          <button class="lesson-expand-button" type="button" data-topic-slide="${card.slideIndex ?? index}">
            <span class="expand-copy">
              <i class="fa-solid fa-layer-group"></i>
              Explorar subtema
            </span>
            <span class="expand-icon" aria-hidden="true">
              <i class="fa-solid fa-up-right-and-down-left-from-center"></i>
            </span>
          </button>
        </article>
      `).join("");

      lessonCarousel.scrollTo({ left: 0, behavior: "smooth" });
    }

    function openSelectedTopicSegment(slideIndex = 0) {
      const topic = courseData[selectedUnitIndex]?.topics?.[selectedTopicIndex];
      if (!topic?.segmentOpen) return;

      const opener = window[topic.segmentOpen];
      if (typeof opener === "function") {
        opener(Number.isFinite(Number(slideIndex)) ? Number(slideIndex) : 0);
      }
    }

    function initSnowfall() {
      const canvas = document.getElementById("snowCanvas");
      const toggle = document.getElementById("snowToggle");
      if (!canvas) return;

      const context = canvas.getContext("2d");
      if (!context) return;

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
      const storageKey = "courseSnowEnabled";
      let flakes = [];
      let width = 0;
      let height = 0;
      let animationFrame = null;
      let running = false;
      let snowEnabled = true;

      try {
        snowEnabled = localStorage.getItem(storageKey) !== "false";
      } catch (_) {
        snowEnabled = true;
      }

      const createFlake = (randomY = true) => ({
        x: Math.random() * width,
        y: randomY ? Math.random() * height : -12,
        radius: 0.75 + Math.random() * 2.10,
        speed: 0.28 + Math.random() * 0.68,
        drift: -0.12 + Math.random() * 0.24,
        sway: 0.50 + Math.random() * 1.00,
        phase: Math.random() * Math.PI * 2,
        opacity: 0.16 + Math.random() * 0.34
      });

      function clearSnow() {
        context.clearRect(0, 0, width, height);
      }

      function updateSnowToggle() {
        if (!toggle) return;
        toggle.classList.toggle("is-active", snowEnabled);
        toggle.setAttribute("aria-pressed", String(snowEnabled));
        toggle.setAttribute(
          "aria-label",
          snowEnabled ? "Desactivar animación de nieve" : "Activar animación de nieve"
        );
        toggle.title = snowEnabled ? "Desactivar nieve" : "Activar nieve";
        toggle.innerHTML = snowEnabled
          ? '<i class="fa-solid fa-snowflake" aria-hidden="true"></i>'
          : '<i class="fa-solid fa-snowflake" aria-hidden="true" style="opacity:.35"></i>';
      }

      function resizeSnowCanvas() {
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        context.setTransform(dpr, 0, 0, dpr, 0, 0);

        const density = reducedMotion.matches ? 18 : (width < 720 ? 54 : 86);
        flakes = Array.from({ length: density }, () => createFlake(true));
        if (snowEnabled) drawSnow(false);
        else clearSnow();
      }

      function drawSnow(update = true) {
        clearSnow();
        if (!snowEnabled) return;

        context.fillStyle = document.documentElement.dataset.theme === "light" ? "#8ea5b8" : "#ffffff";

        flakes.forEach((flake) => {
          if (update) {
            flake.y += flake.speed;
            flake.phase += 0.0105 * flake.sway;
            flake.x += flake.drift + Math.sin(flake.phase) * 0.14;

            if (flake.y > height + flake.radius) Object.assign(flake, createFlake(false));
            if (flake.x > width + flake.radius) flake.x = -flake.radius;
            if (flake.x < -flake.radius) flake.x = width + flake.radius;
          }

          context.globalAlpha = flake.opacity;
          context.beginPath();
          context.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
          context.fill();
        });

        context.globalAlpha = 1;
      }

      function animateSnow() {
        if (!running || !snowEnabled) return;
        drawSnow(true);
        animationFrame = requestAnimationFrame(animateSnow);
      }

      function startSnow() {
        if (!snowEnabled) {
          stopSnow();
          clearSnow();
          return;
        }
        if (running || reducedMotion.matches || document.hidden) {
          drawSnow(false);
          return;
        }
        running = true;
        animateSnow();
      }

      function stopSnow() {
        running = false;
        if (animationFrame) cancelAnimationFrame(animationFrame);
        animationFrame = null;
      }

      toggle?.addEventListener("click", () => {
        snowEnabled = !snowEnabled;
        try {
          localStorage.setItem(storageKey, String(snowEnabled));
        } catch (_) {
          // El control sigue funcionando aunque el navegador bloquee localStorage (por ejemplo, en file://).
        }
        updateSnowToggle();

        if (snowEnabled) {
          resizeSnowCanvas();
          startSnow();
        } else {
          stopSnow();
          clearSnow();
        }
      });

      window.addEventListener("resize", resizeSnowCanvas, { passive: true });
      document.addEventListener("visibilitychange", () => {
        if (document.hidden) stopSnow();
        else startSnow();
      });
      reducedMotion.addEventListener("change", () => {
        stopSnow();
        resizeSnowCanvas();
        startSnow();
      });

      updateSnowToggle();
      resizeSnowCanvas();
      startSnow();
    }
    function showToast() {
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 2600);
    }

    initSnowfall();
    init();
