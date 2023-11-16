var notificacoes = [];

idInstituicao = sessionStorage.ID_INSTITUICAO

function obterNotificacoes() {
    fetch(`/alertas/notificacoes/buscarNotificacoes/${idInstituicao}/${sessionStorage.ID_USUARIO}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(json => {
                notificacoes.push(...json)
                document.getElementById('qtdNotificacoes').innerHTML = notificacoes.length;
                notificacoes.forEach(alerta => {
                    let tipoAlertaCor = alerta.tipo == 'atenção' ? 'tipo_notificacao_alerta_color' : 'tipo_notificacao_urgente_color';
                    let alertaTitle = alerta.tipo == 'atenção' ? "ATENÇÃO " + alerta.nomeSala : "URGENTE " + alerta.nomeSala;
                    let tipoAlertaText = alerta.tipo == 'atenção' ? 'tipo_notificacao_alerta_txt' : 'tipo_notificacao_urgente_txt';
                    document.getElementById('caixa_de_alertas').innerHTML += `
                                    <div class="alertas" name="alerta_id_${alerta.idAlertas}">
                                        <div class="tipo_notificacao ${tipoAlertaCor}">

                                        </div>
                                        <div class="notificacao_infos">
                                            <div class="check_notificacao">
                                                <img src="../assets/images/check_notchecked.png"
                                                    class="check_notificacao_img" id="check_notificacao_img" onclick="marcarComoLido(${alerta.idAlertas})">
                                            </div>
                                            <span class="span_notificacao_tipo ${tipoAlertaText}">
                                                ${alertaTitle}
                                            </span>
                                            <span class="pc_infos">
                                                ${alerta.componente} da Maquina ${alerta.ipMaquina} está em x% (5% acima dos limites)
                                            </span>
                                            <a href="dashboardMaquina.html?id=${alerta.idMaquina}" class="redirecionar_maquina" >Ir para máquina</a>
                                            <span class="data_hora_notificacao">${alerta.dataHora}</span>
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
        fetch(`/alertas/notificacoes/buscarNotificacoes/${idInstituicao}/${sessionStorage.ID_USUARIO}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        }).then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(resposta => {
                    console.log(resposta);
                    for (let i = 0; i < resposta.length; i++) {
                        let novaNotificacao = true;
                        const notificacao = resposta[i];
                        for (let j = 0; j < notificacoes.length; j++) {
                            const notificacaoAntiga = notificacoes[j];
                            if (notificacao.idAlertas == notificacaoAntiga.idAlertas) {
                                novaNotificacao = false;
                            }
                        }
                        if (novaNotificacao) {
                            notificacoes.push(notificacao)
                            // caixaAlertas.insertBefore(novoAlerta, caixaAlertas.firstChild)
                        }
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

function marcarComoLido(idNotificacao) {
    console.log(idNotificacao);

    fetch(`/alertas/notificacoes/marcarLido/${idNotificacao}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (resposta) {
        if (resposta.ok) {
            console.log("Marcado como lido!!!!!!!");
            let notificacaoRemover = document.getElementsByName("alerta_id_" + idNotificacao)[0];

            notificacoes = notificacoes.filter(objeto => objeto.idAlertas !== idNotificacao);

            console.log(notificacoes);
            notificacaoRemover.classList.add("animacao_alerta_sumir");
            setTimeout(() => {
                notificacaoRemover.remove();
            }, 1200);
        } else {
            throw ("houve um erro ao tentar marcar como lido");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}

function marcarTodosLido() {
    for (let i = 0; i < alertasNaoLido.length; i++) {
        alertasNaoLido[i].style.background = "rgba(89, 131, 146, 0.50)";
    }
}

window.addEventListener("load", function () {
    obterNotificacoes()
})