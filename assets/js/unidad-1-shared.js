(() => {
  const esc = (value) => String(value ?? "")
    .replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;").replaceAll("'", "&#039;");

  function createSegment(config) {
    const root = document.getElementById(config.rootId);
    if (!root) return null;
    const track = root.querySelector(".u1-track");
    const slides = [...root.querySelectorAll(".u1-slide")];
    const subtitle = root.querySelector(".u1-subtitle");
    const prev = root.querySelector(".u1-prev");
    const next = root.querySelector(".u1-next");
    const close = root.querySelector(".u1-close");
    const progress = root.querySelector(".u1-progress > span");
    const label = root.querySelector(".u1-progress-label");
    const dots = root.querySelector(".u1-dots");
    let index = 0;

    if (dots) {
      dots.innerHTML = slides.map((_, i) => `<span class="u1-dot${i === 0 ? " is-active" : ""}" data-u1-dot="${i}"></span>`).join("");
    }

    function render(resetScroll = true) {
      index = Math.max(0, Math.min(index, slides.length - 1));
      track.style.transform = `translateX(-${index * 100}%)`;
      subtitle.textContent = slides[index]?.dataset.subtitle || `Sección ${index + 1}`;
      const pct = ((index + 1) / slides.length) * 100;
      if (progress) progress.style.width = `${pct}%`;
      if (label) label.textContent = `${index + 1} / ${slides.length}`;
      if (prev) prev.disabled = index === 0;
      if (next) next.disabled = index === slides.length - 1;
      root.querySelectorAll(".u1-dot").forEach((dot, i) => dot.classList.toggle("is-active", i === index));
      if (resetScroll) slides[index]?.scrollTo({ top: 0, behavior: "auto" });
      root.dispatchEvent(new CustomEvent("u1:slidechange", { detail: { index } }));
    }

    function open(slideIndex = 0) {
      index = Number.isFinite(Number(slideIndex)) ? Number(slideIndex) : 0;
      root.hidden = false;
      root.setAttribute("aria-hidden", "false");
      document.body.classList.add("topic-segment-open");
      render(false);
      requestAnimationFrame(() => root.dispatchEvent(new CustomEvent("u1:opened", { detail: { index } })));
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
      const dot = event.target.closest("[data-u1-dot]");
      if (!dot) return;
      index = Number(dot.dataset.u1Dot) || 0;
      render();
    });
    document.addEventListener("keydown", (event) => {
      if (root.hidden) return;
      if (event.key === "Escape") hide();
      if (event.key === "ArrowLeft" && index > 0) { index -= 1; render(); }
      if (event.key === "ArrowRight" && index < slides.length - 1) { index += 1; render(); }
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
    const orb = root.querySelector(".u1-score-orb");
    const mini = root.querySelector("[data-quiz-mini]");
    const state = questions.map(() => ({ values: [], checked: false, correct: false }));
    let index = 0;

    if (mini) mini.innerHTML = questions.map(() => '<span class="u1-mini-step"></span>').join("");

    function typeLabel(q) {
      if (q.type === "multiple") return "Selección múltiple";
      if (q.type === "boolean") return "Verdadero o falso";
      return "Opción múltiple";
    }

    function render() {
      const q = questions[index];
      const s = state[index];
      qType.textContent = typeLabel(q);
      qCounter.textContent = `Pregunta ${index + 1} de ${questions.length}`;
      qText.textContent = q.question;
      const inputType = q.type === "multiple" ? "checkbox" : "radio";
      optionsBox.innerHTML = q.options.map((opt) => {
        const checked = s.values.includes(opt.value) ? " checked" : "";
        let cls = "u1-option";
        if (s.checked) {
          const isCorrectValue = q.correct.includes(opt.value);
          const selected = s.values.includes(opt.value);
          if (isCorrectValue) cls += " is-correct";
          else if (selected) cls += " is-wrong";
        }
        return `<label class="${cls}"><input type="${inputType}" name="${root.id}-q${index}" value="${esc(opt.value)}"${checked}${s.checked ? " disabled" : ""}><span>${esc(opt.label)}</span></label>`;
      }).join("");
      feedback.classList.toggle("show", s.checked);
      feedback.textContent = s.checked ? `${s.correct ? "✓ Correcto. " : "Revisa la respuesta. "}${q.feedback}` : "";
      prev.disabled = index === 0;
      next.textContent = s.checked ? (index === questions.length - 1 ? "Ver resultado" : "Siguiente →") : "Comprobar";
      const total = state.filter(x => x.correct).length;
      score.textContent = total;
      const checkedCount = state.filter(x => x.checked).length;
      if (orb) orb.style.background = `conic-gradient(var(--u1-accent) ${(checkedCount / questions.length) * 360}deg,#173536 0deg)`;
      root.querySelectorAll(".u1-mini-step").forEach((el, i) => el.classList.toggle("done", state[i].checked));
    }

    optionsBox.addEventListener("change", () => {
      const inputs = [...optionsBox.querySelectorAll("input:checked")];
      state[index].values = inputs.map(i => i.value);
    });

    prev.addEventListener("click", () => { if (index > 0) { index -= 1; render(); } });
    next.addEventListener("click", () => {
      const q = questions[index];
      const s = state[index];
      if (!s.checked) {
        const values = [...s.values].sort();
        const correct = [...q.correct].sort();
        if (!values.length) {
          feedback.textContent = "Selecciona al menos una respuesta antes de comprobar.";
          feedback.classList.add("show");
          return;
        }
        s.checked = true;
        s.correct = values.length === correct.length && values.every((v, i) => v === correct[i]);
        render();
        return;
      }
      if (index < questions.length - 1) {
        index += 1;
        render();
      } else {
        const total = state.filter(x => x.correct).length;
        feedback.textContent = `Resultado final: ${total} de ${questions.length} respuestas correctas. Puedes volver atrás para revisar cada reactivo.`;
        feedback.classList.add("show");
      }
    });

    render();
    return { reset() { state.forEach(s => Object.assign(s, { values: [], checked: false, correct: false })); index = 0; render(); } };
  }

  window.Unit1UI = { createSegment, createQuiz, escapeHTML: esc };
})();
