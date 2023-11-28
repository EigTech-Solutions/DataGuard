function dadosDashboard() {
    fetch(`/instituicao/dashDatas`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (dashDados) {
                var mesesEmPortugues = {
                    'January': 'Janeiro',
                    'February': 'Fevereiro',
                    'March': 'Março',
                    'April': 'Abril',
                    'May': 'Maio',
                    'June': 'Junho',
                    'July': 'Julho',
                    'August': 'Agosto',
                    'September': 'Setembro',
                    'October': 'Outubro',
                    'November': 'Novembro',
                    'December': 'Dezembro'
                };

                for (i = 0; i < dashDados.length; i++) {
                    var dtaCadastro = dashDados[i].quantidadeDeCadastros;
                    var meses = dashDados[i].nomeMes;

                    var mesEmPortugues = mesesEmPortugues[meses];

                    dataQtd.labels.push(mesEmPortugues);
                    dataQtd.datasets[0].data.push(dtaCadastro);
                    console.log(`quantidade cadastro: ${dtaCadastro}`);
                    console.log(`meses: ${meses}`);
                }
                chartNumCad.update();
            });
        } else {
            console.error('Nenhuma informação encontrada ou erro na API');
        }
    })
    .catch(function (error) {
        console.error(`Erro na obtenção dos dados: ${error.message}`);
    });
}

dadosDashboard();


var ctx = document.getElementById('myChart');
var labelsmeses = [];
var dataQtd = {
    labels: labelsmeses,
    datasets: [{
        label: 'Quantidade',
        data: [],
        backgroundColor: [
            '#00FFFF', '#4b0082', '#a20000', '#ffd700', '#ff00ff', '#ff8c00',
            '#b8cad4', '#00ff7f', '#cc7722', '#512d1b', '#007fff', '#8b0000'
        ]
    }]
}

var chartNumCad = new Chart(ctx, {
    type: 'bar',
    data: dataQtd,
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            legend: {
                display: false
            }
        }
    }
});

