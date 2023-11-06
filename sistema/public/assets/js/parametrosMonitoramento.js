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
                maxQtdDispositivosConectadosServer:maxQtdDispositivosConectadosVar ,
                minRamServer: minRamVar,
                maxRamServer: maxRamVar,
                idInstituicaoServer: idInstituicaoVAR
            })
        }).then(function (resposta) {
            if (resposta.ok) {
                fetch(`/parametrosMonitoramento/atualizarParametros/${idInstituicaoVAR}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        idParametrosServer: resposta.insertId
                    })
                }).then(function (resposta) {
                    if (resposta.ok) {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Parâmetros personalizados com sucesso!',
                            showConfirmButton: true,
                            // timer: 1500
                        });
                        exibirParametros();
                    } else {
                        throw ("houve um erro ao tentar atualizar os parametros");
                    }
                }).catch(function (resposta) {
                    console.log(`#ERRO: ${resposta}`);
                }); 
                
            } else {
                throw ("houve um erro ao tentar se cadastrar");
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
    }
}