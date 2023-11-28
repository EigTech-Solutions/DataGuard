var database = require("../database/config")

function listar(idInstituicao) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = ""

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucao = `
            SELECT
                l.idLaboratorio, l.fkInstitucional, l.nomeSala, l.numeroSala, l.fkResponsavel,
                COUNT(DISTINCT m.idMaquina) AS quantidadeComputadores,
                COUNT(DISTINCT a.idAlertas) AS quantidadeAlertasUltimoMes
            FROM laboratorio l
            LEFT JOIN maquina m ON m.fkLaboratorio = l.idLaboratorio AND l.fkInstitucional = m.fkInstitucional
            LEFT JOIN medicoes dm ON m.idMaquina = dm.fkMaquina
            LEFT JOIN Alertas a ON dm.idMonitoramento = a.fkMonitoramento AND dm.fkMaquina = a.fkMaquina
            WHERE
                l.fkInstitucional = ${idInstituicao}
            GROUP BY l.idLaboratorio, l.fkInstitucional, l.nomeSala, l.numeroSala, l.fkResponsavel;
        `
    } else {
        instrucao = `
            SELECT
                l.*,
                COUNT(DISTINCT m.idMaquina) AS quantidadeComputadores,
                COUNT(DISTINCT a.idAlertas) AS quantidadeAlertasUltimoMes
            FROM laboratorio l
            LEFT JOIN maquina m ON m.fkLaboratorio = l.idLaboratorio AND l.fkInstitucional = m.fkInstitucional
            LEFT JOIN medicoes dm ON m.idMaquina = dm.fkMaquina
            LEFT JOIN Alertas a ON dm.idMonitoramento = a.fkMonitoramento AND dm.fkMaquina = a.fkMaquina
            WHERE
                l.fkInstitucional = ${idInstituicao}
            GROUP BY l.idLaboratorio;
        `;
    }
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


function buscarNivelPreocupacaoLab(idLab, idInstituicao) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarNivelPreocupacaoLab()");
    var instrucao = ""
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucao = `
        SELECT
        l.nomeSala,
        (SELECT COUNT(idMaquina) FROM maquina WHERE fkLaboratorio = ${idLab} AND fkInstitucional = ${idInstituicao}) as qtdMaquinas,
        SUM(CASE WHEN a.tipo = 'Urgente' THEN 1 ELSE 0 END) AS qtdAlertasUrgentes,
        SUM(CASE WHEN a.tipo = 'Atenção' THEN 1 ELSE 0 END) AS qtdAlertasAtencao,
        ROUND((((SUM(CASE WHEN a.tipo = 'Urgente' THEN 1 ELSE 0 END)) * 1 + (SUM(CASE WHEN a.tipo = 'Atenção' THEN 1 ELSE 0 END) * 0.5)) / COUNT(m.idMaquina)) * 100, 2) AS percentualPreocupacao,
        CASE
            WHEN ROUND((((SUM(CASE WHEN a.tipo = 'Urgente' THEN 1 ELSE 0 END)) * 1 + (SUM(CASE WHEN a.tipo = 'Atenção' THEN 1 ELSE 0 END) * 0.5)) / COUNT(m.idMaquina)) * 100, 2) <= 15 THEN 'Ótimo'
            WHEN ROUND((((SUM(CASE WHEN a.tipo = 'Urgente' THEN 1 ELSE 0 END)) * 1 + (SUM(CASE WHEN a.tipo = 'Atenção' THEN 1 ELSE 0 END) * 0.5)) / COUNT(m.idMaquina)) * 100, 2) <= 25 THEN 'Bom'
            WHEN ROUND((((SUM(CASE WHEN a.tipo = 'Urgente' THEN 1 ELSE 0 END)) * 1 + (SUM(CASE WHEN a.tipo = 'Atenção' THEN 1 ELSE 0 END) * 0.5)) / COUNT(m.idMaquina)) * 100, 2) <= 50 THEN 'Atenção'
            WHEN ROUND((((SUM(CASE WHEN a.tipo = 'Urgente' THEN 1 ELSE 0 END)) * 1 + (SUM(CASE WHEN a.tipo = 'Atenção' THEN 1 ELSE 0 END) * 0.5)) / COUNT(m.idMaquina)) * 100, 2) <= 75 THEN 'Preocupante'
            WHEN COUNT(a.idAlertas) IS NULL OR COUNT(a.idAlertas) = 0 THEN 'Ótimo'
            ELSE 'Extremamente preocupante'
        END AS situacao
        FROM laboratorio l
        left JOIN maquina m ON l.idLaboratorio = m.fkLaboratorio
        JOIN medicoes med ON m.idMaquina = med.fkMaquina
        JOIN alertas a ON med.idMonitoramento = a.fkMonitoramento AND med.fkMaquina = a.fkMaquina
        WHERE l.idLaboratorio = ${idLab} AND l.fkInstitucional = ${idInstituicao}
            AND med.dataHora >= DATEADD(DAY, -30, GETDATE())
        GROUP BY l.idLaboratorio, l.nomeSala;
`
    } else {
        instrucao = `
        SELECT
            l.nomeSala,
            (SELECT COUNT(idMaquina) FROM maquina WHERE fkLaboratorio = ${idLab} AND fkInstitucional = ${idInstituicao}) as qtdMaquinas,
            SUM(CASE WHEN a.tipo = 'Urgente' THEN 1 ELSE 0 END) as qtdAlertasUrgentes,
            SUM(CASE WHEN a.tipo = 'Atenção' THEN 1 ELSE 0 END) as qtdAlertasAtencao,
            ROUND((((SUM(CASE WHEN a.tipo = 'Urgente' THEN 1 ELSE 0 END)) * 1 + (SUM(CASE WHEN a.tipo = 'Atenção' THEN 1 ELSE 0 END) * 0.5)) / (SELECT COUNT(idMaquina) FROM maquina WHERE fkLaboratorio = ${idLab} AND fkInstitucional = ${idInstituicao})) * 100, 2) as percentualPreocupacao,
        CASE 
            WHEN ROUND((((SUM(CASE WHEN a.tipo = 'Urgente' THEN 1 ELSE 0 END)) * 1 + (SUM(CASE WHEN a.tipo = 'Atenção' THEN 1 ELSE 0 END) * 0.5)) / (SELECT COUNT(idMaquina) FROM maquina WHERE fkLaboratorio = ${idLab} AND fkInstitucional = ${idInstituicao})) * 100, 2) <= 15 THEN 'Ótimo'
            WHEN ROUND((((SUM(CASE WHEN a.tipo = 'Urgente' THEN 1 ELSE 0 END)) * 1 + (SUM(CASE WHEN a.tipo = 'Atenção' THEN 1 ELSE 0 END) * 0.5)) / (SELECT COUNT(idMaquina) FROM maquina WHERE fkLaboratorio = ${idLab} AND fkInstitucional = ${idInstituicao})) * 100, 2) <= 25 THEN 'Bom'
            WHEN ROUND((((SUM(CASE WHEN a.tipo = 'Urgente' THEN 1 ELSE 0 END)) * 1 + (SUM(CASE WHEN a.tipo = 'Atenção' THEN 1 ELSE 0 END) * 0.5)) / (SELECT COUNT(idMaquina) FROM maquina WHERE fkLaboratorio = ${idLab} AND fkInstitucional = ${idInstituicao})) * 100, 2) <= 50 THEN 'Atenção'
            WHEN ROUND((((SUM(CASE WHEN a.tipo = 'Urgente' THEN 1 ELSE 0 END)) * 1 + (SUM(CASE WHEN a.tipo = 'Atenção' THEN 1 ELSE 0 END) * 0.5)) / (SELECT COUNT(idMaquina) FROM maquina WHERE fkLaboratorio = ${idLab} AND fkInstitucional = ${idInstituicao})) * 100, 2) <= 75 THEN 'Preocupante'
            WHEN COUNT(a.idAlertas) IS NULL OR COUNT(a.idAlertas) = 0 THEN 'Ótimo'
            ELSE 'Extremamente preocupante'
        END as situacao
        FROM laboratorio l
        JOIN maquina m ON l.idLaboratorio = m.fkLaboratorio
        LEFT JOIN medicoes med ON m.idMaquina = med.fkMaquina
        LEFT JOIN alertas a ON med.idMonitoramento = a.fkMonitoramento
        WHERE l.idLaboratorio = ${idLab} AND l.fkInstitucional = ${idInstituicao}
            AND med.dataHora >= CURDATE() - INTERVAL 30 DAY
        GROUP BY l.idLaboratorio, l.nomeSala
    `;
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarNivelPreocupacaoLabs(idInstituicao) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarNivelPreocupacaoLab()");
    var instrucao = ""
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucao = `
        SELECT
            i.nomeInstitucional,
            COUNT(m.idMaquina) AS qtdMaquinas,
            SUM(CASE WHEN a.tipo = 'Urgente' THEN 1 ELSE 0 END) AS qtdAlertasUrgentes,
            SUM(CASE WHEN a.tipo = 'Atenção' THEN 1 ELSE 0 END) AS qtdAlertasAtencao,
            ROUND((((SUM(CASE WHEN a.tipo = 'Urgente' THEN 1 ELSE 0 END)) * 1 + (SUM(CASE WHEN a.tipo = 'Atenção' THEN 1 ELSE 0 END) * 0.5)) / COUNT(m.idMaquina)) * 100, 2) AS percentualPreocupacao,
            CASE
                WHEN ROUND((((SUM(CASE WHEN a.tipo = 'Urgente' THEN 1 ELSE 0 END)) * 1 + (SUM(CASE WHEN a.tipo = 'Atenção' THEN 1 ELSE 0 END) * 0.5)) / COUNT(m.idMaquina)) * 100, 2) <= 15 THEN 'Ótimo'
                WHEN ROUND((((SUM(CASE WHEN a.tipo = 'Urgente' THEN 1 ELSE 0 END)) * 1 + (SUM(CASE WHEN a.tipo = 'Atenção' THEN 1 ELSE 0 END) * 0.5)) / COUNT(m.idMaquina)) * 100, 2) <= 25 THEN 'Bom'
                WHEN ROUND((((SUM(CASE WHEN a.tipo = 'Urgente' THEN 1 ELSE 0 END)) * 1 + (SUM(CASE WHEN a.tipo = 'Atenção' THEN 1 ELSE 0 END) * 0.5)) / COUNT(m.idMaquina)) * 100, 2) <= 50 THEN 'Atenção'
                WHEN ROUND((((SUM(CASE WHEN a.tipo = 'Urgente' THEN 1 ELSE 0 END)) * 1 + (SUM(CASE WHEN a.tipo = 'Atenção' THEN 1 ELSE 0 END) * 0.5)) / COUNT(m.idMaquina)) * 100, 2) <= 75 THEN 'Preocupante'
                WHEN COUNT(a.idAlertas) IS NULL OR COUNT(a.idAlertas) = 0 THEN 'Ótimo'
                ELSE 'Extremamente preocupante'
            END AS situacao
        FROM instituicao i
        JOIN maquina m ON i.idInstitucional = m.fkInstitucional
        LEFT JOIN medicoes med ON m.idMaquina = med.fkMaquina
        LEFT JOIN alertas a ON med.idMonitoramento = a.fkMonitoramento AND med.fkMaquina = a.fkMaquina
        WHERE i.idInstitucional = ${idInstituicao}
            AND med.dataHora >= DATEADD(DAY, -30, GETDATE())
        GROUP BY i.idInstitucional, i.nomeInstitucional;
        `
    } else {
        instrucao = `
        SELECT
            i.nomeInstitucional,
            (SELECT COUNT(idMaquina) FROM maquina WHERE fkInstitucional = ${idInstituicao}) as qtdMaquinas,
            SUM(CASE WHEN a.tipo = 'Urgente' THEN 1 ELSE 0 END) as qtdAlertasUrgentes,
            SUM(CASE WHEN a.tipo = 'Atenção' THEN 1 ELSE 0 END) as qtdAlertasAtencao,
            ROUND((((SUM(CASE WHEN a.tipo = 'Urgente' THEN 1 ELSE 0 END)) * 1 + (SUM(CASE WHEN a.tipo = 'Atenção' THEN 1 ELSE 0 END) * 0.5)) / (SELECT COUNT(idMaquina) FROM maquina WHERE fkInstitucional = ${idInstituicao})) * 100, 2) as percentualPreocupacao,
        CASE 
            WHEN ROUND((((SUM(CASE WHEN a.tipo = 'Urgente' THEN 1 ELSE 0 END)) * 1 + (SUM(CASE WHEN a.tipo = 'Atenção' THEN 1 ELSE 0 END) * 0.5)) / (SELECT COUNT(idMaquina) FROM maquina WHERE fkInstitucional = ${idInstituicao})) * 100, 2) <= 15 THEN 'Ótimo'
            WHEN ROUND((((SUM(CASE WHEN a.tipo = 'Urgente' THEN 1 ELSE 0 END)) * 1 + (SUM(CASE WHEN a.tipo = 'Atenção' THEN 1 ELSE 0 END) * 0.5)) / (SELECT COUNT(idMaquina) FROM maquina WHERE fkInstitucional = ${idInstituicao})) * 100, 2) <= 25 THEN 'Bom'
            WHEN ROUND((((SUM(CASE WHEN a.tipo = 'Urgente' THEN 1 ELSE 0 END)) * 1 + (SUM(CASE WHEN a.tipo = 'Atenção' THEN 1 ELSE 0 END) * 0.5)) / (SELECT COUNT(idMaquina) FROM maquina WHERE fkInstitucional = ${idInstituicao})) * 100, 2) <= 50 THEN 'Atenção'
            WHEN ROUND((((SUM(CASE WHEN a.tipo = 'Urgente' THEN 1 ELSE 0 END)) * 1 + (SUM(CASE WHEN a.tipo = 'Atenção' THEN 1 ELSE 0 END) * 0.5)) / (SELECT COUNT(idMaquina) FROM maquina WHERE fkInstitucional = ${idInstituicao})) * 100, 2) <= 75 THEN 'Preocupante'
            ELSE 'Extremamente preocupante'
        END as situacao
        FROM instituicao i
        JOIN maquina m ON i.idInstitucional = m.fkInstitucional
        LEFT JOIN medicoes med ON m.idMaquina = med.fkMaquina
        LEFT JOIN alertas a ON med.idMonitoramento = a.fkMonitoramento
        WHERE i.idInstitucional = ${idInstituicao}
            AND med.dataHora >= CURDATE() - INTERVAL 30 DAY
        GROUP BY i.idInstitucional, i.nomeInstitucional;
    `;
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    listar,
    buscarLab,
    cadastrar,
    atualizar,
    deletar,
    preDelete,
    buscarNivelPreocupacaoLab,
    buscarNivelPreocupacaoLabs
};
