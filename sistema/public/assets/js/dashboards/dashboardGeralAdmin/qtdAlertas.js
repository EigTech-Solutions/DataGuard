const chart_alertas = document.getElementById('chart_alerta').getContext("2d");

// Configuração e dados de cada linha do chart
var datasetsAlertas = [
    {
        label: 'Alertas',
        data: [0, 0],
        backgroundColor: [
            '#E31A1C',
            '#FF8039',
        ]
    },
]



const doughnutLabel = [{
    id: "doughnutLabel",
    beforeDatasetsDraw(chart, args, pluginOptions) {
        const { ctx, data } = chart;
        ctx.save();
        const xCoor = chart.getDatasetMeta(0).data[0].x;
        const yCoor = chart.getDatasetMeta(0).data[0].y;
        ctx.font = 'normal 17px Poppins';
        ctx.fillStyle = 'rgba(255, 255, 255, 1)';
        ctx.textAlign = 'center';
        ctx.textBaseLine = 'middle';
        ctx.fillText(`${datasetsAlertas[0].data[0] + datasetsAlertas[0].data[1]} ALERTAS`, xCoor, yCoor);
    }
}]


// Criando estrutura para plotar gráfico - legendas e dados
let alertas = {
    labels: ["Urgente", "Atenção"],
    datasets: datasetsAlertas,
}

// Criando estrutura para plotar gráfico - configurações
const alertasConfig = {
    type: 'doughnut',
    data: alertas,
    options: {
        maintainAspectRatio: false,
        hoverOffset: 7,
        borderColor: 'rgba(255, 255, 255, 0.0)',
        hoverBorderColor: 'rgba(255, 255, 255, 0.2)',
        rotation: 5,
        cutout: "60%",
        plugins: {
            legend: {
                title: {
                    display: true,
                    fullSize: true,
                    text: "Classificação",
                    align: "start",
                    color: "#ffffff",
                    font: {
                        size: 14,
                        weight: "bold",
                        family: "Poppins",
                    }
                },
                position: "right",
                align: "center",
                labels: {
                    color: "#FFFFFF",
                    useBorderRadius: true,
                    boxWidth: 25,
                    maxHeight: 50,
                    fontSize: 20,
                    family: "Poppins",
                },
            },
        },
    },
    plugins: doughnutLabel
};

// Adicionando gráfico criado em um canvas na tela
let chartAlertas = new Chart(
    chart_alertas,
    alertasConfig
);