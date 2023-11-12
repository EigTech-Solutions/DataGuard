const dataAtual = new Date();
const anoAtual = dataAtual.getFullYear();
const mesAtual = dataAtual.getMonth() + 1;

iptAno.value = anoAtual;

const selectMes = document.getElementById("iptMes");
    
// Iterar sobre as opções e selecionar a que corresponde ao mês atual
for (let i = 0; i < selectMes.options.length; i++) {
    if (parseInt(selectMes.options[i].value) === mesAtual) {
        selectMes.options[i].selected = true;
        break;
    }
}

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

                iptLab.innerHTML += `
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

function abrirModalRelatorio() {
    divModal.style.display = "flex";
    
    
}

function gerarRelatorio() {
    
}

function fecharModal() {
    divModal.style.display = "none";
}