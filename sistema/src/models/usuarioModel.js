var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = ""
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucao = `
            SELECT usuario.*,
                ISNULL(acessoUsuarioAdmin.fkAcesso, 0) AS acessoAdmin,
                ISNULL(acessoUsuarioTecnico.fkAcesso, 0) AS acessoTecnico
            FROM usuario
                LEFT JOIN acessoUsuario acessoUsuarioAdmin ON usuario.idUsuario = acessoUsuarioAdmin.fkUsuario
                AND acessoUsuarioAdmin.fkAcesso = (SELECT idAcesso FROM acesso WHERE tipoAcesso = 'Admin')
                LEFT JOIN acessoUsuario acessoUsuarioTecnico ON usuario.idUsuario = acessoUsuarioTecnico.fkUsuario
                AND acessoUsuarioTecnico.fkAcesso = (SELECT idAcesso FROM acesso WHERE tipoAcesso = 'Técnico')
                WHERE    usuario.email = '${email}' AND usuario.senha = '${senha}';
        `
    } else {
        instrucao = `
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
    }
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listar(idInstituicao) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");

    var instrucao = "";

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucao = `
            SELECT usuario.*,
            ISNULL(acessoUsuarioAdmin.fkAcesso, 0) AS acessoAdmin,
            ISNULL(acessoUsuarioTecnico.fkAcesso, 0) AS acessoTecnico
            FROM usuario
            LEFT JOIN acessoUsuario acessoUsuarioAdmin ON usuario.idUsuario = acessoUsuarioAdmin.fkUsuario
                                                    AND acessoUsuarioAdmin.fkAcesso = (SELECT idAcesso FROM acesso WHERE tipoAcesso = 'Admin')
            LEFT JOIN acessoUsuario acessoUsuarioTecnico ON usuario.idUsuario = acessoUsuarioTecnico.fkUsuario
                                                        AND acessoUsuarioTecnico.fkAcesso = (SELECT idAcesso FROM acesso WHERE tipoAcesso = 'Técnico')
            WHERE usuario.fkInstitucional = ${idInstituicao}; 
        `;
    } else {
        instrucao = `
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
    }
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarUser(idUser, idInstituicao) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarUser()");

    var instrucao = "";

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucao = `        
            SELECT usuario.*,
            ISNULL(acessoUsuarioAdmin.fkAcesso, 0) AS acessoAdmin,
            ISNULL(acessoUsuarioTecnico.fkAcesso, 0) AS acessoTecnico
            FROM usuario
            LEFT JOIN acessoUsuario acessoUsuarioAdmin ON usuario.idUsuario = acessoUsuarioAdmin.fkUsuario
                                            AND acessoUsuarioAdmin.fkAcesso = (SELECT idAcesso FROM acesso WHERE tipoAcesso = 'Admin')
            LEFT JOIN acessoUsuario acessoUsuarioTecnico ON usuario.idUsuario = acessoUsuarioTecnico.fkUsuario
                                                AND acessoUsuarioTecnico.fkAcesso = (SELECT idAcesso FROM acesso WHERE tipoAcesso = 'Técnico')
            WHERE usuario.idUsuario = ${idUser} AND usuario.fkInstitucional = ${idInstituicao};
        `;
    } else {
        instrucao = `
            SELECT usuario.*, 
                IFNULL(acessoUsuarioAdmin.fkAcesso, 0) AS acessoAdmin, 
                IFNULL(acessoUsuarioTecnico.fkAcesso, 0) AS acessoTecnico
            FROM usuario
            LEFT JOIN acessoUsuario acessoUsuarioAdmin ON usuario.idUsuario = acessoUsuarioAdmin.fkUsuario
            AND acessoUsuarioAdmin.fkAcesso = (SELECT idAcesso FROM acesso WHERE tipoAcesso = 'Admin')
            LEFT JOIN acessoUsuario acessoUsuarioTecnico ON usuario.idUsuario = acessoUsuarioTecnico.fkUsuario
            AND acessoUsuarioTecnico.fkAcesso = (SELECT idAcesso FROM acesso WHERE tipoAcesso = 'Técnico') 
            WHERE idUsuario = ${idUser} AND usuario.fkInstitucional = ${idInstituicao};
        `;
    }
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// cadastro de usuarios
function cadastrar(nome, email, telefone, senha, idInstituicao) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, telefone, senha, idInstituicao);

    var instrucao = "";
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucao = `
            INSERT INTO usuario (nome, email, telefone, senha, fkInstitucional) 
            OUTPUT INSERTED.idUsuario
            VALUES ('${nome}', '${email}', '${telefone}', '${senha}', '${idInstituicao}');
        `
        return database.executar(instrucao).then(resultado => {
            return { insertId: resultado[0].idUsuario };
        }).catch(erro => {
            console.log(erro);
            console.log("\nHouve um erro ao realizar o cadastro! Erro: ", erro.sqlMessage);
            throw erro;
        });
    } else {
        instrucao = `
                INSERT INTO usuario (nome, email, telefone, senha, fkInstitucional) 
                    VALUES ('${nome}', '${email}', '${telefone}', '${senha}', '${idInstituicao}');
            `;
        console.log("Executando a instrução SQL: \n" + instrucao);
        return database.executar(instrucao);
    }
}

// cadastro de usuarios
function cadastrarAcesso(idUser, idInstituicao, idAcesso) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", idUser, idInstituicao, idAcesso);

    var instrucao = ""

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucao = `
        INSERT INTO acessoUsuario (fkUsuario, fkInstitucional, fkAcesso, dataAcessoUsuario) 
            VALUES (${idUser}, ${idInstituicao}, ${idAcesso}, GETDATE());
    `;
    } else {
        instrucao = `
            INSERT INTO acessoUsuario (fkUsuario, fkInstitucional, fkAcesso, dataAcessoUsuario) 
                VALUES (${idUser}, ${idInstituicao}, ${idAcesso}, now());
        `;
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function atualizar(idUser, idInstituicao, nome, email, telefone, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", idUser, idInstituicao, nome, email, telefone, senha);

    var instrucao = `
        UPDATE usuario SET nome = '${nome}', email = '${email}', telefone = '${telefone}', senha = '${senha}'
            WHERE idUsuario = ${idUser} AND fkInstitucional = ${idInstituicao};
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
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():", idUser, idInstituicao);

    var instrucao = `
        DELETE FROM usuario WHERE idUsuario = ${idUser} AND fkInstitucional = ${idInstituicao};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function deletarAcesso(idUser, idAcesso, idInstituicao) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():", idUser, idAcesso, idInstituicao);

    var instrucao = `
        DELETE FROM acessoUsuario WHERE fkUsuario = ${idUser} AND fkAcesso = ${idAcesso} AND fkInstitucional = ${idInstituicao};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarResponsavelLab(idLab, idInstituicao) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscar responsavel");
    var instrucao = `
        SELECT u.nome, u.email, u.telefone
        FROM laboratorio l
        JOIN usuario u ON l.fkResponsavel = u.idUsuario
        WHERE l.idLaboratorio = ${idLab} AND l.fkInstitucional = ${idInstituicao};  
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    autenticar,
    listar,
    buscarUser,
    listarTecnicos,
    cadastrar,
    cadastrarAcesso,
    atualizar,
    deletar,
    deletarAcesso,
    buscarResponsavelLab
};