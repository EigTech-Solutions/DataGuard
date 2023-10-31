const cpu_chart = document.getElementById('cpu_chart').getContext("2d");

// Configuração e dados de cada linha do chart
var datasetLinhas = [
    {
        label: 'Porcentagem de Uso',
        data: [Math.floor(Math.random() * 101), Math.floor(Math.random() * 101), Math.floor(Math.random() * 101), Math.floor(Math.random() * 101), Math.floor(Math.random() * 101), Math.floor(Math.random() * 101), Math.floor(Math.random() * 101), Math.floor(Math.random() * 101), Math.floor(Math.random() * 101), Math.floor(Math.random() * 101), Math.floor(Math.random() * 101), Math.floor(Math.random() * 101),],
    },
]

// Criando estrutura para plotar gráfico - legendas e dados
let dadosCpu = {
    labels: ['00:05', '00:10', '00:15', '00:20', '00:25', '00:30', '00:35', '00:40', '00:45', '00:50', '00:55', '01:00'],
    datasets: datasetLinhas,
}

// lista das cores das linhas
const listaCorLinhaCpu = [
    '#A6CEE3'
]

// Criando estrutura para plotar gráfico - configurações
const configCpu = {
    type: 'line',
    data: dadosCpu,
    options: {
        maintainAspectRatio: false,
        tension: 0.5,
        pointHoverRadius: 7,
        pointHoverBorderWidth: 2,
        borderColor: listaCorLinhaCpu,
        backgroundColor: listaCorLinhaCpu,
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
let chartCpu = new Chart(
    cpu_chart,
    configCpu,
);