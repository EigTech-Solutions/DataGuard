var perfUsuario = sessionStorage.PERFIL_ATUAL;

// Recupera a página atual armazenada na sessionStorage
var pageAtual = sessionStorage.PAGE_ATUAL;


menuLateral.innerHTML = `
    <img src="../assets/images/Logo.png" class="logo" alt="Logo">

    <ul id="menuList">
        <li>
            <a href="dashboardInstituicao.html" id="bntDashMenu" class="menu-link" onclick="atualizarPageAtualMenu(this.id)">
                <img src="../assets/images/dashboard.png" width="37px" alt="icon dashboard"> Dashboard
            </a>
        </li>
        <li>
            <a href="telaInstituicao.html" id="bntLabMenu" class="menu-link" onclick="atualizarPageAtualMenu(this.id)">
                <img src="../assets/images/carbon_labs.png" alt="icon laboratório"> Instituições
            </a>
        </li>
    </ul>

    <div class="footer">
        <span>EigTech - © 2023</span>
    </div>
`;

menuTop.innerHTML = `
    <div class="usuario">
        <span>Olá, <b id="b_usuario">Username</b></span>
    </div>
        
    <button class="btn-logout" onclick="logout()">
        <img src="../assets/images/Vector_logout.png" alt="icon logout"> Logout
    </button>
`;

b_usuario.innerHTML = sessionStorage.NOME_USUARIO;

atualizarPageAtualMenu(pageAtual);

function atualizarPageAtualMenu(pageAtual) {
    var elementoPageAtual = document.querySelector('#' + pageAtual);

    // Remove a classe pgAtual de todos os links do menu
    const menuLinks = document.querySelectorAll('.menu-link');
    menuLinks.forEach(link => link.classList.remove('pgAtual'));

    // Adiciona a classe pgAtual ao link clicado
    elementoPageAtual.classList.add('pgAtual');

    // Atualiza a sessionStotage com o id da page atual
    sessionStorage.PAGE_ATUAL = elementoPageAtual.id;
}

function logout() {
    sessionStorage.clear();
    window.location = "../telaLogin.html";
}
