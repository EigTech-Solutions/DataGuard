const chart_status_maquinas = document.getElementById('chart_status_maquinas').getContext("2d");

// Configuração e dados de cada linha do chart
var datasetsStatus = [
    {
        label: 'Quantidade de máquinas',
        data: [],
        backgroundColor: [
            'rgba(18, 69, 89, 1)',
            'rgba(163, 163, 163, 1)',
        ]
    },
]

// Criando estrutura para plotar gráfico - legendas e dados
let statusDados = {
    labels: ["Ativas", "Inativas"],
    datasets: datasetsStatus,
}

// Criando estrutura para plotar gráfico - configurações
const statusChartConfig = {
    type: 'doughnut',
    data: statusDados,
    options: {
        maintainAspectRatio: false,
        hoverOffset: 7,
        borderColor: 'rgba(255, 255, 255, 0.0)',
        hoverBorderColor: 'rgba(255, 255, 255, 0.2)',
        rotation: 5,
        cutout: "50%",
        plugins: {
            legend: {
                position: "top",
                align: "start",
                labels: {
                    color: "#FFFFFF",
                    useBorderRadius: true,
                    boxWidth: 25,
                    maxHeight: 50,
                    fontSize: 20
                },
            }
        },
    }
};

// Adicionando gráfico criado em um canvas na tela
let chartStatusMaquinas = new Chart(
    chart_status_maquinas,
    statusChartConfig,
);