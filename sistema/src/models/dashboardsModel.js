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

function buscarMedidasEmTempoReal(idAquario) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top 1
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,  
                        CONVERT(varchar, momento, 108) as momento_grafico, 
                        fk_aquario 
                        from medida where fk_aquario = ${idAquario} 
                    order by id desc`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select 
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,
                        DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico, 
                        fk_aquario 
                        from medida where fk_aquario = ${idAquario} 
                    order by id desc limit 1`;
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
            select l.nomeSala, l.numeroSala, m.idMaquina, m.ipMaquina, a.tipo, a.dataHora from laboratorio l 
            right join maquina m on m.fkLaboratorio = l.idLaboratorio 
            right join alertas a on a.fkMaquina = m.idMaquina where m.fkInstitucional = ${idInstituicao} 
            order by a.dataHora desc;
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
    buscarMedidasEmTempoReal,
    buscarNotificacoes
}
