exibirNivelDePreocupacaoLabs();

document.addEventListener("DOMContentLoaded", function () {
  // Número de divisões desejadas
  const numberOfDivsSection1 = 15;
  const numberOfDivsSection2 = 10;
  const numberOfDivsSection3 = 25;
  const numberOfDivsSection4 = 25;
  const numberOfDivsSection5 = 25;

  // Obtém a referência da div principal
  const section1Indice = document.getElementById("section-1");
  const section2Indice = document.getElementById("section-2");
  const section3Indice = document.getElementById("section-3");
  const section4Indice = document.getElementById("section-4");
  const section5Indice = document.getElementById("section-5");

  // Calcula a largura de cada subdivisão
  const subdivWidth1 = 100 / numberOfDivsSection1;
  const subdivWidth2 = 100 / numberOfDivsSection2;
  const subdivWidth3 = 100 / numberOfDivsSection3;
  const subdivWidth4 = 100 / numberOfDivsSection4;
  const subdivWidth5 = 100 / numberOfDivsSection5;

  // Cria as divisões dinamicamente e adiciona ao section do indice
  for (let i = 0; i < numberOfDivsSection1; i++) {
    const subdiv = document.createElement("div");
    subdiv.classList.add("subdiv");
    subdiv.style.width = `${subdivWidth1}%`;

    // Adiciona a subdivisão ao section1Indice
    section1Indice.appendChild(subdiv);
  }

  for (let i = 0; i < numberOfDivsSection2; i++) {
    const subdiv = document.createElement("div");
    subdiv.classList.add("subdiv");
    subdiv.style.width = `${subdivWidth2}%`;

    // Adiciona a subdivisão ao section2Indice
    section2Indice.appendChild(subdiv);
  }

  // Cria as divisões dinamicamente e adiciona ao section do indice
  for (let i = 0; i < numberOfDivsSection3; i++) {
    const subdiv = document.createElement("div");
    subdiv.classList.add("subdiv");
    subdiv.style.width = `${subdivWidth3}%`;

    // Adiciona a subdivisão ao section3Indice
    section3Indice.appendChild(subdiv);
  }

  for (let i = 0; i < numberOfDivsSection4; i++) {
    const subdiv = document.createElement("div");
    subdiv.classList.add("subdiv");
    subdiv.style.width = `${subdivWidth4}%`;

    // Adiciona a subdivisão ao section4Indice
    section4Indice.appendChild(subdiv);
  }

  for (let i = 0; i < numberOfDivsSection5; i++) {
    const subdiv = document.createElement("div");
    subdiv.classList.add("subdiv");
    subdiv.style.width = `${subdivWidth5}%`;

    // Adiciona a subdivisão ao section5Indice
    section5Indice.appendChild(subdiv);
  }
});

function exibirNivelDePreocupacaoLabs() {
  fetch(`/laboratorios/buscarNivelPreocupacaoLabs/${sessionStorage.ID_INSTITUICAO}`).then(function (resposta) {
    if (resposta.ok) {
      if (resposta.status == 204) {
        console.log("Nenhum resultado encontrado.");
        throw "Nenhum resultado encontrado!!";
      }
      resposta.json().then(function (resposta) {
        console.log("Dados recebidos: ", JSON.stringify(resposta));
  
        var laboratorios = resposta[0];
  
        percentualIndice.innerHTML = `${laboratorios.percentualPreocupacao}%`;
        situacaoIndice.innerHTML = laboratorios.situacao;
  
        if ((laboratorios.situacao) == "Ótimo") {
          situacaoIndice.style.color = "lightblue";
          
        } else if (laboratorios.situacao == "Bom") {
          situacaoIndice.style.color = "lightgreen";
          
        } else if (laboratorios.situacao == "Atenção") {
          situacaoIndice.style.color = "yellow";
          
        } else if (laboratorios.situacao == "Preocupante") {
          situacaoIndice.style.color = "orange";
  
        } else {
          situacaoIndice.style.color = "red";
        }
  
  
        var posicaoMarcacaoIndice = laboratorios.percentualPreocupacao - 1;
        marcacaoIndice.style.marginLeft = posicaoMarcacaoIndice + "%";
      });
    } else {
      throw ('Houve um erro na API!');
    }
  }).catch(function (resposta) {
    console.error(resposta);
  }); 
}

setInterval(exibirNivelDePreocupacaoLabs, 60000);