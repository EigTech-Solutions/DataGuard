var database = require("../database/config");

function buscarQtdAlertasUrgentesAtencaoMes(idLab, idInstituicao, mes, ano) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
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
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarQtdAlertasUrgentesAtencaoAno(idLab, idInstituicao, ano) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT 
            SUM(CASE WHEN a.tipo = 'Urgente' THEN 1 ELSE 0 END) as QuantidadeAlertasUrgentes,
            SUM(CASE WHEN a.tipo = 'Atenção' THEN 1 ELSE 0 END) as QuantidadeAlertasAtencao
        FROM laboratorio l
        JOIN maquina m ON l.idLaboratorio = m.fkLaboratorio
        JOIN medicoes med ON m.idMaquina = med.fkMaquina
        JOIN alertas a ON med.idMonitoramento = a.fkMonitoramento
        WHERE l.idLaboratorio = ${idLab} AND l.fkInstitucional = ${idInstituicao}
            AND YEAR(m.dataHora) = ${ano}
        GROUP BY l.idLaboratorio, MONTH(m.dataHora), YEAR(m.dataHora);
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarAlertaPorComponenteMes(idLab, idInstituicao, mes, ano) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarAlertaPorComponenteMes()");
    var instrucao = `
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
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarAlertaPorComponenteAno(idLab, idInstituicao, ano) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarAlertaPorComponenteAno()");
    var instrucao = `
        SELECT 
            cm.componente,
            COUNT(DISTINCT m.idMaquina) as QuantidadeMaquinas,
            ROUND((COUNT(DISTINCT m.idMaquina) / (SELECT COUNT(idMaquina) FROM maquina WHERE fkLaboratorio = ${idLab} AND fkInstitucional = ${idInstituicao})) * 100, 2) as PercentualMaquinas
        FROM laboratorio l
        JOIN maquina m ON l.idLaboratorio = m.fkLaboratorio
        JOIN componenteMonitorado cm ON m.idMaquina = cm.fkMaquina
        JOIN medicoes med ON m.idMaquina = med.fkMaquina
        JOIN alertas a ON med.idMonitoramento = a.fkMonitoramento
        WHERE l.idLaboratorio = ${idLab} AND l.fkInstitucional = ${idInstituicao}
            AND YEAR(med.dataHora) = ${ano}
        GROUP BY cm.componente;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    buscarQtdAlertasUrgentesAtencaoMes,
    buscarQtdAlertasUrgentesAtencaoAno,
    buscarAlertaPorComponenteMes,
    buscarAlertaPorComponenteAno
};