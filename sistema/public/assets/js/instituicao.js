function cadastrar() {
    var nomeInstVAR = ipt_nomeInst.value;
    var cnpjInstbVAR = ipt_cnpjInst.value;
    var emailInstbVAR = ipt_emailInst.value;
    var telefoneInstbVAR = ipt_telefoneInst.value;
    var cepInstbVAR = ipt_cepeInst.value;
    var numeroInstbVAR = ipt_numeroInst.value;
    var complementoInstbVAR = ipt_complementoInst.value;

    var idInstituicaoVAR = sessionStorage.ID_INSTITUICAO;

    if (nomeInstVAR == "" || cnpjInstbVAR == "" || emailInstbVAR == ""
        || telefoneInstbVAR == "" || cepInstbVAR == "" || numeroInstbVAR == "") {
        Swal.fire(
            'Campo obrigatório vazio.',
            'Preencha todos os campos para continuar!',
            'error'
        );
    } else if (telefoneInstbVAR.length > 14) {
        Swal.fire(
            'Número de telefone inválido.',
            'Preencha corretamente para continuar!',
            'error'
        );
    } else if (cnpjInstbVAR.length != 14) {
        Swal.fire(
            'Número de CNPJ inválido.',
            'Preencha corretamente para continuar!',
            'error'
        );
    } else if (cepInstbVAR.length != 8) {
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
                complementoInstServer: complementoInstbVAR

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
                fecharModal();
            } else {
                Swal.fire(
                    'Ocorreu um erro ao cadastrar.',
                    'Tente novamente mais tarde',
                    'error'
                );
                throw ("houve um erro ao tentar se cadastrar");
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });

    }
}
function abrirModalCardastarInstituicao() {
    divModal.style.display = "flex";

    divModal.innerHTML = `
        <div class="containerModalInst">
            <!--  topo do pop up  -->
            <div class="topo">
                <div class="titulo"> Cadastro de Instituição </div>
                <img class="botaoFechar" src="../assets/images/close-circle-twotone.png" alt="icon fechar" onclick="fecharModal()">
            </div>
            <!--  meio do pop up  -->
            <div class="meioPopUp">
                <div class="imagemLab">
                    <img  src="../assets/images/imagemLab.png" alt="">
                </div>
                <div class="campoInput">
                    <label for="">Nome da Instituição:</label>
                    <input id="ipt_nomeInst" type="text">
                    <label for="">CNPJ:</label>
                    <input id="ipt_cnpjInst" type="number">
                    <label for="">Email:</label>
                    <input id="ipt_emailInst" type="text">
                    <label for="">Telefone:</label>
                    <input id="ipt_telefoneInst" type="number">
                    <label for="">CEP:</label>
                    <input id="ipt_cepeInst" type="number">
                    <label for="">Numero do endereço:</label>
                    <input id="ipt_numeroInst" type="number">
                    <label for="">Complemento:</label>
                    <input id="ipt_complementoInst" type="text">
                </div>
            </div>
            <!--  fim do pop up  -->
            <div class="containerFinal">
                <button class="btnCadastrar" onclick="cadastrar()">cadastrar</button>
            </div>
        </div>
    `;
}

function fecharModal() {
    divModal.style.display = "none";
}

function dadosDashboard() {
    fetch(`/instituicao/puxarDados`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (dados) {

                mostrarDados(dados)

            });
        } else {
            console.error('Nenhuma tarefa encontrada ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados: ${error.message}`);
        });
}
dadosDashboard()

function mostrarDados(dados) {
    for (i = 0; i < dados.length; i++) {
        var totalInstituicoes = dados[i].quantidade_total_instituicoes;
        totalClasse.innerHTML = `${totalInstituicoes}`
    }
}
function dadosInstituicao() {
    fetch(`/instituicao/dadosInstituicao`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (informacao) {

                mostrarInformacao(informacao)


            });
        } else {
            console.error('Nenhuma informaçao encontrada ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados: ${error.message}`);
        });
}
dadosInstituicao()


function mostrarInformacao(informacao) {
    for (i = 0; i < informacao.length; i++) {
        var nomeInstituicao = informacao[i].nomeInstitucional;
        blocoDeDado.innerHTML += 
        `<div class="Instituicoes">
            ${nomeInstituicao}
         </div>`
        console.log("for")
    }
}

function dadosGeraisInst() {
    fetch(`/instituicao/dadosGeraisInst`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (dadosPuxados) {
                console.log("Response -> " + response[0].cnpj)
                console.log("DadosPuxados -> " + dadosPuxados[0].cnpj)
                mostrarInf(dadosPuxados)

            });
        } else {
            console.error('Nenhuma informaçao encontrada ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados: ${error.message}`);
        });
}
dadosGeraisInst()

function mostrarInf(dadosPuxados) {
    for (i = 0; i < dadosPuxados.length; i++) {
        var nomeInstituicao = dadosPuxados[i].nomeInstitucional;
        var cnpj = dadosPuxados[i].cnpj;
        var email = dadosPuxados[i].email;
        var telefone = dadosPuxados[i].telefone;
        var cep = dadosPuxados[i].cep;
        var numeroEndereco = dadosPuxados[i].numeroEndereco;
        var complemento = dadosPuxados[i].complemento;

        todasInst.innerHTML += `
                        <div>
                            <p>Nome: ${nomeInstituicao}</p>
                            <p>CNPJ: ${cnpj}</p>
                            <p>Email: ${email}</p>
                            <p>Telefone: ${telefone}</p>
                            <p>CEP: ${cep}</p>
                            <p>Número do Endereço: ${numeroEndereco}</p>
                            <p>Complemento: ${complemento}</p>
                        </div>
                    `;
                    console.log("inner")
    }
}

function pesquisarInstituicao(dadosPuxados){
    var busca = input_busca.value;

    for (i = 0; i < dadosPuxados.length; i++) {
        var nomeInstituicao = dadosPuxados[i].nomeInstitucional;
        var nomes = []
        nomes.push(nomeInstituicao);
        console.log(nomes)

    }
}