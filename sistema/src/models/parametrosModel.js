var database = require("../database/config")

function buscarParametrosMonitoramento(idInstituicao) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT * FROM parametrosMonitoramento WHERE idParametrosMonitoramento = (SELECT fkParametrosMonitoramento FROM instituicao WHERE idInstitucional = ${idInstituicao});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// cadastro de laboratorios
function cadastrar(minCpu, maxCpu, minDisco, maxDisco, minRam, maxRam, minQtdDispositivosConectados, maxQtdDispositivosConectados, idInstituicao) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", minCpu, maxCpu, minDisco, maxDisco, minRam, maxRam, minQtdDispositivosConectados, maxQtdDispositivosConectados, idInstituicao);

    var instrucao = `
        INSERT INTO parametrosMonitoramento (minCpu, maxCpu, minDisco, maxDisco, minRam, maxRam, minQtdDispositivosConectados, maxQtdDispositivosConectados, minLatenciaRede, maxLatenciaRede) 
            VALUES ('${minCpu}', '${maxCpu}', ${minDisco}, ${maxDisco}, ${minRam}, ${maxRam}, ${minQtdDispositivosConectados}, ${maxQtdDispositivosConectados}, 100, 400);
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function atualizarParametros(idInstituicao, idParametrosMonitoramento) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", idInstituicao, idParametrosMonitoramento);

    var instrucao = `
        UPDATE instituição SET fkParametrosMonitoramento = ${idParametrosMonitoramento}
            WHERE idInstitucional = ${idInstituicao};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
  
module.exports = {
    buscarParametrosMonitoramento,
    cadastrar,
    atualizarParametros
};
