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
    var informação = "Nesse gráfico podemos ver o Fluxo de Rede em laboratórios institucionais oferecendo uma visão em tempo real da infraestrutura de rede. Monitora o status e o uso da largura de banda e a segurança da rede, permitindo uma gestão proativa."
    AbrirModal(informação);
}

function modalRankingGeral(){
    divModal.style.display = "flex";
    var informação = "Nesse Ranking Decrescente de Laboratórios em instituições oferece uma visão rápida e ordenada dos laboratórios com base em critérios estabelecidos. Esse recurso visual permite uma análise instantânea da performance dos laboratórios, facilitando a identificação dos melhores e a tomada de decisões estratégicas para otimizar recursos e aprimorar a eficiência institucional."
    AbrirModal(informação);
}

function statusMaquinaGeral(){
    divModal.style.display = "flex";
    var informação = "Aqui na parte de Status das Máquinas em instituições proporciona uma visão consolidada do funcionamento das máquinas. Exibe informações sobre o status operacional, atualizações e eventuais problemas, permitindo uma gestão eficiente e proativa. Esse recurso contribui para a manutenção preventiva, otimizando a operação das máquinas e garantindo a continuidade das atividades institucionais."
    AbrirModal(informação);
}

function modalEstadoMaquinasAdm(){
    divModal.style.display = "flex";
    var informação = "Nesse gráfico de Variação do Estado das Máquinas por Laboratório em instituições oferece uma visão consolidada e específica por laboratório sobre o status das máquinas. Esse recurso fornece informações detalhadas sobre variações no desempenho, atualizações e eventuais problemas, permitindo uma gestão personalizada e proativa. Ao analisar a variação do estado das máquinas, as instituições podem tomar medidas específicas para otimizar a eficiência operacional em cada laboratório, garantindo um ambiente tecnologicamente robusto para as atividades acadêmicas."
    AbrirModal(informação);
}

function modalLabDescAdm(){
    divModal.style.display = "flex";
    var informação = "Nesse Ranking Decrescente de Laboratórios em instituições oferece uma visão rápida e ordenada dos laboratórios com base em critérios estabelecidos. Esse recurso visual permite uma análise instantânea da performance dos laboratórios, facilitando a identificação dos melhores e a tomada de decisões estratégicas para otimizar recursos e aprimorar a eficiência institucional."
    AbrirModal(informação);
}

function modalRankingDescAdm(){
    divModal.style.display = "flex";
    var informação = "Nesse Ranking Decrescente de Máquinas em instituições oferece uma visão rápida e ordenada das máquinas com base em critérios estabelecidos. Esse recurso visual permite uma análise instantânea da performance das máquinas, facilitando a identificação dos melhores e a tomada de decisões estratégicas para otimizar recursos e aprimorar a eficiência institucional."
    AbrirModal(informação);
}

function modalCadastrosColaboAdm(){
    divModal.style.display = "flex";
    var informação = "Aqui vemos os cadastros de novos colaboradoes de cada instituição"
    AbrirModal(informação);
}

function modalFluxoRedeLab(){
    divModal.style.display = "flex";
    var informação = "Nesse gráfico podemos ver o Fluxo de Rede em laboratórios institucionais oferecendo uma visão em tempo real da infraestrutura de rede. Monitora o status e o uso da largura de banda e a segurança da rede, permitindo uma gestão proativa."
    AbrirModal(informação); 
}
function modalMaqDescLab(){
    divModal.style.display = "flex";
    var informação = "Nesse Ranking Decrescente de Máquinas em instituições oferece uma visão rápida e ordenada das máquinas com base em critérios estabelecidos. Esse recurso visual permite uma análise instantânea da performance das máquinas, facilitando a identificação dos melhores e a tomada de decisões estratégicas para otimizar recursos e aprimorar a eficiência institucional."
    AbrirModal(informação); 
}

function modalCpuMaq(){
    divModal.style.display = "flex";
    var informação = "Nesse gráfico de Uso de CPU em cada máquina oferece uma visão detalhada e em tempo real do desempenho dos processadores em uma instituição. Esse recurso permite monitorar e analisar o uso da CPU em cada máquina, identificando possíveis gargalos ou irregularidades. Com essa informação, os gestores podem otimizar a distribuição de carga, realizar manutenções proativas e garantir um funcionamento eficiente do parque de máquinas, contribuindo para um ambiente computacional mais estável e produtivo."
    AbrirModal(informação); 
}

function modalFluxoRedeMaq(){
    divModal.style.display = "flex";
    var informação = "Nesse gráfico de Fluxo de Rede em cada máquina oferece uma visão detalhada e em tempo real do tráfego de dados em uma instituição. Esse recurso permite monitorar e analisar o fluxo de rede em cada máquina, identificando padrões de uso, possíveis gargalos e eventuais problemas de conectividade. Com essas informações, os gestores podem tomar medidas proativas para otimizar a performance da rede em cada máquina, garantindo uma conectividade eficiente e estável para suportar as atividades institucionais."
    AbrirModal(informação); 
}

function modalNivelDeLabs(){
    divModal.style.display = "flex";
    var informação = "Nesse gráfico de Nível de Preocupação dos Laboratórios em instituições oferece uma visão resumida do estado operacional e potenciais desafios em cada laboratório. Esse recurso permite uma avaliação rápida do status de equipamentos, segurança da rede e integridade dos dados. Ao categorizar os laboratórios por níveis de preocupação, os gestores podem priorizar ações corretivas, garantindo um ambiente de laboratório eficiente, seguro e adequado às necessidades institucionais."
    AbrirModal(informação); 
}

function modalInstDash(){
    divModal.style.display = "flex";
    var informação = "Quantidade de Instituições Cadastradas por Mês no ano de 2023."
    AbrirModal(informação); 
}