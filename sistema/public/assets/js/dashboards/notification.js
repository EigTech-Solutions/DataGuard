var notificacoes = [];
var parametros = [];

idInstituicao = sessionStorage.ID_INSTITUICAO

function obterParmetrosMonitoramento() {
    fetch(`/parametrosMonitoramento/buscarParametrosMonitoramento/${idInstituicao}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                throw "Nenhum resultado encontrado!!";
            }
            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));
                parametros = resposta[0];
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}

function obterNotificacoes() {
    fetch(`/alertas/notificacoes/buscarNotificacoes/${idInstituicao}/${sessionStorage.ID_USUARIO}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    }).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                console.log("Nenhuma notificação encontrada :c");
            } else {
                resposta.json().then(json => {
                    notificacoes.push(...json)
                    document.getElementById('qtdNotificacoes').innerHTML = notificacoes.length;
                    notificacoes.forEach(alerta => {
                        let tipoAlertaCor = alerta.tipo == 'atenção' ? 'tipo_notificacao_alerta_color' : 'tipo_notificacao_urgente_color';
                        let alertaTitle = alerta.tipo == 'atenção' ? "ATENÇÃO " + alerta.nomeSala : "URGENTE " + alerta.nomeSala;
                        let tipoAlertaText = alerta.tipo == 'atenção' ? 'tipo_notificacao_alerta_txt' : 'tipo_notificacao_urgente_txt';
                        let span_PC_infos_data = "";
                        if ((alerta.componente).toLowerCase() === "fonte energia") {
                            span_PC_infos_data = `
                                ${alerta.componente} da Maquina ${alerta.numeroDeSerie} está desconectada!
                            `
                        } else if ((alerta.componente).toLowerCase() === "rede") {
                            let qtdAcima = alerta.tipo == 'atenção' ? alerta.valorConsumido - parametros.minLatenciaRede : alerta.valorConsumido - parametros.maxLatenciaRede;
                            span_PC_infos_data = `${alerta.componente} da Maquina ${alerta.numeroDeSerie} está em ${alerta.valorConsumido}ms ( ${qtdAcima}ms acima dos limites) `
                        } else if ((alerta.componente).toLowerCase() === "entradas") {
                            let qtdAcima = alerta.tipo == 'atenção' ? alerta.valorConsumido - parametros.minQtdDispositivosConectados : alerta.valorConsumido - parametros.maxQtdDispositivosConectados;
                            span_PC_infos_data = `Quantidade de perifericos da Maquina ${alerta.numeroDeSerie} está em ${alerta.valorConsumido} ( ${qtdAcima} acima dos limites) `
                        } else if ((alerta.componente).toLowerCase() === "disco rigido") {
                            let qtdAcima = alerta.tipo == 'atenção' ? alerta.valorConsumido - parametros.minDisco : alerta.valorConsumido - parametros.maxDisco;
                            span_PC_infos_data = `Capacidade de ${alerta.componente} da Maquina ${alerta.numeroDeSerie} está em ${alerta.valorConsumido}% ( ${qtdAcima.toFixed(2)}% acima dos limites) `
                        } else if ((alerta.componente).toLowerCase() === "memoria") {
                            let qtdAcima = alerta.tipo == 'atenção' ? alerta.valorConsumido - parametros.minRam : alerta.valorConsumido - parametros.maxRam;
                            span_PC_infos_data = `Uso de ${alerta.componente} RAM da Maquina ${alerta.numeroDeSerie} está em ${alerta.valorConsumido}% ( ${qtdAcima.toFixed(2)}% acima dos limites) `
                        } else if ((alerta.componente).toLowerCase() === "cpu") {
                            let qtdAcima = alerta.tipo == 'atenção' ? alerta.valorConsumido - parametros.minCpu : alerta.valorConsumido - parametros.maxCpu;
                            span_PC_infos_data = `Uso de ${alerta.componente} da Maquina ${alerta.numeroDeSerie} está em ${alerta.valorConsumido}% ( ${qtdAcima.toFixed(2)}% acima dos limites) `
                        }

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
                                                ${span_PC_infos_data}
                                            </span>
                                            <a href="dashboardMaquina.html?id=${alerta.idMaquina}" class="redirecionar_maquina" >Ir para máquina</a>
                                            <span class="data_hora_notificacao">${alerta.dataHora}</span>
                                        </div>
                                    </div>
                    `

                    });
                })
            }
            atualizarNotificacoes();
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
                if (resposta.status == 204) {
                    console.log("Nenhuma notificação encontrada :c");
                } else {
                    resposta.json().then(resposta => {
                        let caixaAlertas = document.getElementById('caixa_de_alertas');
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
                                notificacoes.push(notificacao);
                                console.log(notificacoes);
                                document.getElementById('qtdNotificacoes').innerHTML = notificacoes.length;
                                let tipoAlertaCor = notificacao.tipo == 'atenção' ? 'tipo_notificacao_alerta_color' : 'tipo_notificacao_urgente_color';
                                let alertaTitle = notificacao.tipo == 'atenção' ? "ATENÇÃO " + notificacao.nomeSala : "URGENTE " + notificacao.nomeSala;
                                let tipoAlertaText = notificacao.tipo == 'atenção' ? 'tipo_notificacao_alerta_txt' : 'tipo_notificacao_urgente_txt';
                                let novoAlerta = document.createElement('div')
                                novoAlerta.classList.add(`alertas`)
                                novoAlerta.setAttribute('name', `alerta_id_${notificacao.idAlertas}`)
                                let span_PC_infos_data = "";
                                if ((notificacao.componente).toLowerCase === "fonte energia") {
                                    span_PC_infos_data = `
                                ${notificacao.componente} da Maquina ${notificacao.numeroDeSerie} está desconectada!`
                                } else if ((notificacao.componente).toLowerCase() === "rede") {
                                    let qtdAcima = notificacao.tipo == 'atenção' ? notificacao.valorConsumido - parametros.minLatenciaRede : notificacao.valorConsumido - parametros.maxLatenciaRede;
                                    span_PC_infos_data = `${notificacao.componente} da Maquina ${notificacao.numeroDeSerie} está em ${notificacao.valorConsumido}ms ( ${qtdAcima}ms acima dos limites) `
                                } else if ((notificacao.componente).toLowerCase() === "entradas") {
                                    let qtdAcima = notificacao.tipo == 'atenção' ? notificacao.valorConsumido - parametros.minQtdDispositivosConectados : notificacao.valorConsumido - parametros.maxQtdDispositivosConectados;
                                    span_PC_infos_data = `Quantidade de perifericos da Maquina ${notificacao.numeroDeSerie} está em ${notificacao.valorConsumido} ( ${qtdAcima} acima dos limites) `
                                } else if ((notificacao.componente).toLowerCase() === "disco rigido") {
                                    let qtdAcima = notificacao.tipo == 'atenção' ? notificacao.valorConsumido - parametros.minDisco : notificacao.valorConsumido - parametros.maxDisco;
                                    span_PC_infos_data = `Capacidade de ${notificacao.componente} da Maquina ${notificacao.numeroDeSerie} está em ${notificacao.valorConsumido}% ( ${qtdAcima.toFixed(2)}% acima dos limites) `
                                } else if ((notificacao.componente).toLowerCase() === "memoria") {
                                    let qtdAcima = notificacao.tipo == 'atenção' ? notificacao.valorConsumido - parametros.minRam : notificacao.valorConsumido - parametros.maxRam;
                                    span_PC_infos_data = `Uso de ${notificacao.componente} RAM da Maquina ${notificacao.numeroDeSerie} está em ${notificacao.valorConsumido}% ( ${qtdAcima.toFixed(2)}% acima dos limites) `
                                } else if ((notificacao.componente).toLowerCase() === "cpu") {
                                    let qtdAcima = notificacao.tipo == 'atenção' ? notificacao.valorConsumido - parametros.minCpu : notificacao.valorConsumido - parametros.maxCpu;
                                    span_PC_infos_data = `Uso de ${notificacao.componente} da Maquina ${notificacao.numeroDeSerie} está em ${notificacao.valorConsumido}% ( ${qtdAcima.toFixed(2)}% acima dos limites) `
                                }
                                novoAlerta.innerHTML = `      
                                                <div class="tipo_notificacao ${tipoAlertaCor}">
                                                </div>
                                                <div class="notificacao_infos">
                                                    <div class="check_notificacao">
                                                        <img src="../assets/images/check_notchecked.png"
                                                            class="check_notificacao_img" id="check_notificacao_img" onclick="marcarComoLido(${notificacao.idAlertas})">
                                                    </div>
                                                    <span class="span_notificacao_tipo ${tipoAlertaText}">
                                                        ${alertaTitle}
                                                    </span>
                                                    <span class="pc_infos">
                                                        ${span_PC_infos_data}
                                                    </span>
                                                    <a href="dashboardMaquina.html?id=${notificacao.idMaquina}" class="redirecionar_maquina" >Ir para máquina</a>
                                                    <span class="data_hora_notificacao">${notificacao.dataHora}</span>
                                                </div>
                                            `
                                caixaAlertas.insertBefore(novoAlerta, caixaAlertas.firstChild);
                            }
                        }
                    })
                }
            } else {
                console.log("Houve um erro ao tentar obter as notificações :c");
                resposta.text().then(texto => {
                    console.error(texto);
                });
            }
        }).catch(function (erro) {
            console.log(erro);
        })
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
            let notificacaoRemover = document.getElementsByName("alerta_id_" + idNotificacao)[0];

            notificacoes = notificacoes.filter(objeto => objeto.idAlertas !== idNotificacao);

            console.log(notificacoes);
            notificacaoRemover.classList.add("animacao_alerta_sumir");
            setTimeout(() => {
                notificacaoRemover.remove();
                document.getElementById('qtdNotificacoes').innerHTML = notificacoes.length;
            }, 1200);
        } else {
            throw ("houve um erro ao tentar marcar como lido");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}

function marcarTodosLido() {
    notificacoes.forEach(alerta => {
        marcarComoLido(alerta.idAlertas)
    });
}

window.addEventListener("load", function () {
    obterParmetrosMonitoramento()
    obterNotificacoes()
})