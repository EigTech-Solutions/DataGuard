function marcarTodosLido(){
    var alertasNaoLido = document.getElementsByName('alertas_nao_lido')
    for (let i = 0; i < alertasNaoLido.length; i++) {
        alertasNaoLido[i].style.background = "rgba(89, 131, 146, 0.50)";
    }
}