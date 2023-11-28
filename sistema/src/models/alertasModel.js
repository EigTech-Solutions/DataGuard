var database = require("../database/config");

function buscarQtdAlertasUrgentesAtencaoMes(idLab, idInstituicao, mes, ano) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = "";
    if (process.env.AMBIENTE_PROCESSO == "producao") {
instrucao = `SELECT 
SUM(CASE WHEN a.tipo = 'Urgente' THEN 1 ELSE 0 END) as QuantidadeAlertasUrgentes,
SUM(CASE WHEN a.tipo = 'Atenção' THEN 1 ELSE 0 END) as QuantidadeAlertasAtencao
FROM laboratorio l
JOIN maquina m ON l.idLaboratorio = m.fkLaboratorio
JOIN medicoes med ON m.idMaquina = med.fkMaquina
JOIN alertas a ON med.idMonitoramento = a.fkMonitoramento
WHERE l.idLaboratorio = ${idLab} AND l.fkInstitucional = ${idInstituicao}
AND MONTH(med.dataHora) = ${mes}
AND YEAR(med.dataHora) = ${ano}
GROUP BY l.idLaboratorio, MONTH(med.dataHora), YEAR(med.dataHora);
`;
    }else{
        instrucao = `
        SELECT 
            SUM(CASE WHEN a.tipo = 'Urgente' THEN 1 ELSE 0 END) as QuantidadeAlertasUrgentes,
            SUM(CASE WHEN a.tipo = 'Atenção' THEN 1 ELSE 0 END) as QuantidadeAlertasAtencao
        FROM laboratorio l
        JOIN maquina m ON l.idLaboratorio = m.fkLaboratorio
        JOIN medicoes med ON m.idMaquina = med.fkMaquina
        JOIN alertas a ON med.idMonitoramento = a.fkMonitoramento
        WHERE l.idLaboratorio = ${idLab} AND l.fkInstitucional = ${idInstituicao}
            AND MONTH(med.dataHora) = ${mes}
            AND YEAR(med.dataHora) = ${ano}
        GROUP BY l.idLaboratorio, MONTH(med.dataHora), YEAR(med.dataHora);
    `;
    }
    
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarQtdAlertasUrgentesAtencaoAno(idLab, idInstituicao, ano) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = "";
    if (process.env.AMBIENTE_PROCESSO == "producao") {
instrucao = `SELECT 
SUM(CASE WHEN a.tipo = 'Urgente' THEN 1 ELSE 0 END) as QuantidadeAlertasUrgentes,
SUM(CASE WHEN a.tipo = 'Atenção' THEN 1 ELSE 0 END) as QuantidadeAlertasAtencao
FROM laboratorio l
JOIN maquina m ON l.idLaboratorio = m.fkLaboratorio
JOIN medicoes med ON m.idMaquina = med.fkMaquina
JOIN alertas a ON med.idMonitoramento = a.fkMonitoramento
WHERE l.idLaboratorio = ${idLab} AND l.fkInstitucional = ${idInstitucional}
AND YEAR(med.dataHora) = ${ano}
GROUP BY l.idLaboratorio, MONTH(med.dataHora), YEAR(med.dataHora);
`;
    }else{
        instrucao = `
        SELECT 
            SUM(CASE WHEN a.tipo = 'Urgente' THEN 1 ELSE 0 END) as QuantidadeAlertasUrgentes,
            SUM(CASE WHEN a.tipo = 'Atenção' THEN 1 ELSE 0 END) as QuantidadeAlertasAtencao
        FROM laboratorio l
        JOIN maquina m ON l.idLaboratorio = m.fkLaboratorio
        JOIN medicoes med ON m.idMaquina = med.fkMaquina
        JOIN alertas a ON med.idMonitoramento = a.fkMonitoramento
        WHERE l.idLaboratorio = ${idLab} AND l.fkInstitucional = ${idInstituicao}
            AND YEAR(med.dataHora) = ${ano}
        GROUP BY l.idLaboratorio, MONTH(med.dataHora), YEAR(med.dataHora);
    `;
    }
    
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarAlertaPorComponenteMes(idLab, idInstituicao, mes, ano) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarAlertaPorComponenteMes()");
    var instrucao = "";
    if (process.env.AMBIENTE_PROCESSO == "producao") {
instrucao = `SELECT 
cm.componente,
COUNT(DISTINCT COALESCE(m.fkMaquina, 0)) AS qtdMaquinas,
ROUND(COUNT(DISTINCT COALESCE(m.fkMaquina, 0)) * 100.0 / (SELECT COUNT(idMaquina) FROM maquina WHERE fkLaboratorio = ${idLab} AND fkInstitucional = ${idInstituicao}), 2) AS percentualMaquinas
FROM componenteMonitorado cm
LEFT JOIN medicoes m ON cm.idComponente = m.fkComponente
LEFT JOIN maquina ma ON cm.fkMaquina = ma.idMaquina
LEFT JOIN Alertas a ON m.idMonitoramento = a.fkMonitoramento AND m.fkComponente = a.fkComponente AND m.fkMaquina = a.fkMaquina
LEFT JOIN laboratorio lab ON ma.fkLaboratorio = lab.idLaboratorio
WHERE
lab.idLaboratorio = ${idLab} AND lab.fkInstitucional = ${idInstituicao} 
AND MONTH(m.dataHora) = ${mes}
AND YEAR(m.dataHora) = ${ano} OR m.idMonitoramento IS NULL
GROUP BY cm.componente;
`;
    }else{
        instrucao = `
        SELECT 
            cm.componente,
            COUNT(DISTINCT COALESCE(m.fkMaquina, 0)) AS qtdMaquinas,
            ROUND(COUNT(DISTINCT COALESCE(m.fkMaquina, 0)) * 100.0 / (SELECT COUNT(idMaquina) FROM maquina WHERE fkLaboratorio = ${idLab} AND fkInstitucional = ${idInstituicao}), 2) AS percentualMaquinas
        FROM componenteMonitorado cm
        LEFT JOIN medicoes m ON cm.idComponente = m.fkComponente
        LEFT JOIN maquina ma ON cm.fkMaquina = ma.idMaquina
        LEFT JOIN Alertas a ON m.idMonitoramento = a.fkMonitoramento AND m.fkComponente = a.fkComponente AND m.fkMaquina = a.fkMaquina
        LEFT JOIN laboratorio lab ON ma.fkLaboratorio = lab.idLaboratorio
        WHERE
            lab.idLaboratorio = ${idLab} AND lab.fkInstitucional = ${idInstituicao} 
            AND MONTH(m.dataHora) = ${mes}
            AND YEAR(m.dataHora) = ${ano} OR m.idMonitoramento IS NULL
        GROUP BY cm.componente;
    `;
    }
   
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarAlertaPorComponenteAno(idLab, idInstituicao, ano) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarAlertaPorComponenteAno()");
    var instrucao = "";
    if (process.env.AMBIENTE_PROCESSO == "producao") {
instrucao = `SELECT 
cm.componente,
COUNT(DISTINCT COALESCE(m.fkMaquina, 0)) AS qtdMaquinas,
ROUND(COUNT(DISTINCT COALESCE(m.fkMaquina, 0)) * 100.0 / (SELECT COUNT(idMaquina) FROM maquina WHERE fkLaboratorio = ${idLab} AND fkInstitucional = ${idInstituicao}), 2) AS percentualMaquinas
FROM componenteMonitorado cm
LEFT JOIN medicoes m ON cm.idComponente = m.fkComponente
LEFT JOIN maquina ma ON cm.fkMaquina = ma.idMaquina
LEFT JOIN Alertas a ON m.idMonitoramento = a.fkMonitoramento AND m.fkComponente = a.fkComponente AND m.fkMaquina = a.fkMaquina
LEFT JOIN laboratorio lab ON ma.fkLaboratorio = lab.idLaboratorio
WHERE
lab.idLaboratorio = ${idLab} AND lab.fkInstitucional = ${idInstitucional} 
AND YEAR(m.dataHora) = ${ano} OR m.idMonitoramento IS NULL
GROUP BY cm.componente;
`;
    }else{
        instrucao = `
        SELECT 
            cm.componente,
            COUNT(DISTINCT COALESCE(m.fkMaquina, 0)) AS qtdMaquinas,
            ROUND(COUNT(DISTINCT COALESCE(m.fkMaquina, 0)) * 100.0 / (SELECT COUNT(idMaquina) FROM maquina WHERE fkLaboratorio = ${idLab} AND fkInstitucional = ${idInstituicao}), 2) AS percentualMaquinas
        FROM componenteMonitorado cm
        LEFT JOIN medicoes m ON cm.idComponente = m.fkComponente
        LEFT JOIN maquina ma ON cm.fkMaquina = ma.idMaquina
        LEFT JOIN Alertas a ON m.idMonitoramento = a.fkMonitoramento AND m.fkComponente = a.fkComponente AND m.fkMaquina = a.fkMaquina
        LEFT JOIN laboratorio lab ON ma.fkLaboratorio = lab.idLaboratorio
        WHERE
            lab.idLaboratorio = ${idLab} AND lab.fkInstitucional = ${idInstituicao} 
            AND YEAR(m.dataHora) = ${ano} OR m.idMonitoramento IS NULL
        GROUP BY cm.componente;
    `;
    }
     
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarNotificacoes(idInstituicao, idUsuario) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT 
        a.idAlertas, 
        a.lido, 
        l.nomeSala, 
        l.numeroSala, 
        CONVERT(varchar, me.dataHora, 103) + ', ' + CONVERT(varchar, me.dataHora, 108) AS dataHora, 
        m.ipMaquina, 
        m.idMaquina, 
        m.numeroDeSerie, 
        cm.componente, 
        a.tipo, 
        me.valorConsumido  
    FROM alertas a 
    JOIN medicoes me ON a.fkMonitoramento = me.idMonitoramento 
    JOIN componenteMonitorado cm ON me.fkComponente = cm.idComponente 
    JOIN maquina m ON cm.fkMaquina = m.idMaquina
    JOIN laboratorio l ON m.fkLaboratorio = l.idLaboratorio
    WHERE l.fkInstitucional = ${idInstituicao} AND l.fkResponsavel = ${idUsuario} AND a.lido = 0
    ORDER BY me.dataHora DESC;
    `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql =
            `
            select  a.idAlertas, a.lido, l.nomeSala, l.numeroSala, DATE_FORMAT(me.dataHora, '%d/%m/%Y, %H:%i:%s') 'dataHora', m.ipMaquina, m.idMaquina, m.numeroDeSerie, cm.componente, a.tipo, me.valorConsumido  from alertas a 
            join medicoes me on a.fkMonitoramento = me.idMonitoramento 
            join componenteMonitorado cm on me.fkComponente = cm.idComponente 
            join maquina m on cm.fkMaquina = m.idMaquina
            join laboratorio l on m.fkLaboratorio = l.idLaboratorio
            where l.fkInstitucional = ${idInstituicao} AND l.fkResponsavel = ${idUsuario} AND a.lido = 0
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
        instrucaoSql = `SELECT TOP 1
        a.idAlertas, 
        a.lido, 
        l.nomeSala, 
        l.numeroSala, 
        CONVERT(VARCHAR, me.dataHora, 103) + ', ' + CONVERT(VARCHAR, me.dataHora, 108) AS dataHora, 
        m.ipMaquina, 
        m.idMaquina, 
        cm.componente, 
        cm.tipo 
    FROM alertas a 
    JOIN medicoes me ON a.fkMonitoramento = me.idMonitoramento 
    JOIN componenteMonitorado cm ON me.fkComponente = cm.idComponente 
    JOIN maquina m ON cm.fkMaquina = m.idMaquina
    JOIN laboratorio l ON m.fkLaboratorio = l.idLaboratorio
    WHERE l.fkInstitucional = ${idInstituicao} AND l.fkResponsavel = ${idUsuario}
    ORDER BY me.dataHora DESC;
    `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql =
            `
            select  a.idAlertas, a.lido, l.nomeSala, l.numeroSala, DATE_FORMAT(me.dataHora, '%d/%m/%Y, %H:%i:%s') 'dataHora', m.ipMaquina, m.idMaquina, cm.componente, cm.tipo from alertas a 
            join medicoes me on a.fkMonitoramento = me.idMonitoramento 
            join componenteMonitorado cm on me.fkComponente = cm.idComponente 
            join maquina m on cm.fkMaquina = m.idMaquina
            join laboratorio l on m.fkLaboratorio = l.idLaboratorio
            where l.fkInstitucional = ${idInstituicao} AND l.fkResponsavel = ${idUsuario}
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
        instrucaoSql = `UPDATE alertas SET lido = 1 WHERE idAlertas = ${idNotificacao};
        `;
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

module.exports = {
    buscarQtdAlertasUrgentesAtencaoMes,
    buscarQtdAlertasUrgentesAtencaoAno,
    buscarAlertaPorComponenteMes,
    buscarAlertaPorComponenteAno,
    buscarNotificacoes,
    buscarNotificacoesTempoReal,
    marcarLido
};