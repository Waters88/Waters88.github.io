(() => {
  const ui = window.Unit1UI;
  if (!ui) return;
  const controller = ui.createSegment({ rootId: "tema13Overlay" });
  window.openTema13Segment = (slideIndex = 0) => controller?.open(slideIndex);

  ui.createQuiz(document.getElementById("tema13Quiz"), [
    { type:"single", question:"¿Qué describe mejor a una IA débil o estrecha?", options:[
      {value:"a",label:"Un sistema especializado en tareas o dominios acotados."},{value:"b",label:"Una mente artificial que domina cualquier actividad intelectual humana."},{value:"c",label:"Una superinteligencia que se automejora sin restricciones."},{value:"d",label:"Un sistema necesariamente consciente."}], correct:["a"], feedback:"La IA débil/estrecha resuelve tareas concretas y no implica inteligencia general." },
    { type:"boolean", question:"En este curso, AGI se presenta como una capacidad hipotética, no como una tecnología ya demostrada de forma general.", options:[{value:"true",label:"Verdadero"},{value:"false",label:"Falso"}], correct:["true"], feedback:"AGI se utiliza como concepto hipotético de inteligencia general comparable a la humana en una amplia gama de tareas." },
    { type:"multiple", question:"¿Cuáles son ejemplos compatibles con ANI?", options:[
      {value:"trans",label:"Traductor automático"},{value:"voice",label:"Asistente de voz"},{value:"llm",label:"Modelo de lenguaje especializado en interacción lingüística"},{value:"all",label:"Sistema que domina autónomamente cualquier profesión y ciencia"}], correct:["llm","trans","voice"], feedback:"ANI se especializa en ámbitos o familias de tareas; una capacidad general transversal correspondería a la idea de AGI." },
    { type:"single", question:"¿Qué diferencia conceptual introduce ASI respecto de AGI?", options:[
      {value:"a",label:"ASI sería una inteligencia que superaría ampliamente las capacidades humanas generales."},{value:"b",label:"ASI es simplemente otro nombre para un filtro de spam."},{value:"c",label:"AGI siempre es superior a ASI."},{value:"d",label:"ASI sólo puede traducir idiomas."}], correct:["a"], feedback:"ASI es un concepto teórico de superinteligencia, más allá de la capacidad humana general." },
    { type:"multiple", question:"¿Qué etiquetas deben tratarse como hipotéticas o teóricas en esta unidad?", options:[
      {value:"strong",label:"IA fuerte"},{value:"agi",label:"AGI"},{value:"asi",label:"ASI"},{value:"ani",label:"ANI"}], correct:["agi","asi","strong"], feedback:"ANI describe sistemas especializados actuales; IA fuerte, AGI y ASI se presentan como categorías hipotéticas/teóricas." }
  ]);
})();
