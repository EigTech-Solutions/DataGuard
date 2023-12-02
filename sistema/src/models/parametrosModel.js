var database = require("../database/config")

function buscarParametrosMonitoramento(idInstituicao) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = "";
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucao = `SELECT * 
        FROM parametrosMonitoramento 
        WHERE idParametrosMonitoramento = (
            SELECT fkParametrosMonitoramento 
            FROM instituicao 
            WHERE idInstitucional = ${idInstituicao}
        );
        `;
    }
    else {
        instrucao = `
    SELECT * FROM parametrosMonitoramento WHERE idParametrosMonitoramento = (SELECT fkParametrosMonitoramento FROM instituicao WHERE idInstitucional = ${idInstituicao});
`;
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// cadastro de laboratorios
function cadastrar(minCpu, maxCpu, minDisco, maxDisco, minRam, maxRam, minQtdDispositivosConectados, maxQtdDispositivosConectados, idInstituicao) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", minCpu, maxCpu, minDisco, maxDisco, minRam, maxRam, minQtdDispositivosConectados, maxQtdDispositivosConectados, idInstituicao);
    var instrucao = "";
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucao = `INSERT INTO parametrosMonitoramento (minCpu, maxCpu, minDisco, maxDisco, minRam, maxRam, minQtdDispositivosConectados, maxQtdDispositivosConectados, minLatenciaRede, maxLatenciaRede) 
        OUTPUT INSERTED.idParametrosMonitoramento
        VALUES (${minCpu}, ${maxCpu}, ${minDisco}, ${maxDisco}, ${minRam}, ${maxRam}, ${minQtdDispositivosConectados}, ${maxQtdDispositivosConectados}, 100, 400);
        `;
        return database.executar(instrucao).then(resultado => {
            // Aqui, você deve retornar o ID inserido no corpo da resposta
            return { insertId: resultado[0].idParametrosMonitoramento };
        }).catch(erro => {
            console.log(erro);
            console.log("\nHouve um erro ao realizar o cadastro! Erro: ", erro.sqlMessage);
            throw erro; // Certifique-se de repassar o erro para que seja tratado no bloco catch superior
        });
    }
    else {
        instrucao = `
        INSERT INTO parametrosMonitoramento (minCpu, maxCpu, minDisco, maxDisco, minRam, maxRam, minQtdDispositivosConectados, maxQtdDispositivosConectados, minLatenciaRede, maxLatenciaRede) 
            VALUES (${minCpu}, ${maxCpu}, ${minDisco}, ${maxDisco}, ${minRam}, ${maxRam}, ${minQtdDispositivosConectados}, ${maxQtdDispositivosConectados}, 100, 400);
    `;
        console.log("Executando a instrução SQL: \n" + instrucao);
        database.executar(instrucao).then(resultado => {
            // Aqui, você deve retornar o ID inserido no corpo da resposta
            return { insertId: resultado.insertId };
        }).catch(erro => {
            console.log(erro);
            console.log("\nHouve um erro ao realizar o cadastro! Erro: ", erro.sqlMessage);
            throw erro; // Certifique-se de repassar o erro para que seja tratado no bloco catch superior
        });
    }
}

function atualizarParametros(idInstituicao, idParametrosMonitoramento) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", idInstituicao, idParametrosMonitoramento);
    var instrucao = "";
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucao = `UPDATE instituicao 
        SET fkParametrosMonitoramento = ${idParametrosMonitoramento}
        WHERE idInstitucional = ${idInstituicao};
        `;
    }
    else {
        instrucao = `
        UPDATE instituicao SET fkParametrosMonitoramento = ${idParametrosMonitoramento}
        WHERE idInstitucional = ${idInstituicao};
    `;
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function resetarParametros(idInstituicao) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", idInstituicao);
    var instrucao = "";
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucao = `UPDATE instituicao 
        SET fkParametrosMonitoramento = 1
        WHERE idInstitucional = ${idInstituicao};
        `;
    }
    else {
        instrucao = `
        UPDATE instituicao SET fkParametrosMonitoramento = 1
        WHERE idInstitucional = ${idInstituicao};
    `;
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function deletar(idParametros) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():", idParametros);
    var instrucao = "";
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucao = `DELETE FROM parametrosMonitoramento 
        WHERE idParametrosMonitoramento = ${idParametros};
        `;
    }
    else {
        instrucao = `
        DELETE FROM parametrosMonitoramento WHERE idParametrosMonitoramento = ${idParametros};
    `;
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    buscarParametrosMonitoramento,
    cadastrar,
    atualizarParametros,
    resetarParametros,
    deletar
};
