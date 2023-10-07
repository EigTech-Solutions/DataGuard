const chart_fluxo_rede = document.getElementById('chart_fluxo_rede');

// Legenda (momento da captura do dado)
const labels = ['00:05', '00:10', '00:15', '00:20', '00:25', '00:30', '00:35', '00:40', '00:45', '00:50', '00:55', '01:00'];

// Configuração e dados de cada linha do chart
var datasetLinhas = [
    {
        label: 'Lab 1',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        tension: 0.5,
        pointHoverRadius: 8,
        pointHoverBorderWidth: 2,
    },
    {
        label: 'Lab 2',
        data: [23, 1, 2, 3, 4, 6, 7],
        data: [12, 23, 50, 4, 123, 5, 3],
        fill: false,
        tension: 0.5,
        pointHoverRadius: 8,
        pointHoverBorderWidth: 2,
    },
    {
        label: 'Lab 3',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        tension: 0.5,
        pointHoverRadius: 8,
        pointHoverBorderWidth: 2,
    },
    {
        label: 'Lab 4',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        tension: 0.5,
        pointHoverRadius: 8,
        pointHoverBorderWidth: 2,
    },
    {
        label: 'Lab 5',
        data: [13, 12, 40, 51, 10, 23, 66],
        fill: false,
        tension: 0.5,
        pointHoverRadius: 8,
        pointHoverBorderWidth: 2,
    },
    {
        label: 'Lab 6',
        data: [65, 59, 80, 81, 56, 55, 4],
        fill: false,
        tension: 0.5,
        pointHoverRadius: 8,
        pointHoverBorderWidth: 2,
    },
]

// Criando estrutura para plotar gráfico - legendas e dados
let dados = {
    labels: labels,
    datasets: datasetLinhas.map(linha => linha),
}

// Criando estrutura para plotar gráfico - configurações
const config = {
    type: 'line',
    data: dados,
    options: {
        maintainAspectRatio: false,
        backgroundColor: [
            'rgba(242, 68, 5, 1)',
            'rgba(250, 127, 8, 1)',
            'rgba(158, 248, 238, 1)',
            'rgba(34, 186, 187, 1)',
            'rgba(52, 136, 136, 1)',
            'rgba(222, 222, 222, 1)',
        ],
        borderColor: [
            'rgba(242, 68, 5, 0.25)',
            'rgba(250, 127, 8, 0.25)',
            'rgba(158, 248, 238, 0.25)',
            'rgba(34, 186, 187, 0.25)',
            'rgba(52, 136, 136, 0.25)',
            'rgba(242, 0, 0, 0.5)',
        ],
    },

};

// Adicionando gráfico criado em um chart na tela
let myChart = new Chart(
    chart_fluxo_rede,
    config,
);