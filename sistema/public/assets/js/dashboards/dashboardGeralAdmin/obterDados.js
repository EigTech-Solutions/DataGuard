//Obtendo os ultimos KPIs e plotando nas respectivas divs
function obterKpis() {
    fetch(`/dashboards/dashboardGeralAdmin/kpis/${sessionStorage.ID_INSTITUICAO}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(json => {
                json.map(resposta => {
                    document.getElementById('kpi_qtdMaquinas_ativas').innerHTML = resposta.qtdMaquinasAtivas;
                    document.getElementById('kpi_qtdMaquinas_inativas').innerHTML = resposta.qtdMaquinasInativas;
                    document.getElementById('kpi_qtdMaquinas_cadastradas').innerHTML = resposta.qtdMaquinasCadastradasMes;
                    document.getElementById('kpi_qtdLabs').innerHTML = resposta.qtdLabs;
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
        fetch(`/dashboards/dashboardGeralAdmin/kpis/${sessionStorage.ID_INSTITUICAO}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        }).then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(response => {
                    response.map(resposta => {
                        if (resposta.qtdMaquinasAtivas != Number(document.getElementById('kpi_qtdMaquinas_ativas').innerText)) {
                            document.getElementById('kpi_qtdMaquinas_ativas').innerHTML = resposta.qtdMaquinasAtivas;
                        }
                        if (resposta.qtdMaquinasInativas != Number(document.getElementById('kpi_qtdMaquinas_inativas').innerHTML)) {
                            document.getElementById('kpi_qtdMaquinas_inativas').innerHTML = resposta.qtdMaquinasInativas
                        }
                        if (resposta.qtdMaquinasCadastradasMes != Number(document.getElementById('kpi_qtdMaquinas_cadastradas').innerHTML)) {
                            document.getElementById('kpi_qtdMaquinas_cadastradas').innerHTML = resposta.qtdMaquinasCadastradasMes
                        }
                        if (resposta.qtdLabs != Number(document.getElementById('kpi_qtdLabs').innerHTML)) {
                            document.getElementById('kpi_qtdLabs').innerHTML = resposta.qtdLabs
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

var estadoLabs = [];

// função para buscar os dados do gráfico "Variacao status de laboratórios"
function buscarVariacaoStatusLabs() {
    fetch(`/dashboards/dashboardGeralAdmin/variacaoEstadoLab/${sessionStorage.ID_INSTITUICAO}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    }).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                console.log("Sem variaçoes de estado encontrado");
                atualizarGraficoVariacaoStatus();
            } else {
                resposta.json().then(dados => {
                    dados.map((lab) => {
                        estadoLabs.push(lab)
                    })
                    plotarGraficoVariacaoStatus(dados);
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

//Iniciando o gráfico de variacao de status das máquinas com os valores iniciais
function plotarGraficoVariacaoStatus(dadosParam) {
    //atualizando as legendas (nome das salas dos labs)
    let novoLabels = [];
    dadosParam.map((dados) => { novoLabels.push(dados.nomeSala) })
    dados.labels = novoLabels;
    // n° ativas
    let novosQtdAtivas = [];
    dadosParam.map((dados) => { novosQtdAtivas.push(dados.qtdMaquinasAtivas) })
    dados.datasets[0].data = novosQtdAtivas;
    // n° inativas
    let novosQtdInativas = [];
    dadosParam.map((dados) => { novosQtdInativas.push(dados.qtdMaquinasInativas) })
    dados.datasets[1].data = novosQtdInativas;
    // qtd total maquinas
    let novosQtdTotal = [];
    dadosParam.map((dados) => { novosQtdTotal.push(dados.qtdMaquinas) })
    dados.datasets[2].data = novosQtdTotal;

    chartVariacao.update();

    atualizarGraficoVariacaoStatus();

}

// função para comparar um objeto com o objeto estadoLabs
function isEquals(objeto) {
    return JSON.stringify(estadoLabs) == JSON.stringify(objeto)
}

//Função recursiva para atualizar os dados do gráfico variação status maquinas a cada 5s
function atualizarGraficoVariacaoStatus() {
    setInterval(() => {
        fetch(`/dashboards/dashboardGeralAdmin/variacaoEstadoLab/${sessionStorage.ID_INSTITUICAO}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        }).then(function (resposta) {
            if (resposta.ok) {
                if (resposta.status == 204) {
                    console.log("sem variação de estados");
                } else {
                    resposta.json().then(response => {

                        let teveAlteracao = isEquals(response)

                        if (teveAlteracao) {
                            //atualizando as legendas (nome das salas dos labs)
                            let novoLabels = [];
                            response.map((dados) => { novoLabels.push(dados.nomeSala) })
                            dados.labels = novoLabels;
                            // n° ativas
                            let novosQtdAtivas = [];
                            response.map((dados) => { novosQtdAtivas.push(dados.qtdMaquinasAtivas) })
                            dados.datasets[0].data = novosQtdAtivas;
                            // n° inativas
                            let novosQtdInativas = [];
                            response.map((dados) => { novosQtdInativas.push(dados.qtdMaquinasInativas) })
                            dados.datasets[1].data = novosQtdInativas;
                            // qtd total maquinas
                            let novosQtdTotal = [];
                            response.map((dados) => { novosQtdTotal.push(dados.qtdMaquinas) })
                            dados.datasets[2].data = novosQtdTotal;

                            chartVariacao.update();
                        }

                        estadoLabs = [];
                        response.map((lab) => {
                            estadoLabs.push(lab)
                        })

                    });
                }
            } else {
                console.log("Houve um erro ao tentar obter os dados de variacão dos status em tempo real :c");
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

// função para buscar os dados do gráfico "Variacao status de laboratórios"
function buscarAlertas() {
    fetch(`/dashboards/dashboardGeralAdmin/alertas/${sessionStorage.ID_INSTITUICAO}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    }).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                console.log("Nenhum alerta encontrado");
                atualizarGraficoAlertas();
            } else {
                resposta.json().then(dados => {
                    plotarGraficoAlertas(dados);
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

//Iniciando o gráfico de variacao de status das máquinas com os valores iniciais
function plotarGraficoAlertas(dadosParam) {
    let datasetNovo = dadosParam[0]
    let qtdAlertasAtencao = datasetNovo.qtdAlertasAtencao == null ? 0 : datasetNovo.qtdAlertasAtencao;
    let qtdAlertasUrgente = datasetNovo.qtdAlertasUrgente == null ? 0 : datasetNovo.qtdAlertasUrgente;
    alertas.datasets[0].data[0] = qtdAlertasUrgente;
    alertas.datasets[0].data[1] = qtdAlertasAtencao;

    chartAlertas.update();
    atualizarGraficoAlertas();

}

//Função recursiva para atualizar os dados do gráfico variação status maquinas a cada 5s
function atualizarGraficoAlertas() {
    setInterval(() => {
        fetch(`/dashboards/dashboardGeralAdmin/alertas/${sessionStorage.ID_INSTITUICAO}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        }).then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(response => {
                    let newDatas = response[0]
                    let novoQtdAlertasAtencao = newDatas.qtdAlertasAtencao;
                    let novoQtdAlertasUrgente = newDatas.qtdAlertasUrgente;

                    if (alertas.datasets[0].data[0] != novoQtdAlertasUrgente) {
                        alertas.datasets[0].data[0] = novoQtdAlertasUrgente
                    }
                    if (alertas.datasets[0].data[1] != novoQtdAlertasAtencao) {
                        alertas.datasets[0].data[1] = novoQtdAlertasAtencao
                    }
                    chartAlertas.update();
                });
            } else {
                console.log("Houve um erro ao tentar obter os dados de variacão dos status em tempo real :c");
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
    let table = document.getElementById('table_ranking_labs');
    table.innerHTML = "";
    tableData.forEach((lab, i) => {
        table.innerHTML += `
        <tr>
            <td class="table_rknLabs_pos">${i + 1}°</td>
            <td class="table_rknLabs_nomeLab">Laboratório ${lab.numeroSala}</td>
            <td class="table_rknLabs_qtdAlertas">${lab.qtdAlertas} Alertas</td>
        </tr>
        `
    });
}

//Funcão para buscar os dados do ranking de labs
function buscarRankingLabs() {
    fetch(`/dashboards/dashboardGeral/rankingLabs/${sessionStorage.ID_INSTITUICAO}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(dados => {
                atualizarTable(dados);
                atualizarRankingLabs(dados);
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

//Função para atualizar o ranking de labs a cada 5s
function atualizarRankingLabs(tabelaAnterior) {
    setInterval(() => {
        fetch(`/dashboards/dashboardGeral/rankingLabs/${sessionStorage.ID_INSTITUICAO}`, {
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
                                atualizarTable(response)
                                return;
                            }
                        })
                    }
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

// função que cria a tabela de ranking de maquias recebendo um conjunto de dados
function atualizarTableMaquinas(tableData) {
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
    fetch(`/dashboards/dashboardGeralAdmin/rankingMaquinas/${sessionStorage.ID_INSTITUICAO}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    }).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                console.log("Sem dados de ranking encontrado");
                atualizarRankingMaquinas(dados);
            } else {
                resposta.json().then(dados => {
                    atualizarTableMaquinas(dados);
                    atualizarRankingMaquinas(dados);
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

//Função para atualizar o ranking de Maquinas a cada 5s
function atualizarRankingMaquinas(tabelaAnterior) {
    setInterval(() => {
        fetch(`/dashboards/dashboardGeralAdmin/rankingMaquinas/${sessionStorage.ID_INSTITUICAO}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        }).then(function (resposta) {
            if (resposta.ok) {
                if (resposta.status == 204) {
                    console.log("Sem novos dados de ranking");
                } else {
                    resposta.json().then(response => {
                        if (response.length > tabelaAnterior.length) {
                            atualizarTableMaquinas(response);
                        } else {
                            response.forEach((maquina, i) => {
                                if (maquina.idMaquina !== tabelaAnterior[i].idMaquina || maquina.qtdAlertas !== tabelaAnterior[i].qtdAlertas) {
                                    atualizarTableMaquinas(response);
                                    return;
                                }
                            })
                        }
                    });
                }
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

// função que cria a tabela de ranking recebendo um conjunto de dados
function atualizarTableColaboradores(tableData) {
    let table = document.getElementById('table_ranking_colab');
    table.innerHTML = "";
    tableData.forEach((colaborador, i) => {
        table.innerHTML += `
        <tr>
            <td class="table_rknColaborador_data">${colaborador.dataHora}</td>
            <td class="table_rknColabora_nomeColaborador">${colaborador.nome}</td>
        </tr>
        `
    });
}

//Funcão para buscar os dados do ranking de Maquinas
function buscarColaboradores() {
    fetch(`/dashboards/dashboardGeralAdmin/colaboradoresCadastros/${sessionStorage.ID_INSTITUICAO}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    }).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                console.log("Sem novos colaboradores");
            } else {
                resposta.json().then(dados => {
                    console.log(dados);
                    atualizarTableColaboradores(dados);
                    atualizarColaboradores(dados);
                });
            }
            atualizarColaboradores([])
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
function atualizarColaboradores(tabelaAnteriorColaborador) {
    setInterval(() => {
        fetch(`/dashboards/dashboardGeralAdmin/colaboradoresCadastros/${sessionStorage.ID_INSTITUICAO}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        }).then(function (resposta) {
            if (resposta.ok) {
                if (resposta.status == 204) {
                    console.log("Sem novos colaboradores");
                } else {
                    resposta.json().then(response => {
                        if (response.length !== tabelaAnteriorColaborador.length) {
                            atualizarTableColaboradores(response);
                        }
                    });
                }
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


window.addEventListener("load", function () {
    obterKpis();
    buscarVariacaoStatusLabs();
    buscarAlertas();
    buscarRankingLabs();
    buscarRankingMaquinas();
    buscarColaboradores();
});