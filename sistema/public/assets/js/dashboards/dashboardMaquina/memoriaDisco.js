const memoriaDisco = document.getElementById('chart_memoria_disco').getContext("2d");

// Configuração e dados de cada linha do chart
var datasetsMemoria = [
    {
        label: 'Memoria Disco',
        data: [],
        backgroundColor: [
            'rgba(163, 163, 163, 1)',
            'rgba(18, 69, 89, 1)',
        ]
    },
]

// Criando estrutura para plotar gráfico - legendas e dados
let memoriaDados = {
    labels: ["Livre", "Usada"],
    datasets: datasetsMemoria,
}

// Criando estrutura para plotar gráfico - configurações
const memoriaConfig = {
    type: 'doughnut',
    data: memoriaDados,
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
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        let label = context.dataset.label;
                        return label + ": " + context.formattedValue + "%";
                    }
                }
            },
        }
    }
}

// Adicionando gráfico criado em um canvas na tela
let chartMemoriaDisco = new Chart(
    memoriaDisco,
    memoriaConfig,
);