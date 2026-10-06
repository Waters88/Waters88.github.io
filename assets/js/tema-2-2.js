(() => {
  const ui = window.Unit2UI; if (!ui) return;
  const controller = ui.createSegment({ rootId: "tema22Overlay" });
  window.openTema22Segment = (slideIndex = 0) => controller?.open(slideIndex);
  ui.createQuiz(document.getElementById("tema22Quiz"), [
    {type:"single",question:"¿Qué tipo de salida caracteriza una tarea de regresión?",options:[{value:"a",label:"Un valor numérico continuo."},{value:"b",label:"Únicamente una etiqueta booleana."},{value:"c",label:"Un cluster sin etiqueta."},{value:"d",label:"Una regla de asociación."}],correct:["a"],feedback:"Regresión estima magnitudes continuas como precio, ventas o temperatura."},
    {type:"multiple",question:"¿Cuáles son algoritmos comunes de clasificación incluidos en el tema?",options:[{value:"log",label:"Regresión logística"},{value:"knn",label:"KNN"},{value:"svm",label:"SVM"},{value:"nb",label:"Naive Bayes"},{value:"pca",label:"PCA como clasificador básico"}],correct:["knn","log","nb","svm"],feedback:"Regresión logística, KNN, SVM y Naive Bayes son algoritmos de clasificación presentados."},
    {type:"boolean",question:"RMSE está expresado en las mismas unidades que la variable objetivo.",options:[{value:"true",label:"Verdadero"},{value:"false",label:"Falso"}],correct:["true"],feedback:"RMSE aplica la raíz al MSE y vuelve a las unidades originales del objetivo."},
    {type:"single",question:"Si es muy costoso dejar pasar un caso positivo real, ¿qué métrica suele ser especialmente importante?",options:[{value:"a",label:"Recall"},{value:"b",label:"Sólo MSE"},{value:"c",label:"WCSS"},{value:"d",label:"Support"}],correct:["a"],feedback:"Recall mide qué proporción de positivos reales fue detectada y penaliza falsos negativos."},
    {type:"multiple",question:"¿Qué elementos pertenecen a una matriz de confusión binaria?",options:[{value:"tp",label:"TP"},{value:"tn",label:"TN"},{value:"fp",label:"FP"},{value:"fn",label:"FN"},{value:"cent",label:"Centroides"}],correct:["fn","fp","tn","tp"],feedback:"La matriz binaria se compone de verdaderos positivos/negativos y falsos positivos/negativos."}
  ]);
})();
