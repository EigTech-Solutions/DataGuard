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

window.addEventListener("load", function () {
    obterKpis();
    obterLaboratorios();
});


window.addEventListener("change", function () {
    var idLabSelecionado = document.getElementById('select_dashboard').options[document.getElementById('select_dashboard').selectedIndex].value;
    if (idLabSelecionado == "dashboardGeral") {
        return
    }
    redirecionarParaLab(idLabSelecionado);
})