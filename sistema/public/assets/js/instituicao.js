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
        }).finally(function() {
            setTimeout(function() {
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
                    <label for="">Nome da Instituição:</label>
                    <input id="ipt_nomeInst" type="text">
                    <label for="">CNPJ:</label>
                    <input id="ipt_cnpjInst" type="number">
                    <label for="">Email:</label>
                    <input id="ipt_emailInst" type="text">
                    <label for="">Telefone:</label>
                    <input id="ipt_telefoneInst" type="text">
                    <label for="">CEP:</label>
                    <input id="ipt_cepeInst" type="text">
                    <label for="">Numero do endereço:</label>
                    <input id="ipt_numeroInst" type="text">
                    <label for="">Complemento:</label>
                    <input id="ipt_complementoInst" type="text">
                </div>
            </div>
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
            console.error('Nenhuma informação encontrada ou erro na API');
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
      <div class="titulo-rotulo">
        <div class="modal-body">
          <p>Nome</p>
          <p>CNPJ</p>
          <p>Email</p>
          <p>Telefone</p>
          <p>CEP</p>
          <p>Número do Endereço</p>
          <p>Complemento</p>
        </div>
      </div>
      <div class="scrollDoModal">
        <div id="blocoDeDados"></div>
      </div>
    </div>
    `;
    blocoDeDados.innerHTML = '';

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

    const overlay = document.querySelector('.modal-overlay');
    if (overlay) {
        overlay.parentNode.removeChild(overlay);
    }

    divModalDetalhado.style.display = "none";
}