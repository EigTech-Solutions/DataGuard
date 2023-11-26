var idLabs = [];

listarLabs();

function listarLabs() {

    fetch(`/laboratorios/listar/${sessionStorage.ID_INSTITUICAO}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                console.log("Nenhum resultado encontrado.");
                throw "Nenhum resultado encontrado!!";
            }

            resposta.json().then(async function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));

                divCards.innerHTML = "";

                for (let i = 0; i < resposta.length; i++) {
                    var laboratorio = resposta[i];
                    idLabs.push(laboratorio.idLaboratorio);

                    var numCardExibido = laboratorio.numeroSala;
                    var numSala = laboratorio.numeroSala;

                    if (numCardExibido < 10) {
                        numCardExibido = '0' + numCardExibido;
                        numSala = '0' + numSala
                    }

                    divCards.innerHTML += `
                        <div class="card-exibicao">
                            <div class="top-card">  
                                <span>${numCardExibido}</span>
                                <img src="../assets/images/imagemLab.png" alt="icon laboratório">
                                <div class="btns-alteracoes">
                                    <button onclick="abrirModalEditarLab(${laboratorio.idLaboratorio})"><img src="../assets/images/bxs_edit.png" alt="icon editar"></button>
                                    <button onclick="excluirLab(${laboratorio.idLaboratorio})"><img src="../assets/images/ph_trash-duotone.png" alt="icon deletar"></button>
                                </div>
                            </div>
                            <h3>${laboratorio.nomeSala}</h3>
                            <table>
                                <tr>
                                    <th>Sala</th>
                                    <th>Computadores</th>
                                    <th>Alertas</th>
                                    <th>Situação</th>
                                </tr>
                                <tr>
                                    <td>${numSala}</td>
                                    <td>${laboratorio.quantidadeComputadores}</td>
                                    <td>${laboratorio.quantidadeAlertasUltimoMes}</td>
                                    <td id="situacaoLab${laboratorio.idLaboratorio}"></td>
                                </tr>
                            </table>
                            <button onclick="redirecionarParaLab(${laboratorio.idLaboratorio})">ver mais</button>
                        </div>
                    `;

                }

                idLabs.forEach(idAtual => {
                    var situacaoLab = document.getElementById(`situacaoLab${idAtual}`);

                    fetch(`/laboratorios/buscarNivelPreocupacaoLab/${idAtual}/${sessionStorage.ID_INSTITUICAO}`).then(function (resposta) {
                        if (resposta.ok) {
                            if (resposta.status == 204) {
                                console.log("Nenhum resultado encontrado.");
                                situacaoLab.innerHTML = "Ótimo"
                                // throw "Nenhum resultado encontrado!!";
                            } else {
                                resposta.json().then(function (resposta) {
                                    console.log("Dados recebidos: ", JSON.stringify(resposta));
                                    console.log("Teste deixa", situacaoLab);

                                    var laboratorio = resposta[0];
                                    console.log(laboratorio.situacao, situacaoLab);

                                    situacaoLab.innerHTML = `${laboratorio.situacao}`;
                                });
                            }
                        } else {
                            throw ('Houve um erro na API!');
                        }
                    }).catch(function (resposta) {
                        console.error(resposta);
                    });
                });
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
        // finalizarAguardar();
    });

}

async function plotarSituacao(idLab, tdSituacaoLab) {

}

function cadastrar() {
    var nomeLabVAR = ipt_nomeLab.value;
    var numLabVAR = ipt_numLab.value;
    var respLabVAR = ipt_respLab.value;
    var idInstituicaoVAR = sessionStorage.ID_INSTITUICAO;


    if (nomeLabVAR == "" || numLabVAR == "" || respLabVAR == "") {
        Swal.fire(
            'Campo obrigatório vazio.',
            'Preencha todos os campos para continuar!',
            'error'
        );
    } else {
        fetch("/laboratorios/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nomeLabServer: nomeLabVAR,
                numLabServer: numLabVAR,
                respLabServer: respLabVAR,
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
                listarLabs();
                fecharModal();
            } else {
                throw ("houve um erro ao tentar se cadastrar");
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });

    }
}

function atualizar(idLab) {
    var nomeLabVAR = ipt_nomeLab.value;
    var numLabVAR = ipt_numLab.value;
    var respLabVAR = ipt_respLab.value;

    if (nomeLabVAR == "" || numLabVAR == "" || respLabVAR == "") {
        Swal.fire(
            'Campo obrigatório vazio.',
            'Preencha todos os campos para continuar!',
            'error'
        );
    } else {
        fetch(`/laboratorios/atualizar/${idLab}/${sessionStorage.ID_INSTITUICAO}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nomeLabServer: nomeLabVAR,
                numLabServer: numLabVAR,
                respLabServer: respLabVAR
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
                listarLabs();
                fecharModal();
            } else {
                throw ("houve um erro ao tentar se cadastrar");
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });

    }
}

function excluirLab(idLab) {
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
            fetch(`/laboratorios/preDelete/${idLab}/${sessionStorage.ID_INSTITUICAO}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
            }).then(function (resposta) {
                if (resposta.ok) {
                    console.log("atualizei");
                    fetch(`/laboratorios/deletar/${idLab}/${sessionStorage.ID_INSTITUICAO}`, {
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
                            listarLabs();
                        } else if (resposta.status == 404) {
                            window.alert("Deu 404!");
                        } else {
                            Swal.fire({
                                position: 'center',
                                icon: 'error',
                                title: 'Erro ao deletar laboratório',
                                text: 'Possivelmente há maquinas vinculadas a esse laboratório, é necessário desassocia-las para poder exclui-lo.',
                                showConfirmButton: false,
                                timer: 1700
                            })
                            throw ("Houve um erro ao tentar deletar o campo! Código da resposta: " + resposta.status);
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
    })
}

function abrirModalCardastarLab() {
    divModal.style.display = "flex";

    divModal.innerHTML = `
        <div class="containerModalLab">

            <!--  topo do pop up  -->
            <div class="topo">
                <div class="titulo"> Cadastro de Laboratório </div>
                <img class="botaoFechar" src="../assets/images/close-circle-twotone.png" alt="icon fechar" onclick="fecharModal()">
            </div>

            <!--  meio do pop up  -->
            <div class="meioPopUp">
                <div class="imagemLab">
                    <img  src="../assets/images/imagemLab.png" alt="">
                </div>
                <div class="campoInput">
                    <label for="">Nome do laboratório:</label>
                    <input id="ipt_nomeLab" placeholder="Ex: Informática" type="text">
                    <label for="">Numero da sala:</label>
                    <input id="ipt_numLab" placeholder="Ex: 1" type="number">
                    <label for="">Técnico responsável:</label>
                    <select id="ipt_respLab" type="text">
                        <option value="0" selected disabled>selecione...</option>
                    </select>
                </div>
            </div>

            <!--  fim do pop up  -->
            <div class="containerFinal">
                <button class="btnCadastrar" onclick="cadastrar()">cadastrar</button>
            </div>

        </div>
    `;

    fetch(`/usuarios/listarTecnicos/${sessionStorage.ID_INSTITUICAO}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                console.log("Nenhum resultado encontrado.");
                throw "Nenhum resultado encontrado!!";
            }

            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));

                for (let i = 0; i < resposta.length; i++) {
                    var usuario = resposta[i];

                    ipt_respLab.innerHTML += `
                        <option value="${usuario.idUsuario}">${usuario.nome}</option>
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

function abrirModalEditarLab(idLab) {
    divModal.style.display = "flex";

    fetch(`/laboratorios/buscarLab/${idLab}/${sessionStorage.ID_INSTITUICAO}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                console.log("Nenhum resultado encontrado.");
                throw "Nenhum resultado encontrado!!";
            }

            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));
                var laboratorio = resposta[0];

                divModal.innerHTML = `
                    <div class="containerModalLab">

                        <!--  topo do pop up  -->
                        <div class="topo">
                            <div class="titulo"> Atualizar Laboratório </div>
                            <img class="botaoFechar" src="../assets/images/close-circle-twotone.png" alt="icon fechar" onclick="fecharModal()">
                        </div>

                        <!--  meio do pop up  -->
                        <div class="meioPopUp">
                            <div class="imagemLab">
                                <img  src="../assets/images/imagemLab.png" alt="">
                            </div>
                            <div class="campoInput">
                                <label for="">Nome do laboratório:</label>
                                <input id="ipt_nomeLab" placeholder="Ex: Informática" type="text" value="${laboratorio.nomeSala}">
                                <label for="">Numero da sala:</label>
                                <input id="ipt_numLab" placeholder="Ex: 1" type="number" value="${laboratorio.numeroSala}">
                                <label for="">Técnico responsável:</label>
                                <select id="ipt_respLab" type="text">
                                    <option value="0" disabled>selecione...</option>
                                </select>
                            </div>
                        </div>

                        <!--  fim do pop up  -->
                        <div class="containerFinal">
                            <button class="btnCadastrar" onclick="atualizar(${laboratorio.idLaboratorio})">Atualizar</button>
                        </div>

                    </div>
                `;

                fetch(`/usuarios/listarTecnicos/${sessionStorage.ID_INSTITUICAO}`).then(function (resposta) {
                    if (resposta.ok) {
                        if (resposta.status == 204) {
                            console.log("Nenhum resultado encontrado.");
                            throw "Nenhum resultado encontrado!!";
                        }

                        resposta.json().then(function (resposta) {
                            console.log("Dados recebidos: ", JSON.stringify(resposta));

                            for (let i = 0; i < resposta.length; i++) {
                                var usuario = resposta[i];

                                if (laboratorio.fkResponsavel == usuario.idUsuario) {
                                    ipt_respLab.innerHTML += `
                                        <option value="${usuario.idUsuario}" selected>${usuario.nome}</option>
                                    `;
                                } else {
                                    ipt_respLab.innerHTML += `
                                        <option value="${usuario.idUsuario}">${usuario.nome}</option>
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


function redirecionarParaLab(id) {
    window.location = `dashboardLaboratorio.html?id=${id}`
}
