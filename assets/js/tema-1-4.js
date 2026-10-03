(() => {
  const ui = window.Unit1UI;
  if (!ui) return;
  const controller = ui.createSegment({ rootId: "tema14Overlay" });
  window.openTema14Segment = (slideIndex = 0) => controller?.open(slideIndex);

  ui.createQuiz(document.getElementById("tema14Quiz"), [
    { type:"multiple", question:"¿Qué disciplinas aparecen dentro del grupo de Humanidades en el esquema del tema?", options:[
      {value:"fil",label:"Filosofía"},{value:"lin",label:"Lingüística"},{value:"bio",label:"Biología"},{value:"robot",label:"Robótica"}], correct:["fil","lin"], feedback:"El esquema agrupa Filosofía y Lingüística dentro de Humanidades." },
    { type:"single", question:"¿Qué aporta especialmente la psicología cognitiva al desarrollo de IA?", options:[
      {value:"a",label:"Modelos y preguntas sobre percepción, memoria, aprendizaje, atención y resolución de problemas."},{value:"b",label:"Sólo diseño de circuitos electrónicos."},{value:"c",label:"Exclusivamente almacenamiento de bases de datos."},{value:"d",label:"Únicamente fabricación mecánica."}], correct:["a"], feedback:"La psicología cognitiva estudia procesos mentales que inspiran preguntas, modelos y evaluaciones de sistemas inteligentes." },
    { type:"boolean", question:"La ingeniería de datos contribuye a que los sistemas de IA dispongan de datos accesibles, confiables y procesables.", options:[{value:"true",label:"Verdadero"},{value:"false",label:"Falso"}], correct:["true"], feedback:"Pipelines, calidad, almacenamiento y disponibilidad de datos son aportes centrales de la ingeniería de datos." },
    { type:"multiple", question:"¿Qué áreas del tema aportan herramientas matemáticas o computacionales directamente?", options:[
      {value:"math",label:"Matemáticas"},{value:"games",label:"Teoría de juegos"},{value:"cs",label:"Ciencias de la Computación"},{value:"poetry",label:"Poesía como disciplina listada en el esquema"}], correct:["cs","games","math"], feedback:"Matemáticas, teoría de juegos y ciencias de la computación forman parte del bloque exacto/computacional del tema." },
    { type:"single", question:"¿Qué relación resume mejor el papel de la neurociencia en IA?", options:[
      {value:"a",label:"Estudia el sistema nervioso y ha inspirado modelos y preguntas sobre aprendizaje, percepción y representación."},{value:"b",label:"Define las leyes fiscales de los algoritmos."},{value:"c",label:"Sustituye por completo a las matemáticas."},{value:"d",label:"Se limita a fabricar robots industriales."}], correct:["a"], feedback:"La neurociencia aporta conocimiento sobre el cerebro y ha inspirado ideas de redes, aprendizaje y procesamiento de información." }
  ]);
})();
