function cadastrar() {
    var nomeInstVAR = ipt_nomeInst.value;
    var cnpjInstbVAR = ipt_cnpjInst.value;
    var emailInstbVAR = ipt_emailInst.value;
    var telefoneInstbVAR = ipt_telefoneInst.value;
    var cepInstbVAR = ipt_cepeInst.value;
    var numeroInstbVAR = ipt_numeroInst.value;
    var complementoInstbVAR = ipt_complementoInst.value;

    if (nomeInstVAR == "" || cnpjInstbVAR == "" || emailInstbVAR == ""
        || telefoneInstbVAR == "" || cepInstbVAR == "" || numeroInstbVAR == "") {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Erro ao Realizar Cadastro!',
                text: 'Preencha os campos em branco...',
                showConfirmButton: false,
                timer: 3000
            });
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
        var dataAtual = new Date();
        var dia = dataAtual.getDate();
        var mes = dataAtual.getMonth() + 1;
        var ano = dataAtual.getFullYear();
        var dataFormatada = `${ano}-${mes}-${dia}`;

        console.log("Entrei no else");

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
                dataCadastroInstServer: dataFormatada
            })
        }).then(function (resposta) {
            console.log("entrei no fetch")
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
                throw ("houve um erro ao tentar se cadastrar");
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        }).finally(function() {
            setTimeout(function() {
                location.reload();
            }, 2000);
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
    blocoDeDado.innerHTML = '';

    for (i = 0; i < informacao.length; i++) {
        var nomeInstituicao = informacao[i].nomeInstitucional;
        blocoDeDado.innerHTML += 
        `<div class="Instituicoes" data-nome="${nomeInstituicao}">
            ${nomeInstituicao}
         </div>`;
        console.log("for");
    }
}

function pesquisarInstituicao() {
    var busca = input_busca.value.toLowerCase();

    var instituicoes = document.querySelectorAll('.Instituicoes');

    instituicoes.forEach(function (instituicao) {
        var nome = instituicao.getAttribute('data-nome').toLowerCase();

        if (nome.includes(busca)) {
            instituicao.style.display = 'block';
        } else {
            instituicao.style.display = 'none';
        }
    });
}

function dadosGeraisInst() {
    fetch(`/instituicao/dadosGeraisInst`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (dadosPuxados) {
                // console.log("Response -> " + response[0].cnpj)
                // console.log("DadosPuxados -> " + dadosPuxados[0].cnpj)
                abrirModalExbirInfosDetalhadas(dadosPuxados); // Passa os dados para a função
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

    // Criar a sobreposição do modal
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    document.body.appendChild(overlay);
    divModalDetalhado.style.display = "flex";

    divModalDetalhado.innerHTML = `
    <!-- Modal Detalhado -->
    <div id="modalDetalhado">
      <div class="modal-header">
        <h2>Informações das Instituições</h2>
        <button onclick="fecharModalDetalhado()" id="close-modal">Fechar</button>
      </div>
      <div class="titulo-rotulo">
      <div class="modal-body">
        <p>
          Nome
        </p>
        <p>
          CNPJ
        </p>
        <p>
          Email
        </p>
        <p>
          Telefone
        </p>
        <p>
          CEP
        </p>
        <p>
          Número do Endereço
        </p>
        <p>
          Complemento
        </p>
      </div>
      </div>
      <div class="scrollDoModal">
      <div id="blocoDeDados"></div>
      </div>
    </div>
    `;
    blocoDeDados.innerHTML = '';
    console.log("eeeeeee");
    for (i = 0; i < dadosPuxados.length; i++) {
        var nomeInstituicao = dadosPuxados[i].nomeInstitucional;
        var cnpj = dadosPuxados[i].cnpj;
        var email = dadosPuxados[i].email;
        var telefone = dadosPuxados[i].telefone;
        var cep = dadosPuxados[i].cep;
        var numeroEndereco = dadosPuxados[i].numeroEndereco;
        var complemento = dadosPuxados[i].complemento;
    
        blocoDeDados.innerHTML += `
        <div class="modal-body-info">
          <p>${nomeInstituicao}</p>
          <p class="tom">${cnpj}</p>
          <p class="emailModal">${email}</p>
          <p class="tom">${telefone}</p>
          <p>${cep}</p>
          <p class="tom">${numeroEndereco}</p>
          <p>${complemento}</p>
        </div>`;
    }
    
}

function fecharModalDetalhado() {
    document.body.classList.remove('modal-open');

    // Remover a sobreposição do modal
    const overlay = document.querySelector('.modal-overlay');
    if (overlay) {
        overlay.parentNode.removeChild(overlay);
    }

    divModalDetalhado.style.display = "none";
}