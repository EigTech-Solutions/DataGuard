listarUsuarios();

function listarUsuarios() {
    fetch(`/usuarios/listar/${sessionStorage.ID_INSTITUICAO}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                console.log("Nenhum resultado encontrado.");
                throw "Nenhum resultado encontrado!!";
            }

            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));
                console.log(resposta);

                divCards.innerHTML = "";

                for (let i = 0; i < resposta.length; i++) {
                    var usuario = resposta[i];

                    var numCardExibido = i + 1;

                    if (numCardExibido < 10) {
                        numCardExibido = '0' + numCardExibido;
                    }


                    let admin;
                    let tec;

                    if (usuario.acessoAdmin == 0) {
                        admin = "Não"
                    } else {
                        admin = "Sim"
                    }

                    if (usuario.acessoTecnico == 0) {
                        tec = "Não"
                    } else {
                        tec = "Sim"
                    }

                    divCards.innerHTML += `
                        <div class="card-exibicao">
                            <div class="top-card">  
                                <span>${numCardExibido}</span>
                                <img src="../assets/images/ftUsuario.png" alt="icon laboratório">
                                <div class="btns-alteracoes">
                                    <button onclick="abrirModalEditarUser(${usuario.idUsuario})"><img src="../assets/images/bxs_edit.png" alt="icon editar"></button>
                                    <button onclick="excluirUser(${usuario.idUsuario})"><img src="../assets/images/ph_trash-duotone.png" alt="icon deletar"></button>
                                </div>
                            </div>
                            <h3>${usuario.nome}</h3>
                            <table>
                                <tr>
                                    <th class="th_user">Admin</th>
                                    <th class="th_user">Técnico</th>
                                    <th class="th_user">Email</th>
                                    <th class="th_user">Telefone</th>
                                </tr>
                                <tr>
                                    <td id="td_acesso_adm">${admin}</td>
                                    <td id="td_acesso_tec">${tec}</td>
                                    <td>${usuario.email}</td>
                                    <td>${usuario.telefone}</td>
                                </tr>
                            </table>
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
    var nomeVAR = ipt_nome.value
    var emailVAR = ipt_email.value
    var telefoneVAR = ipt_telefone.value
    var senhaVAR = ipt_senha.value
    var repetirSenhaVAR = ipt_repetirSenha.value
    var idInstituicaoVAR = sessionStorage.ID_INSTITUICAO;

    var tecnicoCheckbox = document.getElementById("tecnicoCheckbox");
    var adminCheckbox = document.getElementById("adminCheckbox");

    var isTecnico = tecnicoCheckbox.checked;
    var isAdmin = adminCheckbox.checked;

    if (nomeVAR == "" || emailVAR == "" || telefoneVAR == "" || senhaVAR == "" || repetirSenhaVAR == "") {
        Swal.fire(
            'Campo obrigatório vazio.',
            'Preencha todos os campos para continuar!',
            'error'
        );
    } else if (senhaVAR != repetirSenhaVAR) {
        Swal.fire(
            'Senhas não coincidem!',
            'Preencha novamente os campos para continuar!',
            'error'
        );
    } else {
        fetch("/usuarios/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nomeServer: nomeVAR,
                emailServer: emailVAR,
                telefoneServer: telefoneVAR,
                senhaServer: senhaVAR,
                idInstituicaoServer: idInstituicaoVAR,
            })
        }).then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (resposta) {
                    console.log(resposta);

                    if (isAdmin) {
                        fetch("/usuarios/cadastrarAcesso", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                idUserServer: resposta.insertId,
                                idInstituicaoServer: idInstituicaoVAR,
                                idAcessoServer: 2
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

                                listarUsuarios();
                                fecharModal();
                            } else {
                                throw ("houve um erro ao tentar se cadastrar");
                            }
                        }).catch(function (resposta) {
                            console.log(`#ERRO: ${resposta}`);
                        });
                    }

                    if (isTecnico) {
                        fetch("/usuarios/cadastrarAcesso", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                idUserServer: resposta.insertId,
                                idInstituicaoServer: idInstituicaoVAR,
                                idAcessoServer: 3
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
                                listarUsuarios();
                                fecharModal();
                            } else {
                                throw ("houve um erro ao tentar se cadastrar");
                            }
                        }).catch(function (resposta) {
                            console.log(`#ERRO: ${resposta}`);
                        });
                    }
                });
            } else {
                throw ("houve um erro ao tentar cadastrar");
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
    }
}

function atualizar(idUser) {
    var nomeVAR = ipt_nome.value
    var emailVAR = ipt_email.value
    var telefoneVAR = ipt_telefone.value
    var senhaVAR = ipt_senha.value
    var repetirSenhaVAR = ipt_repetirSenha.value
    var idInstituicaoVAR = sessionStorage.ID_INSTITUICAO;

    var tecnicoCheckbox = document.getElementById("tecnicoCheckbox");
    var adminCheckbox = document.getElementById("adminCheckbox");

    var isTecnico = tecnicoCheckbox.checked;
    var isAdmin = adminCheckbox.checked;

    if (nomeVAR == "" || emailVAR == "" || telefoneVAR == "" || senhaVAR == "" || repetirSenhaVAR == "") {
        Swal.fire(
            'Campo obrigatório vazio.',
            'Preencha todos os campos para continuar!',
            'error'
        );
    } else if (senhaVAR != repetirSenhaVAR) {
        Swal.fire(
            'Senhas não coincidem!',
            'Preencha novamente os campos para continuar!',
            'error'
        );
    } else {
        console.log(idUser, sessionStorage.ID_INSTITUICAO);
        fetch(`/usuarios/atualizar/${idUser}/${sessionStorage.ID_INSTITUICAO}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nomeServer: nomeVAR,
                emailServer: emailVAR,
                telefoneServer: telefoneVAR,
                senhaServer: senhaVAR,
            })
        }).then(function (resposta) {
            if (resposta.ok) {
                if (resposta.status === 200) {
                    fetch(`/usuarios/buscarUser/${idUser}/${sessionStorage.ID_INSTITUICAO}`).then(function (resposta) {
                        if (resposta.ok) {
                            if (resposta.status == 204) {
                                console.log("Nenhum resultado encontrado.");
                                throw "Nenhum resultado encontrado!!";
                            }

                            resposta.json().then(function (resposta) {
                                console.log("Dados recebidos: ", JSON.stringify(resposta));
                                var user = resposta[0];

                                if (isAdmin && user.acessoAdmin == 0) {
                                    fetch("/usuarios/cadastrarAcesso", {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json"
                                        },
                                        body: JSON.stringify({
                                            idUserServer: user.idUsuario,
                                            idInstituicaoServer: idInstituicaoVAR,
                                            idAcessoServer: 2
                                        })
                                    }).then(function (resposta) {
                                        if (resposta.ok) {
                                            Swal.fire({
                                                position: 'center',
                                                icon: 'success',
                                                title: 'Atualização realizada com sucesso!',
                                                showConfirmButton: true,
                                            });
                                            listarUsuarios();
                                        } else {
                                            throw ("houve um erro ao tentar se cadastrar");
                                        }
                                    }).catch(function (resposta) {
                                        console.log(`#ERRO: ${resposta}`);
                                    });
                                } else if (!isAdmin && user.acessoAdmin != 0) {
                                    var idAcesso = 2;
                                    fetch(`/usuarios/deletarAcesso/${idUser}/${idAcesso}/${sessionStorage.ID_INSTITUICAO}`, {
                                        method: "DELETE",
                                        headers: {
                                            "Content-Type": "application/json"
                                        }
                                    }).then(function (resposta) {
                                        if (resposta.ok) {
                                            Swal.fire({
                                                position: 'center',
                                                icon: 'success',
                                                title: 'Atualização realizada com sucesso!',
                                                showConfirmButton: true,
                                            });
                                            listarUsuarios();
                                        } else if (resposta.status == 404) {
                                            window.alert("Deu 404!");
                                        } else {
                                            throw ("Houve um erro ao tentar deletar o campo! Código da resposta: " + resposta.status);
                                        }
                                    }).catch(function (resposta) {
                                        console.log(`#ERRO: ${resposta}`);
                                    });
                                }

                                if (isTecnico && user.acessoTecnico == 0) {
                                    fetch("/usuarios/cadastrarAcesso", {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json"
                                        },
                                        body: JSON.stringify({
                                            idUserServer: user.idUsuario,
                                            idInstituicaoServer: idInstituicaoVAR,
                                            idAcessoServer: 3
                                        })
                                    }).then(function (resposta) {
                                        if (resposta.ok) {
                                            Swal.fire({
                                                position: 'center',
                                                icon: 'success',
                                                title: 'Atualização realizada com sucesso!',
                                                showConfirmButton: true,
                                            });
                                            listarUsuarios();
                                        } else {
                                            throw ("houve um erro ao tentar se cadastrar");
                                        }
                                    }).catch(function (resposta) {
                                        console.log(`#ERRO: ${resposta}`);
                                    });
                                } else if (!isTecnico && user.acessoTecnico != 0) {
                                    var idAcesso = 3;
                                    fetch(`/usuarios/deletarAcesso/${idUser}/${idAcesso}/${sessionStorage.ID_INSTITUICAO}`, {
                                        method: "DELETE",
                                        headers: {
                                            "Content-Type": "application/json"
                                        }
                                    }).then(function (resposta) {
                                        if (resposta.ok) {
                                            Swal.fire({
                                                position: 'center',
                                                icon: 'success',
                                                title: 'Atualização realizada com sucesso!',
                                                showConfirmButton: true,
                                            });
                                            listarUsuarios();
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
                        } else {
                            throw ('Houve um erro na API!');
                        }
                    }).catch(function (resposta) {
                        console.error(resposta);
                        // finalizarAguardar();
                    });
                }
            } else {
                throw ("houve um erro ao tentar cadastrar");
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
    }

    fecharModal();
}

function excluirUser(idUser) {
    Swal.fire({
        title: 'Tem certeza que deseja excluir esse usuário?',
        text: "Após excluído você irá perder todos os dados referentes a esse usuário! Essa ação não poderá ser desfeita.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, deletar!',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`/usuarios/deletar/${idUser}/${sessionStorage.ID_INSTITUICAO}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(function (resposta) {
                if (resposta.ok) {
                    Swal.fire(
                        'Deletado!',
                        'Usuário excluído com sucesso!',
                        'success'
                    );
                    listarUsuarios();
                } else if (resposta.status == 404) {
                    window.alert("Deu 404!");
                } else {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Erro ao deletar usuário',
                        text: 'Possivelmente esse usuário está vinculado a outros objetos do sistema (como algum laboratório) desassocie primeiro para poder exclui-lo',
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

function abrirModalCardastarUser() {
    divModal.style.display = "flex";

    divModal.innerHTML = `
        <div class="containerModalUser">
            <!--  topo do pop up  -->
            <div class="topo">
                <div class="titulo"> Cadastro de usuário </div>
                <img class="botaoFechar" src="../assets/images/close-circle-twotone.png" alt="icon fechar" onclick="fecharModal()">
            </div>

            <!--  meio do pop up  -->
            <div class="meioPopUp">
                <div class="divImagemUsuario">
                    <img class="imagemUsuario" src="../assets/images/ftUsuario.png" alt="">
                </div>
                <div class="campoInput">
                    <label for="">Nome:</label>
                    <input placeholder="ex: enzin" id="ipt_nome" type="text">
                    <label for="">Email:</label>
                    <input placeholder="ex: enzin@gmail.com" id="ipt_email" type="text">
                    <label for="">Telefone:</label>
                    <input placeholder="(11) 91234-5678" id="ipt_telefone" type="number">
                    <label for="">Acessos:</label>
                    <div class="checkboxs">
                        <input type="checkbox" id="adminCheckbox"> Administrador
                        <input type="checkbox" id="tecnicoCheckbox"> Técnico
                    </div>
                    
                </div>
            </div>
    
    
            <!--  senha e repetir senha  -->
            <div class="campoInputSenha">
                <div class="senha">
                    <label for="">Senha:</label> <br>
                    <input placeholder="*******" id="ipt_senha" type="password">
                </div>
                <div class="senha">
                    <label for="">Repetir senha:</label> <br>
                    <input placeholder="*******" id="ipt_repetirSenha" type="password">
                </div>
            </div>

            <!--  fim do pop up  -->
            <div class="containerFinal">
                <button class="btnCadastrar" onclick="cadastrar()">Cadastrar</button>
            </div>
        </div>
    `;
}

function abrirModalEditarUser(idUser) {
    divModal.style.display = "flex";

    fetch(`/usuarios/buscarUser/${idUser}/${sessionStorage.ID_INSTITUICAO}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                console.log("Nenhum resultado encontrado.");
                throw "Nenhum resultado encontrado!!";
            }

            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));
                var user = resposta[0];

                divModal.innerHTML = `
                    <div class="containerModalUser">
                        <!--  topo do pop up  -->
                        <div class="topo">
                            <div class="titulo"> Atualizar usuário </div>
                            <img class="botaoFechar" src="../assets/images/close-circle-twotone.png" alt="icon fechar" onclick="fecharModal()">
                        </div>

                        <!--  meio do pop up  -->
                        <div class="meioPopUp">
                            <div class="divImagemUsuario">
                                <img class="imagemUsuario" src="../assets/images/ftUsuario.png" alt="">
                            </div>
                            <div class="campoInput">
                                <label for="">Nome:</label>
                                <input placeholder="Ex: enzin" id="ipt_nome" type="text" value="${user.nome}">
                                <label for="">Email:</label>
                                <input placeholder="Ex: enzin@gmail.com" id="ipt_email" type="text" value="${user.email}">
                                <label for="">Telefone:</label>
                                <input placeholder="(11) 91234-5678" id="ipt_telefone" type="number" value="${user.telefone}">
                                <label for="">Acessos:</label>
                                <div class="checkboxs">
                                    <input type="checkbox" id="adminCheckbox"> Administrador
                                    <input type="checkbox" id="tecnicoCheckbox"> Técnico
                                </div>
                                
                            </div>
                        </div>
                
                
                        <!--  senha e repetir senha  -->
                        <div class="campoInputSenha">
                            <div class="senha">
                                <label for="">Reset de senha:</label> <br>
                                <input placeholder="*******" id="ipt_senha" type="password" value="${user.senha}">
                            </div>
                            <div class="senha">
                                <label for="">Repetir nova senha:</label> <br>
                                <input placeholder="*******" id="ipt_repetirSenha" type="password" value="${user.senha}">
                            </div>
                        </div>

                        <!--  fim do pop up  -->
                        <div class="containerFinal">
                            <button class="btnCadastrar" onclick="atualizar(${user.idUsuario})">Atualizar</button>
                        </div>
                    </div>
                `;

                if (user.acessoAdmin != 0) {
                    adminCheckbox.checked = true;
                }

                if (user.acessoTecnico != 0) {
                    tecnicoCheckbox.checked = true;
                }

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