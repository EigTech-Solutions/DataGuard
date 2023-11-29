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
            '#B0C4DE', '#87CEFA', '#6495ED', '#4682B4', '#4169E1', '#3271a5',
            '#B0E0E6', '#5F9EA0', '#87CEEB', '#708090', '#45b6fe', '#3792cb'
        ]
    }]
}


var chartNumCad = new Chart(ctx, {
    type: 'bar',
    data: dataQtd,
    options: {
        scales: {
            x: {
                ticks: {
                    fontSize: 14
                }
            },
            y: {
                ticks: {
                    fontSize: 14
                }
            }
        },
        plugins: {
            legend: {
                display: false,
                position: 'top',
                align: 'center'
            },
            title: {
                display: true,
                align: 'center',
                text: 'Quantidade de Instituições Cadastradas por Mês',
                font: {
                    size: 20,
                },
                color: '#ffffff'
            }
        }, 
       
    }
});

function alertaInfo(){
    Swal.fire({
        position: 'center',
        title: 'Dashboard de Instituições',
        text: 'Quantidade de Instituições Cadastradas por Mês no ano de 2023',
        showConfirmButton: true
    });
}