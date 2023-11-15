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

module.exports = {
    buscarQtdAlertasUrgentesAtencaoMes,
    buscarQtdAlertasUrgentesAtencaoAno
};