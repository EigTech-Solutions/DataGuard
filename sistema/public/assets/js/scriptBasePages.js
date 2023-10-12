var perfUsuario = "Técnico";

// Recupera a página atual armazenada na sessionStorage
var pageAtual = sessionStorage.PAGE_ATUAL;


menuLateral.innerHTML = `
    <img src="../assets/images/Logo.png" class="logo" alt="Logo">

    <ul id="menuList">
        <li>
            <a href="dashboardGeral.html" id="bntDashMenu" class="menu-link" onclick="atualizarPageAtualMenu(this.id)">
                <img src="../assets/images/dashboard.png" width="37px" alt="icon dashboard"> Dashboard
            </a>
        </li>
        <li>
            <a href="telaLaboratorios.html" id="bntLabMenu" class="menu-link" onclick="atualizarPageAtualMenu(this.id)">
                <img src="../assets/images/carbon_labs.png" alt="icon laboratório"> Laboratórios
            </a>
        </li>
        <li>
            <a href="telaMaquinas.html" id="bntPCsMenu" class="menu-link" onclick="atualizarPageAtualMenu(this.id)">
                <img src="../assets/images/icon_computer-outline.png" alt="icon PC"> Computadores
            </a>
        </li>
        <li>
            <a href="#" id="bntUsersMenu" class="menu-link" onclick="atualizarPageAtualMenu(this.id)">
                <img src="../assets/images/iwwa_user.png" alt="icon usuários"> Usuários
            </a>
        </li>
        <li>
            <a href="#" id="bntConfigMenu" class="menu-link" onclick="atualizarPageAtualMenu(this.id)">
                <img src="../assets/images/carbon_settings-edit.png" alt=""> Configurações
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
        <select class="sl_perfil" id="sl_perfil" onclick="atualizarPerfilExibicao()">
            <option value="admin">Perf. Admin</option>
            <option value="tecnico" selected>Perf. Técnico</option>
        </select>
    </div>

    <button class="btn-logout" onclick="logout()">
        <img src="../assets/images/Vector_logout.png" alt="icon logout"> Logout
    </button>
`;

atualizarPageAtualMenu(pageAtual);
exibirMenuPerfil(perfUsuario);

function atualizarPerfilExibicao() {
    perfUsuario = sl_perfil.value;

    exibirMenuPerfil(perfUsuario);
}

function exibirMenuPerfil(perfUsuario) {
    if (perfUsuario == "admin") {
        bntUsersMenu.style.display = 'flex';
        bntConfigMenu.style.display = 'none';
        
    } else {
        bntUsersMenu.style.display = 'none';
        bntConfigMenu.style.display = 'flex';
    }    
}

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