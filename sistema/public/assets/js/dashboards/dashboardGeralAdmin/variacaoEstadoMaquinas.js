const chart_variacao = document.getElementById('chart_variacao_estado').getContext("2d");

// Configuração e dados de cada linha do chart
var datasets = [
    {
        label: 'N° Ativas',
        data: [],
        backgroundColor: 'rgba(251, 154, 153, 1)',
    },
    {
        label: 'N° Desativadas',
        data: [],
        backgroundColor: 'rgba(158, 171, 240, 1)',
    },
    {
        label: 'Qtd. Máquinas',
        data: [],
        backgroundColor: 'rgba(163, 199, 207, 1)',
    }
]

// Criando estrutura para plotar gráfico - legendas e dados
let dados = {
    labels: [],
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
let chartVariacao = new Chart(
    chart_variacao,
    config,
);