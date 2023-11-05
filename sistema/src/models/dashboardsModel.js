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

function buscarNotificacoes(idInstituicao, idUsuario) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = ``;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql =
            `
            select  a.idAlertas, a.lido, l.nomeSala, l.numeroSala, DATE_FORMAT(me.dataHora, '%d/%m/%Y, %H:%i:%s') 'dataHora', m.ipMaquina, m.idMaquina, cm.componente, cm.tipo from alertas a 
            join medicoes me on a.fkMonitoramento = me.idMonitoramento 
            join componenteMonitorado cm on me.fkComponente = cm.idComponente 
            join maquina m on cm.fkMaquina = m.idMaquina
            join laboratorio l on m.fkLaboratorio = l.idLaboratorio
            where l.fkInstitucional = ${idInstituicao} AND l.fkResponsavel = ${idUsuario} AND me.dataHora >= now() - INTERVAL 1 DAY
            order by me.dataHora desc;
            `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarNotificacoesTempoReal(idInstituicao, idUsuario) {
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = ``;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql =
            `
            select  a.idAlertas, a.lido, l.nomeSala, l.numeroSala, DATE_FORMAT(me.dataHora, '%d/%m/%Y, %H:%i:%s') 'dataHora', m.ipMaquina, m.idMaquina, cm.componente, cm.tipo from alertas a 
            join medicoes me on a.fkMonitoramento = me.idMonitoramento 
            join componenteMonitorado cm on me.fkComponente = cm.idComponente 
            join maquina m on cm.fkMaquina = m.idMaquina
            join laboratorio l on m.fkLaboratorio = l.idLaboratorio
            where l.fkInstitucional = ${idInstituicao} AND l.fkResponsavel = ${idUsuario} AND me.dataHora >= now() - INTERVAL 1 DAY
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

function buscarKpisLabs(idLaboratorio) {
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = ``;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql =
            `
            select 
            (select count(idMaquina) from maquina m where m.fkLaboratorio = ${idLaboratorio} AND m.status = "Ativa") 'qtdMaquinas',
            ( select count(a.idAlertas) 'qtdAlertas' from alertas a 
           join medicoes me on a.fkMonitoramento = me.idMonitoramento
           join componenteMonitorado cm on me.fkComponente = cm.idComponente
           join maquina m on cm.fkMaquina = m.idMaquina
           join laboratorio l on m.fkLaboratorio = l.idLaboratorio 
           where l.idLaboratorio = ${idLaboratorio} AND me.dataHora >= now() - INTERVAL 1 DAY) 'qtdAlertas'; `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarFluxoRedeLab(idLaboratorio) {
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = ``;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        SELECT 
        DATE_FORMAT(me.dataHora, '%d/%m/%Y, %H:%i:%s') AS 'dataHora', 
        AVG(CASE WHEN cm.tipo = "Ping" AND m.fkLaboratorio = ${idLaboratorio} THEN me.valorConsumido ELSE NULL END) AS 'MediaLatencia',
        AVG(CASE WHEN cm.tipo = "Download" AND m.fkLaboratorio = ${idLaboratorio} THEN me.valorConsumido ELSE NULL END) AS 'MediaDownload',
        AVG(CASE WHEN cm.tipo = "Upload" AND m.fkLaboratorio = ${idLaboratorio} THEN me.valorConsumido ELSE NULL END) AS 'MediaUpload'
        FROM 
            medicoes me
        JOIN 
            componenteMonitorado cm ON me.fkComponente = cm.idComponente 
        JOIN 
            maquina m ON cm.fkMaquina = m.idMaquina
        WHERE 
            (cm.tipo = "Ping" OR cm.tipo = "Download" OR cm.tipo = "Upload") AND m.fkLaboratorio = ${idLaboratorio}
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

function buscarFluxoRedeLabTempoReal(idLaboratorio) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = ``;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
            SELECT 
            DATE_FORMAT(me.dataHora, '%d/%m/%Y, %H:%i:%s') AS 'dataHora', 
            AVG(CASE WHEN cm.tipo = "Ping" AND m.fkLaboratorio = ${idLaboratorio} THEN me.valorConsumido ELSE NULL END) AS 'MediaLatencia',
            AVG(CASE WHEN cm.tipo = "Download" AND m.fkLaboratorio = ${idLaboratorio} THEN me.valorConsumido ELSE NULL END) AS 'MediaDownload',
            AVG(CASE WHEN cm.tipo = "Upload" AND m.fkLaboratorio = ${idLaboratorio} THEN me.valorConsumido ELSE NULL END) AS 'MediaUpload'
            FROM 
                medicoes me
            JOIN 
                componenteMonitorado cm ON me.fkComponente = cm.idComponente 
            JOIN 
                maquina m ON cm.fkMaquina = m.idMaquina
            WHERE 
                (cm.tipo = "Ping" OR cm.tipo = "Download" OR cm.tipo = "Upload") AND m.fkLaboratorio = ${idLaboratorio}
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

function buscarRankingMaquinas(idLaboratorio) {
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = ``;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql =
            `
            select m.idMaquina, m.ipMaquina, count(a.idAlertas) qtdAlertas from maquina m
			left join componenteMonitorado cm on cm.fkMaquina = m.idMaquina
            left join medicoes me on me.fkComponente = cm.idComponente
            left join alertas a on a.fkMonitoramento = me.idMonitoramento
            where m.fkLaboratorio = ${idLaboratorio}  group by m.idMaquina order by qtdAlertas desc;
            `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarStatusMaquinasLab(idLaboratorio) {
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = ``;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql =
            `
            select count(idMaquina) 'qtdMaquinas',
	            (select count(idMaquina) from maquina where fkLaboratorio = ${idLaboratorio} AND status = "Ativa") 'qtdAtivas',
	            (select count(idMaquina) from maquina where fkLaboratorio = ${idLaboratorio} AND status = "Inativa") 'qtdDesativadas' from maquina where fkLaboratorio = ${idLaboratorio};
            `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarInfosBasicasMaquina(idMaquina) {
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = ``;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql =
            `
            select m.idMaquina, m.numeroDeSerie, m.ipMaquina, m.sistemaOperacional, m.status, 
            (CASE WHEN cm.componente = "CPU" THEN cm.modelo ELSE NULL END) 'processador',
            (CASE WHEN cm.componente = "Disco" THEN cm.tipo ELSE NULL END) 'discoTipo',
            (CASE WHEN cm.componente = "Disco" THEN cm.capacidadeTotal ELSE NULL END) 'capacidadeDisco',
            (CASE WHEN cm.componente = "Disco" THEN cm.unidadeMedida ELSE NULL END) 'unidadeMedidaDisco',
            (CASE WHEN cm.tipo = "RAM" THEN cm.capacidadeTotal ELSE NULL END) 'capacidadeRam',
             l.nomeSala from maquina m 
                 LEFT join laboratorio l on m.fkLaboratorio = l.idLaboratorio
                 LEFT join componenteMonitorado cm on cm.fkMaquina = m.idMaquina
                 where idMaquina = ${idMaquina} limit 1;
            `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarPorcentagemUsoCpu(idMaquina) {
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = ``;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql =
            `
            select me.valorConsumido 'mediaCPU', DATE_FORMAT(me.dataHora, '%d/%m/%Y, %H:%i:%s') 'dataHora' 
            from medicoes me 
            JOIN componenteMonitorado cm ON me.fkComponente = cm.idComponente
            WHERE cm.componente = "CPU" AND me.fkMaquina = ${idMaquina}
            GROUP BY 
                me.dataHora, me.valorConsumido
            ORDER BY 
                me.dataHora DESC
                LIMIT 10;
            `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarPorcentagemUsoCpuTempoReal(idMaquina) {
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = ``;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql =
            `
            select me.valorConsumido 'mediaCPU', DATE_FORMAT(me.dataHora, '%d/%m/%Y, %H:%i:%s') 'dataHora' 
            from medicoes me 
            JOIN componenteMonitorado cm ON me.fkComponente = cm.idComponente
            WHERE cm.componente = "CPU" AND me.fkMaquina = ${idMaquina}
            GROUP BY 
                me.dataHora, me.valorConsumido
            ORDER BY 
                me.dataHora DESC
                LIMIT 1;
            `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarFluxoRedeMaquina(idMaquina) {
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = ``;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql =
            `
            SELECT 
            DATE_FORMAT(me.dataHora, '%d/%m/%Y, %H:%i:%s') AS 'dataHora', 
            AVG(CASE WHEN cm.tipo = "Ping" AND m.idMaquina = ${idMaquina} THEN me.valorConsumido ELSE NULL END) AS 'MediaLatencia',
            AVG(CASE WHEN cm.tipo = "Download" AND m.idMaquina = ${idMaquina} THEN me.valorConsumido ELSE NULL END) AS 'MediaDownload',
            AVG(CASE WHEN cm.tipo = "Upload" AND m.idMaquina = ${idMaquina} THEN me.valorConsumido ELSE NULL END) AS 'MediaUpload'
            FROM 
                medicoes me
            JOIN 
                componenteMonitorado cm ON me.fkComponente = cm.idComponente 
            JOIN 
                maquina m ON cm.fkMaquina = m.idMaquina
            WHERE 
                (cm.tipo = "Ping" OR cm.tipo = "Download" OR cm.tipo = "Upload") AND m.idMaquina = ${idMaquina}
            GROUP BY 
                me.dataHora
            ORDER BY 
                me.dataHora DESC
                LIMIT 10;
            `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarFluxoRedeMaquinaTempoReal(idMaquina) {
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = ``;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql =
            `
            SELECT 
            DATE_FORMAT(me.dataHora, '%d/%m/%Y, %H:%i:%s') AS 'dataHora', 
            AVG(CASE WHEN cm.tipo = "Ping" AND m.idMaquina = ${idMaquina} THEN me.valorConsumido ELSE NULL END) AS 'MediaLatencia',
            AVG(CASE WHEN cm.tipo = "Download" AND m.idMaquina = ${idMaquina} THEN me.valorConsumido ELSE NULL END) AS 'MediaDownload',
            AVG(CASE WHEN cm.tipo = "Upload" AND m.idMaquina = ${idMaquina} THEN me.valorConsumido ELSE NULL END) AS 'MediaUpload'
            FROM 
                medicoes me
            JOIN 
                componenteMonitorado cm ON me.fkComponente = cm.idComponente 
            JOIN 
                maquina m ON cm.fkMaquina = m.idMaquina
            WHERE 
                (cm.tipo = "Ping" OR cm.tipo = "Download" OR cm.tipo = "Upload") AND m.idMaquina = ${idMaquina}
            GROUP BY 
                me.dataHora
            ORDER BY 
                me.dataHora DESC
                LIMIT 1;
            `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarDadosMemorias(idMaquina) {
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = ``;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql =
            `
            select 
            (CASE WHEN cm.componente = "Disco" AND cm.fkMaquina = ${idMaquina} THEN me.valorConsumido ELSE NULL END) "usoDisco", 
            (CASE WHEN cm.componente = "RAM" AND cm.fkMaquina = ${idMaquina} THEN me.valorConsumido ELSE NULL END) "usoRam",
            DATE_FORMAT(me.dataHora, '%d/%m/%Y, %H:%i:%s') 'dataHora' 
            from medicoes me 
            JOIN componenteMonitorado cm ON me.fkComponente = cm.idComponente
            WHERE cm.componente = "Disco" OR cm.componente = "RAM" AND me.fkMaquina = ${idMaquina}
            GROUP BY 
                usoDisco, usoRam, me.dataHora
            ORDER BY 
                me.dataHora DESC
                LIMIT 1;
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
    marcarLido,
    buscarKpisLabs,
    buscarFluxoRedeLab,
    buscarFluxoRedeLabTempoReal,
    buscarRankingMaquinas,
    buscarStatusMaquinasLab,
    buscarInfosBasicasMaquina,
    buscarPorcentagemUsoCpu,
    buscarPorcentagemUsoCpuTempoReal,
    buscarFluxoRedeMaquina,
    buscarFluxoRedeMaquinaTempoReal,
    buscarDadosMemorias
}
