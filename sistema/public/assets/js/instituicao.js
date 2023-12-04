function cadastrar() {
    var nomeInstVAR = ipt_nomeInst.value;
    var cnpjInstbVAR = ipt_cnpjInst.value;
    var emailInstbVAR = ipt_emailInst.value;
    var telefoneInstbVAR = ipt_telefoneInst.value;
    var cepInstbVAR = ipt_cepeInst.value;
    var numeroInstbVAR = ipt_numeroInst.value;
    var complementoInstbVAR = ipt_complementoInst.value;

    if (nomeInstVAR.trim() === "" || cnpjInstbVAR.trim() === "" || emailInstbVAR.trim() === ""
        || telefoneInstbVAR.trim() === "" || cepInstbVAR.trim() === "" || numeroInstbVAR.trim() === "") {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Erro ao Realizar Cadastro!',
            text: 'Preencha todos os campos obrigatórios.',
            showConfirmButton: false,
            timer: 3000
        });
    } else if (telefoneInstbVAR.length > 14 || telefoneInstbVAR.length < 10) {
        Swal.fire(
            'Número de telefone inválido.',
            'Preencha corretamente para continuar!',
            'error'
        );
    } else if (!validarCNPJ(cnpjInstbVAR)) {
        Swal.fire(
            'Número de CNPJ inválido.',
            'Preencha corretamente para continuar!',
            'error'
        );
    } else if (cepInstbVAR.length !== 8) {
        Swal.fire(
            'Número de CEP inválido.',
            'Preencha corretamente para continuar!',
            'error'
        );
    } else {
        fetch("/instituicao/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nomeInstServer: nomeInstVAR,
                cnpjInstServer: cnpjInstbVAR,
                emailInstServer: emailInstbVAR,
                telefoneInstServer: telefoneInstbVAR,
                cepInstServer: cepInstbVAR,
                numeroInstServer: numeroInstbVAR,
                complementoInstServer: complementoInstbVAR,
            })
        }).then(function (resposta) {
            if (resposta.ok) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Cadastro Realizado com Sucesso!',
                    text: 'Autenticando Informações...',
                    showConfirmButton: false,
                    timer: 2000
                });
                fecharModal();
            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Ocorreu um erro ao realizar o cadastro!',
                    text: 'Realize alterações...',
                    showConfirmButton: false,
                    timer: 2000
                });
                throw ("Houve um erro ao tentar se cadastrar");
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        }).finally(function () {
            setTimeout(function () {
                location.reload();
            }, 2000);
        });
    }
}

function validarCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj.length !== 14) return false;

    if (/^(\d)\1+$/.test(cnpj)) return false;

    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    const digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
    }

    let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

    if (resultado != digitos.charAt(0)) return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
    }

    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

    return (resultado == digitos.charAt(1));
}

function abrirModalCardastarInstituicao() {
    divModal.style.display = "flex";

    divModal.innerHTML = `
    <div class="posicaoInst">
        <div class="containerModalInst">
            <div class="topo">
                <div class="titulo"> Cadastro de Instituição </div>
                <img class="botaoFechar" src="../assets/images/close-circle-twotone.png" alt="icon fechar" onclick="fecharModal()">
            </div>
            <div class="meioPopUp">
                <div class="imagemLab">
                    <img  src="../assets/images/imagemLab.png" alt="">
                </div>
                <div class="campoInput">
                    <label for="">Nome da Instituição :</label>
                    <input id="ipt_nomeInst" type="text"
                    placeholder="ex: etec exemplo">
                    <label for="">CNPJ :</label>
                    <input id="ipt_cnpjInst" type="number"
                    placeholder="00000000000000">
                    <label for="">Email :</label>
                    <input id="ipt_emailInst" type="text"
                    placeholder="etec_exemplo@cps.sp.gov.br">
                    <label for="">Telefone :</label>
                    <input id="ipt_telefoneInst" type="text"
                    placeholder="(11) 95581-2133">
                    <label for="">CEP :</label>
                    <input id="ipt_cepeInst" type="text"
                    placeholder="00000000">
                    <label for="">Numero do endereço :</label>
                    <input id="ipt_numeroInst" type="text"
                    placeholder="000">
                    <label for="">Complemento :</label>
                    <input id="ipt_complementoInst" type="text"
                    placeholder="Próximo ao mêtro">
                </div>
            </div>
            <div class="containerFinal">
                <button class="btnCadastrar" onclick="cadastrar()">cadastrar</button>
            </div>
        </div>
    </div>
    `;
}

function cadastrarUser() {
    var nomeVAR = ipt_nome.value
    var emailVAR = ipt_email.value
    var telefoneVAR = ipt_telefone.value
    var senhaVAR = ipt_senha.value
    var repetirSenhaVAR = ipt_repetirSenha.value
    var idInstituicaoVAR = ipt_instituicao.value;

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
                                    showConfirmButton: false,
                                    // timer: 1500
                                });

                                listarUsuarios();
                                fecharModal();
                                setTimeout(function () {
                                    location.reload()
                                }, 2000);
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
                                    showConfirmButton: false,
                                    // timer: 1500
                                });
                                fecharModal();
                                setTimeout(function () {
                                    location.reload()
                                }, 2000);
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

function abrirModalCardastarUser() {
    divModal.style.display = "flex";

    divModal.innerHTML = `
    <div class="posicao">
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
                    <label for="">Nome :</label>
                    <input placeholder="ex: enzin" id="ipt_nome" type="text">
                    <label for="">Email :</label>
                    <input placeholder="ex: enzin@gmail.com" id="ipt_email" type="text">
                    <label for="">Telefone :</label>
                    <input placeholder="(11) 91234-5678" id="ipt_telefone" type="number">
                    <label for="">Acessos :</label>
                    <div class="checkboxs">
                        <input type="checkbox" id="adminCheckbox"> <label for="adminCheckbox">Administrador</label>
                        <input type="checkbox" id="tecnicoCheckbox"> <label for="tecnicoCheckbox">Técnico</label>
                    </div>
                    
                </div>
            </div>
    
    
            <!--  senha e repetir senha  -->
            <div class="campoInputSenha">
                <div class="senha">
                    <label for="">Senha :</label> <br>
                    <input placeholder="*******" id="ipt_senha" type="password">
                </div>
                <div class="senha">
                    <label for="">Repetir senha :</label> <br>
                    <input placeholder="*******" id="ipt_repetirSenha" type="password">
                </div>
            </div>

            <div class="campoInstituicao">
                <label for="">Instituição :</label> <br>
                <select name="ipt_instituicao" id="ipt_instituicao">
                    <option value="0" selected disabled>Selecione...</option>
                </select>
            </div>

            <!--  fim do pop up  -->
            <div class="containerFinal">
                <button class="btnCadastrar" onclick="cadastrarUser()">Cadastrar</button>
            </div>
        </div>
    </div>
    `;
    exibirSelect()
}
function exibirSelect() {
    fetch(`/instituicao/dadosGeraisInst`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                console.log("Nenhum resultado encontrado.");
                throw "Nenhum resultado encontrado!!";
            }

            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));

                for (let i = 0; i < resposta.length; i++) {
                    console.log('oieeeeeeeeeee');
                    var instituicao = resposta[i];

                    ipt_instituicao.innerHTML += `
                            <option value="${instituicao.idInstitucional}">${instituicao.nomeInstitucional}</option>
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

function fecharModal() {
    divModal.style.display = "none";
}

function dadosInstituicao() {
    fetch(`/instituicao/dadosInstituicao`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (informacao) {
                mostrarInformacao(informacao);
            });
        } else {
            console.error('Nenhuma informação encontrada ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados: ${error.message}`);
        });
}

dadosInstituicao();

function mostrarInformacao(informacao) {
    blocoDeDado.innerHTML = '';

    for (let i = 0; i < informacao.length; i++) {
        const nomeInstituicao = informacao[i].nomeInstitucional;
        const idInstitucional = informacao[i].idInstitucional;

        const divElement = document.createElement('div');
        divElement.classList.add('Instituicoes');
        divElement.setAttribute('data-nome', nomeInstituicao);
        divElement.innerHTML = `
            ${nomeInstituicao}
            <div class="imgClass">
            <img src="../assets/images/ph_trash-duotone.png" data-action="excluir" id="${idInstitucional}" alt="">
            <img src="../assets/images/bxs_edit.png" data-action="editar" id="${idInstitucional}" alt="">
            </div>        
            `;

        const imgExcluir = divElement.querySelector('img[data-action="excluir"]');
        const imgEditar = divElement.querySelector('img[data-action="editar"]');

        imgExcluir.addEventListener('click', function () {
            executarAcao(idInstitucional, 'excluir');
        });

        imgEditar.addEventListener('click', function () {
            executarAcao(idInstitucional, 'editar');
        });

        blocoDeDado.appendChild(divElement);
    }
}

function executarAcao(idInstitucional, acao) {
    if (acao === 'excluir') {
        excluirInstituicao(idInstitucional);
    } else if (acao === 'editar') {
        abrirModalEditarInstituicao(idInstitucional)
    }
}

function excluirInstituicao(idInstitucional) {
    console.log(idInstitucional);
    Swal.fire({
        title: 'Tem certeza que deseja excluir essa instituição?',
        text: "Após excluído você irá perder todos os dados referentes a essa instituição! Essa ação não poderá ser desfeita.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, deletar!',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            console.log("entrei no if do primeiro then");
            fetch(`/instituicao/deletarInstituicao/${idInstitucional}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(function (resposta) {
                if (resposta.ok) {
                    Swal.fire(
                        'Deletado!',
                        'Instituição excluída com sucesso!',
                        'success'
                    );
                    setTimeout(function () {
                        location.reload();
                    }, 1000);
                    return resposta.json();
                } else {
                    Swal.fire(
                        'Erro!',
                        'Houve um erro ao excluir a instituição.',
                        'error'
                    );
                    throw new Error(`Erro na exclusão: ${resposta.status}`);
                }
            })
        }
    });
}

function editarInstituicao(idInstitucional) {
    var nomeInstVAR = ipt_nomeInst.value;
    var cnpjInstbVAR = ipt_cnpjInst.value;
    var emailInstbVAR = ipt_emailInst.value;
    var telefoneInstbVAR = ipt_telefoneInst.value;
    var cepInstbVAR = ipt_cepeInst.value;
    var numeroInstbVAR = ipt_numeroInst.value;
    var complementoInstbVAR = ipt_complementoInst.value;

    if (nomeInstVAR.trim() === "" || cnpjInstbVAR.trim() === "" || emailInstbVAR.trim() === ""
        || telefoneInstbVAR.trim() === "" || cepInstbVAR.trim() === "" || numeroInstbVAR.trim() === "") {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Erro ao Realizar Cadastro!',
            text: 'Preencha todos os campos obrigatórios.',
            showConfirmButton: false,
            timer: 3000
        });
    } else if (telefoneInstbVAR.length > 14 || telefoneInstbVAR.length < 10) {
        Swal.fire(
            'Número de telefone inválido.',
            'Preencha corretamente para continuar!',
            'error'
        );
    } else if (!validarCNPJ(cnpjInstbVAR)) {
        Swal.fire(
            'Número de CNPJ inválido.',
            'Preencha corretamente para continuar!',
            'error'
        );
    } else if (cepInstbVAR.length !== 8) {
        Swal.fire(
            'Número de CEP inválido.',
            'Preencha corretamente para continuar!',
            'error'
        );
    } else {
        fetch(`/instituicao/editarInstituicao/${idInstitucional}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nomeInstServer: nomeInstVAR,
                cnpjInstServer: cnpjInstbVAR,
                emailInstServer: emailInstbVAR,
                telefoneInstServer: telefoneInstbVAR,
                cepInstServer: cepInstbVAR,
                numeroInstServer: numeroInstbVAR,
                complementoInstServer: complementoInstbVAR,
            })
        }).then(function (resposta) {
            if (resposta.ok) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Cadastro Realizado com Sucesso!',
                    text: 'Autenticando Informações...',
                    showConfirmButton: false,
                    timer: 2000
                });
                fecharModal();
            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Ocorreu um erro ao realizar o cadastro!',
                    text: 'Realize alterações...',
                    showConfirmButton: false,
                    timer: 2000
                });
                throw ("Houve um erro ao tentar se cadastrar");
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        }).finally(function () {
            setTimeout(function () {
                location.reload();
            }, 2000);
        });
    }

    fecharModal();
}

function abrirModalEditarInstituicao(idInstitucional) {
    divModal.style.display = "flex";

    fetch(`/instituicao/buscarUser/${idInstitucional}/${sessionStorage.ID_INSTITUICAO}`).then(function (resposta) {
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

function pesquisarInstituicao() {
    var busca = input_busca_instituicao.value.toLowerCase();

    var instituicoes = document.querySelectorAll('.Instituicoes');

    instituicoes.forEach(function (instituicao) {
        var nome = instituicao.getAttribute('data-nome').toLowerCase();

        if (nome.includes(busca.trim())) {
            instituicao.style.display = 'flex';
        } else {
            instituicao.style.display = 'none';
        }
    });
}

function dadosGeraisInst() {
    fetch(`/instituicao/dadosGeraisInst`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (dadosPuxados) {
                abrirModalExbirInfosDetalhadas(dadosPuxados);
            });
        } else {
            console.error('Nenhuma informação encontrada ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados: ${error.message}`);
        });
}

function abrirModalExbirInfosDetalhadas(dadosPuxados) {
    document.body.classList.add('modal-open');

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    document.body.appendChild(overlay);
    divModalDetalhado.style.display = "flex";

    divModalDetalhado.innerHTML = `
        <div id="modalDetalhado">
            <div class="modal-header">
                <h2>Informações das Instituições</h2>
                <button onclick="fecharModalDetalhado()" id="close-modal">Fechar</button>
            </div>
            <div class="modal-body">
    <table id="idTabela">
        <thead>
            <tr class="linha-branca">
                <th>Nome</th>
                <th>CNPJ</th>
                <th>Email</th>
                <th>Telefone</th>
                <th>CEP</th>
                <th>Número</th>
                <th>Complemento</th>
            </tr>
        </thead>
        <tbody id="blocoDeDados" class="linha-colorida"></tbody>
    </table>
</div>

        </div>
    `;

    const blocoDeDados = document.getElementById('blocoDeDados');
    blocoDeDados.innerHTML = '';

    for (let i = 0; i < dadosPuxados.length; i++) {
        const nomeInstituicao = dadosPuxados[i].nomeInstitucional;
        const cnpj = dadosPuxados[i].cnpj;
        const email = dadosPuxados[i].email;
        const telefone = dadosPuxados[i].telefone;
        const cep = dadosPuxados[i].cep;
        const numeroEndereco = dadosPuxados[i].numeroEndereco;
        const complemento = dadosPuxados[i].complemento;

        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${nomeInstituicao}</td>
            <td>${cnpj}</td>
            <td>${email}</td>
            <td>${telefone}</td>
            <td>${cep}</td>
            <td>${numeroEndereco}</td>
            <td>${complemento}</td>
        `;

        newRow.classList.add(i % 2 === 0 ? 'linha-colorida' : 'linha-branca');

        blocoDeDados.appendChild(newRow);
    }
}

function fecharModalDetalhado() {
    document.body.classList.remove('modal-open');

    const overlay = document.querySelector('.modal-overlay');
    if (overlay) {
        overlay.parentNode.removeChild(overlay);
    }

    divModalDetalhado.style.display = "none";
}

function dadosUsuario() {
    fetch(`/instituicao/dadosUsuario`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (infoDados) {
                exibirInfoUser(infoDados);
            });
        } else {
            console.error('Nenhuma informação encontrada ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados: ${error.message}`);
        });
}

dadosUsuario();

function exibirInfoUser(infoDados) {
    blocoDeDadoUser.innerHTML = '';
    console.log(infoDados);
    for (let i = 0; i < infoDados.length; i++) {
        const nomeUser = infoDados[i].nome;
        const idUser = infoDados[i].idUsuario;
        const idInstitucional = infoDados[i].idInstitucional;

        const divElement = document.createElement('div');
        divElement.classList.add('Usuarios');
        divElement.setAttribute('data-nome', nomeUser);
        divElement.innerHTML = `
            ${nomeUser}
            <div class="imgClass">
            <img src="../assets/images/ph_trash-duotone.png" data-action="excluir" id="${idUser}" alt="">
            <img src="../assets/images/bxs_edit.png" data-action="editar" id="${idUser}" alt="">
            </div>
            `;

        const imgExcluir = divElement.querySelector('img[data-action="excluir"]');
        const imgEditar = divElement.querySelector('img[data-action="editar"]');

        imgExcluir.addEventListener('click', function () {
            executarAcaoUser(idUser, 'excluir');
        });

        imgEditar.addEventListener('click', function () {
            executarAcaoUser(idUser, idInstitucional, 'editar');
        });

        blocoDeDadoUser.appendChild(divElement);
    }
}

function executarAcaoUser(id, acao) {
    console.log(id, acao);
    if (acao === 'excluir') {
        excluirUser(id);
    } else if (acao === 'editar') {
        abrirModalEditarUser(idUser, idInstitucional);
    }
}

function excluirUser(idUser) {
    console.log(idUser);
    Swal.fire({
        title: 'Tem certeza que deseja excluir esse Usuário?',
        text: "Após excluído você irá perder todos os dados referentes a essa máquina! Essa ação não poderá ser desfeita.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, deletar!',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            console.log("entrei no if do primeiro then");
            fetch(`/instituicao/deletarUsuario/${idUser}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(function (resposta) {
                    if (resposta.ok) {
                        Swal.fire(
                            'Deletado!',
                            'Usuario excluído com sucesso!',
                            'success'
                        );
                        setTimeout(function () {
                            location.reload();
                        }, 1000);
                        return resposta.json();
                    } else {
                        Swal.fire(
                            'Erro!',
                            'Houve um erro ao excluir o usuario.',
                            'error'
                        );
                        throw new Error(`Erro na exclusão: ${resposta.status}`);
                    }
                })
        }
    });
}

function editarUser(idUser, idInstitucional) {
    var nomeVAR = ipt_nome.value
    var emailVAR = ipt_email.value
    var telefoneVAR = ipt_telefone.value
    var senhaVAR = ipt_senha.value
    var repetirSenhaVAR = ipt_repetirSenha.value
    var idInstituicaoVAR = id;

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

function abrirModalEditarUser(idUser, idInstitucional) {
    console.log('Esse é o id da Instituição', idInstitucional);
    console.log('Esse é o id do user', idUser);
    divModal.style.display = "flex";

    fetch(`/usuarios/buscarUser/${idUser}/${idInstitucional}`).then(function (resposta) {
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

function pesquisarUsuario() {
    var busca = input_busca_user.value.toLowerCase();

    var usuarios = document.querySelectorAll('.Usuarios');

    usuarios.forEach(function (usuario) {
        var nome = usuario.getAttribute('data-nome').toLowerCase();

        if (nome.includes(busca)) {
            usuario.style.display = 'flex';
        } else {
            usuario.style.display = 'none';
        }
    });
}

function dadosGeraisUser() {
    fetch(`/instituicao/dadosGeraisUser`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (puxarUser) {
                abrirModalExbirInfosDetalhadasUser(puxarUser);
            });
        } else {
            console.error('Nenhuma informação encontrada ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados: ${error.message}`);
        });
}

function abrirModalExbirInfosDetalhadasUser(puxarUser) {
    document.body.classList.add('modal-open');

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    document.body.appendChild(overlay);
    divModalDetalhado.style.display = "flex";

    divModalDetalhado.innerHTML = `
        <div id="modalDetalhado">
            <div class="modal-header">
                <h2>Informações das Instituições</h2>
                <button onclick="fecharModalDetalhado()" id="close-modal">Fechar</button>
            </div>
            <div class="modal-body">
    <table id="idTabela">
        <thead>
            <tr class="linha-branca">
                <th>Nome</th>
                <th>Email</th>
                <th>Senha</th>
                <th>Telefone</th>
            </tr>
        </thead>
        <tbody id="blocoDeDados" class="linha-colorida"></tbody>
    </table>
</div>

        </div>
    `;

    const blocoDeDados = document.getElementById('blocoDeDados');
    blocoDeDados.innerHTML = '';

    for (let i = 0; i < puxarUser.length; i++) {
        const nomeInstituicao = puxarUser[i].nome;
        const email = puxarUser[i].email;
        const senha = puxarUser[i].senha;
        const telefone = puxarUser[i].telefone;

        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${nomeInstituicao}</td>
            <td>${email}</td>
            <td>${senha}</td>
            <td>${telefone}</td>
        `;

        newRow.classList.add(i % 2 === 0 ? 'linha-colorida' : 'linha-branca');

        blocoDeDados.appendChild(newRow);
    }
}