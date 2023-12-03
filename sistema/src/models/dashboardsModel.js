var database = require("../database/config");

function buscarUltimosKPIs(idInstituicao) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        SELECT
        COUNT(m.idMaquina) AS qtdMaquinas,
        (SELECT COUNT(idLaboratorio) FROM laboratorio WHERE laboratorio.fkInstitucional = ${idInstituicao}) AS qtdLabs,
        (SELECT COUNT(idAlertas) FROM alertas a
            JOIN medicoes me ON a.fkMonitoramento = me.idMonitoramento 
            JOIN maquina m ON m.idMaquina = me.fkMaquina 
            WHERE m.fkInstitucional = ${idInstituicao} AND me.dataHora >= DATEADD(DAY, -1, GETDATE())) AS qtdAlertas
        FROM maquina m
        WHERE m.fkInstitucional = ${idInstituicao} AND m.status = 1;
        `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql =
            `
            select count(idMaquina) 'qtdMaquinas', 
            (select count(idLaboratorio) from laboratorio where laboratorio.fkInstitucional = ${idInstituicao}) 'qtdLabs', 
            (select count(idAlertas) as 'qtdAlertas' from alertas a
                join medicoes me on a.fkMonitoramento = me.idMonitoramento 
                join maquina m on m.idMaquina = me.fkMaquina where m.fkInstitucional = ${idInstituicao} AND me.dataHora >= now() - INTERVAL 1 DAY) 'qtdAlertas' 
                from maquina m where m.fkInstitucional = ${idInstituicao} AND m.status = 1;
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
        instrucaoSql = `
            SELECT 
                FORMAT(me.dataHora, 'dd/MM/yyyy, HH:mm:ss') AS 'dataHora', 
                AVG(CASE WHEN cm.tipo = 'Ping' AND m.fkInstitucional = ${idInstituicao} THEN me.valorConsumido END) AS 'MediaLatencia'
            FROM 
                medicoes me
            JOIN 
                componenteMonitorado cm ON me.fkComponente = cm.idComponente 
            JOIN 
                maquina m ON cm.fkMaquina = m.idMaquina
            WHERE 
                (cm.tipo IN ('Ping')) AND m.fkInstitucional = ${idInstituicao}
            GROUP BY 
                me.dataHora
            ORDER BY 
                me.dataHora DESC
            OFFSET 0 ROWS
            FETCH FIRST 10 ROWS ONLY;
        `;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
            SELECT 
            DATE_FORMAT(me.dataHora, '%d/%m/%Y, %H:%i:%s') AS 'dataHora', 
            AVG(CASE WHEN cm.tipo = "Ping" AND m.fkInstitucional = ${idInstituicao} THEN me.valorConsumido ELSE NULL END) AS 'MediaLatencia'
            FROM 
                medicoes me
            JOIN 
                componenteMonitorado cm ON me.fkComponente = cm.idComponente 
            JOIN 
                maquina m ON cm.fkMaquina = m.idMaquina
            WHERE 
                (cm.tipo = "Ping") AND m.fkInstitucional = ${idInstituicao}
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
        instrucaoSql = `   
            SELECT TOP 1
            FORMAT(me.dataHora, 'dd/MM/yyyy, HH:mm:ss') AS 'dataHora', 
            AVG(CASE WHEN cm.tipo = 'Ping' AND m.fkInstitucional = ${idInstituicao} THEN me.valorConsumido END) AS 'MediaLatencia',
            AVG(CASE WHEN cm.tipo = 'Download' AND m.fkInstitucional = ${idInstituicao} THEN me.valorConsumido END) AS 'MediaDownload',
            AVG(CASE WHEN cm.tipo = 'Upload' AND m.fkInstitucional = ${idInstituicao} THEN me.valorConsumido END) AS 'MediaUpload'
            FROM 
            medicoes me
            JOIN 
            componenteMonitorado cm ON me.fkComponente = cm.idComponente 
            JOIN 
            maquina m ON cm.fkMaquina = m.idMaquina
            WHERE 
            (cm.tipo IN ('Ping', 'Download', 'Upload')) AND m.fkInstitucional = ${idInstituicao}
            GROUP BY 
            me.dataHora
            ORDER BY 
            me.dataHora DESC;
        `;

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

function buscarStatusMaquinas(idInstituicao) {
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        SELECT
            COUNT(idMaquina) AS 'qtdMaquinas',
            (SELECT COUNT(idMaquina) FROM maquina WHERE fkInstitucional = ${idInstituicao} AND status = 1) AS 'qtdAtivas',
            (SELECT COUNT(idMaquina) FROM maquina WHERE fkInstitucional = ${idInstituicao} AND status = 0) AS 'qtdDesativadas'
        FROM maquina
        WHERE fkInstitucional = ${idInstituicao};
        `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql =
            `
            select count(idMaquina) 'qtdMaquinas',
	            (select count(idMaquina) from maquina where fkInstitucional = ${idInstituicao} AND status = 1) 'qtdAtivas',
	            (select count(idMaquina) from maquina where fkInstitucional = ${idInstituicao} AND status = 0) 'qtdDesativadas' from maquina where fkInstitucional = ${idInstituicao};

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
        instrucaoSql = `
            select l.idLaboratorio, l.numeroSala, count(a.idAlertas) qtdAlertas from laboratorio l 
            left join maquina m on m.fkLaboratorio = l.idLaboratorio 
            left join alertas a on a.fkMaquina = m.idMaquina where l.fkInstitucional = ${idInstituicao} 
            group by l.idLaboratorio, l.numeroSala order by qtdAlertas desc;
        `;
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
        instrucaoSql = ` 
        SELECT
        (SELECT COUNT(idMaquina) FROM maquina m WHERE m.fkLaboratorio = ${idLaboratorio} AND m.status = 1) AS 'qtdMaquinas',
        (SELECT COUNT(a.idAlertas) FROM alertas a 
            JOIN medicoes me ON a.fkMonitoramento = me.idMonitoramento
            JOIN componenteMonitorado cm ON me.fkComponente = cm.idComponente
            JOIN maquina m ON cm.fkMaquina = m.idMaquina
            JOIN laboratorio l ON m.fkLaboratorio = l.idLaboratorio 
            WHERE l.idLaboratorio = ${idLaboratorio} AND me.dataHora >= DATEADD(DAY, -1, GETDATE())) AS 'qtdAlertas';
        `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql =
            `
            select 
            (select count(idMaquina) from maquina m where m.fkLaboratorio = ${idLaboratorio} AND m.status = 1) 'qtdMaquinas',
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
        instrucaoSql = `   
        SELECT TOP 10
        FORMAT(me.dataHora, 'dd/MM/yyyy, HH:mm:ss') AS 'dataHora', 
        AVG(CASE WHEN cm.tipo = 'Ping' AND m.fkLaboratorio = ${idLaboratorio} THEN me.valorConsumido END) AS 'MediaLatencia'
        FROM 
        medicoes me
        JOIN 
        componenteMonitorado cm ON me.fkComponente = cm.idComponente 
        JOIN 
        maquina m ON cm.fkMaquina = m.idMaquina
        WHERE 
        cm.tipo IN ('Ping') AND m.fkLaboratorio = ${idLaboratorio}
        GROUP BY 
        me.dataHora
        ORDER BY 
        me.dataHora DESC;
        `;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        SELECT 
        DATE_FORMAT(me.dataHora, '%d/%m/%Y, %H:%i:%s') AS 'dataHora', 
        AVG(CASE WHEN cm.tipo = "Ping" AND m.fkLaboratorio = ${idLaboratorio} THEN me.valorConsumido ELSE NULL END) AS 'MediaLatencia',
        FROM 
            medicoes me
        JOIN 
            componenteMonitorado cm ON me.fkComponente = cm.idComponente 
        JOIN 
            maquina m ON cm.fkMaquina = m.idMaquina
        WHERE 
            (cm.tipo = "Ping") AND m.fkLaboratorio = ${idLaboratorio}
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
        instrucaoSql = `
        SELECT TOP 1
            FORMAT(me.dataHora, 'dd/MM/yyyy, HH:mm:ss') AS 'dataHora', 
            AVG(CASE WHEN cm.tipo = 'Ping' AND m.fkLaboratorio = ${idLaboratorio} THEN me.valorConsumido END) AS 'MediaLatencia'
        FROM 
            medicoes me
        JOIN 
            componenteMonitorado cm ON me.fkComponente = cm.idComponente 
        JOIN 
            maquina m ON cm.fkMaquina = m.idMaquina
        WHERE 
            cm.tipo IN ('Ping') AND m.fkLaboratorio = ${idLaboratorio}
        GROUP BY 
            me.dataHora
        ORDER BY 
            me.dataHora DESC;
        `;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
            SELECT 
            DATE_FORMAT(me.dataHora, '%d/%m/%Y, %H:%i:%s') AS 'dataHora', 
            AVG(CASE WHEN cm.tipo = "Ping" AND m.fkLaboratorio = ${idLaboratorio} THEN me.valorConsumido ELSE NULL END) AS 'MediaLatencia'
            FROM 
                medicoes me
            JOIN 
                componenteMonitorado cm ON me.fkComponente = cm.idComponente 
            JOIN 
                maquina m ON cm.fkMaquina = m.idMaquina
            WHERE 
                (cm.tipo = "Ping") AND m.fkLaboratorio = ${idLaboratorio}
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
        instrucaoSql = `
        SELECT 
            m.idMaquina, 
            m.ipMaquina, 
            m.numeroDeSerie, 
            COUNT(a.idAlertas) AS 'qtdAlertas' 
        FROM 
            maquina m
        LEFT JOIN 
            componenteMonitorado cm ON cm.fkMaquina = m.idMaquina
        LEFT JOIN 
            medicoes me ON me.fkComponente = cm.idComponente
        LEFT JOIN 
            alertas a ON a.fkMonitoramento = me.idMonitoramento
        WHERE 
            m.fkLaboratorio = ${idLaboratorio}
        GROUP BY 
            m.idMaquina, m.ipMaquina, m.numeroDeSerie
        ORDER BY 
            qtdAlertas DESC;
        `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql =
            `
            select m.idMaquina, m.ipMaquina, m.numeroDeSerie, count(a.idAlertas) qtdAlertas from maquina m
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
        instrucaoSql = `
        SELECT 
            COUNT(idMaquina) AS 'qtdMaquinas',
            (SELECT COUNT(idMaquina) FROM maquina WHERE fkLaboratorio = ${idLaboratorio} AND status = 1) AS 'qtdAtivas',
            (SELECT COUNT(idMaquina) FROM maquina WHERE fkLaboratorio = ${idLaboratorio} AND status = 0) AS 'qtdDesativadas'
        FROM 
            maquina 
        WHERE 
            fkLaboratorio = ${idLaboratorio};
        `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql =
            `
            select count(idMaquina) 'qtdMaquinas',
	            (select count(idMaquina) from maquina where fkLaboratorio = ${idLaboratorio} AND status = 1) 'qtdAtivas',
	            (select count(idMaquina) from maquina where fkLaboratorio = ${idLaboratorio} AND status = 0) 'qtdDesativadas' from maquina where fkLaboratorio = ${idLaboratorio};
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
        instrucaoSql = ` 
            select TOP 1
            m.numeroDeSerie, m.ipMaquina, m.status, m.sistemaOperacional, l.nomeSala, me.dataHora,
                        (select cm.modelo from componenteMonitorado cm WHERE cm.componente = 'CPU' AND cm.fkMaquina = ${idMaquina} group by cm.modelo) 'Processador',
                        (select cm.tipo from componenteMonitorado cm WHERE cm.componente = 'Disco Rigido' AND cm.fkMaquina = ${idMaquina} group by cm.tipo) 'TipoDisco',
                        (select cm.capacidadeTotal from componenteMonitorado cm WHERE cm.componente = 'Disco Rigido' AND cm.fkMaquina = ${idMaquina} group by cm.capacidadeTotal) 'CapacidadeDisco',
                        (select cm.capacidadeTotal from componenteMonitorado cm WHERE cm.componente = 'Memoria' AND cm.fkMaquina = ${idMaquina} group by cm.capacidadeTotal) 'CapacidadeRam',
                        (select me.valorConsumido from medicoes me join componenteMonitorado cm on me.fkComponente = cm.idComponente where cm.componente = 'Fonte Energia' and cm.fkMaquina = ${idMaquina} group by me.valorConsumido) 'FonteEnergia',
                        (select me.valorConsumido from medicoes me join componenteMonitorado cm on me.fkComponente = cm.idComponente where cm.componente = 'Entradas' and cm.fkMaquina = ${idMaquina} group by me.valorConsumido) 'qtdPerifericos'
                    from maquina m 
                        left join laboratorio l on m.fkLaboratorio = l.idLaboratorio
                        left join medicoes me on me.fkMaquina = m.idMaquina
                        where m.idMaquina = ${idMaquina}
                        GROUP BY m.numeroDeSerie, m.ipMaquina, m.status, m.sistemaOperacional, l.nomeSala, me.dataHora
                        order by dataHora desc;
        `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql =
            `
            select m.numeroDeSerie, m.ipMaquina, m.status, m.sistemaOperacional, l.nomeSala, me.dataHora,
            (select cm.modelo from componenteMonitorado cm WHERE cm.componente = "CPU" AND cm.fkMaquina = ${idMaquina} group by cm.modelo) 'Processador',
            (select cm.tipo from componenteMonitorado cm WHERE cm.componente = "Disco Rigido" AND cm.fkMaquina = ${idMaquina} group by cm.tipo) 'TipoDisco',
            (select cm.capacidadeTotal from componenteMonitorado cm WHERE cm.componente = "Disco Rigido" AND cm.fkMaquina = ${idMaquina} group by cm.capacidadeTotal) 'CapacidadeDisco',
            (select cm.capacidadeTotal from componenteMonitorado cm WHERE cm.componente = "Memoria" AND cm.fkMaquina = ${idMaquina} group by cm.capacidadeTotal) 'CapacidadeRam',
			(select me.valorConsumido from medicoes me join componenteMonitorado cm on me.fkComponente = cm.idComponente where cm.componente = "Fonte Energia" and cm.fkMaquina = ${idMaquina} group by me.valorConsumido) 'FonteEnergia',
            (select me.valorConsumido from medicoes me join componenteMonitorado cm on me.fkComponente = cm.idComponente where cm.componente = "Entradas" and cm.fkMaquina = ${idMaquina} group by me.valorConsumido) 'qtdPerifericos'
            from maquina m 
                left join laboratorio l on m.fkLaboratorio = l.idLaboratorio
                left join medicoes me on me.fkMaquina = m.idMaquina
                where m.idMaquina = ${idMaquina}
                GROUP BY me.dataHora, l.nomeSala
                order by dataHora desc limit 1;
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
        instrucaoSql = `
        SELECT 
        me.valorConsumido AS 'mediaCPU', 
        FORMAT(me.dataHora, 'dd/MM/yyyy, HH:mm:ss') AS 'dataHora'
        FROM 
            medicoes me
        JOIN 
            componenteMonitorado cm ON me.fkComponente = cm.idComponente
        WHERE 
            cm.componente = 'CPU' AND me.fkMaquina = ${idMaquina}
        GROUP BY 
            me.dataHora, me.valorConsumido
        ORDER BY 
            me.dataHora DESC
        OFFSET 0 ROWS FETCH NEXT 10 ROWS ONLY;
        `;
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
        instrucaoSql = `
            SELECT TOP 1
                me.valorConsumido AS 'mediaCPU', 
                FORMAT(me.dataHora, 'dd/MM/yyyy, HH:mm:ss') AS 'dataHora'
            FROM 
                medicoes me
            JOIN 
                componenteMonitorado cm ON me.fkComponente = cm.idComponente
            WHERE 
                cm.componente = 'CPU' AND me.fkMaquina = ${idMaquina}
            GROUP BY 
                me.dataHora, me.valorConsumido
            ORDER BY 
                me.dataHora DESC;
            `;
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
        instrucaoSql = ` 
            SELECT TOP 10
            FORMAT(me.dataHora, 'dd/MM/yyyy, HH:mm:ss') AS 'dataHora', 
            AVG(CASE WHEN cm.tipo = 'Ping' AND m.idMaquina = ${idMaquina} THEN me.valorConsumido ELSE NULL END) AS 'MediaLatencia'
            FROM 
            medicoes me
            JOIN 
            componenteMonitorado cm ON me.fkComponente = cm.idComponente 
            JOIN 
            maquina m ON cm.fkMaquina = m.idMaquina
            WHERE 
            cm.tipo IN ('Ping', 'Download', 'Upload') AND m.idMaquina = ${idMaquina}
            GROUP BY 
            me.dataHora
            ORDER BY 
            me.dataHora DESC;
        `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql =
            `
            SELECT 
            DATE_FORMAT(me.dataHora, '%d/%m/%Y, %H:%i:%s') AS 'dataHora', 
            AVG(CASE WHEN cm.tipo = "Ping" AND m.idMaquina = ${idMaquina} THEN me.valorConsumido ELSE NULL END) AS 'MediaLatencia'
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
        instrucaoSql = ` 
            SELECT TOP 1
            FORMAT(me.dataHora, 'dd/MM/yyyy, HH:mm:ss') AS 'dataHora', 
            AVG(CASE WHEN cm.tipo = 'Ping' AND m.idMaquina = ${idMaquina} THEN me.valorConsumido ELSE NULL END) AS 'MediaLatencia',
            AVG(CASE WHEN cm.tipo = 'Download' AND m.idMaquina = ${idMaquina} THEN me.valorConsumido ELSE NULL END) AS 'MediaDownload',
            AVG(CASE WHEN cm.tipo = 'Upload' AND m.idMaquina = ${idMaquina} THEN me.valorConsumido ELSE NULL END) AS 'MediaUpload'
            FROM 
            medicoes me
            JOIN 
            componenteMonitorado cm ON me.fkComponente = cm.idComponente 
            JOIN 
            maquina m ON cm.fkMaquina = m.idMaquina
            WHERE 
            cm.tipo IN ('Ping', 'Download', 'Upload') AND m.idMaquina = ${idMaquina}
            GROUP BY 
            me.dataHora
            ORDER BY 
            me.dataHora DESC;
        `;
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
        instrucaoSql = `
        SELECT 
        (SELECT TOP 1 me.valorConsumido 
        FROM medicoes me
        JOIN componenteMonitorado cm ON me.fkComponente = cm.idComponente AND me.fkMaquina = cm.fkMaquina
        WHERE cm.componente = 'Disco Rigido' AND me.fkMaquina = ${idMaquina}
        ORDER BY me.dataHora DESC) AS 'usoDisco',
        (SELECT TOP 1 me.valorConsumido 
        FROM medicoes me
        JOIN componenteMonitorado cm ON me.fkComponente = cm.idComponente AND me.fkMaquina = cm.fkMaquina
        WHERE cm.componente = 'Memoria' AND me.fkMaquina = ${idMaquina}
        ORDER BY me.dataHora DESC) AS 'usoRam',
        FORMAT((SELECT TOP 1 me.dataHora 
                FROM medicoes me
                WHERE me.fkMaquina = ${idMaquina}
                ORDER BY me.dataHora DESC), 'dd/MM/yyyy, HH:mm:ss') AS 'dataHora';
        `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql =
            `
            SELECT
                (SELECT me.valorConsumido from medicoes me
                join componentemonitorado cm on cm.idComponente = me.fkComponente
                where cm.componente = "Disco Rigido" AND me.fkMaquina = ${idMaquina}
                order by me.dataHora desc 
                limit 1) "usoDisco",
                (SELECT me.valorConsumido from medicoes me
                join componentemonitorado cm on cm.idComponente = me.fkComponente
                where cm.componente = "Memoria" AND me.fkMaquina = ${idMaquina}
                order by me.dataHora desc 
                limit 1) "usoRam",
                DATE_FORMAT(me.dataHora, '%d/%m/%Y, %H:%i:%s') AS 'dataHora'
            FROM
                medicoes me
            JOIN
                componenteMonitorado cm ON me.fkComponente = cm.idComponente AND me.fkMaquina = cm.fkMaquina
            WHERE
                me.fkMaquina = ${idMaquina}
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

function buscarDadosKpisAdmin(idInstituicao) {
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        SELECT 
        (SELECT COUNT(idMaquina) FROM maquina WHERE status = 1 AND fkInstitucional = ${idInstituicao}) AS 'qtdMaquinasAtivas',
        (SELECT COUNT(idMaquina) FROM maquina WHERE status = 0 AND fkInstitucional = ${idInstituicao}) AS 'qtdMaquinasInativas',
        (SELECT COUNT(idMaquina) FROM maquina WHERE dataCadastro >= DATEADD(MONTH, -1, GETDATE())) AS 'qtdMaquinasCadastradasMes',
        (SELECT COUNT(idLaboratorio) FROM laboratorio WHERE fkInstitucional = ${idInstituicao}) AS 'qtdLabs';
        `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql =
            `
            select 
                (select count(idMaquina) from maquina where status = 1 AND fkInstitucional = ${idInstituicao}) 'qtdMaquinasAtivas',
                (select count(idMaquina) from maquina where status = 0 AND fkInstitucional = ${idInstituicao}) 'qtdMaquinasInativas',
                (select count(idMaquina) from maquina where dataCadastro >= now() - INTERVAL 1 MONTH) 'qtdMaquinasCadastradasMes',
                (select count(idLaboratorio) from laboratorio where fkInstitucional = ${idInstituicao}) 'qtdLabs';
            `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarVariacaoStatusLabs(idInstituicao) {
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
            SELECT 
            l.idLaboratorio, 
            l.nomeSala, 
            COUNT(CASE WHEN m.fkInstitucional = ${idInstituicao} THEN m.idMaquina END) AS 'qtdMaquinas',
            COUNT(CASE WHEN m.status = 1 AND m.fkInstitucional = ${idInstituicao} THEN m.status END) AS 'qtdMaquinasAtivas',
            COUNT(CASE WHEN m.status = 0 AND m.fkInstitucional = ${idInstituicao} THEN m.status END) AS 'qtdMaquinasInativas'
            FROM 
            laboratorio l
            JOIN 
            maquina m ON m.fkLaboratorio = l.idLaboratorio
            WHERE 
            m.fkInstitucional = ${idInstituicao}
            GROUP BY 
            l.idLaboratorio, l.nomeSala
            ORDER BY 
            l.idLaboratorio;
        `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql =
            `
            select l.idLaboratorio, l.nomeSala, 
            COUNT((CASE WHEN m.fkInstitucional = ${idInstituicao} THEN m.idMaquina ELSE NULL END)) "qtdMaquinas",
            COUNT((CASE WHEN m.status = 1 AND m.fkInstitucional = ${idInstituicao} THEN m.status ELSE NULL END)) "qtdMaquinasAtivas",
             COUNT((CASE WHEN m.status = 0 AND m.fkInstitucional = ${idInstituicao} THEN m.status ELSE NULL END)) "qtdMaquinasInativas"
            from laboratorio l 
            join maquina m ON m.fkLaboratorio = l.idLaboratorio
            where m.fkInstitucional = ${idInstituicao}
            group by l.idLaboratorio, l.nomeSala
            order by idLaboratorio;
            `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarQtdAlertas(idInstituicao) {
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        select 
            (select count(a.idAlertas) from alertas a join maquina m on a.fkMaquina = m.idMaquina where m.fkInstitucional = ${idInstituicao} AND a.tipo = 'atenção') 'qtdAlertasAtencao',  
            (select count(a.idAlertas) from alertas a join maquina m on a.fkMaquina = m.idMaquina where m.fkInstitucional = ${idInstituicao} AND a.tipo = 'urgente') 'qtdAlertasUrgente';
            `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql =
            `
            select 
            (select count(a.idAlertas) from alertas a join maquina m on a.fkMaquina = m.idMaquina where m.fkInstitucional = ${idInstituicao} AND a.tipo = "atenção") 'qtdAlertasAtencao',  
            (select count(a.idAlertas) from alertas a join maquina m on a.fkMaquina = m.idMaquina where m.fkInstitucional = ${idInstituicao} AND a.tipo = "urgente") 'qtdAlertasUrgente';
            `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarRankingMaquinasAdmin(idInstituicao) {
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        SELECT 
            m.idMaquina, 
            m.numeroDeSerie, 
            COUNT(a.idAlertas) AS 'qtdAlertas'
        FROM 
            maquina m
        LEFT JOIN 
            componenteMonitorado cm ON cm.fkMaquina = m.idMaquina
        LEFT JOIN 
            medicoes me ON me.fkComponente = cm.idComponente
        LEFT JOIN 
            alertas a ON a.fkMonitoramento = me.idMonitoramento
        WHERE 
            m.fkInstitucional = ${idInstituicao}
        GROUP BY 
            m.idMaquina, m.numeroDeSerie
        ORDER BY 
            qtdAlertas DESC;
        `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql =
            `
            select m.idMaquina, m.numeroDeSerie, count(a.idAlertas) qtdAlertas from maquina m
			left join componenteMonitorado cm on cm.fkMaquina = m.idMaquina
            left join medicoes me on me.fkComponente = cm.idComponente
            left join alertas a on a.fkMonitoramento = me.idMonitoramento
            where m.fkInstitucional = ${idInstituicao}  group by m.idMaquina order by qtdAlertas desc;
            `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarColaboradores(idInstituicao) {
    instrucaoSql = ''
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
            SELECT 
                DISTINCT u.idUsuario,
                FORMAT(au.dataAcessoUsuario, 'dd/MM/yyyy, HH:mm') AS 'dataHora', 
                u.nome
            FROM 
                acessoUsuario au
            LEFT JOIN 
                usuario u ON au.fkUsuario = u.idUsuario
            WHERE 
                u.fkInstitucional = ${idInstituicao};
        `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql =
            `
            select DISTINCT au.fkUsuario, DATE_FORMAT(au.dataAcessoUsuario, '%d/%m/%Y, %H:%i') AS 'dataHora', u.nome 
            from acessoUsuario au
            join usuario u on au.fkUsuario = u.idUsuario
            WHERE u.fkInstitucional = ${idInstituicao};
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
    buscarFluxoRedeTempoReal,
    buscarStatusMaquinas,
    buscarRankingLabs,
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
    buscarDadosMemorias,
    buscarDadosKpisAdmin,
    buscarVariacaoStatusLabs,
    buscarQtdAlertas,
    buscarRankingMaquinasAdmin,
    buscarColaboradores
}