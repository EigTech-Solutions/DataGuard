const paramKeys = window.location.search;
const urlParams = new URLSearchParams(paramKeys);

var idMaquina = urlParams.get("id");

//Obtendo os dados dos KPIs e plotando na tela
function obterDadosIniciais() {
    fetch(`/dashboards/dashboardMaquina/informacoesBasicas/${idMaquina}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(resposta => {
                var infosMaquina = resposta[0];
                for (const dado in infosMaquina) {
                    if (infosMaquina[dado] == null) {
                        infosMaquina[dado] = "Desconhecido";
                    }
                }

                console.log(infosMaquina);

                let disco = infosMaquina.TipoDisco === "Desconhecido" ? infosMaquina.CapacidadeDisco : infosMaquina.TipoDisco + " " + infosMaquina.CapacidadeDisco + "GB";
                let memoriaRam = infosMaquina.CapacidadeRam === "Desconhecido" ? infosMaquina.CapacidadeRam : infosMaquina.CapacidadeRam + "GB";
                let fonteEnergia = infosMaquina.FonteEnergia == 1 ? "Conectado" : "Desconectado";
                document.getElementById('local_maquina').innerHTML = infosMaquina.nomeSala;
                document.getElementById('num_serie_maquina').innerHTML = infosMaquina.numeroDeSerie;
                document.getElementById('ip_maquina').innerHTML = infosMaquina.ipMaquina;
                document.getElementById('so_maquina').innerHTML = infosMaquina.sistemaOperacional;
                document.getElementById('processador_maquina').innerHTML = infosMaquina.Processador;
                document.getElementById('disco_maquina').innerHTML = disco;
                document.getElementById('memoria_maquina').innerHTML = memoriaRam;
                let span_status = document.getElementById('kpi_status');
                infosMaquina.status == 1 ? span_status.classList.add('ativo') : span_status.classList.add('desativo');
                span_status.innerHTML = infosMaquina.status == 1 ? "Ativa" : "Inativa";
                document.getElementById('kpi_fonte_energia').innerHTML = fonteEnergia;
                document.getElementById('kpi_qtdPerifericos').innerHTML = infosMaquina.qtdPerifericos;

                atualizarKpis();
            });
        } else {
            console.log("Houve um erro ao tentar obter os dados da maquina :c");
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
        fetch(`/dashboards/dashboardMaquina/informacoesBasicas/${idMaquina}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        }).then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(resposta => {
                    var infosMaquina = resposta[0];
                    for (const dado in infosMaquina) {
                        if (infosMaquina[dado] == null) {
                            infosMaquina[dado] = "Desconhecido";
                        }
                    }
                    let disco = infosMaquina.TipoDisco === "Desconhecido" ? infosMaquina.CapacidadeDisco : infosMaquina.TipoDisco + " " + infosMaquina.CapacidadeDisco + "GB";
                    let memoriaRam = infosMaquina.CapacidadeRam === "Desconhecido" ? infosMaquina.CapacidadeRam : infosMaquina.CapacidadeRam + "GB";
                    let span_status = document.getElementById('kpi_status');
                    let fonteEnergia = infosMaquina.FonteEnergia == 1 ? "Conectado" : "Desconectado";

                    let statusMaquina = infosMaquina.status == 1 ? "Ativa" : "Inativa";

                    if (infosMaquina.nomeSala != document.getElementById('local_maquina').innerText) {
                        document.getElementById('local_maquina').innerHTML = infosMaquina.nomeSala;
                    }
                    if (infosMaquina.numeroDeSerie != document.getElementById('num_serie_maquina').innerText) {
                        document.getElementById('num_serie_maquina').innerHTML = infosMaquina.numeroDeSerie;
                    }
                    if (infosMaquina.ipMaquina != document.getElementById('ip_maquina').innerText) {
                        document.getElementById('ip_maquina').innerHTML = infosMaquina.ipMaquina;
                    }
                    if (infosMaquina.sistemaOperacional != document.getElementById('so_maquina').innerText) {
                        document.getElementById('so_maquina').innerHTML = infosMaquina.sistemaOperacional;
                    }
                    if (infosMaquina.Processador != document.getElementById('processador_maquina').innerText) {
                        document.getElementById('processador_maquina').innerHTML = infosMaquina.Processador;
                    }
                    if (disco != document.getElementById('disco_maquina').innerText) {
                        document.getElementById('disco_maquina').innerHTML = disco;
                    }
                    if (memoriaRam != document.getElementById('memoria_maquina').innerText) {
                        document.getElementById('memoria_maquina').innerHTML = memoriaRam;
                    }
                    if (infosMaquina.memoriaRam != document.getElementById('memoria_maquina').innerText) {
                        document.getElementById('memoria_maquina').innerHTML = memoriaRam;
                    }
                    if (statusMaquina != span_status.innerText) {
                        infosMaquina.status == 1 ? span_status.classList.add('ativo') : span_status.classList.add('desativo');
                        span_status.innerHTML = statusMaquina;
                    }
                    if (fonteEnergia != document.getElementById('kpi_fonte_energia').innerText) {
                        document.getElementById('kpi_fonte_energia').innerHTML = fonteEnergia
                    }
                    if (infosMaquina.qtdPerifericos != Number(document.getElementById('kpi_qtdPerifericos').innerText)) {

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

// função para buscar os dados do gráfico "Porcentagem CPU"
function buscarDadosPorcenCpu() {
    fetch(`/dashboards/dashboardMaquina/buscarCpu/${idMaquina}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    }).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                console.log("Nenhum dado de CPU encontrado!");
            } else {
                resposta.json().then(dados => {
                    plotarGraficoPorcenCPU(dados);
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

//Iniciando o gráfico de Porcentagem CPU com os valores iniciais
function plotarGraficoPorcenCPU(dadosParam) {
    //atualizando as legendas (data e hora dos registros)
    let novoLabels = [];
    dadosParam.map((dados) => { novoLabels.push(dados.dataHora) })
    dadosCpu.labels = novoLabels.reverse();
    let novoDadosPorcenCPU = [];
    dadosParam.map((dados) => { novoDadosPorcenCPU.push(dados.mediaCPU) })
    dadosCpu.datasets[0].data = novoDadosPorcenCPU.reverse();

    chartCpu.update();

    atualizarGraficoPorcenCPU();

}

//Função recursiva para atualizar os dados do gráfico Porcentagem CPU a cada 5s
function atualizarGraficoPorcenCPU() {
    setInterval(() => {
        fetch(`/dashboards/dashboardMaquina/buscarCpu/tempoReal/${idMaquina}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        }).then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(response => {
                    if ((dadosCpu.labels.length < 10) && (response[0].dataHora != dadosCpu.labels[dadosCpu.labels.length - 1])) {
                        dadosCpu.labels.push(response[0].dataHora);
                        //download
                        dadosCpu.datasets[0].data.push(response[0].mediaCPU)

                        chartCpu.update();
                    } else if (response[0].dataHora == dadosCpu.labels[9] || (response[0].dataHora == dadosCpu.labels[dadosCpu.labels.length - 1])) {
                        console.log("Sem novos registros!");
                    } else {
                        console.log("Novos dados!",);
                        dadosCpu.labels.shift();
                        dadosCpu.labels.push(response[0].dataHora);
                        //download
                        dadosCpu.datasets[0].data.shift();
                        dadosCpu.datasets[0].data.push(response[0].mediaCPU)

                        chartCpu.update();
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

// função para buscar os dados do gráfico "Fluxo de rede da máquina"
function buscarDadosFluxoDeRede() {
    fetch(`/dashboards/dashboardMaquina/fluxoRede/${idMaquina}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    }).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                console.log("Nenhum dado de fluxo de rede encontrado");
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
    console.log(dadosParam);
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
        fetch(`/dashboards/dashboardMaquina/fluxoRede/${idMaquina}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        }).then(function (resposta) {
            if (resposta.ok) {
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

// função para buscar os dados dos gráficos relacionados as memórias RAM e DISCO
function dadosMemorias() {
    fetch(`/dashboards/dashboardMaquina/memorias/${idMaquina}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    }).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                console.log("Sem novos dados de memorias");
            } else {
                resposta.json().then(dados => {
                    plotarGraficoMemoriaDisco(dados);
                    plotarGraficoMemoriaRam(dados);
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

//Iniciando o gráfico de memoria de disco com os valores iniciais
function plotarGraficoMemoriaDisco(dadosParam) {
    //livre
    let memoriaDiscoUsada = dadosParam[0].usoDisco;
    let memoriaDiscoLivre = 100 - memoriaDiscoUsada;
    memoriaDados.datasets[0].data[0] = memoriaDiscoLivre;
    //usado
    memoriaDados.datasets[0].data[1] = memoriaDiscoUsada;

    chartMemoriaDisco.update();
}

//Iniciando o gráfico de memoria ram com os valores iniciais
function plotarGraficoMemoriaRam(dadosParam) {
    let memoriaRamUsada = dadosParam[0].usoRam == null ? 0 : dadosParam[0].usoRam;
    const div_parteUtilizada = document.getElementById("memoria_ram_bar_filled");
    const span_memoria_ram_porcentagem_valor = document.getElementById("memoria_ram_porcentagem");

    div_parteUtilizada.style.width = memoriaRamUsada + "%";
    span_memoria_ram_porcentagem_valor.innerHTML = memoriaRamUsada + "%"

    atualizarMemorias();

}

//Função recursiva para atualizar os dados do gráfico memoria de disco a cada 5s
function atualizarMemorias() {
    setInterval(() => {
        fetch(`/dashboards/dashboardMaquina/memorias/${idMaquina}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        }).then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(response => {
                    let memoriaDiscoUsada = response[0].usoDisco;
                    let memoriaRamUsada = response[0].usoRam == null ? 0 : response[0].usoRam;
                    let memoriaDiscoLivre = 100 - memoriaDiscoUsada;

                    console.log(memoriaRamUsada);
                    console.log(response);
                    let div_parteUtilizada = document.getElementById("memoria_ram_bar_filled");
                    let span_memoria_ram_porcentagem_valor = document.getElementById("memoria_ram_porcentagem");

                    if (memoriaDados.datasets[0].data[0] != memoriaDiscoUsada) {
                        memoriaDados.datasets[0].data[0] = memoriaDiscoLivre;
                        memoriaDados.datasets[0].data[1] = memoriaDiscoUsada;
                    }
                    let span_memoria_parsed = span_memoria_ram_porcentagem_valor.textContent;
                    let memoria_ram_atual = span_memoria_parsed.slice(0, 1);
                    if (memoriaRamUsada != Number(memoria_ram_atual)) {
                        div_parteUtilizada.style.width = memoriaRamUsada + "%";
                        span_memoria_ram_porcentagem_valor.innerHTML = memoriaRamUsada + "%"
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

function buscarSituacao() {
    fetch(`/maquinas/buscarIndicePreocupacao/${idMaquina}/${sessionStorage.ID_INSTITUICAO}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    }).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status !== 204) {
                resposta.json().then(response => {
                    document.getElementById("kpi_situacao").innerHTML = `${response[0].situacao}`;
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
}

function atualizarSituacaoMaquina() {
    setInterval(() => {
        fetch(`/maquinas/buscarIndicePreocupacao/${idMaquina}/${sessionStorage.ID_INSTITUICAO}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        }).then(function (resposta) {
            if (resposta.ok) {
                if (resposta.status !== 204) {
                    resposta.json().then(response => {
                        if (document.getElementById("kpi_situacao").innerText != response[0].situacao) {
                            document.getElementById("kpi_situacao").innerHTML = `${response[0].situacao}`;
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

window.addEventListener("load", function () {
    obterDadosIniciais();
    buscarDadosPorcenCpu();
    buscarDadosFluxoDeRede();
    dadosMemorias();
    buscarSituacao();
});