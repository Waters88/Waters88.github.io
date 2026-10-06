(() => {
  const ui = window.Unit2UI; if (!ui) return;
  const controller = ui.createSegment({ rootId: "tema23Overlay" });
  window.openTema23Segment = (slideIndex = 0) => controller?.open(slideIndex);
  ui.createQuiz(document.getElementById("tema23Quiz"), [
    {type:"single",question:"¿Cuál es el objetivo principal del clustering?",options:[{value:"a",label:"Agrupar observaciones por similitud sin una etiqueta objetivo conocida."},{value:"b",label:"Predecir siempre un valor continuo."},{value:"c",label:"Calcular únicamente una matriz de confusión."},{value:"d",label:"Escribir reglas manuales."}],correct:["a"],feedback:"Clustering busca estructura y grupos a partir de similitud entre observaciones."},
    {type:"multiple",question:"¿Qué algoritmos de clustering aparecen en el tema?",options:[{value:"km",label:"K-Means"},{value:"db",label:"DBSCAN"},{value:"hier",label:"Jerárquico"},{value:"gmm",label:"GMM"},{value:"log",label:"Regresión logística"}],correct:["db","gmm","hier","km"],feedback:"K-Means, DBSCAN, agrupamiento jerárquico y GMM son técnicas de clustering incluidas."},
    {type:"boolean",question:"Un lift mayor que 1 sugiere una asociación positiva entre antecedente y consecuente.",options:[{value:"true",label:"Verdadero"},{value:"false",label:"Falso"}],correct:["true"],feedback:"Lift > 1 indica que B aparece con A más de lo esperado bajo independencia."},
    {type:"single",question:"¿Qué técnica se usa comúnmente para visualizar datos de alta dimensión preservando vecindarios locales?",options:[{value:"a",label:"t-SNE"},{value:"b",label:"Accuracy"},{value:"c",label:"Apriori como proyección geométrica"},{value:"d",label:"Matriz de confusión"}],correct:["a"],feedback:"t-SNE es una técnica de reducción especialmente conocida por visualizaciones 2D/3D de vecindarios locales."},
    {type:"multiple",question:"¿Qué métricas se relacionan con reducción de dimensionalidad en el tema?",options:[{value:"ev",label:"Varianza explicada"},{value:"stress",label:"Stress"},{value:"trust",label:"Trustworthiness & Continuity"},{value:"prec",label:"Precision de clasificación"}],correct:["ev","stress","trust"],feedback:"Varianza explicada, stress, trustworthiness y continuity ayudan a evaluar cuánto de la estructura original se conserva."}
  ]);
})();
