var database = require("../database/config")

// cadastro de laboratorios
function cadastrar(nomeInst, cnpjInst, emailInst, telefoneInst, cepInst,
    numeroInst, complementoInst) {
    var instrucao = `
    INSERT INTO instituicao (nomeInstitucional, cnpj, email, telefone, cep, numeroEndereco, complemento, fkParametrosMonitoramento, dataCadastro)
    VALUES ('${nomeInst}', '${cnpjInst}', '${emailInst}', '${telefoneInst}', '${cepInst}', '${numeroInst}', '${complementoInst}', 1, now());
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function puxarDados() {
    var instrucao = `
    SELECT SUM(total_instituicoes) AS quantidade_total_instituicoes, GROUP_CONCAT(nomeInstitucional) AS nomes_instituicoes
FROM (
  SELECT COUNT(*) AS total_instituicoes, nomeInstitucional
  FROM instituicao
  GROUP BY nomeInstitucional
) AS subquery;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function dadosInstituicao() {

    var instrucao = `
    SELECT nomeInstitucional FROM instituicao;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function dadosGeraisInst() {
    var instrucao = `
    SELECT 
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
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function dashDatas() {
    var instrucao = `

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
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    cadastrar,
    puxarDados,
    dadosInstituicao,
    dadosGeraisInst,
    dashDatas
};