var database = require("../database/config");

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
        LEFT JOIN Alertas a ON dm.idMonitoramento = a.fkMonitoramento AND dm.fkMaquina = a.fkMaquina AND MONTH(dm.dataHora) = MONTH(CURRENT_DATE())
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

function buscarPorIpOrNumSerie(numBusca, idInstituicao) {
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
        LEFT JOIN Alertas a ON dm.idMonitoramento = a.fkMonitoramento AND dm.fkMaquina = a.fkMaquina AND MONTH(dm.dataHora) = MONTH(CURRENT_DATE())
        WHERE m.fkInstitucional = ${idInstituicao} AND (m.ipMaquina LIKE '${numBusca}%' OR m.numeroDeSerie LIKE '${numBusca}%')
        GROUP BY m.idMaquina;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// cadastro de maquinas
function cadastrar(numeroSerie, ip, sistemaOperacional, capMemoriaDisco, capMemoriaRam, tipoDisco, processador, laboratorio, idInstituicao) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", numeroSerie, ip, sistemaOperacional, capMemoriaDisco, capMemoriaRam, tipoDisco, processador, laboratorio, idInstituicao);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO maquina (numeroDeSerie, ipMaquina, sistemaOperacional, tipoDisco,  capacidadeMemoriaDisco, capacidadeMemoriaRam, processador, status, dataCadastro, fkLaboratorio, fkInstitucional) VALUES ('${numeroSerie}', '${ip}', '${sistemaOperacional}', '${tipoDisco}', '${capMemoriaDisco}', '${capMemoriaRam}', '${processador}', 1, now(), ${laboratorio}, ${idInstituicao});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function atualizar(idPC, numeroSerie, ip, sistemaOperacional, capMemoriaDisco, capMemoriaRam, tipoDisco, processador, idLaboratorio, idInstituicao) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizar():", idPC, numeroSerie, ip, sistemaOperacional, capMemoriaDisco, capMemoriaRam, tipoDisco, processador, idLaboratorio, idInstituicao);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        UPDATE maquina SET numeroDeSerie = '${numeroSerie}', ipMaquina = '${ip}', sistemaOperacional = '${sistemaOperacional}', tipoDisco = '${tipoDisco}',  capacidadeMemoriaDisco = '${capMemoriaDisco}', capacidadeMemoriaRam = '${capMemoriaRam}', processador = '${processador}', fkLaboratorio = ${idLaboratorio} WHERE idMaquina = ${idPC} AND fkInstitucional = ${idInstituicao};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function atualizarStatus(idPC, idInstituicao, status) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizar():", idPC, idInstituicao, status);

    var dataDesativamento;
    if (status == 0) {
        dataDesativamento = 'now()';
    } else {
        dataDesativamento = null;
    }

    var instrucao = `
        UPDATE maquina SET status = ${status}, dataDesativamento = ${dataDesativamento} WHERE idMaquina = ${idPC} AND fkInstitucional = ${idInstituicao};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function atualizarLaboratorio(idPC, idInstituicao, idLab) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizar():", idPC, idInstituicao, idLab);

    var instrucao = `
        UPDATE maquina SET fkLaboratorio = ${idLab} WHERE idMaquina = ${idPC} AND fkInstitucional = ${idInstituicao};
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

function buscarTotalPcsInstituicao(idInstituicao) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarTotalPcsInstituicao()");
    var instrucao = `
        SELECT COUNT(*) as TotalMaquinas FROM maquina WHERE fkInstitucional = ${idInstituicao};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarTotalPcsLab(idLab, idInstituicao) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarTotalPcsLab()");
    var instrucao = `
        SELECT 
            l.nomeSala as NomeLaboratorio,
            COUNT(m.idMaquina) as TotalMaquinasLaboratorio,
            ROUND((COUNT(m.idMaquina) / (SELECT COUNT(*) FROM maquina)) * 100, 2) as PercentualDoTotal
        FROM laboratorio l
        JOIN maquina m ON l.idLaboratorio = m.fkLaboratorio
        WHERE l.idLaboratorio = ${idLab} AND l.fkInstitucional = ${idInstituicao}
        GROUP BY l.idLaboratorio;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarTotalPcsAtivosInativos(idLab, idInstituicao) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarTotalPcsLab()");
    var instrucao = `
        SELECT 
            l.nomeSala as NomeLaboratorio,
            SUM(CASE WHEN m.status = 1 THEN 1 ELSE 0 END) as TotalMaquinasAtivas,
            SUM(CASE WHEN m.status = 0 THEN 1 ELSE 0 END) as TotalMaquinasInativas,
            ROUND((SUM(CASE WHEN m.status = 0 THEN 1 ELSE 0 END) / COUNT(m.idMaquina)) * 100, 2) as PercentualMaquinasInativas
        FROM laboratorio l
        JOIN maquina m ON l.idLaboratorio = m.fkLaboratorio
        WHERE l.idLaboratorio = ${idLab} AND l.fkInstitucional = ${idInstituicao}
        GROUP BY l.idLaboratorio;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarTotalPcsCadastradosDesativadosMes(idLab, idInstituicao, mes, ano) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarTotalPcsCadastradosDesativadosMes()");
    var instrucao = `
        SELECT 
            SUM(CASE WHEN m.status = 1 THEN 1 ELSE 0 END) as QtdMaquinasAdicionadas,
            SUM(CASE WHEN m.status = 0 THEN 1 ELSE 0 END) as QtdMaquinasDesativadas
        FROM laboratorio l
        JOIN maquina m ON l.idLaboratorio = m.fkLaboratorio
        WHERE l.idLaboratorio = ${idLab} AND l.fkInstitucional = ${idInstituicao}
            AND MONTH(m.dataCadastro) = ${mes}
            AND YEAR(m.dataCadastro) = ${ano}
        GROUP BY l.idLaboratorio, MONTH(m.dataCadastro), YEAR(m.dataCadastro);
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarTotalPcsCadastradosDesativadosAno(idLab, idInstituicao, ano) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarTotalPcsCadastradosDesativadosMes()");
    var instrucao = `
        SELECT 
            SUM(CASE WHEN m.status = 1 THEN 1 ELSE 0 END) as QtdMaquinasAdicionadas,
            SUM(CASE WHEN m.status = 0 THEN 1 ELSE 0 END) as QtdMaquinasDesativadas
        FROM laboratorio l
        JOIN maquina m ON l.idLaboratorio = m.fkLaboratorio
        WHERE l.idLaboratorio = ${idLab} AND l.fkInstitucional = ${idInstituicao}
            AND YEAR(m.dataCadastro) = ${ano}
        GROUP BY l.idLaboratorio, YEAR(m.dataCadastro);
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarPcsDesativadosMes(idLab, idInstituicao, mes, ano) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarPcsDesativadosMes()");
    var instrucao = `
        SELECT 
            idMaquina,
            numeroDeSerie
        FROM maquina m
        WHERE fkLaboratorio = ${idLab} AND fkInstitucional = ${idInstituicao}
            AND MONTH(m.dataDesativamento) = ${mes}
            AND YEAR(m.dataDesativamento) = ${ano}
            AND m.status = 0;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarPcsDesativadosAno(idLab, idInstituicao, ano) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarPcsDesativadosMes()");
    var instrucao = `
        SELECT 
            idMaquina,
            numeroDeSerie
        FROM maquina m
        WHERE fkLaboratorio = ${idLab} AND fkInstitucional = ${idInstituicao}
            AND YEAR(m.dataDesativamento) = ${ano}
            AND m.status = 0;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarIndicePreocupacaoMaquina(idMaquina, idInstituicao) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarIndicePreocupacaoMaquina()");
    var instrucao = `
    SELECT
            l.nomeSala, l.idLaboratorio, m.idMaquina,
            SUM(CASE WHEN a.tipo = 'Urgente' THEN 1 ELSE 0 END) as qtdAlertasUrgentes,
            SUM(CASE WHEN a.tipo = 'Atenção' THEN 1 ELSE 0 END) as qtdAlertasAtencao,
            ROUND((((SUM(CASE WHEN a.tipo = 'Urgente' THEN 1 ELSE 0 END)) * 1 + (SUM(CASE WHEN a.tipo = 'Atenção' THEN 1 ELSE 0 END) * 0.5))) * 100, 2) as percentualPreocupacao,
        CASE 
            WHEN ROUND((((SUM(CASE WHEN a.tipo = 'Urgente' THEN 1 ELSE 0 END)) * 1 + (SUM(CASE WHEN a.tipo = 'Atenção' THEN 1 ELSE 0 END) * 0.5))) * 100, 2) <= 5 THEN 'Ótimo'
            WHEN ROUND((((SUM(CASE WHEN a.tipo = 'Urgente' THEN 1 ELSE 0 END)) * 1 + (SUM(CASE WHEN a.tipo = 'Atenção' THEN 1 ELSE 0 END) * 0.5))) * 100, 2) <= 10 THEN 'Bom'
            WHEN ROUND((((SUM(CASE WHEN a.tipo = 'Urgente' THEN 1 ELSE 0 END)) * 1 + (SUM(CASE WHEN a.tipo = 'Atenção' THEN 1 ELSE 0 END) * 0.5))) * 100, 2) <= 15 THEN 'Atenção'
            WHEN ROUND((((SUM(CASE WHEN a.tipo = 'Urgente' THEN 1 ELSE 0 END)) * 1 + (SUM(CASE WHEN a.tipo = 'Atenção' THEN 1 ELSE 0 END) * 0.5))) * 100, 2) <= 20 THEN 'Preocupante'
            ELSE 'Extremamente preocupante'
        END as situacao
        FROM laboratorio l
        JOIN maquina m ON l.idLaboratorio = m.fkLaboratorio
        LEFT JOIN medicoes med ON m.idMaquina = med.fkMaquina
        LEFT JOIN alertas a ON med.idMonitoramento = a.fkMonitoramento
        WHERE m.idMaquina = ${idMaquina} AND l.fkInstitucional = ${idInstituicao}
            AND med.dataHora >= CURDATE() - INTERVAL 30 DAY
        GROUP BY l.idLaboratorio, l.nomeSala;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    listar,
    buscarPC,
    buscarPorIpOrNumSerie,
    cadastrar,
    atualizar,
    atualizarStatus,
    atualizarLaboratorio,
    deletar,
    buscarTotalPcsInstituicao,
    buscarTotalPcsLab,
    buscarTotalPcsAtivosInativos,
    buscarTotalPcsCadastradosDesativadosMes,
    buscarTotalPcsCadastradosDesativadosAno,
    buscarPcsDesativadosMes,
    buscarPcsDesativadosAno,
    buscarIndicePreocupacaoMaquina
};