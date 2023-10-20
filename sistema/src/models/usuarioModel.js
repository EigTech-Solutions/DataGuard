var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
        SELECT usuario.*, 
            IFNULL(acessoUsuarioAdmin.fkAcesso, 0) AS acessoAdmin, 
            IFNULL(acessoUsuarioTecnico.fkAcesso, 0) AS acessoTecnico
        FROM usuario
        LEFT JOIN acessoUsuario acessoUsuarioAdmin ON usuario.idUsuario = acessoUsuarioAdmin.fkUsuario
        AND acessoUsuarioAdmin.fkAcesso = (SELECT idAcesso FROM acesso WHERE tipoAcesso = 'Admin')
        LEFT JOIN acessoUsuario acessoUsuarioTecnico ON usuario.idUsuario = acessoUsuarioTecnico.fkUsuario
        AND acessoUsuarioTecnico.fkAcesso = (SELECT idAcesso FROM acesso WHERE tipoAcesso = 'Técnico')
        WHERE usuario.email = '${email}' AND usuario.senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listar(idInstituicao) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT usuario.*, 
            IFNULL(acessoUsuarioAdmin.fkAcesso, 0) AS acessoAdmin, 
            IFNULL(acessoUsuarioTecnico.fkAcesso, 0) AS acessoTecnico
        FROM usuario
        LEFT JOIN acessoUsuario acessoUsuarioAdmin ON usuario.idUsuario = acessoUsuarioAdmin.fkUsuario
        AND acessoUsuarioAdmin.fkAcesso = (SELECT idAcesso FROM acesso WHERE tipoAcesso = 'Admin')
        LEFT JOIN acessoUsuario acessoUsuarioTecnico ON usuario.idUsuario = acessoUsuarioTecnico.fkUsuario
        AND acessoUsuarioTecnico.fkAcesso = (SELECT idAcesso FROM acesso WHERE tipoAcesso = 'Técnico')
        WHERE usuario.fkInstitucional = ${idInstituicao};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarUser(idUser, idInstituicao) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT * FROM usuario WHERE idUsuario = ${idUser} AND fkInstitucional = ${idInstituicao};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// cadastro de usuarios
function cadastrar(nome, email, telefone, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO usuario (nome, email, senha, fkInstitucional) 
            VALUES ('${nome}', '${email}', '${senha}', '${sessionStorage.ID_INSTITUICAO}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarTecnicos(idInstituicao) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT usuario.* FROM usuario
        INNER JOIN acessoUsuario ON usuario.idUsuario = acessoUsuario.fkUsuario
        INNER JOIN acesso ON acessoUsuario.fkAcesso = acesso.idAcesso
        WHERE acesso.tipoAcesso = 'Técnico' AND acessoUsuario.fkInstitucional = ${idInstituicao};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function deletar(idUser, idInstituicao) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():", idUser);
    
    var instrucao = `
        DELETE FROM usuario WHERE idUsuario = ${idUser} AND fkInstitucional = ${idInstituicao};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    autenticar,
    listar,
    buscarUser,
    cadastrar,
    listarTecnicos,
    deletar
};