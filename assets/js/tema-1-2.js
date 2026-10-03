(() => {
  const ui = window.Unit1UI;
  if (!ui) return;
  const controller = ui.createSegment({ rootId: "tema12Overlay" });
  window.openTema12Segment = (slideIndex = 0) => controller?.open(slideIndex);

  ui.createQuiz(document.getElementById("tema12Quiz"), [
    { type:"single", question:"¿Cuál es el objetivo principal de un modelo discriminativo?", options:[
      {value:"a",label:"Crear contenido nuevo desde cero como objetivo principal."},{value:"b",label:"Distinguir, clasificar o estimar etiquetas/relaciones en datos existentes."},{value:"c",label:"Automejorarse sin límites."},{value:"d",label:"Reemplazar cualquier regla de negocio."}], correct:["b"], feedback:"Los modelos discriminativos se enfocan en separar clases, asignar etiquetas o modelar relaciones útiles para decidir entre alternativas." },
    { type:"multiple", question:"¿Qué afirmaciones describen aprendizaje supervisado?", options:[
      {value:"labels",label:"Entrena con ejemplos que incluyen una salida o etiqueta conocida."},{value:"class",label:"Puede resolver clasificación."},{value:"reg",label:"Puede resolver regresión."},{value:"nolabel",label:"Siempre requiere datos sin etiquetas."}], correct:["class","labels","reg"], feedback:"El aprendizaje supervisado usa pares entrada-salida conocidos y es común en clasificación y regresión." },
    { type:"boolean", question:"Un sistema basado en reglas aprende necesariamente nuevas reglas por sí solo a partir de los datos.", options:[{value:"true",label:"Verdadero"},{value:"false",label:"Falso"}], correct:["false"], feedback:"Un sistema clásico basado en reglas ejecuta lógica preprogramada; puede combinarse con aprendizaje, pero no lo implica." },
    { type:"single", question:"¿Qué describe mejor a un LLM dentro de la IA generativa?", options:[
      {value:"a",label:"Un modelo de lenguaje entrenado para estimar secuencias y generar texto u otras representaciones según su arquitectura."},{value:"b",label:"Un árbol de reglas fijo."},{value:"c",label:"Un algoritmo exclusivo de clustering."},{value:"d",label:"Un sistema que garantiza verdad factual."}], correct:["a"], feedback:"Los LLM aprenden patrones del lenguaje a gran escala y generan secuencias; no garantizan por sí mismos exactitud factual." },
    { type:"multiple", question:"¿Qué puede cambiar entre dos iteraciones de un modelo generativo ante un mismo prompt?", options:[
      {value:"word",label:"Redacción o estructura"},{value:"code",label:"Implementación de código"},{value:"image",label:"Composición de una imagen"},{value:"law",label:"Las leyes matemáticas básicas del universo"}], correct:["code","image","word"], feedback:"La generación suele ser probabilística y puede producir variantes en forma, composición o implementación." }
  ]);

  const button = document.getElementById("tema12Generate");
  const prompt = document.getElementById("tema12Prompt");
  const counter = document.getElementById("tema12Iteration");
  const outputs = document.getElementById("tema12Outputs");
  let iteration = 0;
  const variants = [
    {
      text:"Propuesta A: explica el concepto con una analogía de cocina y un cierre en tres pasos.",
      image:"Composición A: robot minimalista, fondo azul oscuro, iluminación lateral y elementos geométricos.",
      code:"function resumen(datos) { return datos.slice(0, 3).map(x => x.nombre); }",
      plan:"Guion A: introducción → ejemplo → comparación → conclusión."
    },
    {
      text:"Propuesta B: inicia con una pregunta, usa un ejemplo de ventas y termina con una definición breve.",
      image:"Composición B: interfaz futurista, figura humana al centro, gradiente azul-violeta y profundidad de campo.",
      code:"const top3 = datos => [...datos].sort((a,b) => b.valor-a.valor).slice(0,3);",
      plan:"Guion B: problema → demostración → contraejemplo → aprendizaje clave."
    },
    {
      text:"Propuesta C: formato de microhistoria, dos personajes y una moraleja sobre validar resultados.",
      image:"Composición C: collage editorial, pantalla holográfica, tonos cian y acentos dorados.",
      code:"const resultado = datos.reduce((acc, x) => acc + x.valor, 0) / datos.length;",
      plan:"Guion C: contexto → tensión → solución → checklist final."
    }
  ];
  function renderVariant(){
    iteration += 1;
    const v = variants[(iteration - 1) % variants.length];
    if (counter) counter.textContent = `Iteración ${iteration}`;
    if (!outputs) return;
    outputs.innerHTML = `
      <div class="u1-output-card"><strong><i class="fa-solid fa-align-left"></i> Texto</strong><p>${ui.escapeHTML(v.text)}</p></div>
      <div class="u1-output-card"><strong><i class="fa-solid fa-image"></i> Imagen · descripción</strong><p>${ui.escapeHTML(v.image)}</p></div>
      <div class="u1-output-card"><strong><i class="fa-solid fa-code"></i> Código</strong><pre>${ui.escapeHTML(v.code)}</pre></div>
      <div class="u1-output-card"><strong><i class="fa-solid fa-diagram-project"></i> Estructura</strong><p>${ui.escapeHTML(v.plan)}</p></div>`;
  }
  button?.addEventListener("click", renderVariant);
  prompt?.addEventListener("keydown", (e) => { if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) renderVariant(); });
  renderVariant();
})();
