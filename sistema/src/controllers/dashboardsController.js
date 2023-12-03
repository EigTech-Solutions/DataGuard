var dashboardsModel = require("../models/dashboardsModel");

function buscarDadosKpis(req, res) {

    var idInstituicao = req.params.idInstituicao;

    console.log(`Recuperando os ultimos KPIs da instituição com id ${Number(idInstituicao)}`);

    dashboardsModel.buscarUltimosKPIs(idInstituicao).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os KPIs.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarFluxoRede(req, res) {
    var idInstituicao = req.params.idInstituicao;

    console.log(`Recuperando dados de fluxo de rede`);

    dashboardsModel.buscarFluxoRede(idInstituicao).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os ultimos dados de fluxo de rede.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarFluxoRedeTempoReal(req, res) {
    var idInstituicao = req.params.idInstituicao;

    console.log(`Recuperando dados de fluxo de rede em tempo real`);

    dashboardsModel.buscarFluxoRedeTempoReal(idInstituicao).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os ultimos dados de fluxo de rede.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarStatusMaquinas(req, res) {
    var idInstituicao = req.params.idInstituicao;

    console.log(`Recuperando dados de status maquinas`);

    dashboardsModel.buscarStatusMaquinas(idInstituicao).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os ultimos dados de status das máquinas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarRankingLabs(req, res) {
    var idInstituicao = req.params.idInstituicao;

    console.log(`Recuperando o ranking de laboratórios`);

    dashboardsModel.buscarRankingLabs(idInstituicao).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os ultimos dados do ranking de labs.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarDadosKpisLabs(req, res) {
    var idLaboratorio = req.params.idLaboratorio;

    console.log(`Recuperando o ranking de laboratórios`);

    dashboardsModel.buscarKpisLabs(idLaboratorio).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os ultimos dados do ranking de labs.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarFluxoRedeLab(req, res) {
    var idLaboratorio = req.params.idLaboratorio;

    console.log(`Recuperando dados de fluxo de rede`);

    dashboardsModel.buscarFluxoRedeLab(idLaboratorio).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os ultimos dados de fluxo de rede.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarFluxoRedeLabTempoReal(req, res) {
    var idLaboratorio = req.params.idLaboratorio;

    console.log(`Recuperando dados de fluxo de rede em tempo real`);

    dashboardsModel.buscarFluxoRedeLabTempoReal(idLaboratorio).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os ultimos dados de fluxo de rede.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarRankingMaquinas(req, res) {
    var idLaboratorio = req.params.idLaboratorio;

    console.log(`Recuperando o ranking de laboratórios`);

    dashboardsModel.buscarRankingMaquinas(idLaboratorio).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os ultimos dados do ranking de labs.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarStatusMaquinasLaboratorio(req, res) {
    var idLaboratorio = req.params.idLaboratorio;

    console.log(`Recuperando dados de status maquinas`);

    dashboardsModel.buscarStatusMaquinasLab(idLaboratorio).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os ultimos dados de status das máquinas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarInfosBasicasMaquina(req, res) {
    var idMaquina = req.params.idMaquina;

    console.log(`Recuperando os kpis básicos da maquina ${idMaquina}`);

    dashboardsModel.buscarInfosBasicasMaquina(idMaquina).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os ultimos dados de status das máquinas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarPorcentagemUsoCpu(req, res) {
    var idMaquina = req.params.idMaquina;

    console.log(`Recuperando os dados pro gráfico de CPU da máquina`);

    dashboardsModel.buscarPorcentagemUsoCpu(idMaquina).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os ultimos dados de status das máquinas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarPorcentagemUsoCpuTempoReal(req, res) {
    var idMaquina = req.params.idMaquina;

    console.log(`Recuperando os dados pro gráfico de CPU da máquina`);

    dashboardsModel.buscarPorcentagemUsoCpuTempoReal(idMaquina).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os ultimos dados de status das máquinas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarFluxoRedeMaquina(req, res) {
    var idMaquina = req.params.idMaquina;

    console.log(`Recuperando os dados pro gráfico de fluxo de rede da máquina`);

    dashboardsModel.buscarFluxoRedeMaquina(idMaquina).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os ultimos dados de status das máquinas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarFluxoRedeMaquinaTempoReal(req, res) {
    var idMaquina = req.params.idMaquina;

    console.log(`Recuperando os dados pro gráfico de fluxo de rede da máquina`);

    dashboardsModel.buscarFluxoRedeMaquinaTempoReal(idMaquina).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os ultimos dados de status das máquinas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarDadosMemorias(req, res) {
    var idMaquina = req.params.idMaquina;

    console.log(`Recuperando os dados pro gráfico de fluxo de rede da máquina`);

    dashboardsModel.buscarDadosMemorias(idMaquina).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os ultimos dados de status das máquinas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarDadosKpisAdmin(req, res) {
    var idInstituicao = req.params.idInstituicao;

    console.log(`Recuperando os kpis pro dashboard geral admin`);

    dashboardsModel.buscarDadosKpisAdmin(idInstituicao).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os ultimos dados de status das máquinas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarVariacaoStatusLabs(req, res) {
    var idInstituicao = req.params.idInstituicao;

    console.log(`Recuperando os dados pro gráfico de variacao de status das máquinas por lab`);

    dashboardsModel.buscarVariacaoStatusLabs(idInstituicao).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os ultimos dados de status das máquinas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarQtdAlertas(req, res) {
    var idInstituicao = req.params.idInstituicao;

    console.log(`Recuperando os dados pro gráfico de variacao de status das máquinas por lab`);

    dashboardsModel.buscarQtdAlertas(idInstituicao).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os ultimos dados de status das máquinas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarRankingMaquinasAdmin(req, res) {
    var idInstituicao = req.params.idInstituicao;

    console.log(`Recuperando os dados pro gráfico de variacao de status das máquinas por lab`);

    dashboardsModel.buscarRankingMaquinasAdmin(idInstituicao).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os ultimos dados de status das máquinas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarColaboradores(req, res) {
    var idInstituicao = req.params.idInstituicao;

    console.log(`Recuperando os dados pro gráfico de variacao de status das máquinas por lab`);

    dashboardsModel.buscarColaboradores(idInstituicao).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os ultimos dados de status das máquinas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    buscarDadosKpis,
    buscarFluxoRede,
    buscarFluxoRedeTempoReal,
    buscarStatusMaquinas,
    buscarRankingLabs,
    buscarDadosKpisLabs,
    buscarFluxoRedeLab,
    buscarFluxoRedeLabTempoReal,
    buscarRankingMaquinas,
    buscarStatusMaquinasLaboratorio,
    buscarInfosBasicasMaquina,
    buscarPorcentagemUsoCpu,
    buscarPorcentagemUsoCpuTempoReal,
    buscarFluxoRedeMaquina,
    buscarFluxoRedeMaquinaTempoReal,
    buscarDadosMemorias,
    buscarDadosKpisAdmin,
    buscarVariacaoStatusLabs,
    buscarQtdAlertas,
    buscarRankingMaquinasAdmin,
    buscarColaboradores
}