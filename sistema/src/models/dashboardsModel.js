var database = require("../database/config");

function buscarUltimosKPIs(idInstituicao) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = ``;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql =
            `select count(idMaquina) 'qtdMaquinas', 
        (select count(idLaboratorio) from laboratorio where laboratorio.fkInstitucional = ${idInstituicao}) 'qtdLabs', 
        (select count(idAlertas) from alertas join maquina on maquina.idMaquina = alertas.fkMaquina where maquina.fkInstitucional = ${idInstituicao} AND dataHora >= now() - INTERVAL 1 DAY) 'qtdAlertas' 
        from maquina where fkInstitucional = ${idInstituicao} AND status = 'ativado';`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarFluxoRede(idInstituicao) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = ``;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        select avg(dm.latenciaRede) 'MediaLatencia', avg(dm.uploadRede) 'MediaUpload', avg(dm.downloadRede) 'MediaDownload', DATE_FORMAT (dm.dataHora, '%d/%m/%Y, %H:%i:%s') 'dataHora' FROM dados_monitoramento dm
        JOIN maquina m ON dm.fkMaquina = m.idMaquina where m.fkInstitucional = ${idInstituicao} group by dataHora order by dataHora desc limit 10;`
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarFluxoRedeTempoReal(idInstituicao) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = ``;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        select avg(dm.latenciaRede) 'MediaLatencia', avg(dm.uploadRede) 'MediaUpload', avg(dm.downloadRede) 'MediaDownload', DATE_FORMAT (dm.dataHora, '%d/%m/%Y, %H:%i:%s') 'dataHora' FROM dados_monitoramento dm
        JOIN maquina m ON dm.fkMaquina = m.idMaquina where m.fkInstitucional = ${idInstituicao} group by datahora order by dataHora desc limit 1`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function buscarNotificacoes(idInstituicao) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = ``;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql =
            `
            select l.nomeSala, l.numeroSala, m.idMaquina, m.ipMaquina, a.tipo, a.dataHora, a.lido from laboratorio l 
            right join maquina m on m.fkLaboratorio = l.idLaboratorio 
            right join alertas a on a.fkMaquina = m.idMaquina 
            where m.fkInstitucional = ${idInstituicao} AND a.dataHora >= now() - INTERVAL 1 DAY
            order by a.dataHora desc;
            `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarNotificacoes(idInstituicao) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = ``;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql =
            `
            select l.nomeSala, l.numeroSala, m.idMaquina, m.ipMaquina, a.tipo, a.dataHora, a.lido from laboratorio l 
            right join maquina m on m.fkLaboratorio = l.idLaboratorio 
            right join alertas a on a.fkMaquina = m.idMaquina 
            where m.fkInstitucional = ${idInstituicao} AND a.dataHora >= now() - INTERVAL 1 DAY
            order by a.dataHora desc;
            `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarStatusMaquinas(idInstituicao) {
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = ``;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql =
            `
            select count(idMaquina) 'qtdMaquinas',
	            (select count(idMaquina) from maquina where fkInstitucional = ${idInstituicao} AND status = "ativado") 'qtdAtivas',
	            (select count(idMaquina) from maquina where fkInstitucional = ${idInstituicao} AND status = "inativado") 'qtdDesativadas' from maquina where fkInstitucional = ${idInstituicao};

            `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarRankingLabs(idInstituicao) {
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = ``;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql =
            `
            select l.idLaboratorio, l.numeroSala, count(a.idAlertas) qtdAlertas from laboratorio l 
            left join maquina m on m.fkLaboratorio = l.idLaboratorio 
            left join alertas a on a.fkMaquina = m.idMaquina where l.fkInstitucional = ${idInstituicao} group by l.idLaboratorio, l.numeroSala order by qtdAlertas desc;
            `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUltimosKPIs,
    buscarFluxoRede,
    buscarNotificacoes,
    buscarFluxoRedeTempoReal,
    buscarStatusMaquinas,
    buscarRankingLabs
}
