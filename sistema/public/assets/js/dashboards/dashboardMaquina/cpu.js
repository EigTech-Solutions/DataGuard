const cpu_chart = document.getElementById('cpu_chart').getContext("2d");

// Configuração e dados de cada linha do chart
var datasetLinhas = [
    {
        label: 'Lab 1 - Download',
        data: [Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51),],
    },
    {
        label: 'Lab 1 - Upload',
        data: [Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51),]
    },
    {
        label: 'Lab 1 - Ping',
        data: [Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51),]
    },
    {
        label: 'Lab 2 - Download',
        data: [Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51)],
    },
    {
        label: 'Lab 2 - Upload',
        data: [Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51),]
    },
    {
        label: 'Lab 2 - Ping',
        data: [Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51),]
    },
    {
        label: 'Lab 3 - Download',
        data: [Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51),],
    },
    {
        label: 'Lab 3 - Upload',
        data: [Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51),]
    },
    {
        label: 'Lab 3 - Ping',
        data: [Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51),]
    },
    {
        label: 'Lab 4 - Download',
        data: [Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51),],
    },
    {
        label: 'Lab 4 - Upload',
        data: [Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51),]
    },
    {
        label: 'Lab 4 - Ping',
        data: [Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51),]
    },
    {
        label: 'Lab 5 - Download',
        data: [Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51)],
    },
    {
        label: 'Lab 5 - Upload',
        data: [Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51)]
    },
    {
        label: 'Lab 5 - Ping',
        data: [Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51),]
    },
    {
        label: 'Lab 6 - Download',
        data: [Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51),],
    },
    {
        label: 'Lab 6 - Upload',
        data: [Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51)]
    },
    {
        label: 'Lab 6 - Ping',
        data: [Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51)]
    },
]

// Criando estrutura para plotar gráfico - legendas e dados
let dados = {
    labels: ['00:05', '00:10', '00:15', '00:20', '00:25', '00:30', '00:35', '00:40', '00:45', '00:50', '00:55', '01:00'],
    datasets: datasetLinhas,
}

// lista das cores das linhas
const listaCorLinha = [
    'rgba(251, 154, 153, 1)',
    'rgba(158, 171, 240, 1)',
    'rgba(163, 199, 207, 1)',
    'rgba(178, 223, 138, 1)',
    'rgba(31, 120, 180, 1)',
    'rgba(163, 163, 163, 1)',
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
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Dados da Rede',
                    color: '#c2c2c2',
                    font: {
                        family: 'Poppins',
                        size: 10,
                        lineHeight: 1.2,
                    },
                },
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
    cpu_chart,
    config,
);