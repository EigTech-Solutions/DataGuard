var database = require("../database/config")

function listar(idInstituicao) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT
            m.*,
            l.nomeSala AS local,
            COUNT(a.idAlertas) AS quantidadeAlertasUltimoMes,
            CASE
                WHEN COUNT(a.idAlertas) <= 5 THEN 'Ok'
                WHEN COUNT(a.idAlertas) <= 15 THEN 'Atenção'
                ELSE 'Urgente'
            END AS situacao
        FROM maquina m
        LEFT JOIN laboratorio l ON m.fkLaboratorio = l.idLaboratorio AND m.fkInstitucional = l.fkInstitucional
        LEFT JOIN medicoes dm ON m.idMaquina = dm.fkMaquina
        LEFT JOIN Alertas a ON dm.idMonitoramento = a.fkMonitoramento AND dm.fkMaquina = a.fkMaquina AND MONTH(a.dataHora) = MONTH(CURRENT_DATE())
        WHERE m.fkInstitucional = ${idInstituicao}
        GROUP BY m.idMaquina;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarPC(idPC, idInstituicao) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT * FROM maquina WHERE idMaquina = ${idPC} AND fkInstitucional = ${idInstituicao};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// cadastro de maquinas
function cadastrar(numeroSerie , ip , sistemaOperacional, capMemoriaDisco, capMemoriaRam , tipoDisco , processador, laboratorio, idInstituicao) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", numeroSerie , ip , sistemaOperacional, capMemoriaDisco, capMemoriaRam , tipoDisco , processador , laboratorio, idInstituicao);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO maquina (numeroDeSerie, ipMaquina, sistemaOperacional, tipoDisco,  capacidadeMemoriaDisco, capacidadeMemoriaRam, processador, status, dataCadastro, fkLaboratorio, fkInstitucional) VALUES ('${numeroSerie}', '${ip}', '${sistemaOperacional}', '${tipoDisco}', '${capMemoriaDisco}', '${capMemoriaRam}', '${processador}', 'Ativo', now(), ${laboratorio}, ${idInstituicao});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function atualizar(idPC, numeroSerie , ip , sistemaOperacional, capMemoriaDisco, capMemoriaRam , tipoDisco , processador , idLaboratorio, idInstituicao) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizar():", idPC, numeroSerie , ip , sistemaOperacional, capMemoriaDisco, capMemoriaRam , tipoDisco , processador , idLaboratorio, idInstituicao);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        UPDATE maquina SET numeroDeSerie = '${numeroSerie}', ipMaquina = '${ip}', sistemaOperacional = '${sistemaOperacional}', tipoDisco = '${tipoDisco}',  capacidadeMemoriaDisco = '${capMemoriaDisco}', capacidadeMemoriaRam = '${capMemoriaRam}', processador = '${processador}', fkLaboratorio = ${idLaboratorio} WHERE idMaquina = ${idPC} AND fkInstitucional = ${idInstituicao};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function deletar(idPC, idInstituicao) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():", idPC);
    var instrucao = `
        DELETE FROM maquina WHERE idMaquina = ${idPC} AND fkInstitucional = ${idInstituicao};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


module.exports = {
    listar,
    buscarPC,
    cadastrar,
    atualizar,
    deletar
};