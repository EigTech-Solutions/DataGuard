listarLabs();

function listarLabs() {
    
    for (let i = 0; i < 10; i++) {
        divCards.innerHTML += `
            <div class="card-exibicao">
                <div class="top-card">  
                    <span>${i+1}</span>
                    <img src="../assets/images/imagemLab.png" alt="icon laboratório">
                    <div class="btns-alteracoes">
                        <button onclick="abrirModalEditarLab()"><img src="../assets/images/bxs_edit.png" alt="icon editar"></button>
                        <button onclick="abrirModalExcluirLab()"><img src="../assets/images/ph_trash-duotone.png" alt="icon deletar"></button>
                    </div>
                </div>
                <h3>Laboratório ${i+1}</h3>
                <table>
                    <tr>
                        <th>Computadores</th>
                        <th>Alertas</th>
                        <th>Situação</th>
                    </tr>
                    <tr>
                        <td>40</td>
                        <td>2</td>
                        <td>OK</td>
                    </tr>
                </table>
                <button>ver mais</button>
            </div>
        `;
    }
    
}

function cadastrar() {
    var nomeLabVAR = ipt_nomeLab.value;
    var numLabVAR = ipt_numLab.value;
    var respLabVAR = ipt_respLab.value;
  
    
    if(nomeLabVAR == "" || numLabVAR == "" || respLabVAR == "" ){
        Swal.fire(
            'Campo obrigatório vazio.',
            'Preencha todos os campos para continuar!',
            'error'
        );
    }else{
        fetch("/usuarios/cadastrar",{
        method : "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body:  JSON.stringify({
            nomeLabServer: nomeLabVAR,
            numLabServer: numLabVAR,
            respLabServer: respLabVAR
           
        })
    }).then(function (resposta) {
        if(resposta.ok){
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Cadastro realizado com sucesso!',
                showConfirmButton: true,
                // timer: 1500
            });
            listarLabs();
        }else{
            throw ("houve um erro ao tentar se cadastrar");
        }
    }).catch(function (resposta){
        console.log(`#ERRO: ${resposta}`);
    });
        
    }
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
}

function fecharModal(){
    divModal.style.display = "none";
}