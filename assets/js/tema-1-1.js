(() => {
  const ui = window.Unit1UI;
  if (!ui) return;
  const controller = ui.createSegment({ rootId: "tema11Overlay" });
  window.openTema11Segment = (slideIndex = 0) => controller?.open(slideIndex);

  const quizRoot = document.getElementById("tema11Quiz");
  ui.createQuiz(quizRoot, [
    { type:"single", question:"¿Qué caracteriza mejor a la IA predictiva?", options:[
      {value:"a",label:"Sugiere automáticamente la mejor acción sin necesidad de una predicción."},
      {value:"b",label:"Usa datos históricos para estimar resultados o comportamientos probables."},
      {value:"c",label:"Siempre utiliza agentes autónomos y herramientas externas."},
      {value:"d",label:"Sólo funciona con reglas escritas manualmente."}], correct:["b"], feedback:"La IA predictiva busca estimar qué probablemente ocurrirá a partir de patrones observados en datos." },
    { type:"multiple", question:"¿Cuáles son tareas típicas de modelos predictivos o de machine learning?", options:[
      {value:"reg",label:"Regresión"},{value:"cla",label:"Clasificación"},{value:"clu",label:"Clustering"},{value:"ani",label:"Sentir emociones"}], correct:["cla","clu","reg"], feedback:"Regresión, clasificación y clustering son tareas frecuentes de ML; experimentar emociones no es una tarea de modelado." },
    { type:"boolean", question:"Una IA prescriptiva se limita a pronosticar lo que pasará y nunca recomienda acciones.", options:[{value:"true",label:"Verdadero"},{value:"false",label:"Falso"}], correct:["false"], feedback:"La capa prescriptiva busca recomendar acciones para optimizar un objetivo, no sólo predecir." },
    { type:"single", question:"¿Cuál de estos elementos distingue mejor a un agente de IA de un chat convencional?", options:[
      {value:"a",label:"Puede planificar pasos y usar herramientas para avanzar hacia un objetivo."},{value:"b",label:"Siempre tiene una interfaz con texto."},{value:"c",label:"Nunca necesita memoria ni estado."},{value:"d",label:"Sólo responde una vez y termina."}], correct:["a"], feedback:"Un agente puede mantener estado, planificar, actuar con herramientas y revisar resultados en varios pasos." },
    { type:"multiple", question:"¿Qué componentes suelen aparecer en un ciclo agéntico?", options:[
      {value:"goal",label:"Objetivo"},{value:"plan",label:"Planificación"},{value:"tools",label:"Herramientas"},{value:"feedback",label:"Observación/retroalimentación"},{value:"magic",label:"Magia o conciencia obligatoria"}], correct:["feedback","goal","plan","tools"], feedback:"El ciclo agéntico suele articular objetivo, planificación, herramientas y observación; no requiere conciencia." }
  ]);

  const run = document.getElementById("tema11AgentRun");
  const reset = document.getElementById("tema11AgentReset");
  const goal = document.getElementById("tema11AgentGoal");
  const consoleBox = document.getElementById("tema11AgentConsole");
  const scenarios = {
    ventas: [
      ["OBJETIVO","Analizar ventas semanales y proponer una acción comercial."],
      ["PLAN","1) Leer ventas → 2) comparar meta → 3) detectar brecha → 4) proponer acción."],
      ["HERRAMIENTA","Simulación: consulta dataset_ventas.csv."],
      ["OBSERVA","Ruta Centro está 14% debajo de la meta; bebida energizante cae 9%."],
      ["DECIDE","Priorizar recuperación de clientes con caída reciente y revisar cobertura de ruta."],
      ["SALIDA","Genera una recomendación y registra el resultado para seguimiento."]
    ],
    agenda: [
      ["OBJETIVO","Organizar una mañana de trabajo con tres pendientes."],
      ["PLAN","Ordenar por prioridad, duración y dependencia."],
      ["HERRAMIENTA","Simulación: consulta calendario y lista de tareas."],
      ["OBSERVA","Hay una reunión fija a las 10:00 y dos tareas requieren 45 min."],
      ["DECIDE","Bloquear análisis 08:30, preparar reunión 09:20 y dejar seguimiento 11:15."],
      ["SALIDA","Propone agenda y marca conflictos para revisión humana."]
    ],
    soporte: [
      ["OBJETIVO","Resolver una incidencia ficticia de acceso a un sistema."],
      ["PLAN","Clasificar → consultar guía → probar solución → validar."],
      ["HERRAMIENTA","Simulación: busca en una base de conocimiento local."],
      ["OBSERVA","El patrón coincide con contraseña expirada."],
      ["DECIDE","Recomendar restablecimiento y verificación de MFA."],
      ["SALIDA","Entrega pasos y solicita confirmación antes de cerrar el caso."]
    ]
  };
  function renderLogs(rows){
    if (!consoleBox) return;
    consoleBox.innerHTML = rows.map(([k,v]) => `<div class="u1-log"><b>${k}</b><span>${ui.escapeHTML(v)}</span></div>`).join("");
  }
  run?.addEventListener("click", () => {
    renderLogs(scenarios[goal?.value] || scenarios.ventas);
  });
  reset?.addEventListener("click", () => {
    if (consoleBox) consoleBox.innerHTML = '<div class="u1-log"><b>LISTO</b><span>Selecciona un objetivo y ejecuta la simulación.</span></div>';
  });
})();
