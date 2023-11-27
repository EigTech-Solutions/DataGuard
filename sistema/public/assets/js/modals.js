function AbrirModal(informação){
    divModal.style.display = "flex";
    divModal.innerHTML = `
        <div class="containerModalInst">
            <!--  topo do pop up  -->
            <div class="topo">
                <div class="titulo"> Informações do gráfico </div>
                <img class="botaoFechar" src="../assets/images/close-circle-twotone.png" alt="icon fechar" onclick="fecharModal()">
            </div>
            <!--  meio do pop up  -->
            <div class="meioPopUp">
                ${informação}
            </div>
            <!--  fim do pop up  -->
            <div class="containerFinal">
                
            </div>
        </div>
    `;
}

function fecharModal() {
    divModal.style.display = "none";
}


function modalFluxoGeral() {
    divModal.style.display = "flex";
    var informação = "Essa é a Dash de Fluxo"
    AbrirModal(informação);
}

function modalRankingGeral(){
    divModal.style.display = "flex";
    var informação = "Essa é a Dash de Ranking"
    AbrirModal(informação);
}

function statusMaquinaGeral(){
    divModal.style.display = "flex";
    var informação = "Essa é a Dash de status"
    AbrirModal(informação);
}

function modalEstadoMaquinasAdm(){
    divModal.style.display = "flex";
    var informação = "Essa é a Dash de Estado das maquinas de ADM"
    AbrirModal(informação);
}

function modalLabDescAdm(){
    divModal.style.display = "flex";
    var informação = "Essa é a Dash de lab Desc"
    AbrirModal(informação);
}

function modalRankingDescAdm(){
    divModal.style.display = "flex";
    var informação = "Essa é a Dash de Ranking Desc"
    AbrirModal(informação);
}

function modalCadastrosColaboAdm(){
    divModal.style.display = "flex";
    var informação = "Essa é a Dash de Cadastro Colabo"
    AbrirModal(informação);
}

function modalFluxoRedeLab(){
    divModal.style.display = "flex";
    var informação = "Essa é a Dash de Fluxo de rede Lab"
    AbrirModal(informação); 
}
function modalMaqDescLab(){
    divModal.style.display = "flex";
    var informação = "Essa é a Dash de Maq Desc Lab"
    AbrirModal(informação); 
}

function modalCpuMaq(){
    divModal.style.display = "flex";
    var informação = "Essa é a Dash de CPU Maq"
    AbrirModal(informação); 
}

function modalFluxoRedeMaq(){
    divModal.style.display = "flex";
    var informação = "Essa é a Dash de FLuxo de rede Maq"
    AbrirModal(informação); 
}

function modalNivelDeLabs(){
    divModal.style.display = "flex";
    var informação = "Essa é a Dash de Nivel de Labs"
    AbrirModal(informação); 
}