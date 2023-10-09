const div_parteUtilizada = document.getElementById("memoria_ram_bar_filled");
const span_memoria_ram_porcentagem_valor = document.getElementById("memoria_ram_porcentagem");

let numAleatorio = Math.random() * 100;
div_parteUtilizada.style.width = numAleatorio + "%";
span_memoria_ram_porcentagem_valor.innerHTML = Math.ceil(numAleatorio) + "%"
