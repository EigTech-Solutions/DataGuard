const fluxo_rede = document.getElementById('fluxo_rede_chart').getContext("2d");

// Configuração e dados de cada linha do chart
var datasetLinhas = [
    {
        label: 'Lab 1',
        data: [Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51),],
    },
]

// Criando estrutura para plotar gráfico - legendas e dados
let dados = {
    labels: ['00:05', '00:10', '00:15', '00:20', '00:25', '00:30', '00:35', '00:40', '00:45', '00:50', '00:55', '01:00'],
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
                }
            },
            x: {
                grid: {
                    lineWidth: 1,
                    color: "#124559"
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