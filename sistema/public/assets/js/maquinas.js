var idPcs = [];

listarPCs();

function listarPCs() {
    fetch(`/maquinas/listar/${sessionStorage.ID_INSTITUICAO}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) { 
                console.log("Nenhum resultado encontrado.");
                throw "Nenhum resultado encontrado!!";
            }

            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));

                divCards.innerHTML = "";

                for (let i = 0; i < resposta.length; i++) {
                    var maquina = resposta[i];
                    idPcs.push(maquina.idMaquina);

                    var numCardExibido = i + 1;

                    if (numCardExibido < 10) {
                        numCardExibido = '0' + numCardExibido;
                    }

                    var statusMaquinaId = `statusMaquina_${maquina.idMaquina}`;
                    var iconAlterarStatusId = `iconAlterarStatus_${maquina.idMaquina}`;

                    var localPc;
                    if (maquina.local == null) {
                        localPc = "Não alocado"; 
                    } else {
                        localPc = maquina.local;
                    }

                    divCards.innerHTML += `
                        <div class="card-exibicao">
                            <div class="top-card">  
                                <span>${numCardExibido}</span>
                                <img class="imgPC" src="../assets/images/imagemPC.png" alt="icon Máquina">
                                <div class="btns-alteracoes">
                                    <button onclick="abrirModalEditarPC(${maquina.idMaquina})"><img src="../assets/images/bxs_edit.png" alt="icon editar"></button>
                                    <button onclick="excluirPC(${maquina.idMaquina})"><img src="../assets/images/ph_trash-duotone.png" alt="icon deletar"></button>
                                    <button onclick="atualizarStatusPC(${maquina.idMaquina}, ${maquina.status})"><img id="${iconAlterarStatusId}" src="../assets/images/" alt="icon status"></button>
                                </div>
                            </div>
                            <h3>Máquina ${maquina.numeroDeSerie}</h3>
                            <table>
                                <tr>
                                    <th class="th_maq">Status</th>
                                    <th th class="th_maq">Local</th>
                                    <th th class="th_maq">Alertas</th>
                                    <th th class="th_maq">Situação</th>
                                </tr>
                                <tr>
                                    <td id="${statusMaquinaId}"></td>
                                    <td>${localPc}</td>
                                    <td>${maquina.quantidadeAlertasUltimoMes}</td>
                                    <td id="situacaoPc${maquina.idMaquina}"></td>
                                </tr>
                            </table>
                            <button onclick="redirecionarParaMaq(${maquina.idMaquina})">ver mais</button>
                        </div>
                    `;

                    idPcs.forEach(idAtual => {
                        var situacaoPc = document.getElementById(`situacaoPc${idAtual}`);
    
                        fetch(`/maquinas/buscarIndicePreocupacao/${idAtual}/${sessionStorage.ID_INSTITUICAO}`).then(function (resposta) {
                            if (resposta.ok) {
                                if (resposta.status == 204) {
                                    console.log("Nenhum resultado encontrado.");
                                    situacaoPc.innerHTML = "Ótimo"
                                    // throw "Nenhum resultado encontrado!!";
                                } else {
                                    resposta.json().then(function (resposta) {
                                        console.log("Dados recebidos: ", JSON.stringify(resposta));
                                        console.log("Teste deixa", situacaoPc);
    
                                        var maquina = resposta[0];
                                        console.log(maquina.situacao, situacaoPc);
    
                                        situacaoPc.innerHTML = `${maquina.situacao}`;
                                    });
                                }
                            } else {
                                throw ('Houve um erro na API!');
                            }
                        }).catch(function (resposta) {
                            console.error(resposta);
                        });
                    });

                    // Atualiza o status da máquina
                    if (maquina.status == 0) { 
                        document.getElementById(statusMaquinaId).innerHTML = "Desativada";
                        document.getElementById(iconAlterarStatusId).src = "../assets/images/mdi_eye-off-outline.png";
                    } else {
                        document.getElementById(statusMaquinaId).innerHTML = "Ativa";
                        document.getElementById(iconAlterarStatusId).src = "../assets/images/ph_eye.png";
                    }
                }
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}


function cadastrar() {
    var numeroSerieVAR = ipt_numeroSerie.value;
    var ipVAR = ipt_IP.value;
    var sistemaOperacionalVAR = ipt_tipoSO.value;
    var capMemoriaDiscoVAR = ipt_capMemoriaDisco.value;
    var capMemoriaRamVAR = ipt_capMemoriaRam.value;
    var tipoDiscoVAR = ipt_tipoDisco.value;
    var processadorVAR = ipt_Processador.value;
    var laboratorioVAR = ipt_lab.value;
    var idInstituicaoVAR = sessionStorage.ID_INSTITUICAO;

    if (numeroSerieVAR == "" || ipVAR == "" || sistemaOperacionalVAR == "" || capMemoriaDiscoVAR == "" || capMemoriaRamVAR == "" || tipoDiscoVAR == "" || processadorVAR == "" || laboratorioVAR == "") {
        Swal.fire(
            'Campo obrigatório vazio.',
            'Preencha todos os campos para continuar!',
            'error'
        );
    } else {
        fetch("/maquinas/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                numeroSerieServer: numeroSerieVAR,
                ipServer: ipVAR,
                sistemaOperacionalServer: sistemaOperacionalVAR,
                capMemoriaDiscoServer: capMemoriaDiscoVAR,
                capMemoriaRamServer: capMemoriaRamVAR,
                tipoDiscoServer: tipoDiscoVAR,
                processadorServer: processadorVAR,
                laboratorioServer: laboratorioVAR,
                idInstituicaoServer: idInstituicaoVAR
            })
        }).then(function (resposta) {
            if (resposta.ok) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Cadastro realizado com sucesso!',
                    showConfirmButton: true,
                    // timer: 1500
                });
                listarPCs();
                fecharModal();
            } else {
                throw ("houve um erro ao tentar se cadastrar");
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
    }
}

function atualizar(idPC) {
    var numeroSerieVAR = ipt_numeroSerie.value;
    var ipVAR = ipt_IP.value;
    var sistemaOperacionalVAR = ipt_tipoSO.value;
    var capMemoriaDiscoVAR = ipt_capMemoriaDisco.value;
    var capMemoriaRamVAR = ipt_capMemoriaRam.value;
    var tipoDiscoVAR = ipt_tipoDisco.value;
    var processadorVAR = ipt_Processador.value;
    var laboratorioVAR = ipt_lab.value;

    if (numeroSerieVAR == "" || ipVAR == "" || sistemaOperacionalVAR == "" || capMemoriaDiscoVAR == "" || capMemoriaRamVAR == "" || tipoDiscoVAR == "" || processadorVAR == "" || laboratorioVAR == "") {
        Swal.fire(
            'Campo obrigatório vazio.',
            'Preencha todos os campos para continuar!',
            'error'
        );
    } else {
        fetch(`/maquinas/atualizar/${idPC}/${sessionStorage.ID_INSTITUICAO}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                numeroSerieServer: numeroSerieVAR,
                ipServer: ipVAR,
                sistemaOperacionalServer: sistemaOperacionalVAR,
                capMemoriaDiscoServer: capMemoriaDiscoVAR,
                capMemoriaRamServer: capMemoriaRamVAR,
                tipoDiscoServer: tipoDiscoVAR,
                processadorServer: processadorVAR,
                laboratorioServer: laboratorioVAR
            })
        }).then(function (resposta) {
            if (resposta.ok) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Alteração realizada com sucesso!',
                    showConfirmButton: true,
                    // timer: 1500
                });
                listarPCs();
                fecharModal();
            } else {
                throw ("houve um erro ao tentar atualizar");
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });

    }
}

function atualizarStatusPC(idPC, statusAtual) {
    if (statusAtual == 1) {
        Swal.fire({
            title: 'Tem certeza que deseja desativar o monitoramento dessa máquina?',
            text: "Após desativado não será mais obtidos dados e alertas referentes a essa máquina! Essa ação poderá ser desfeita posteriormente caso deseje, mas não terão dados para análise referentes ao tempo estagnado.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, parar monitoramento!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`/maquinas/atualizarStatus/${idPC}/${sessionStorage.ID_INSTITUICAO}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        statusServer: 0
                    })
                }).then(function (resposta) {
                    if (resposta.ok) {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Máquina desativada com sucesso!',
                            showConfirmButton: true,
                            // timer: 1500
                        });
                        listarPCs();
                        fecharModal();
                    } else {
                        throw ("houve um erro ao tentar atualizar");
                    }
                }).catch(function (resposta) {
                    console.log(`#ERRO: ${resposta}`);
                });
            }
        });        
    } else {
        Swal.fire({
            title: 'Tem certeza que deseja ativar o monitoramento dessa máquina?',
            text: "Após ativado o monitoramento para a obtenção de dados e alertas referentes a essa máquina serão retornados! Obs: Não será possível a análise dos dados referentes ao tempo estagnado.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, ligar monitoramento!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`/maquinas/atualizarStatus/${idPC}/${sessionStorage.ID_INSTITUICAO}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        statusServer: 1
                    })
                }).then(function (resposta) {
                    if (resposta.ok) {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Monitoramento ativado com sucesso!',
                            showConfirmButton: true,
                            // timer: 1500
                        });
                        listarPCs();
                        fecharModal();
                    } else {
                        throw ("houve um erro ao tentar atualizar");
                    }
                }).catch(function (resposta) {
                    console.log(`#ERRO: ${resposta}`);
                });
            }
        });
    }
}

function atualizarLaboratorio(idPC) {
    var laboratorioVAR = ipt_lab.value;

    if (laboratorioVAR == 0) {
        Swal.fire(
            'Campo obrigatório não selecionado.',
            'Preencha todos os campos corretamente para continuar!',
            'error'
        );
    } else {
        fetch(`/maquinas/atualizarLaboratorio/${idPC}/${sessionStorage.ID_INSTITUICAO}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idLabServer: laboratorioVAR
            })
        }).then(function (resposta) {
            if (resposta.ok) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Alteração realizada com sucesso!',
                    showConfirmButton: true,
                    // timer: 1500
                });
                listarPCs();
                fecharModal();
            } else {
                throw ("houve um erro ao tentar atualizar");
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
    }
}

function excluirPC(idPC) {
    Swal.fire({
        title: 'Tem certeza que deseja excluir essa máquina?',
        text: "Após excluído você irá perder todos os dados referentes a essa máquina! Essa ação não poderá ser desfeita.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, deletar!',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`/maquinas/deletar/${idPC}/${sessionStorage.ID_INSTITUICAO}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(function (resposta) {
                if (resposta.ok) {
                    Swal.fire(
                        'Deletado!',
                        'Máquina excluída com sucesso!',
                        'success'
                    );
                    listarPCs();
                } else if (resposta.status == 404) {
                    window.alert("Deu 404!");
                } else {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Erro ao deletar máquina',
                        text: 'Possivelmente essa máquina está vinculado a outros objetos do sistema (como algum laboratório ou a algum dado de extrema importância) desassocie primeiro para poder exclui-lo', 
                        showConfirmButton: false,
                        timer: 1500
                    })
                    throw ("Houve um erro ao tentar deletar o campo! Código da resposta: " + resposta.status);
                }
            }).catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            });
        }
    });
}

function buscarIpOrNumSeriePc() {
    var numBusca = ipt_maq_buscada.value;

    if (numBusca == "") { 
        listarPCs();       
    } else {
        fetch(`/maquinas/buscarPorIpOrNumSerie/${numBusca}/${sessionStorage.ID_INSTITUICAO}`).then(function (resposta) {
            if (resposta.ok) {
                if (resposta.status == 204) { 
                    divCards.innerHTML = `
                        <div>
                            Nenhum resultado encontrado. <br>
                            <img src="../assets/images/notification.png" width="250" />
                        </div>
                    `;
                    console.log("Nenhum resultado encontrado.");
                    throw "Nenhum resultado encontrado!!";
                }
    
                resposta.json().then(function (resposta) {
                    console.log("Dados recebidos: ", JSON.stringify(resposta));
    
                    divCards.innerHTML = "";
    
                    for (let i = 0; i < resposta.length; i++) {
                        var maquina = resposta[i];
                        idPcs.push(maquina.idMaquina);

                        var numCardExibido = i + 1;

                        if (numCardExibido < 10) {
                            numCardExibido = '0' + numCardExibido;
                        }

                        var statusMaquinaId = `statusMaquina_${maquina.idMaquina}`;
                        var iconAlterarStatusId = `iconAlterarStatus_${maquina.idMaquina}`;

                        var localPc;
                        if (maquina.local == null) {
                            localPc = "Não alocado"; 
                        } else {
                            localPc = maquina.local;
                        }

                        divCards.innerHTML += `
                            <div class="card-exibicao">
                                <div class="top-card">  
                                    <span>${numCardExibido}</span>
                                    <img class="imgPC" src="../assets/images/imagemPC.png" alt="icon Máquina">
                                    <div class="btns-alteracoes">
                                        <button onclick="abrirModalEditarPC(${maquina.idMaquina})"><img src="../assets/images/bxs_edit.png" alt="icon editar"></button>
                                        <button onclick="excluirPC(${maquina.idMaquina})"><img src="../assets/images/ph_trash-duotone.png" alt="icon deletar"></button>
                                        <button onclick="atualizarStatusPC(${maquina.idMaquina}, ${maquina.status})"><img id="${iconAlterarStatusId}" src="../assets/images/" alt="icon status"></button>
                                    </div>
                                </div>
                                <h3>Máquina ${maquina.numeroDeSerie}</h3>
                                <table>
                                    <tr>
                                        <th class="th_maq">Status</th>
                                        <th th class="th_maq">Local</th>
                                        <th th class="th_maq">Alertas</th>
                                        <th th class="th_maq">Situação</th>
                                    </tr>
                                    <tr>
                                        <td id="${statusMaquinaId}"></td>
                                        <td>${localPc}</td>
                                        <td>${maquina.quantidadeAlertasUltimoMes}</td>
                                        <td id="situacaoPc${maquina.idMaquina}"></td>
                                    </tr>
                                </table>
                                <button onclick="redirecionarParaMaq(${maquina.idMaquina})">ver mais</button>
                            </div>
                        `;

                        idPcs.forEach(idAtual => {
                            var situacaoPc = document.getElementById(`situacaoPc${idAtual}`);
        
                            fetch(`/maquinas/buscarIndicePreocupacao/${idAtual}/${sessionStorage.ID_INSTITUICAO}`).then(function (resposta) {
                                if (resposta.ok) {
                                    if (resposta.status == 204) {
                                        console.log("Nenhum resultado encontrado.");
                                        situacaoPc.innerHTML = "Ótimo"
                                        // throw "Nenhum resultado encontrado!!";
                                    } else {
                                        resposta.json().then(function (resposta) {
                                            console.log("Dados recebidos: ", JSON.stringify(resposta));
                                            console.log("Teste deixa", situacaoPc);
        
                                            var maquina = resposta[0];
                                            console.log(maquina.situacao, situacaoPc);
        
                                            situacaoPc.innerHTML = `${maquina.situacao}`;
                                        });
                                    }
                                } else {
                                    throw ('Houve um erro na API!');
                                }
                            }).catch(function (resposta) {
                                console.error(resposta);
                            });
                        });

                        // Atualiza o status da máquina
                        if (maquina.status == 0) { 
                            document.getElementById(statusMaquinaId).innerHTML = "Desativada";
                            document.getElementById(iconAlterarStatusId).src = "../assets/images/mdi_eye-off-outline.png";
                        } else {
                            document.getElementById(statusMaquinaId).innerHTML = "Ativa";
                            document.getElementById(iconAlterarStatusId).src = "../assets/images/ph_eye.png";
                        }
                    }
                });
            } else {
                throw ('Houve um erro na API!');
            }
        }).catch(function (resposta) {
            console.error(resposta);
        });

    }
}

function abrirModalCardastarPC() {
    divModal.style.display = "flex";

    divModal.innerHTML = `
        <div class="containerModalPC">
            <!--  topo do pop up  -->
            <div class="topo">
                <div class="titulo"> Cadastro de Máquina </div>
                <img class="botaoFechar" src="../assets/images/close-circle-twotone.png" alt="icon fechar" onclick="fecharModal()">
            </div>

            <!--  meio do pop up  -->
            <div class="meioPopUp">
                <div class="imagemPC">
                    <img src="../assets/images/imagemPC.png" alt="">
                </div>
                <div class="campoInput">
                    <label class="labelNumeroSerie" for="">Numero de série:</label>
                    <input class="inputMedio" id="ipt_numeroSerie" placeholder="Ex: 12345678B" type="text" maxlength="12">
                    <label class="labelIp" for="">IP:</label>
                    <input class="inputMedio" id="ipt_IP" placeholder="ex: 123.456.78.90" type="text" maxlength="12">
                </div>
            </div>

            <!--  containerModalPC2  
            <div class="containerModalPC2">
                <label for="">Sistema operacional:</label>
                <select class="inputMaior" name="" id="ipt_tipoSO">
                    <option value="0" selected desabled>Selecione...</option>
                    <option value="Windows">Windows</option>
                    <option value="Linux">Linux</option>
                </select>
            </div>-->

            <!--  containerModalPC3  -->
            <div class="containerModalPC3">
                <div class="">
                    <label for="">Sistema operacional:</label>
                    <select name="" id="ipt_tipoSO">
                        <option value="0" selected desabled>Selecione...</option>
                        <option value="Windows">Windows</option>
                        <option value="Linux">Linux</option>
                    </select>
                </div>
                <div class="divTipoDisco">
                    <label for="">Tipo de disco:</label> <br>
                    <select name="" id="ipt_tipoDisco">
                        <option value="0" selected desabled>Selecione...</option>
                        <option value="SSD">SSD</option>
                        <option value="HD">HD</option>
                    </select>
                </div>
            </div>

            <!--  containerModalPC3  -->
            <div class="containerModalPC3">
                <div class="divCapacidadeMemoria">
                    <label for="">Capacidade de Disco(GB):</label> <br>
                    <input placeholder="256" id="ipt_capMemoriaDisco" type="number">
                </div>
                <div class="divCapacidadeMemoria">
                    <label for="">Capacidade de RAM (GB):</label> <br>
                    <input placeholder="8" id="ipt_capMemoriaRam" type="number">
                </div>
            </div>

            <!--  containerModalPC3  -->
            <div class="containerModalPC3">
                <div class="divProcessador">
                    <label for="">Processador:</label> <br>
                    <input placeholder="" id="ipt_Processador" type="text" maxlength="45">
                </div>
                <div class="divLaboratorio">
                    <label for="">Laboratório:</label> <br>
                    <select name="ipt_lab" id="ipt_lab">
                        <option value="0" selected disabled>Selecione...</option>
                    </select>
                </div>
            </div>

            <!--  fim do pop up  -->
            <div class="containerFinal">
                <button class="btnCadastrar" onclick="cadastrar()">Cadastrar</button>
            </div>
        </div>
    `;

    fetch(`/laboratorios/listar/${sessionStorage.ID_INSTITUICAO}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {   
                console.log("Nenhum resultado encontrado.");
                throw "Nenhum resultado encontrado!!";
            }

            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));

                for (let i = 0; i < resposta.length; i++) {
                    var laboratorio = resposta[i];

                    ipt_lab.innerHTML += `
                        <option value="${laboratorio.idLaboratorio}">${laboratorio.nomeSala}</option>
                    `;
                }

                // finalizarAguardar();
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
        // finalizarAguardar();
    });
}

function abrirModalEditarPC(idPC) {
    divModal.style.display = "flex";

    fetch(`/maquinas/buscarPC/${idPC}/${sessionStorage.ID_INSTITUICAO}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {  
                console.log("Nenhum resultado encontrado.");
                throw "Nenhum resultado encontrado!!";
            }

            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));
                var maquina = resposta[0];

                divModal.innerHTML = `
                    <div class="containerModalPC">
                        <!--  topo do pop up  -->
                        <div class="topo">
                            <div class="titulo"> Atualizar Máquina </div>
                            <img class="botaoFechar" src="../assets/images/close-circle-twotone.png" alt="icon fechar" onclick="fecharModal()">
                        </div>
            
                        <!--  meio do pop up  -->
                        <div class="meioPopUp">
                            <div class="imagemPC">
                                <img src="../assets/images/imagemPC.png" alt="">
                            </div>
                            <div class="campoInput">
                                <label class="labelNumeroSerie" for="">Numero de série:</label>
                                <input class="inputMedio" id="ipt_numeroSerie" placeholder="Ex: 12345678B" type="text" value="${maquina.numeroDeSerie}" maxlength="12" disabled>
                                <label class="labelIp" for="">IP:</label>
                                <input class="inputMedio" id="ipt_IP" placeholder="ex: 123.456.78.90" type="text" value="${maquina.ipMaquina}" maxlength="12" disabled>
                            </div>
                        </div>
            
                        <!--  containerModalPC3  -->
                        <div class="containerModalPC3">
                            <div class="divLaboratorio">
                                <label for="">Laboratório:</label> <br>
                                <select name="ipt_lab" id="ipt_lab">
                                    <option value="0" selected disabled>Selecione...</option>
                                </select>
                            </div>
                        </div>
            
                        <!--  fim do pop up  -->
                        <div class="containerFinal">
                            <button class="btnCadastrar" onclick="atualizarLaboratorio(${maquina.idMaquina})">Atualizar</button>
                        </div>
                    </div>
                `;

                fetch(`/laboratorios/listar/${sessionStorage.ID_INSTITUICAO}`).then(function (resposta) {
                    if (resposta.ok) {
                        if (resposta.status == 204) {
                            console.log("Nenhum resultado encontrado.");
                            throw "Nenhum resultado encontrado!!";
                        }

                        resposta.json().then(function (resposta) {
                            console.log("Dados recebidos: ", JSON.stringify(resposta));

                            for (let i = 0; i < resposta.length; i++) {
                                var laboratorio = resposta[i];

                                if (maquina.fkLaboratorio == laboratorio.idLaboratorio) {
                                    ipt_lab.innerHTML += `
                                        <option value="${laboratorio.idLaboratorio}" selected>${laboratorio.nomeSala}</option>
                                    `;
                                } else {
                                    ipt_lab.innerHTML += `
                                        <option value="${laboratorio.idLaboratorio}">${laboratorio.nomeSala}</option>
                                    `;
                                }
                            }

                            // finalizarAguardar();
                        });
                    } else {
                        throw ('Houve um erro na API!');
                    }
                }).catch(function (resposta) {
                    console.error(resposta);
                    // finalizarAguardar();
                });
                // finalizarAguardar();
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
        // finalizarAguardar();
    });
}

function fecharModal() {
    divModal.style.display = "none";
}

function redirecionarParaMaq(id) {
    window.location = `dashboardMaquina.html?id=${id}`
}
