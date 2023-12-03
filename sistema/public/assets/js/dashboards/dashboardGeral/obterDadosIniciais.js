let idInstituicao = sessionStorage.ID_INSTITUICAO;
let labsInstituicao = [];

// Função para ordernar os laboratorios baseado nos números das salas
function ordernarLabs(a, b) {
    var numDiff = a.numLaboratorio - b.numLaboratorio;
    return numDiff;
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
            if (resposta.status !== 204) {
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
                });
            }
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
    fetch(`/dashboards/dashboardGeral/kpis/${idInstituicao}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(json => {
                json.map(resposta => {
                    document.getElementById('kpi_qtd_maquinas_ativas').innerHTML = resposta.qtdMaquinas
                    document.getElementById('kpi_qtd_labs').innerHTML = resposta.qtdLabs
                    document.getElementById('kpi_qtd_alertas').innerHTML = resposta.qtdAlertas
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
        fetch(`/dashboards/dashboardGeral/kpis/${idInstituicao}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        }).then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(response => {
                    if (response[0].qtdMaquinas != Number(document.getElementById('kpi_qtd_maquinas_ativas').innerText)) {
                        document.getElementById('kpi_qtd_maquinas_ativas').innerHTML = response[0].qtdMaquinas
                    }
                    if (response[0].qtdLabs != Number(document.getElementById('kpi_qtd_labs').innerHTML)) {
                        document.getElementById('kpi_qtd_labs').innerHTML = response[0].qtdLabs
                    }
                    if (response[0].qtdAlertas != Number(document.getElementById('kpi_qtd_alertas').innerHTML)) {
                        document.getElementById('kpi_qtd_alertas').innerHTML = response[0].qtdAlertas
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

//função para redirecionar para o lab correto quando o usuário mudar o select
function redirecionarParaLab(id) {
    window.location = `dashboardLaboratorio.html?id=${id}`
}

// função para buscar os dados do gráfico "Fluxo de rede de laboratórios"
function buscarDadosFluxoDeRede() {
    fetch(`/dashboards/dashboardGeral/fluxoRede/${sessionStorage.ID_INSTITUICAO}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    }).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                console.log("Sem novos dados de fluxo de rede");
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
        fetch(`/dashboards/dashboardGeral/fluxoRede/tempoReal/${sessionStorage.ID_INSTITUICAO}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        }).then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(response => {
                    console.log(response);
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

// função para buscar os dados do gráfico "Status Maquinas"
function buscarDadosStatusMaquinas() {
    fetch(`/dashboards/dashboardGeral/statusMaquinas/${sessionStorage.ID_INSTITUICAO}`, {
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
        fetch(`/dashboards/dashboardGeral/statusMaquinas/${sessionStorage.ID_INSTITUICAO}`, {
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
            if (resposta.status !== 204) {
                resposta.json().then(dados => {
                    atualizarTable(dados);
                });
            }
            atualizarRankingLabs([]);
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
                if (resposta.status !== 204) {
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
                }
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

window.addEventListener("load", function () {
    obterKpis();
    obterLaboratorios();
    buscarDadosFluxoDeRede();
    buscarDadosStatusMaquinas();
    buscarRankingLabs();
});

window.addEventListener("change", function () {
    var idLabSelecionado = document.getElementById('select_dashboard').options[document.getElementById('select_dashboard').selectedIndex].value;
    if (idLabSelecionado == "dashboardGeral") {
        return
    }
    redirecionarParaLab(idLabSelecionado);
})  