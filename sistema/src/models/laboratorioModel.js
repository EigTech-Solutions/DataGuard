var database = require("../database/config")

function listar(idInstituicao) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT
        l.*,
        COUNT(DISTINCT m.idMaquina) AS quantidadeComputadores,
        COUNT(DISTINCT a.idAlertas) AS quantidadeAlertasUltimoMes,
        CASE
        WHEN COUNT(DISTINCT a.idAlertas) <= 5 THEN 'Ok'
        WHEN COUNT(DISTINCT a.idAlertas) <= 15 THEN 'Atenção'
        ELSE 'Urgente'
        END AS situacao
    FROM
        laboratorio l
    LEFT JOIN maquina m ON m.fkLaboratorio = l.idLaboratorio AND l.fkInstitucional = m.fkInstitucional
    LEFT JOIN medicoes dm ON m.idMaquina = dm.fkMaquina
    LEFT JOIN Alertas a ON dm.idMonitoramento = a.fkMonitoramento AND dm.fkMaquina = a.fkMaquina
    WHERE
        l.fkInstitucional = ${idInstituicao}
    GROUP BY l.idLaboratorio;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarLab(idLab, idInstituicao) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT * FROM laboratorio WHERE idLaboratorio = ${idLab} AND fkInstitucional = ${idInstituicao}
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// cadastro de laboratorios
function cadastrar(nomeLab, numLab, respLab, idInstituicao) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nomeLab, numLab, respLab);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO laboratorio (nomeSala, numeroSala, fkResponsavel, fkInstitucional) 
            VALUES ('${nomeLab}', '${numLab}', ${respLab}, ${idInstituicao});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function atualizar(idLab, nomeLab, numLab, idRespLab, idInstituicao) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizar(): ", idLab, nomeLab, numLab, idRespLab);
    var instrucao = `
        UPDATE laboratorio SET nomeSala = '${nomeLab}', numeroSala = ${numLab}, fkResponsavel = ${idRespLab} WHERE idLaboratorio = ${idLab} AND fkInstitucional = ${idInstituicao};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function preDelete(idLab, idInstituicao) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():", idLab);
    var instrucao = `
        UPDATE maquina SET fkLaboratorio = NULL WHERE fkInstitucional = ${idInstituicao} AND fkLaboratorio = ${idLab};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);

    return database.executar(instrucao);
}

function deletar(idLab, idInstituicao) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():", idLab);
    var instrucao = `
        DELETE FROM laboratorio WHERE fkInstitucional = ${idInstituicao} AND idLaboratorio = ${idLab};
    `;
    console.log("Executando a instrução SQL: " + instrucao);
    return database.executar(instrucao);
}



module.exports = {
    listar,
    buscarLab,
    cadastrar,
    atualizar,
    deletar,
    preDelete
};
