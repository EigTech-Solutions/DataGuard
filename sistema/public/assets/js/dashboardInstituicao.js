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
                    // console.log(`quantidade cadastro: ${dtaCadastro}`);
                    // console.log(`meses: ${meses}`);
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

function dadosQtdInst() {
    fetch(`/instituicao/puxarDados`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (dados) {
                mostrarDados(dados)
            });
        } else {
            console.error('Nenhuma tarefa encontrada ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados: ${error.message}`);
        });
}
dadosQtdInst()

function mostrarDados(dados) {
    for (i = 0; i < dados.length; i++) {
        var totalInstituicoes = dados[i].quantidade_total_instituicoes;
        kpi_qtdInstituicoes.innerHTML = `${totalInstituicoes}`
    }
}

function dadosQtdUser() {
    fetch(`/instituicao/puxarUser`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (dadoUser) {
                mostrarUser(dadoUser)
            });
        } else {
            console.error('Nenhuma tarefa encontrada ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados: ${error.message}`);
        });
}
dadosQtdUser()

function mostrarUser(dadoUser) {
    console.log(dadoUser);
    for (i = 0; i < dadoUser.length; i++) {
        var totalUsers = dadoUser[i].quantidade_total_users;
        kpi_qtdUsers.innerHTML = `${totalUsers}`
        console.log(totalUsers);
    }
}

function dadosQtdMaquinas() {
    fetch(`/instituicao/puxarMaquinas`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (dadosMaquinas) {
                mostrarMaquinas(dadosMaquinas)
            });
        } else {
            console.error('Nenhuma tarefa encontrada ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados: ${error.message}`);
        });
}
dadosQtdMaquinas()

function mostrarMaquinas(dadosMaquinas) {
    for (i = 0; i < dadosMaquinas.length; i++) {
        var totalMaquinas = dadosMaquinas[i].quantidade_total_maquinas;
        kpi_qtdMaquinas.innerHTML = `${totalMaquinas}`
    }
}

function dadosQtdLabs() {
    fetch(`/instituicao/puxarLabs`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (dadosLabs) {
                mostrarLabs(dadosLabs)
            });
        } else {
            console.error('Nenhuma tarefa encontrada ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados: ${error.message}`);
        });
}
dadosQtdLabs()

function mostrarLabs(dadosLabs) {
    for (i = 0; i < dadosLabs.length; i++) {
        var totalLabs = dadosLabs[i].quantidade_total_labs;
        kpi_qtdLabs.innerHTML = `${totalLabs}`
    }
}