function marcarTodosLido() {
    var alertasNaoLido = document.getElementsByName('alertas_nao_lido')
    for (let i = 0; i < alertasNaoLido.length; i++) {
        alertasNaoLido[i].style.background = "rgba(89, 131, 146, 0.50)";
    }
}

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
                json.forEach(alerta => {
                    console.log(alerta);
                    let nomeSala = alerta.nomeSala;
                    let numeroSala = alerta.numeroSala >= 10 ? alerta.numeroSala : `0${alerta.numeroSala}`;
                    let idMaquina = alerta.idMaquina;
                    let ipMaquina = alerta.ipMaquina;
                    let tipoAlerta = alerta.tipo;
                    let dataHora = new Date(alerta.dataHora);

                    // formatando a data corretamente
                    let dataDia = dataHora.getDate() >= 10 ? dataHora.getDate() : `0${dataHora.getDate()}`;
                    let dataMes = (dataHora.getMonth() + 1) > 10 ? dataHora.getMonth() : `0${dataHora.getMonth()}`;
                    let dataAno = dataHora.getFullYear();
                    let horaData = dataHora.getHours() >= 10 ? dataHora.getHours() : `0${dataHora.getHours()}`;
                    let minutosData = dataHora.getMinutes() >= 10 ? dataHora.getMinutes() : `0${dataHora.getMinutes()}`
                    let dataHoraFormatada = `${dataDia}/${dataMes}/${dataAno} - ${horaData}:${minutosData}`

                    var imgAlerta = tipoAlerta.toLowerCase() == "urgente" ? "../assets/images/alertaPerigo.png" : "../assets/images/alertaAviso.png";
                    document.getElementById('caixa_de_alertas').innerHTML +=
                        `      
                        <div class="alertas_nao_lido" name="alertas_nao_lido">
                            <img src=${imgAlerta} alt="img_Tipo_alerta">
                            <div class="mensagens">
                                <div class="mensagem_erro">
                                    <p>Problema ocorrido no ${nomeSala}</p>
                                </div>
                                <div class="mensagem_lab">
                                    <p><b>(LABORATORIO ${numeroSala})</b></p>
                                </div>
                                <div class="mensagem_comp">
                                    <p>Computador <span><b>${ipMaquina} parou de funcionar</b></span></p>
                                </div>
                                <div class="conf_coputador">
                                    <p><b><a href="dashboardMaquina.html?id=${idMaquina}">Conferir Computador</a></b></p>
                                </div>
                                <div class="data_mensagem">
                                    <p>${dataHoraFormatada}</p>
                                </div>
                            </div>
                        </div>
                    `
                });
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

window.addEventListener("load", function () {
    obterNotificacoes()
})