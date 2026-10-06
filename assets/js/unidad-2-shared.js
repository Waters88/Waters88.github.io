(() => {
  const esc = (value) => String(value ?? "")
    .replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;").replaceAll("'", "&#039;");

  function createSegment(config) {
    const root = document.getElementById(config.rootId);
    if (!root) return null;
    const track = root.querySelector(".u2-track");
    const slides = [...root.querySelectorAll(".u2-slide")];
    const subtitle = root.querySelector(".u2-subtitle");
    const prev = root.querySelector(".u2-prev");
    const next = root.querySelector(".u2-next");
    const close = root.querySelector(".u2-close");
    const progress = root.querySelector(".u2-progress > span");
    const label = root.querySelector(".u2-progress-label");
    const dots = root.querySelector(".u2-dots");
    let index = 0;

    if (dots) dots.innerHTML = slides.map((_, i) => `<span class="u2-dot${i === 0 ? " is-active" : ""}" data-u2-dot="${i}"></span>`).join("");

    function render(resetScroll = true) {
      index = Math.max(0, Math.min(index, slides.length - 1));
      track.style.transform = `translateX(-${index * 100}%)`;
      if (subtitle) subtitle.textContent = slides[index]?.dataset.subtitle || `Sección ${index + 1}`;
      const pct = ((index + 1) / slides.length) * 100;
      if (progress) progress.style.width = `${pct}%`;
      if (label) label.textContent = `${index + 1} / ${slides.length}`;
      if (prev) prev.disabled = index === 0;
      if (next) next.disabled = index === slides.length - 1;
      root.querySelectorAll(".u2-dot").forEach((dot, i) => dot.classList.toggle("is-active", i === index));
      if (resetScroll) slides[index]?.scrollTo({ top: 0, behavior: "auto" });
      root.dispatchEvent(new CustomEvent("u2:slidechange", { detail: { index } }));
    }

    function open(slideIndex = 0) {
      index = Number.isFinite(Number(slideIndex)) ? Number(slideIndex) : 0;
      root.hidden = false;
      root.setAttribute("aria-hidden", "false");
      document.body.classList.add("topic-segment-open");
      render(false);
      requestAnimationFrame(() => close?.focus());
    }

    function hide() {
      root.hidden = true;
      root.setAttribute("aria-hidden", "true");
      document.body.classList.remove("topic-segment-open");
    }

    prev?.addEventListener("click", () => { if (index > 0) { index -= 1; render(); } });
    next?.addEventListener("click", () => { if (index < slides.length - 1) { index += 1; render(); } });
    close?.addEventListener("click", hide);
    dots?.addEventListener("click", (event) => {
      const dot = event.target.closest("[data-u2-dot]");
      if (!dot) return;
      index = Number(dot.dataset.u2Dot) || 0;
      render();
    });
    root.addEventListener("click", (event) => {
      const lab = event.target.closest("[data-u2-lab]");
      if (lab) {
        event.preventDefault();
        hide();
        if (typeof window.openCourseSection === "function") window.openCourseSection("laboratorio");
        return;
      }
      const ds = event.target.closest(".u2-ds-cta");
      if (ds) {
        ds.classList.remove("is-flash");
        void ds.offsetWidth;
        ds.classList.add("is-flash");
        const original = ds.dataset.originalText || ds.innerHTML;
        ds.dataset.originalText = original;
        ds.innerHTML = '<i class="fa-solid fa-graduation-cap"></i> Curso de Data Science · Próximamente';
        window.setTimeout(() => { ds.innerHTML = original; ds.classList.remove("is-flash"); }, 1600);
      }
    });
    document.addEventListener("keydown", (event) => {
      if (root.hidden) return;
      if (event.key === "Escape") hide();
      if (!["TEXTAREA","INPUT","SELECT"].includes(document.activeElement?.tagName)) {
        if (event.key === "ArrowLeft" && index > 0) { index -= 1; render(); }
        if (event.key === "ArrowRight" && index < slides.length - 1) { index += 1; render(); }
      }
    });
    render(false);
    return { root, open, close: hide, goTo(i) { index = i; render(); }, getIndex: () => index };
  }

  function createQuiz(root, questions) {
    if (!root || !questions?.length) return null;
    const qType = root.querySelector("[data-quiz-type]");
    const qCounter = root.querySelector("[data-quiz-counter]");
    const qText = root.querySelector("[data-quiz-question]");
    const optionsBox = root.querySelector("[data-quiz-options]");
    const feedback = root.querySelector("[data-quiz-feedback]");
    const prev = root.querySelector("[data-quiz-prev]");
    const next = root.querySelector("[data-quiz-next]");
    const score = root.querySelector("[data-quiz-score]");
    const orb = root.querySelector(".u2-score-orb");
    const mini = root.querySelector("[data-quiz-mini]");
    const state = questions.map(() => ({ values: [], checked: false, correct: false }));
    let index = 0;
    if (mini) mini.innerHTML = questions.map(() => '<span class="u2-mini-step"></span>').join("");
    const typeLabel = q => q.type === "multiple" ? "Selección múltiple" : q.type === "boolean" ? "Verdadero o falso" : "Opción múltiple";

    function render() {
      const q = questions[index], s = state[index];
      qType.textContent = typeLabel(q); qCounter.textContent = `Pregunta ${index + 1} de ${questions.length}`; qText.textContent = q.question;
      const inputType = q.type === "multiple" ? "checkbox" : "radio";
      optionsBox.innerHTML = q.options.map(opt => {
        const checked = s.values.includes(opt.value) ? " checked" : "";
        let cls = "u2-option";
        if (s.checked) {
          const isCorrectValue = q.correct.includes(opt.value), selected = s.values.includes(opt.value);
          if (isCorrectValue) cls += " is-correct"; else if (selected) cls += " is-wrong";
        }
        return `<label class="${cls}"><input type="${inputType}" name="${root.id}-q${index}" value="${esc(opt.value)}"${checked}${s.checked ? " disabled" : ""}><span>${esc(opt.label)}</span></label>`;
      }).join("");
      feedback.classList.toggle("show", s.checked);
      feedback.textContent = s.checked ? `${s.correct ? "✓ Correcto. " : "Revisa la respuesta. "}${q.feedback}` : "";
      prev.disabled = index === 0;
      next.textContent = s.checked ? (index === questions.length - 1 ? "Ver resultado" : "Siguiente →") : "Comprobar";
      const total = state.filter(x => x.correct).length, checkedCount = state.filter(x => x.checked).length;
      score.textContent = total;
      if (orb) orb.style.background = `conic-gradient(var(--u2-accent) ${(checkedCount / questions.length) * 360}deg,#173536 0deg)`;
      root.querySelectorAll(".u2-mini-step").forEach((el, i) => el.classList.toggle("done", state[i].checked));
    }
    optionsBox.addEventListener("change", () => { state[index].values = [...optionsBox.querySelectorAll("input:checked")].map(i => i.value); });
    prev.addEventListener("click", () => { if (index > 0) { index -= 1; render(); } });
    next.addEventListener("click", () => {
      const q = questions[index], s = state[index];
      if (!s.checked) {
        const values = [...s.values].sort(), correct = [...q.correct].sort();
        if (!values.length) { feedback.textContent = "Selecciona al menos una respuesta antes de comprobar."; feedback.classList.add("show"); return; }
        s.checked = true; s.correct = values.length === correct.length && values.every((v, i) => v === correct[i]); render(); return;
      }
      if (index < questions.length - 1) { index += 1; render(); }
      else { const total = state.filter(x => x.correct).length; feedback.textContent = `Resultado final: ${total} de ${questions.length} respuestas correctas. Puedes volver atrás para revisar cada reactivo.`; feedback.classList.add("show"); }
    });
    render();
    return { reset() { state.forEach(s => Object.assign(s, { values: [], checked: false, correct: false })); index = 0; render(); } };
  }
  window.Unit2UI = { createSegment, createQuiz, escapeHTML: esc };
})();
