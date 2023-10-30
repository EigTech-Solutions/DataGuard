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
            resposta.json().then(dados => {
                plotarGraficoFluxoDeRede(dados);
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

function plotarGraficoFluxoDeRede(dadosParam) {
    //atualizando as legendas (data e hora dos registros)
    let novoLabels = [];
    dadosParam.map((dados) => { novoLabels.push(dados.dataHora) })
    dados.labels = novoLabels.reverse();
    //download
    let novoDadosDownload = [];
    dadosParam.map((dados) => { novoDadosDownload.push(dados.MediaDownload) })
    dados.datasets[0].data = novoDadosDownload.reverse();
    //upload
    let novosDadosUpload = [];
    dadosParam.map((dados) => { novosDadosUpload.push(dados.MediaUpload) })
    dados.datasets[1].data = novosDadosUpload.reverse();
    // //ping
    let novosDadosPing = [];
    dadosParam.map((dados) => { novosDadosPing.push(dados.MediaLatencia) })
    console.log(dadosParam);
    dados.datasets[2].data = novosDadosPing.reverse();

    chartFluxoRede.update();

    atualizarGraficoFluxoRede();

}

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
                    console.log(response[0].dataHora);
                    console.log(dados.labels[9]);
                    if (response[0].dataHora == dados.labels[9]) {
                        console.log("Sem novos registros!");
                    } else {
                        console.log("Novos dados!",);
                        dados.labels.shift();
                        dados.labels.push(response[0].dataHora);
                        //download
                        dados.datasets[0].data.shift();
                        dados.datasets[0].data.push(response[0].MediaDownload)
                        //upload
                        dados.datasets[1].data.shift();
                        dados.datasets[1].data.push(response[0].MediaUpload)
                        // //ping
                        dados.datasets[2].data.shift();
                        dados.datasets[2].data.push(response[0].MediaLatencia)

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

window.addEventListener("load", function () {
    obterKpis();
    obterLaboratorios();
    buscarDadosFluxoDeRede();
});


window.addEventListener("change", function () {
    var idLabSelecionado = document.getElementById('select_dashboard').options[document.getElementById('select_dashboard').selectedIndex].value;
    if (idLabSelecionado == "dashboardGeral") {
        return
    }
    redirecionarParaLab(idLabSelecionado);
})