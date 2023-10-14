listarPCs();

function listarPCs() {
    fetch(`/maquinas/listar/${sessionStorage.ID_INSTITUICAO}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                // var feed = document.getElementById("feed_container");
                // var mensagem = document.createElement("span");
                // mensagem.innerHTML = "Nenhum resultado encontrado."
                // feed.appendChild(mensagem);   
                console.log("Nenhum resultado encontrado.");
                throw "Nenhum resultado encontrado!!";
            }
    
            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));

                divCards.innerHTML = "";
    
                for (let i = 0; i < resposta.length; i++) {
                    var maquina = resposta[i];

                    var numCardExibido = i+1;

                    if (numCardExibido < 10) {
                        numCardExibido = '0' + numCardExibido;
                    }
    
                    divCards.innerHTML += `
                        <div class="card-exibicao">
                            <div class="top-card">  
                                <span>${numCardExibido}</span>
                                <img class="imgPC" src="../assets/images/imagemPC.png" alt="icon laboratório">
                                <div class="btns-alteracoes">
                                    <button onclick="abrirModalEditarPC(${maquina.idMaquina})"><img src="../assets/images/bxs_edit.png" alt="icon editar"></button>
                                    <button onclick="excluirPC(${maquina.idMaquina})"><img src="../assets/images/ph_trash-duotone.png" alt="icon deletar"></button>
                                </div>
                            </div>
                            <h3>Máquina ${maquina.numeroDeSerie}</h3>
                            <table>
                                <tr>
                                    <th>Local</th>
                                    <th>Alertas</th>
                                    <th>Situação</th>
                                </tr>
                                <tr>
                                    <td>${maquina.local}</td>
                                    <td>${maquina.quantidadeAlertasUltimoMes}</td>
                                    <td>${maquina.situacao}</td>
                                </tr>
                            </table>
                            <button>ver mais</button>
                        </div>
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
    }else{
        fetch(`/maquinas/atualizar/${idPC}/${sessionStorage.ID_INSTITUICAO}`,{
            method : "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body:  JSON.stringify({
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
            if(resposta.ok){
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Alteração realizada com sucesso!',
                    showConfirmButton: true,
                    // timer: 1500
                });
                listarPCs();
                fecharModal();
            }else{
                throw ("houve um erro ao tentar se cadastrar");
            }
        }).catch(function (resposta){
            console.log(`#ERRO: ${resposta}`);
        });
        
    }
}

function excluirPC(idPC) {
    Swal.fire({
        title: 'Tem certeza que deseja excluir esse Laboratório?',
        text: "Após excluído você irá perder todos os dados referentes a esse laboratório! Essa ação não poderá ser desfeita.",
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
                        'Laboratório excluído com sucesso!',
                        'success'
                    );
                    listarPCs();
                } else if (resposta.status == 404) {
                    window.alert("Deu 404!");
                } else {
                    throw ("Houve um erro ao tentar deletar o campo! Código da resposta: " + resposta.status);
                }
            }).catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            });
        }
    });
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
                    <input class="inputMedio" id="ipt_numeroSerie" placeholder="Ex: 12345678B" type="text">
                    <label class="labelIp" for="">IP:</label>
                    <input class="inputMedio" id="ipt_IP" placeholder="ex: 123.456.78.90" type="text">
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
                    <input placeholder="" id="ipt_Processador" type="text">
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
                // var feed = document.getElementById("feed_container");
                // var mensagem = document.createElement("span");
                // mensagem.innerHTML = "Nenhum resultado encontrado."
                // feed.appendChild(mensagem);   
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
                // var feed = document.getElementById("feed_container");
                // var mensagem = document.createElement("span");
                // mensagem.innerHTML = "Nenhum resultado encontrado."
                // feed.appendChild(mensagem);   
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
                                <input class="inputMedio" id="ipt_numeroSerie" placeholder="Ex: 12345678B" type="text" value="${maquina.numeroDeSerie}">
                                <label class="labelIp" for="">IP:</label>
                                <input class="inputMedio" id="ipt_IP" placeholder="ex: 123.456.78.90" type="text" value="${maquina.ipMaquina}">
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
                                    <option value="0" desabled>Selecione...</option>
                                </select>
                            </div>
                            <div class="divTipoDisco">
                                <label for="">Tipo de disco:</label> <br>
                                <select name="" id="ipt_tipoDisco">
                                    <option value="0" desabled>Selecione...</option>
                                </select>
                            </div>
                        </div>
            
                        <!--  containerModalPC3  -->
                        <div class="containerModalPC3">
                            <div class="divCapacidadeMemoria">
                                <label for="">Capacidade de Disco(GB):</label> <br>
                                <input placeholder="256" id="ipt_capMemoriaDisco" type="number" value="${maquina.capacidadeMemoriaDisco}">
                            </div>
                            <div class="divCapacidadeMemoria">
                                <label for="">Capacidade de RAM (GB):</label> <br>
                                <input placeholder="8" id="ipt_capMemoriaRam" type="number" value="${maquina.capacidadeMemoriaRam}">
                            </div>
                        </div>
            
                        <!--  containerModalPC3  -->
                        <div class="containerModalPC3">
                            <div class="divProcessador">
                                <label for="">Processador:</label> <br>
                                <input placeholder="" id="ipt_Processador" type="text"  value="${maquina.processador}">
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
                            <button class="btnCadastrar" onclick="atualizar(${maquina.idMaquina})">Atualizar</button>
                        </div>
                    </div>
                `;

                if (maquina.sistemaOperacional == "Windows") {
                    ipt_tipoSO.innerHTML += `
                        <option value="Windows" selected>Windows</option>
                        <option value="Linux">Linux</option>
                    `;
                } else {
                    ipt_tipoSO.innerHTML += `
                        <option value="Windows">Windows</option>
                        <option value="Linux" selected>Linux</option>
                    `;
                }

                if (maquina.tipoDisco == "SSD") {
                    ipt_tipoDisco.innerHTML += `    
                        <option value="SSD" selected>SSD</option>
                        <option value="HD">HD</option>
                    `;
                } else {
                    ipt_tipoDisco.innerHTML += `    
                        <option value="SSD">SSD</option>
                        <option value="HD" selected>HD</option>
                    `;
                }
                            
                fetch(`/laboratorios/listar/${sessionStorage.ID_INSTITUICAO}`).then(function (resposta) {
                    if (resposta.ok) {
                        if (resposta.status == 204) {
                            // var feed = document.getElementById("feed_container");
                            // var mensagem = document.createElement("span");
                            // mensagem.innerHTML = "Nenhum resultado encontrado."
                            // feed.appendChild(mensagem);   
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

function fecharModal(){
    divModal.style.display = "none";
}

