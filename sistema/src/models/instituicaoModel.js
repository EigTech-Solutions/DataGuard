var database = require("../database/config")

// cadastro de laboratorios
function cadastrar(nomeInst, cnpjInst, emailInst, telefoneInst, cepInst,
    numeroInst, complementoInst) {
    var instrucao = "";
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucao = `INSERT INTO instituicao (nomeInstitucional, cnpj, email, telefone, cep, numeroEndereco, complemento, fkParametrosMonitoramento, dataCadastro)
            VALUES ('${nomeInst}', '${cnpjInst}', '${emailInst}', '${telefoneInst}', '${cepInst}', '${numeroInst}', '${complementoInst}', 1, GETDATE());
            `;
    }
    else {
        instrucao = `
            INSERT INTO instituicao (nomeInstitucional, cnpj, email, telefone, cep, numeroEndereco, complemento, fkParametrosMonitoramento, dataCadastro)
            VALUES ('${nomeInst}', '${cnpjInst}', '${emailInst}', '${telefoneInst}', '${cepInst}', '${numeroInst}', '${complementoInst}', 1, now());
            `;
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function puxarDados() {
    var instrucao = "";
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucao = `SELECT SUM(total_instituicoes) AS quantidade_total_instituicoes, STRING_AGG(nomeInstitucional, ', ') AS nomes_instituicoes
        FROM (
          SELECT COUNT(*) AS total_instituicoes, nomeInstitucional
          FROM instituicao
          GROUP BY nomeInstitucional
        ) AS subquery;
        `;
    }
    else {
        instrucao = `
        SELECT SUM(total_instituicoes) AS quantidade_total_instituicoes, GROUP_CONCAT(nomeInstitucional) AS nomes_instituicoes
    FROM (
      SELECT COUNT(*) AS total_instituicoes, nomeInstitucional
      FROM instituicao
      GROUP BY nomeInstitucional
    ) AS subquery;
        `;
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function dadosInstituicao() {
    var instrucao = "";
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucao = ` SELECT idInstitucional, nomeInstitucional FROM instituicao;`;
    }
    else {
        instrucao = `
        SELECT idInstitucional, nomeInstitucional FROM instituicao;
        `;
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function dadosGeraisInst() {
    var instrucao = "";
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucao = ` SELECT 
        idInstitucional,
        nomeInstitucional,
        cnpj,
        email,
        telefone,
        cep,
        numeroEndereco,
        complemento
    FROM 
        instituicao;`;
    }
    else {
        instrucao = `
        SELECT 
            idInstitucional,
            nomeInstitucional,
            cnpj,
            email,
            telefone,
            cep,
            numeroEndereco,
            complemento
        FROM 
            instituicao;
        `;
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function dashDatas() {
    var instrucao = "";
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucao = ` 	
        SELECT
        FORMAT(dataCadastro, 'MMMM') AS nomeMes,
        COUNT(*) AS quantidadeDeCadastros
        FROM
            instituicao
        GROUP BY
            FORMAT(dataCadastro, 'MMMM')
        ORDER BY
            MIN(MONTH(dataCadastro));
       `;
    }
    else {
        instrucao = `

        SELECT
        MONTHNAME(dataCadastro) AS nomeMes,
        COUNT(*) AS quantidadeDeCadastros
      FROM
        instituicao
      GROUP BY
        nomeMes
      ORDER BY
        MIN(MONTH(dataCadastro));
      
        `;
    }


    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function deletarInstituicao(idInstitucional) {
    if (isNaN(idInstitucional)) {
        return Promise.reject("IdInstitucional inválido");
    }

    var instrucao = `
        DELETE FROM instituicao
        WHERE idInstitucional = ${idInstitucional};
    `;

    return database.executar(instrucao);
}

function dadosUsuario() {
    var instrucao = "";
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucao = ` SELECT idUsuario, nome FROM usuario;`;
    }
    else {
        instrucao = `
        select idUsuario, nome from usuario;
        `;
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function deletarUsuario(idUsuario) {
    if (isNaN(idUsuario)) {
        return Promise.reject("idUsuario inválido");
    }

    var instrucao = `
        DELETE FROM usuario
        WHERE idUsuario = ${idUsuario};
    `;

    return database.executar(instrucao);
}

function dadosGeraisUser() {
    var instrucao = "";
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucao = ` 
        select 
        idUsuario, 
        nome, 
        email, 
        senha, 
        telefone 
        from 
        usuario;`;
    }
    else {
        instrucao = `
        select 
        idUsuario, 
        nome, 
        email, 
        senha, 
        telefone 
        from 
        usuario;
        `;
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function puxarUser() {
    var instrucao = "";
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucao = `SELECT SUM(total_usuarios) AS quantidade_total_users
        FROM (
          SELECT COUNT(*) AS total_usuarios
          FROM usuario
        ) AS subquery;
        `;
    }
    else {
        instrucao = `
        SELECT SUM(total_usuarios) AS quantidade_total_users, GROUP_CONCAT(nome) AS nomes
    FROM (
      SELECT COUNT(*) AS total_usuarios, nome
      FROM usuario
      GROUP BY nome
    ) AS subquery;
        `;
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function puxarMaquinas() {
    var instrucao = "";
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucao = `
        SELECT 
        COUNT(*) AS quantidade_total_maquinas
      FROM maquina;
        `;
    }
    else {
        instrucao = `
        SELECT 
    COUNT(*) AS quantidade_total_maquinas, 
    GROUP_CONCAT(idMaquina) AS idsMaquinas
    FROM maquina;
        `;
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function puxarLabs() {
    var instrucao = "";
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucao = `
        SELECT SUM(total_labs) AS quantidade_total_labs
    FROM (
      SELECT COUNT(*) AS total_labs
      FROM laboratorio
    ) AS subquery;
        `;
    }
    else {
        instrucao = `
        SELECT SUM(total_labs) AS quantidade_total_labs, GROUP_CONCAT(nomeSala) AS nomes_labs
    FROM (
      SELECT COUNT(*) AS total_labs, nomeSala
      FROM laboratorio
      GROUP BY nomeSala
    ) AS subquery;
        `;
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function editarInst(nomeInst, cnpjInst, emailInst, telefoneInst, cepInst,
    numeroInst, complementoInst, idInstitucional) {
    var instrucao = `
    UPDATE instituicao SET nomeInstitucional = '${nomeInst}', 
    cnpj = '${cnpjInst}', email = '${emailInst}', telefone = '${telefoneInst}', cep = '${cepInst}', 
    numeroEndereco = '${numeroInst}', complemento = '${complementoInst}' 
    WHERE idInstitucional = ${idInstitucional};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    cadastrar,
    puxarDados,
    dadosInstituicao,
    dadosGeraisInst,
    dashDatas,
    deletarInstituicao,
    dadosUsuario,
    deletarUsuario,
    dadosGeraisUser,
    puxarUser,
    puxarMaquinas,
    puxarLabs,
    editarInst
};