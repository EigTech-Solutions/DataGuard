exibirParametros();

function exibirParametros() {
    fetch(`/parametrosMonitoramento/buscarParametrosMonitoramento/${sessionStorage.ID_INSTITUICAO}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                console.log("Nenhum resultado encontrado.");
                throw "Nenhum resultado encontrado!!";
            }

            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));
                var parametros = resposta[0];

                ipt_grau_atencao_cpu.value = `${parametros.minCpu}`;
                ipt_grau_risco_cpu.value = `${parametros.maxCpu}`;
                ipt_grau_atencao_disco.value = `${parametros.minDisco}`;
                ipt_grau_risco_disco.value = `${parametros.maxDisco}`;
                ipt_grau_atencao_ram.value = `${parametros.minRam}`;
                ipt_grau_risco_ram.value = `${parametros.maxRam}`;
                ipt_grau_atencao_disp_conectados.value = `${parametros.minQtdDispositivosConectados}`;
                ipt_grau_risco_disp_conectados.value = `${parametros.maxQtdDispositivosConectados}`;
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}

function personalizarParametros() {
    var minCpuVar = ipt_grau_atencao_cpu.value;
    var maxCpuVar = ipt_grau_risco_cpu.value;
    var minDiscoVar = ipt_grau_atencao_disco.value;
    var maxDiscoVar = ipt_grau_risco_disco.value;
    var minRamVar = ipt_grau_atencao_ram.value;
    var maxRamVar = ipt_grau_risco_ram.value;
    var minQtdDispositivosConectadosVar = ipt_grau_atencao_disp_conectados.value;
    var maxQtdDispositivosConectadosVar = ipt_grau_risco_disp_conectados.value;
    var idInstituicaoVAR = sessionStorage.ID_INSTITUICAO;


    if (maxCpuVar == "" || maxCpuVar == "" || minDiscoVar == "" || maxDiscoVar == "" || minQtdDispositivosConectadosVar == "" || maxQtdDispositivosConectadosVar == "" || minRamVar == "" || maxRamVar == "") {
        Swal.fire(
            'Campo obrigatório vazio.',
            'Preencha todos os campos para continuar!',
            'error'
        );
    } else {
        fetch("/parametrosMonitoramento/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                minCpuServer: minCpuVar,
                maxCpuServer: maxCpuVar,
                minDiscoServer: minDiscoVar,
                maxDiscoServer: maxDiscoVar,
                minQtdDispositivosConectadosServer: minQtdDispositivosConectadosVar,
                maxQtdDispositivosConectadosServer: maxQtdDispositivosConectadosVar,
                minRamServer: minRamVar,
                maxRamServer: maxRamVar,
                idInstituicaoServer: idInstituicaoVAR
            })
        }).then(function (resposta) {
            if (resposta.ok) {
                if (resposta.status == 204) {
                    console.log("Sem respostas", resposta);
                } else {
                    resposta.json().then(function (resposta) {
                        // verificando se a resposta contém o campo insertId
                        if (resposta !== undefined) {
                            var idParametros = resposta.insertId;
                            console.log("Id do parametro inserido: " + idParametros);

                            fetch(`/parametrosMonitoramento/atualizarParametros/${idInstituicaoVAR}`, {
                                method: "PUT",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    idParametrosServer: idParametros
                                })
                            }).then(function (resposta) {
                                if (resposta.ok) {
                                    // Atualização bem-sucedida
                                    console.log("Parâmetros atualizados com sucesso!");
                                    Swal.fire({
                                        position: 'center',
                                        icon: 'success',
                                        title: 'Parâmetros personalizados com sucesso!',
                                        showConfirmButton: true,
                                        // timer: 1500
                                    });
                                    exibirParametros();
                                } else {
                                    Swal.fire({
                                        position: 'center',
                                        icon: 'error',
                                        title: 'Houve um erro ao personalizar Parâmetros!',
                                        // showConfirmButton: true,
                                        timer: 1500
                                    });
                                    throw ("Houve um erro ao tentar atualizar os parâmetros");
                                }
                            }).catch(function (resposta) {
                                console.log(`#ERRO: ${resposta}`);
                            });
                        } else {
                            console.log("Resposta não contém o campo insertId.");
                        }
                    });
                }
            } else {
                throw ("houve um erro ao tentar se cadastrar");
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
    }
}

function resetParametros() {
    fetch(`/parametrosMonitoramento/buscarParametrosMonitoramento/${sessionStorage.ID_INSTITUICAO}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                console.log("Nenhum resultado encontrado.");
                throw "Nenhum resultado encontrado!!";
            }

            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));
                var parametros = resposta[0];

                var idParametrosAntigos = parametros.idParametrosMonitoramento;
                if (idParametrosAntigos != 1) {
                    Swal.fire({
                        title: 'Tem certeza que deseja resetar seus parâmetros de monitoramento?',
                        text: "Os parâmetros de monitoramento voltarão a configuração padrão do sistema e a sua personalização atual será perdida.",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Sim, resetar!',
                        cancelButtonText: 'Cancelar'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            fetch(`/parametrosMonitoramento/resetarParametros/${sessionStorage.ID_INSTITUICAO}`, {
                                method: "PUT",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({})
                            }).then(function (resposta) {
                                if (resposta.ok) {
                                    console.log("Parâmetros resetados com sucesso!");
                                    Swal.fire({
                                        position: 'center',
                                        icon: 'success',
                                        title: 'Parâmetros resetados com sucesso!',
                                        text: "Os parâmetros de monitoramento voltaram a configuração padrão do sistema.",
                                        showConfirmButton: true,
                                        // timer: 1500
                                    });
                                    exibirParametros();
                                    fetch(`/parametrosMonitoramento/deletar/${idParametrosAntigos}`, {
                                        method: "DELETE",
                                        headers: {
                                            "Content-Type": "application/json"
                                        }
                                    }).then(function (resposta) {
                                        if (resposta.ok) {
                                            console.log("parametros antigos deletados com sucesso!");
                                        } else if (resposta.status == 404) {
                                            window.alert("Deu 404!");
                                        } else {
                                            throw ("Houve um erro ao tentar deletar o campo! Código da resposta: " + resposta.status);
                                        }
                                    }).catch(function (resposta) {
                                        console.log(`#ERRO: ${resposta}`);
                                    });
                                } else {
                                    Swal.fire({
                                        position: 'center',
                                        icon: 'error',
                                        title: 'Houve um erro ao resetar os Parâmetros!',
                                        // showConfirmButton: true,
                                        timer: 1500
                                    });
                                    throw ("Houve um erro ao tentar atualizar os parâmetros");
                                }
                            }).catch(function (resposta) {
                                console.log(`#ERRO: ${resposta}`);
                            });
                        }
                    });
                } else {
                    Swal.fire({
                        position: 'center',
                        icon: 'info',
                        title: 'Os parâmetros de moniramento padrão do sistema já estão configurados!',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}