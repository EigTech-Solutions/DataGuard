const fluxo_rede = document.getElementById('fluxo_rede_chart').getContext("2d");

// Configuração e dados de cada linha do chart
var datasetLinhas = [
    {
        label: 'Media - Ping',
        data: [],
        borderColor: '#A6CEE3',
        backgroundColor: '#A6CEE3'
    },
]

// Criando estrutura para plotar gráfico - legendas e dados
let dados = {
    labels: [],
    datasets: datasetLinhas,
}

// lista das cores das linhas
const listaCorLinha = [
    '#A6CEE3'
]

// Criando estrutura para plotar gráfico - configurações
const config = {
    type: 'line',
    data: dados,
    options: {
        maintainAspectRatio: false,
        tension: 0.5,
        pointHoverRadius: 7,
        pointHoverBorderWidth: 2,
        borderColor: listaCorLinha,
        backgroundColor: listaCorLinha,
        borderWidth: 2,
        pointRadius: 3,
        plugins: {
            legend: {
                position: "bottom",
                align: "start",
                labels: {
                    color: "#FFFFFF",
                    useBorderRadius: true,
                    borderRadius: 3.5,
                    boxWidth: 25
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    lineWidth: 1,
                    color: "#124559"
                },
                ticks: {
                    color: "#c2c2c2"
                }
            },
            x: {
                grid: {
                    lineWidth: 1,
                    color: "#124559"
                },
                ticks: {
                    font:{
                        size: 10
                    },
                    color: "#c2c2c2"
                }
            }

        },
    }
};

// Adicionando gráfico criado em um canvas na tela
let chartFluxoRede = new Chart(
    fluxo_rede,
    config,
);