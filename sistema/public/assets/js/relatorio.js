const dataAtual = new Date();
const anoAtual = dataAtual.getFullYear();
const mesAtual = dataAtual.getMonth() + 1;

function abrirModalRelatorio() {
    divModalRelatorio.style.display = "flex";
    
    divModalRelatorio.innerHTML = `
        <!--  inicio do container  -->
        <div class="containerPrincipal">
            <!--  topo do pop up  -->
            <div class="topo">
                <div class="titulo"> Relatórios </div>
                <div class="btns">
                    <!-- <img src="../assets/images/ph_info.png" class="btnInfo" alt="icon de informação"> -->
                    <img src="../assets/images/close-circle-twotone.png" width="30px" class="btnInfo" alt="icon fechar" onclick="fecharModalRelatorio()">
                </div>
            </div>
            <!--  meio do pop up  -->
            <div class="meioPopUp">
                <div class="container1">
                    <div class="texto">
                        <span>
                            Gere os relatórios necessários para analise da sua instituição!
                        </span>
                    </div>
                    <div class="imagemLab">
                        <img src="../assets/images/imagemTelaRelatorio.png" alt="">
                    </div>
                </div>

                <div class="container2">
                    <div class="campoInput1">
                        <label for="">Laboratório:</label>
                        <select class="iptLab" id="iptLab">
                            <option value="0" selected disabled>Selecione...</option>
                        </select>
                    </div>

                    <div class="campoInput2">
                        <div class="campoMes">
                            <label for="">Mês</label>
                            <select class="iptMes" id="iptMes">
                                <option value="0" selected disabled>Selecione...</option>
                                <option value="1">Janeiro</option>
                                <option value="2">Fevereiro</option>
                                <option value="3">Março</option>
                                <option value="4">Abril</option>
                                <option value="5">Maio</option>
                                <option value="6">Junho</option>
                                <option value="7">Julho</option>
                                <option value="8">Agosto</option>
                                <option value="9">Setembro</option>
                                <option value="10">Outubro</option>
                                <option value="11">Novembro</option>
                                <option value="12">Dezembro</option>
                            </select>
                        </div>
                        <div class="campoAno">
                            <label for="">Ano:</label>
                            <input class="iptAno" id="iptAno" type="number" min="2023" maxlength="4" placeholder="Ex: 2023" >
                        </div>
                    </div>
                    <div class="campoInput3">
                        <label for="">Relatório Mensal ou Anual?</label>
                        <div class="campoInput3but">
                            <input type="radio" name="radBtnRelatorio" class="radBtnRelatorio" value="mensal" checked>
                            <label for="">Mensal</label>
                            <input type="radio" name="radBtnRelatorio" class="radBtnRelatorio" value="anual">
                            <label for="">Anual</label>
                        </div>
                    </div>
                </div>
            </div>
            <!--  fim do pop up  -->
            <div class="containerFinal">
                <button class="bntRelatorio" onclick="gerarRelatorio()">
                    <img src="../assets/images/i_pdf.png" width="40" alt="icon pdf">
                    GERAR RELATÓRIO
                </button>
            </div>
        </div>
    `;
       
    fetch(`/laboratorios/listar/${sessionStorage.ID_INSTITUICAO}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {   
                console.log("Nenhum resultado encontrado.");
                throw "Nenhum resultado encontrado!!";
            }

            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));

                for (let i = 0; i < resposta.length; i++) {
                    var laboratorio = resposta[i];

                    iptLab.innerHTML += `
                        <option value="${laboratorio.idLaboratorio}">${laboratorio.nomeSala}</option>
                    `;
                }

                // finalizarAguardar();
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
        // finalizarAguardar();
    });

    
    iptAno.value = anoAtual;

    const selectMes = document.getElementById("iptMes");
        
    // Iterar sobre as opções e selecionar a que corresponde ao mês atual
    for (let i = 0; i < selectMes.options.length; i++) {
        if (parseInt(selectMes.options[i].value) === mesAtual) {
            selectMes.options[i].selected = true;
            break;
        }
    }
}

function gerarRelatorio() {
    var idLaboratorio = iptLab.value;
    var mes = iptMes.value;
    var ano = iptAno.value;

    // Usando querySelector para encontrar o botão de rádio selecionado
    const botaoSelecionado = document.querySelector('input[name="radBtnRelatorio"]:checked');
    // Obtendo o valor do botão de rádio selecionado
    var tipoRelatorioSelecionado = botaoSelecionado.value;

    const meses = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    var nomeMes = meses[mes - 1];

    if (((idLaboratorio == 0 || ano == 0) && tipoRelatorioSelecionado == "anual") || ((idLaboratorio == 0 || mes == 0 || ano == 0) && tipoRelatorioSelecionado == "mensal")) {
        Swal.fire(
            'Campo obrigatório vazio para emissão desse tipo de relatório!',
            'Preencha todos os campos para continuar!',
            'error'
        );
    } else {
        divRelatorio.style.display = "flex";
        divPreRelatorio.style.display = "flex";

        divRelatorio.innerHTML = `
            <div class="tituloRelatorio">
                <h1>Relatório Mensal - ${nomeMes} ${ano}</h1>
                <h1 id="labRelatorio">Laboratório XYZ</h1>
            </div>
            
            <section>
                <p>Responsável:</p>
                <table class="tbResponsavel">
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Telefone</th>
                    </tr>
                    <tr>
                        <td id="nomeResponsavelLab">-</td>
                        <td id="emailResponsavelLab">-</td>
                        <td id="telResponsavelLab">-</td>
                    </tr>
                </table>
            </section>
                        
            <section>
                <p>O nível de preocupação do laboratório</p>
                <table class="tbThLateral3">
                    <tr>
                        <th>Nível</th>
                        <td>-%</td>
                        <td>-</td>
                    </tr>
                </table>
            </section>
            
            <section>
                <p>Total de máquinas:</p>
                <table class="tbThLateral2">
                    <tr>
                        <th>Total de máquinas nos laboratórios</th>
                        <td id="totalPcsLabs">-</td>
                    </tr>
                    <tr>
                        <th>Total de máquinas no <span id="labRelatorio"></span></th>
                        <td id="totalPcsLab">-</td>  
                    </tr>
                </table>
            </section>

            <section>
                <p>Total de máquinas no laboratório:</p>
                <table class="tbThLateral2">
                    <tr>
                        <th>Máquinas Ativas</th>
                        <td id="totalPcsAtivosLab">-</td>
                    </tr>
                    <tr>
                        <th>Máquinas Inativas</th>
                        <td id="totalPcsInativosLab">-</td>
                    </tr>
                </table>
            </section>

            <section>
                <p>Total de máquinas adicionadas e desativadas:</p>
                <table class="tbThLateral2">
                    <tr>
                        <th>Máquinas Adicionadas</th>
                        <td id="totalPcsAdicionadosLab">-</td>
                    </tr>
                    <tr>
                        <th>Máquinas Desativadas</th>
                        <td id="totalPcsDesativadosLab">-</td>
                    </tr>
                </table>
            </section>
            
            <section>
                <p>Quantidade de paradas gerais no mês vigente:</p>
                <table class="tbThLateral2">
                    <tr>
                        <th>Paradas gerais/totais</th>
                        <td>-</td>
                    </tr>
                </table>
            </section>

            <br><br>

            <section>
                <p>Máquinas que mais apresentaram erros:</p>
                <table class="tbResponsavel">
                    <tr>
                        <th>Nº</th>
                        <th>IP</th>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>-</td>
                    </tr>
                </table>
            </section>

            <section>
                <p>Máquinas que foram desativadas:</p>
                <table class="tbResponsavel">
                    <tr>
                        <th>Nº</th>
                        <th>IP</th>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>-</td>
                    </tr>
                </table>
            </section>
                    
            <section>
                <p>Alertas gerais abertos nesse mês:</p>
                <table class="tbThLateral2">
                    <tr>
                        <th>Alertas Urgentes</th>
                        <td id="qtdAlertaUrgenteMes">-</td>
                    </tr>
                    <tr>
                        <th>Alertas de Atenção</th>
                        <td id="qtdAlertaAtencaoMes">-</td>
                    </tr>
                    </tr>
                </table>
            </section>
            
            <section>
                <p>Especificação dos alertas abertos (% de máquina que apresentaram erros por hardwares):</p>
                <table class="tbThLateral3">
                    <tr>
                        <th>Memória RAM</th>
                        <td>-%</td>
                        <td>- máquinas</td>
                    </tr>
                    <tr>
                        <th>Memória de Disco</th>
                        <td>-%</td>
                        <td>- máquinas</td>
                    </tr>
                    </tr>
                    <tr>
                        <th>CPU</th>
                        <td>-%</td>
                        <td>- máquinas</td>
                    </tr>
                    <tr>
                        <th>Rede</th>
                        <td>-%</td>
                        <td>- máquinas</td>
                    </tr>
                </table>
            </section>
        `;
        
        const labRelatorio = divRelatorio.querySelectorAll('#labRelatorio')

        fetch(`/laboratorios/buscarLab/${idLaboratorio}/${sessionStorage.ID_INSTITUICAO}`).then(function (resposta) {
            if (resposta.ok) {
                if (resposta.status == 204) { 
                    console.log("Nenhum resultado encontrado.");
                    throw "Nenhum resultado encontrado!!";
                }
                resposta.json().then(function (resposta) {
                    console.log("Dados recebidos: ", JSON.stringify(resposta));

                    var laboratorio = resposta[0];

                    labRelatorio[0].innerHTML = laboratorio.nomeSala;
                    labRelatorio[1].innerHTML = laboratorio.nomeSala;
                });
            } else {
                throw ('Houve um erro na API!');
            }
        }).catch(function (resposta) {
            console.error(resposta);
        });

        fetch(`/usuarios/buscarResponsavelLab/${idLaboratorio}/${sessionStorage.ID_INSTITUICAO}`).then(function (resposta) {
            if (resposta.ok) {
                if (resposta.status == 204) { 
                    console.log("Nenhum resultado encontrado.");
                    throw "Nenhum resultado encontrado!!";
                }
                resposta.json().then(function (resposta) {
                    console.log("Dados recebidos: ", JSON.stringify(resposta));

                    var usuario = resposta[0];

                    nomeResponsavelLab.innerHTML = usuario.nome;
                    emailResponsavelLab.innerHTML = usuario.email;
                    telResponsavelLab.innerHTML = usuario.telefone;
                });
            } else {
                throw ('Houve um erro na API!');
            }
        }).catch(function (resposta) {
            console.error(resposta);
        });

        fetch(`/maquinas/buscarTotalPcsInstituicao/${sessionStorage.ID_INSTITUICAO}`).then(function (resposta) {
            if (resposta.ok) {
                if (resposta.status == 204) { 
                    console.log("Nenhum resultado encontrado.");
                    throw "Nenhum resultado encontrado!!";
                }
                resposta.json().then(function (resposta) {
                    console.log("Dados recebidos: ", JSON.stringify(resposta));

                    var maquinas = resposta[0];

                    totalPcsLabs.innerHTML = maquinas.TotalMaquinas;
                });
            } else {
                throw ('Houve um erro na API!');
            }
        }).catch(function (resposta) {
            console.error(resposta);
        });

        fetch(`/maquinas/buscarTotalPcsLab/${idLaboratorio}/${sessionStorage.ID_INSTITUICAO}`).then(function (resposta) {
            if (resposta.ok) {
                if (resposta.status == 204) { 
                    console.log("Nenhum resultado encontrado.");
                    throw "Nenhum resultado encontrado!!";
                }
                resposta.json().then(function (resposta) {
                    console.log("Dados recebidos: ", JSON.stringify(resposta));

                    var maquinas = resposta[0];

                    totalPcsLab.innerHTML = maquinas.TotalMaquinasLaboratorio;
                });
            } else {
                throw ('Houve um erro na API!');
            }
        }).catch(function (resposta) {
            console.error(resposta);
        });

        fetch(`/maquinas/buscarTotalPcsAtivosInativos/${idLaboratorio}/${sessionStorage.ID_INSTITUICAO}`).then(function (resposta) {
            if (resposta.ok) {
                if (resposta.status == 204) { 
                    console.log("Nenhum resultado encontrado.");
                    throw "Nenhum resultado encontrado!!";
                }
                resposta.json().then(function (resposta) {
                    console.log("Dados recebidos: ", JSON.stringify(resposta));

                    var maquinas = resposta[0];

                    totalPcsAtivosLab.innerHTML = maquinas.TotalMaquinasAtivas;
                    totalPcsInativosLab.innerHTML = `${maquinas.TotalMaquinasInativas} (${maquinas.PercentualMaquinasInativas}%)`;
                });
            } else {
                throw ('Houve um erro na API!');
            }
        }).catch(function (resposta) {
            console.error(resposta);
        });

        fetch(`/maquinas/buscarTotalPcsCadastradosDesativadosMes/${idLaboratorio}/${sessionStorage.ID_INSTITUICAO}/${mes}/${ano}`).then(function (resposta) {
            if (resposta.ok) {
                if (resposta.status == 204) { 
                    console.log("Nenhum resultado encontrado.");
                    throw "Nenhum resultado encontrado!!";
                }
                resposta.json().then(function (resposta) {
                    console.log("Dados recebidos: ", JSON.stringify(resposta));

                    var maquinas = resposta[0];

                    totalPcsAdicionadosLab.innerHTML = maquinas.QtdMaquinasAdicionadas;
                    totalPcsDesativadosLab.innerHTML = maquinas.QtdMaquinasDesativadas;
                });
            } else {
                throw ('Houve um erro na API!');
            }
        }).catch(function (resposta) {
            console.error(resposta);
        });

        fetch(`/alertas/buscarQtdAlertasUrgentesAtencaoMes/${idLaboratorio}/${sessionStorage.ID_INSTITUICAO}/${mes}/${ano}`).then(function (resposta) {
            if (resposta.ok) {
                if (resposta.status == 204) { 
                    console.log("Nenhum resultado encontrado.");
                    throw "Nenhum resultado encontrado!!";
                }
                resposta.json().then(function (resposta) {
                    console.log("Dados recebidos: ", JSON.stringify(resposta));

                    var alertas = resposta[0];

                    qtdAlertaUrgenteMes.innerHTML = alertas.QuantidadeAlertasUrgentes;
                    qtdAlertaAtencaoMes.innerHTML = alertas.QuantidadeAlertasAtencao;
                });
            } else {
                throw ('Houve um erro na API!');
            }
        }).catch(function (resposta) {
            console.error(resposta);
        });
        

        setTimeout(() => {
            // Conteúdo do PDF
            const conteudoPdf = document.querySelector("#divRelatorio");
    
            // Configuração do arquivo final de PDF
            const options = {
                margin: [10, 10, 10, 10],
                filename: `relatorio${nomeMes}${ano}.pdf`,
                html2canvas: {scale: 2},
                jsPDF:{unit: "mm", format: "a4", orientation: "portrait"}
            }
    
            // Gerar e baixar o PDF
            html2pdf().set(options).from(conteudoPdf).save();  
        }, 2000)

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Verifique seus arquivos download do relatório com sucesso!',
            showConfirmButton: false,
            timer: 2000
        });
    }
}

function fecharModalRelatorio() {
    divModalRelatorio.style.display = "none";
    divRelatorio.style.display = "none";
    divPreRelatorio.style.display = "nome";
}