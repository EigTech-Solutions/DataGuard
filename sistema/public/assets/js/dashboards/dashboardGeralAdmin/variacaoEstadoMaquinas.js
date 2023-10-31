const chart_variacao = document.getElementById('chart_variacao_estado').getContext("2d");

// Configuração e dados de cada linha do chart
var datasets = [
    {
        label: 'N° Ativas',
        data: [Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51),],
        backgroundColor: 'rgba(251, 154, 153, 1)',
    },
    {
        label: 'N° Desativadas',
        data: [Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51),],
        backgroundColor: 'rgba(158, 171, 240, 1)',
    },
    {
        label: 'Qtd. Máquinas',
        data: [Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51), Math.floor(Math.random() * 51),],
        backgroundColor: 'rgba(163, 199, 207, 1)',
    }
]

// Criando estrutura para plotar gráfico - legendas e dados
let dados = {
    labels: ['Lab 1', 'Lab 2', 'Lab 3', 'Lab 4', 'Lab 5', 'Lab 6'],
    datasets: datasets,
}

// Criando estrutura para plotar gráfico - configurações
const config = {
    type: 'bar',
    data: dados,
    options: {
        maintainAspectRatio: false,
        tension: 0.5,
        pointHoverRadius: 7,
        pointHoverBorderWidth: 2,
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
                    boxWidth: 25,
                    font: {
                        family: "Poppins"
                    }
                },
            }
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
                ticks: {
                    color: "#c2c2c2"
                },
                grid: {
                    lineWidth: 1,
                    color: "#124559"
                },
            }

        },
    }
};

// Adicionando gráfico criado em um canvas na tela
let charVariacao = new Chart(
    chart_variacao,
    config,
);