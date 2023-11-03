var notificacoes = [];

idInstituicao = sessionStorage.ID_INSTITUICAO

function obterNotificacoes() {
    fetch(`/dashboards/notificacoes/${idInstituicao}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(json => {
                notificacoes.push(...json)
                json.forEach(alerta => {
                    let nomeSala = alerta.nomeSala;
                    let numeroSala = alerta.numeroSala >= 10 ? alerta.numeroSala : `0${alerta.numeroSala}`;
                    let idMaquina = alerta.idMaquina;
                    let ipMaquina = alerta.ipMaquina;
                    let tipoAlerta = alerta.tipo;
                    let dataHora = alerta.dataHora;

                    let lido = alerta.lido != 1 ? 'alertas' : 'alertas_lido';

                    var imgAlerta = tipoAlerta.toLowerCase() == "urgente" ? "../assets/images/alertaPerigo.png" : "../assets/images/alertaAviso.png";
                    document.getElementById('caixa_de_alertas').innerHTML +=
                        `      
                        <div class="${lido}" name="alerta">
                            <img src=${imgAlerta} alt="img_Tipo_alerta">
                            <div class="mensagens">
                                <div class="mensagem_erro">
                                    <p>Problema ocorrido no ${nomeSala}</p>
                                </div>
                                <div class="mensagem_lab">
                                    <p><b>(LABORATORIO ${numeroSala})</b></p>
                                </div>
                                <div class="mensagem_comp">
                                    <p>Computador <span><b>${ipMaquina}</b></span> apresentou problemas no componente X</p>
                                </div>
                                <div class="conf_coputador">
                                    <p><b><a href="dashboardMaquina.html?id=${idMaquina}">Conferir Computador</a></b></p>
                                </div>
                                <div class="data_mensagem">
                                    <p>${dataHora}</p>
                                </div>
                            </div>
                        </div>
                    `
                });
                atualizarNotificacoes();
            })
        } else {
            console.log("Houve um erro ao tentar obter as notificações :c");
            resposta.text().then(texto => {
                console.error(texto);
            });
        }
    }).catch(function (erro) {
        console.log(erro);
    })
    return false;
}

function atualizarNotificacoes() {
    setInterval(() => {
        fetch(`/dashboards/notificacoes/tempoReal/${idInstituicao}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        }).then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(resposta => {
                    console.log(resposta);
                    console.log(notificacoes);
                    let alerta = resposta[0];
                    if (alerta.dataHora == notificacoes[notificacoes.length - 1].dataHora) {
                        console.log("Sem notificações novas!");
                    } else {
                        notificacoes.push(alerta)
                        console.log("Nova notificação!!");
                        let nomeSala = alerta.nomeSala;
                        let numeroSala = alerta.numeroSala >= 10 ? alerta.numeroSala : `0${alerta.numeroSala}`;
                        let idMaquina = alerta.idMaquina;
                        let ipMaquina = alerta.ipMaquina;
                        let tipoAlerta = alerta.tipo;
                        let dataHora = alerta.dataHora;

                        let lido = alerta.lido != 1 ? 'alertas' : 'alertas_lido';

                        var imgAlerta = tipoAlerta.toLowerCase() == "urgente" ? "../assets/images/alertaPerigo.png" : "../assets/images/alertaAviso.png";
                        let caixaAlertas = document.getElementById('caixa_de_alertas');
                        let novoAlerta = document.createElement('div')
                        novoAlerta.classList.add(`${lido}`)
                        novoAlerta.setAttribute('name', 'alerta')
                        novoAlerta.innerHTML = `      
                            <img src=${imgAlerta} alt="img_Tipo_alerta">
                            <div class="mensagens">
                                <div class="mensagem_erro">
                                    <p>Problema ocorrido no ${nomeSala}</p>
                                </div>
                                <div class="mensagem_lab">
                                    <p><b>(LABORATORIO ${numeroSala})</b></p>
                                </div>
                                <div class="mensagem_comp">
                                    <p>Computador <span><b>${ipMaquina}</b></span> apresentou problemas no componente X</p>
                                </div>
                                <div class="conf_coputador">
                                    <p><b><a href="dashboardMaquina.html?id=${idMaquina}">Conferir Computador</a></b></p>
                                </div>
                                <div class="data_mensagem">
                                    <p>${dataHora}</p>
                                </div>
                            </div>
                    `
                        caixaAlertas.insertBefore(novoAlerta, caixaAlertas.firstChild)
                    }

                })
            } else {
                console.log("Houve um erro ao tentar obter as notificações :c");
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

function marcarTodosLido() {
    var alertasNaoLido = document.getElementsByName('alertas_nao_lido')
    for (let i = 0; i < alertasNaoLido.length; i++) {
        alertasNaoLido[i].style.background = "rgba(89, 131, 146, 0.50)";
    }
}

window.addEventListener("load", function () {
    obterNotificacoes()
})