var database = require("../database/config");

function buscarUltimosKPIs(idInstituicao) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = ``;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql =
            `
            select count(idMaquina) 'qtdMaquinas', 
            (select count(idLaboratorio) from laboratorio where laboratorio.fkInstitucional = 2) 'qtdLabs', 
            (select count(idAlertas) as 'qtdAlertas' from alertas a
                join medicoes me on a.fkMonitoramento = me.idMonitoramento 
                join maquina m on m.idMaquina = me.fkMaquina where m.fkInstitucional = ${idInstituicao} AND me.dataHora >= now() - INTERVAL 1 DAY) 'qtdAlertas' 
                from maquina where fkInstitucional = ${idInstituicao} AND status = 'Ativa';
            `;
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
            SELECT 
            DATE_FORMAT(me.dataHora, '%d/%m/%Y, %H:%i:%s') AS 'dataHora', 
            AVG(CASE WHEN cm.tipo = "Ping" AND m.fkInstitucional = ${idInstituicao} THEN me.valorConsumido ELSE NULL END) AS 'MediaLatencia',
            AVG(CASE WHEN cm.tipo = "Download" AND m.fkInstitucional = ${idInstituicao} THEN me.valorConsumido ELSE NULL END) AS 'MediaDownload',
            AVG(CASE WHEN cm.tipo = "Upload" AND m.fkInstitucional = ${idInstituicao} THEN me.valorConsumido ELSE NULL END) AS 'MediaUpload'
            FROM 
                medicoes me
            JOIN 
                componenteMonitorado cm ON me.fkComponente = cm.idComponente 
            JOIN 
                maquina m ON cm.fkMaquina = m.idMaquina
            WHERE 
                (cm.tipo = "Ping" OR cm.tipo = "Download" OR cm.tipo = "Upload") AND m.fkInstitucional = ${idInstituicao}
            GROUP BY 
                me.dataHora
            ORDER BY 
                me.dataHora DESC
                LIMIT 10;
        `
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
        SELECT 
            DATE_FORMAT(me.dataHora, '%d/%m/%Y, %H:%i:%s') AS 'dataHora', 
            AVG(CASE WHEN cm.tipo = "Ping" AND m.fkInstitucional = ${idInstituicao} THEN me.valorConsumido ELSE NULL END) AS 'MediaLatencia',
            AVG(CASE WHEN cm.tipo = "Download" AND m.fkInstitucional = ${idInstituicao} THEN me.valorConsumido ELSE NULL END) AS 'MediaDownload',
            AVG(CASE WHEN cm.tipo = "Upload" AND m.fkInstitucional = ${idInstituicao} THEN me.valorConsumido ELSE NULL END) AS 'MediaUpload'
            FROM 
                medicoes me
            JOIN 
                componenteMonitorado cm ON me.fkComponente = cm.idComponente 
            JOIN 
                maquina m ON cm.fkMaquina = m.idMaquina
            WHERE 
                (cm.tipo = "Ping" OR cm.tipo = "Download" OR cm.tipo = "Upload") AND m.fkInstitucional = ${idInstituicao}
            GROUP BY 
                me.dataHora
            ORDER BY 
                me.dataHora DESC
                LIMIT 1;
                `
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarNotificacoes(idInstituicao, idTecnico) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = ``;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql =
            `
            select a.lido, a.tipo, DATE_FORMAT(me.dataHora, '%d/%m/%Y, %H:%i:%s') 'dataHora', cm.componente, m.ipMaquina, l.nomeSala, l.numeroSala from alertas a 
            join medicoes me on a.fkMonitoramento = me.idMonitoramento 
            join componenteMonitorado cm on me.fkComponente = cm.idComponente 
            join maquina m on cm.fkMaquina = m.idMaquina
            join laboratorio l on m.fkLaboratorio = l.idLaboratorio
            where l.fkInstitucional = ${idInstituicao} AND l.fkResponsavel = ${idTecnico} AND me.dataHora >= now() - INTERVAL 1 DAY
            order by me.dataHora desc;
            `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarNotificacoesTempoReal(idInstituicao, idTecnico) {
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = ``;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql =
            `
            select a.lido, a.tipo, DATE_FORMAT(me.dataHora, '%d/%m/%Y, %H:%i:%s') 'dataHora', cm.componente, m.ipMaquina, l.nomeSala, l.numeroSala from alertas a 
            join medicoes me on a.fkMonitoramento = me.idMonitoramento 
            join componenteMonitorado cm on me.fkComponente = cm.idComponente 
            join maquina m on cm.fkMaquina = m.idMaquina
            join laboratorio l on m.fkLaboratorio = l.idLaboratorio
            where l.fkInstitucional = ${idInstituicao} AND l.fkResponsavel = ${idTecnico} AND me.dataHora >= now() - INTERVAL 1 DAY
            order by me.dataHora desc limit 1;
            `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function marcarLido(idNotificacao) {
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = ``;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql =
            `
           update alertas set lido = 1 where idAlertas = ${idNotificacao}
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
	            (select count(idMaquina) from maquina where fkInstitucional = ${idInstituicao} AND status = "Ativa") 'qtdAtivas',
	            (select count(idMaquina) from maquina where fkInstitucional = ${idInstituicao} AND status = "Inativa") 'qtdDesativadas' from maquina where fkInstitucional = ${idInstituicao};

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
            left join alertas a on a.fkMaquina = m.idMaquina where l.fkInstitucional = ${idInstituicao} 
            group by l.idLaboratorio, l.numeroSala order by qtdAlertas desc;
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
    buscarRankingLabs,
    buscarNotificacoesTempoReal,
    marcarLido
}
