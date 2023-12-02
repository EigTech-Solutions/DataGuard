function entrar() {
    // aguardar();

    var emailVar = ipt_email.value.trim();
    var senhaVar = ipt_senha.value;

    if (emailVar == "" || senhaVar == "") {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Campo obrigatório vazio.',
            showConfirmButton: true,
        });
        // finalizarAguardar();
        return false;
    }
    console.log("FORM LOGIN: ", emailVar);
    console.log("FORM SENHA: ", senhaVar);

    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: emailVar,
            senhaServer: senhaVar
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));

                sessionStorage.ACESSO_ADMIN = json.acessoAdmin;
                sessionStorage.ACESSO_TECNICO = json.acessoTecnico;
                sessionStorage.ID_INSTITUICAO = json.fkInstitucional;
                sessionStorage.SENHA_USUARIO = json.senha;
                sessionStorage.EMAIL_USUARIO = json.email;
                sessionStorage.NOME_USUARIO = json.nome;
                sessionStorage.ID_USUARIO = json.idUsuario; 

                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Login realizado com sucesso!',
                    text: 'Redirecionando para página de entrada...',
                    showConfirmButton: false,
                    timer: 1000
                });

                if(emailVar == "eigtechsolutions@gmail.com" && senhaVar == "2023"){
                    setTimeout(function () {
                        window.location = "./area-restrita/telaInstituicao.html";
                        sessionStorage.PERFIL_ATUAL = "admin";
                    }, 1000); // apenas para exibir o loading
                } else if (sessionStorage.ACESSO_ADMIN != 0) {
                    setTimeout(function () {
                        window.location = "./area-restrita/DashboardGeralAdmin.html";
                        sessionStorage.PERFIL_ATUAL = "admin";
                    }, 1000); // apenas para exibir o loading 
                } else {
                    setTimeout(function () {
                        window.location = "./area-restrita/DashboardGeral.html";
                        sessionStorage.PERFIL_ATUAL = "tecnico";
                    }, 1000); // apenas para exibir o loading
                }

            });

        } else {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Usuário e/ou Senha inválidos! Tente Novamente.',
                showConfirmButton: false,
                timer: 1500
            });

            console.log("Houve um erro ao tentar realizar o login!");

            resposta.text().then(texto => {
                console.error(texto);
                // finalizarAguardar(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}