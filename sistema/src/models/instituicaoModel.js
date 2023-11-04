var database = require("../database/config")

// cadastro de laboratorios
function cadastrar(nomeInst, cnpjInst, emailInst, telefoneInst, cepInst, 
    numeroInst, complementoInst) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():"
    ,nomeInst, cnpjInst, emailInst, telefoneInst, cepInst, numeroInst, complementoInst);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
    INSERT INTO instituicao (nomeInstitucional, cnpj, email, telefone, cep, numeroEndereco, complemento, fkParametrosMonitoramento)
    VALUES ('${nomeInst}', '${cnpjInst}', '${emailInst}', '${telefoneInst}', '${cepInst}', '${numeroInst}', '${complementoInst}', 1);
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    cadastrar
};
