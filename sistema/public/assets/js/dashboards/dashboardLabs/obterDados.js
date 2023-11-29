const paramKeys = window.location.search;
const urlParams = new URLSearchParams(paramKeys);

var idLaboratorio = urlParams.get("id");

let idInstituicao = sessionStorage.ID_INSTITUICAO;
let labsInstituicao = [];

function ordernarLabs(a, b) {
    var numDiff = a.numLaboratorio - b.numLaboratorio;
    return numDiff;
}

function selectElement(valueToSelect) {
    let element = document.getElementById('select_dashboard');
    element.value = valueToSelect;
}

//função para redirecionar para o lab correto quando o usuário mudar o select
function redirecionarParaLab(id) {
    window.location = `dashboardLaboratorio.html?id=${id}`
}

function redirecionarParaDashGeral() {
    window.location = `DashboardGeral.html`
}

//Obtendo quais são os laboratórios da instituição e adicionando na combobox
function obterLaboratorios() {
    fetch(`/laboratorios/listar/${idInstituicao}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(json => {
                // adicionando os laboratórios a um objeto para futuras pesquisas
                json.map((resposta, i) => {
                    labsInstituicao.push(
                        {
                            idLaboratorio: Number(resposta.idLaboratorio),
                            numLaboratorio: Number(resposta.numeroSala),
                            nomeLaboratorio: resposta.nomeSala
                        },
                    )
                })

                //ordenando os laboratorios por número de sala
                labsInstituicao.sort(ordernarLabs);


                //adicionando os laboratórios como options no combo box
                labsInstituicao.forEach((lab) => {
                    let newOption = new Option(`Laboratório ${lab.numLaboratorio}`, lab.idLaboratorio);
                    document.getElementById('select_dashboard').add(newOption, undefined)
                })
                selectElement(`${idLaboratorio}`);
            });
        } else {
            console.log("Houve um erro ao tentar obter os laboratórios da instituição :c");
            resposta.text().then(texto => {
                console.error(texto);
            });
        }
    }).catch(function (erro) {
        console.log(erro);
    })
    return false;
}

//Obtendo os ultimos KPIs e plotando nas respectivas divs
function obterKpis() {
    fetch(`/dashboards/dashboardLaboratorio/kpis/${idLaboratorio}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(json => {
                json.map(resposta => {
                    document.getElementById('kpi_qtdMaquinasAtivas').innerHTML = resposta.qtdMaquinas
                    document.getElementById('kpi_qtdAlertas').innerHTML = resposta.qtdAlertas
                    // document.getElementById('kpi_situacao ').innerHTML = resposta.qtdAlertas
                })
                atualizarKpis();
            });
        } else {
            console.log("Houve um erro ao tentar obter os KPIs :c");
            resposta.text().then(texto => {
                console.error(texto);
            });
        }
    }).catch(function (erro) {
        console.log(erro);
    })
    return false;
}

//Atualizando os KPIs a cada 5s
function atualizarKpis() {
    setInterval(() => {
        fetch(`/dashboards/dashboardLaboratorio/kpis/${idLaboratorio}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        }).then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(response => {
                    response.map(resposta => {
                        if (resposta.qtdMaquinas != Number(document.getElementById('kpi_qtdMaquinasAtivas').innerText)) {
                            document.getElementById('kpi_qtdMaquinasAtivas').innerHTML = resposta.qtdMaquinas
                        }
                        if (resposta.qtdAlertas != Number(document.getElementById('kpi_qtdAlertas').innerHTML)) {
                            document.getElementById('kpi_qtdAlertas').innerHTML = resposta.qtdAlertas
                        }
                    })

                });
            } else {
                console.log("Houve um erro ao tentar obter os dados do ranking de labs em tempo real :c");
                resposta.text().then(texto => {
                    console.error(texto);
                });
            }
        }).catch(function (erro) {
            console.log(erro);
        })
        return false;
    }, 5000);
}

// função para buscar os dados do gráfico "Fluxo de rede de laboratórios"
function buscarDadosFluxoDeRede() {
    fetch(`/dashboards/dashboardLaboratorio/fluxoRede/${idLaboratorio}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    }).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                console.log("Não foi possivel encontrado nenhum registro de rede!");
            } else {
                resposta.json().then(dados => {
                    plotarGraficoFluxoDeRede(dados);
                });
            }
        } else {
            console.log("Houve um erro ao tentar obter os dados de fluxo de rede :c");
            resposta.text().then(texto => {
                console.error(texto);
            });
        }
    }).catch(function (erro) {
        console.log(erro);
    })
    return false;
}

//Iniciando o gráfico de fluxo de redes com os valores iniciais
function plotarGraficoFluxoDeRede(dadosParam) {
    //atualizando as legendas (data e hora dos registros)
    let novoLabels = [];
    dadosParam.map((dados) => { novoLabels.push(dados.dataHora) })
    dados.labels = novoLabels.reverse();
    // //ping
    let novosDadosPing = [];
    dadosParam.map((dados) => { novosDadosPing.push(dados.MediaLatencia) })
    dados.datasets[0].data = novosDadosPing.reverse();

    chartFluxoRede.update();

    atualizarGraficoFluxoRede();

}

//Função recursiva para atualizar os dados do gráfico fluxo de rede a cada 5s
function atualizarGraficoFluxoRede() {
    setInterval(() => {
        fetch(`/dashboards/dashboardLaboratorio/fluxoRede/tempoReal/${sessionStorage.ID_INSTITUICAO}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        }).then(function (resposta) {
            if (resposta.ok) {
                if (resposta.status == 204) {
                    console.log("Não foi possivel encontrado nenhum registro de rede!");
                } else {
                    resposta.json().then(response => {
                        if ((dados.labels.length < 10) && (response[0].dataHora != dados.labels[dados.labels.length - 1])) {
                            dados.labels.push(response[0].dataHora);
                            // //ping
                            dados.datasets[0].data.push(response[0].MediaLatencia)

                            chartFluxoRede.update();
                        } else if (response[0].dataHora == dados.labels[9] || (response[0].dataHora == dados.labels[dados.labels.length - 1])) {
                            console.log("Sem novos registros!");
                        } else {
                            console.log("Novos dados!",);
                            dados.labels.shift();
                            dados.labels.push(response[0].dataHora);
                            // //ping
                            dados.datasets[0].data.shift();
                            dados.datasets[0].data.push(response[0].MediaLatencia)

                            chartFluxoRede.update();
                        }
                    });
                }
            } else {
                console.log("Houve um erro ao tentar obter os dados de fluxo de rede em tempo real :c");
                resposta.text().then(texto => {
                    console.error(texto);
                });
            }
        }).catch(function (erro) {
            console.log(erro);
        })
        return false;
    }, 5000);
}

// função que cria a tabela de ranking recebendo um conjunto de dados
function atualizarTable(tableData) {
    let table = document.getElementById('table_ranking_maquinas');
    table.innerHTML = "";
    tableData.forEach((maquina, i) => {
        table.innerHTML += `
        <tr>
            <td class="table_rknMaquinas_pos">${i + 1}°</td>
            <td class="table_rknMaquinas_nomeLab">Máquina ${maquina.numeroDeSerie}</td>
            <td class="table_rknMaquinas_qtdAlertas">${maquina.qtdAlertas} Alertas</td>
        </tr>
        `
    });
}

//Funcão para buscar os dados do ranking de Maquinas
function buscarRankingMaquinas() {
    fetch(`/dashboards/dashboardLaboratorio/rankingMaquinas/${idLaboratorio}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(dados => {
                atualizarTable(dados);
                atualizarRankingMaquinas(dados);
            });
        } else {
            console.log("Houve um erro ao tentar obter os dados de fluxo de rede :c");
            resposta.text().then(texto => {
                console.error(texto);
            });
        }
    }).catch(function (erro) {
        console.log(erro);
    })
    return false;
}

//Função para atualizar o ranking de Maquinas a cada 5s
function atualizarRankingMaquinas(tabelaAnterior) {
    setInterval(() => {
        fetch(`/dashboards/dashboardLaboratorio/rankingMaquinas/${idLaboratorio}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        }).then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(response => {
                    if (response.length > tabelaAnterior.length) {
                        atualizarTable(response);
                    } else {
                        response.forEach((lab, i) => {
                            if (lab.numeroSala !== tabelaAnterior[i].numeroSala || lab.qtdAlertas !== tabelaAnterior[i].qtdAlertas) {
                                atualizarTable(response);
                                return;
                            }
                        })
                    }
                });
            } else {
                console.log("Houve um erro ao tentar obter os dados do ranking de Maquinas em tempo real :c");
                resposta.text().then(texto => {
                    console.error(texto);
                });
            }
        }).catch(function (erro) {
            console.log(erro);
        })
        return false;
    }, 5000);
}

// função para buscar os dados do gráfico "Status Maquinas"
function buscarDadosStatusMaquinas() {
    fetch(`/dashboards/dashboardLaboratorio/statusMaquinasLab/${idLaboratorio}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(dados => {
                plotarGraficoStatusMaquinas(dados);
            });
        } else {
            console.log("Houve um erro ao tentar obter os dados de fluxo de rede :c");
            resposta.text().then(texto => {
                console.error(texto);
            });
        }
    }).catch(function (erro) {
        console.log(erro);
    })
    return false;
}

//Iniciando o gráfico de Status Maquinas com os valores iniciais
function plotarGraficoStatusMaquinas(dadosParam) {
    //atualizando as legendas (data e hora dos registros)
    let novosDados = [dadosParam[0].qtdAtivas, dadosParam[0].qtdDesativadas];
    datasetsStatus[0].data = novosDados;

    chartStatusMaquinas.update();

    atualizarGraficoStatusMaquinas();

}

//Função recursiva para atualizar os dados do gráfico Status Maquina a cada 5s
function atualizarGraficoStatusMaquinas() {
    setInterval(() => {
        fetch(`/dashboards/dashboardLaboratorio/statusMaquinasLab/${idLaboratorio}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        }).then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(response => {
                    let qtdAtivas = response[0].qtdAtivas;
                    let qtdDesativadas = response[0].qtdDesativadas;
                    if (qtdAtivas != datasetsStatus[0].data[0] || qtdDesativadas != datasetsStatus[0].data[1]) {
                        datasetsStatus[0].data = [qtdAtivas, qtdDesativadas];
                    } else {
                        console.log("Sem novos status de maquinas");
                    }

                    chartStatusMaquinas.update();

                });
            } else {
                console.log("Houve um erro ao tentar obter os dados de fluxo de rede em tempo real :c");
                resposta.text().then(texto => {
                    console.error(texto);
                });
            }
        }).catch(function (erro) {
            console.log(erro);
        })
        return false;
    }, 5000);
}

function buscarSituacao(idLab) {
    fetch(`/laboratorios/buscarNivelPreocupacaoLab/${idLab}/${sessionStorage.ID_INSTITUICAO}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    }).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                document.getElementById('kpi_situacao').innerHTML = 'Ótimo'
            } else {
                resposta.json().then(dados => {
                    document.getElementById('kpi_situacao').innerHTML = dados[0].situacao
                    atualizarKpiSituacao(idLab)
                });
            }
        } else {
            console.log("Houve um erro ao tentar obter os dados da situação do lab :c");
            resposta.text().then(texto => {
                console.error(texto);
            });
        }
    }).catch(function (erro) {
        console.log(erro);
    })
}

function atualizarKpiSituacao(idLab) {
    setInterval(() => {
        fetch(`/laboratorios/buscarNivelPreocupacaoLab/${idLab}/${sessionStorage.ID_INSTITUICAO}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        }).then(function (resposta) {
            if (resposta.ok) {
                if (resposta.status == 204) {
                    document.getElementById('kpi_situacao').innerHTML = 'Ótimo';
                } else {
                    resposta.json().then(response => {
                        if (response[0].situacao != document.getElementById('kpi_situacao').innerHTML) {
                            document.getElementById('kpi_situacao').innerHTML = dados[0].situacao;
                        }
                    });
                }
            } else {
                console.log("Houve um erro ao tentar obter os dados do kpi de situação em tempo real :c");
                resposta.text().then(texto => {
                    console.error(texto);
                });
            }
        }).catch(function (erro) {
            console.log(erro);
        })
        return false;
    }, 5000);
}


window.addEventListener("load", function () {
    obterLaboratorios();
    obterKpis();
    buscarDadosFluxoDeRede();
    buscarRankingMaquinas();
    buscarDadosStatusMaquinas();
    buscarSituacao(idLaboratorio);
});


window.addEventListener("change", function () {
    var idLabSelecionado = document.getElementById('select_dashboard').options[document.getElementById('select_dashboard').selectedIndex].value;
    console.log(idLabSelecionado);
    if (idLabSelecionado == "dashboardGeral") {
        redirecionarParaDashGeral();
    } else {
        redirecionarParaLab(idLabSelecionado);
    }
})  