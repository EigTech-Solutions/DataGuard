listarUsuarios();

function listarUsuarios() {
    fetch(`/usuarios/listar/${sessionStorage.ID_INSTITUICAO}`).then(function (resposta) {
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
                    var usuario = resposta[i];

                    var numCardExibido = i+1;

                    if (numCardExibido < 10) {
                        numCardExibido = '0' + numCardExibido;
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
                                    <td id="td_acesso_adm"></td>
                                    <td id="td_acesso_tec"></td>
                                    <td>${usuario.email}</td>
                                    <td>${usuario.telefone}</td>
                                </tr>
                            </table>
                        </div>
                    `;

                    if (usuario.acessoAdmin != 0) {
                        td_acesso_adm.innerHTML = `Sim`;
                    } else {
                        td_acesso_adm.innerHTML = `Não`;
                    }

                    if (usuario.acessoTecnico != 0) {
                        td_acesso_tec.innerHTML = `Sim`;
                    } else {
                        td_acesso_tec.innerHTML = `Não`;
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

function fecharModal(){
    divModal.style.display = "none";
}