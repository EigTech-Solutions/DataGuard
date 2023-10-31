const fluxo_rede = document.getElementById('fluxo_rede_chart').getContext("2d");

// Configuração e dados de cada linha do chart
var datasetLinhas = [
    {
        label: 'Media - Download',
        data: [Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51),],
        borderColor: 'rgba(251, 154, 153, 1)',
        backgroundColor: 'rgba(251, 154, 153, 1)',
    },
    {
        label: 'Media - Upload',
        data: [Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51),],
        borderColor: 'rgba(158, 171, 240, 1)',
        backgroundColor: 'rgba(158, 171, 240, 1)',
    },
    {
        label: 'Media - Ping',
        data: [Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51),],
        borderColor: '#A6CEE3',
        backgroundColor: '#A6CEE3'
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