SELECT
    l.nomeSala,
    (SELECT COUNT(idMaquina) FROM maquina WHERE fkLaboratorio = 1 AND fkInstitucional =2) as qtdMaquinas,
    IFNULL(SUM(CASE WHEN a.tipo = 'Urgente' THEN 1 ELSE 0 END), 0) as qtdAlertasUrgentes,
    IFNULL(SUM(CASE WHEN a.tipo = 'Atenção' THEN 1 ELSE 0 END), 0) as qtdAlertasAtencao,
    ROUND(
        (
            ((IFNULL(SUM(CASE WHEN a.tipo = 'Urgente' THEN 1 ELSE 0 END), 0)) * 1) + 
            ((IFNULL(SUM(CASE WHEN a.tipo = 'Atenção' THEN 1 ELSE 0 END), 0)) * 0.5)
        ) / 
        (SELECT COUNT(idMaquina) FROM maquina WHERE fkLaboratorio = 1 AND fkInstitucional =2)
     * 100, 2) as percentualPreocupacao,
    CASE 
        WHEN ROUND(
            (
                ((IFNULL(SUM(CASE WHEN a.tipo = 'Urgente' THEN 1 ELSE 0 END), 0)) * 1) + 
                ((IFNULL(SUM(CASE WHEN a.tipo = 'Atenção' THEN 1 ELSE 0 END), 0)) * 0.5)
            ) / 
            (SELECT COUNT(idMaquina) FROM maquina WHERE fkLaboratorio = 1 AND fkInstitucional =2)
         * 100, 2) <= 15 THEN 'Ótimo'
        WHEN ROUND(
            (
                ((IFNULL(SUM(CASE WHEN a.tipo = 'Urgente' THEN 1 ELSE 0 END), 0)) * 1) + 
                ((IFNULL(SUM(CASE WHEN a.tipo = 'Atenção' THEN 1 ELSE 0 END), 0)) * 0.5)
            ) / 
            (SELECT COUNT(idMaquina) FROM maquina WHERE fkLaboratorio = 1 AND fkInstitucional =2)
         * 100, 2) <= 25 THEN 'Bom'
        WHEN ROUND(
            (
                ((IFNULL(SUM(CASE WHEN a.tipo = 'Urgente' THEN 1 ELSE 0 END), 0)) * 1) + 
                ((IFNULL(SUM(CASE WHEN a.tipo = 'Atenção' THEN 1 ELSE 0 END), 0)) * 0.5)
            ) / 
            (SELECT COUNT(idMaquina) FROM maquina WHERE fkLaboratorio = 1 AND fkInstitucional =2)
         * 100, 2) <= 50 THEN 'Atenção'
        WHEN ROUND(
            (
                ((IFNULL(SUM(CASE WHEN a.tipo = 'Urgente' THEN 1 ELSE 0 END), 0)) * 1) + 
                ((IFNULL(SUM(CASE WHEN a.tipo = 'Atenção' THEN 1 ELSE 0 END), 0)) * 0.5)
            ) / 
            (SELECT COUNT(idMaquina) FROM maquina WHERE fkLaboratorio = 1 AND fkInstitucional =2)
         * 100, 2) <= 75 THEN 'Preocupante'
        ELSE 'Extremamente preocupante'
    END as situacao
FROM laboratorio l
JOIN maquina m ON l.idLaboratorio = m.fkLaboratorio
LEFT JOIN medicoes med ON m.idMaquina = med.fkMaquina
LEFT JOIN alertas a ON med.idMonitoramento = a.fkMonitoramento
WHERE l.idLaboratorio = 1 AND l.fkInstitucional =2
    AND med.dataHora >= CURDATE() - INTERVAL 30 DAY
GROUP BY l.idLaboratorio, l.nomeSala;


SELECT
    l.nomeSala,
    (SELECT COUNT(idMaquina) FROM maquina WHERE fkLaboratorio = 1 AND fkInstitucional = 2) as qtdMaquinas,
    COALESCE(SUM(CASE WHEN a.tipo = 'Urgente' THEN 1 ELSE 0 END), 0) as qtdAlertasUrgentes,
    COALESCE(SUM(CASE WHEN a.tipo = 'Atenção' THEN 1 ELSE 0 END), 0) as qtdAlertasAtencao,
    ROUND((((COALESCE(SUM(CASE WHEN a.tipo = 'Urgente' THEN 1 ELSE 0 END), 0)) * 1 + (COALESCE(SUM(CASE WHEN a.tipo = 'Atenção' THEN 1 ELSE 0 END), 0) * 0.5)) / (SELECT COUNT(idMaquina) FROM maquina WHERE fkLaboratorio = 1 AND fkInstitucional = 2)) * 100, 2) as percentualPreocupacao,
    CASE 
        WHEN ROUND((((COALESCE(SUM(CASE WHEN a.tipo = 'Urgente' THEN 1 ELSE 0 END), 0)) * 1 + (COALESCE(SUM(CASE WHEN a.tipo = 'Atenção' THEN 1 ELSE 0 END), 0) * 0.5)) / (SELECT COUNT(idMaquina) FROM maquina WHERE fkLaboratorio = 1 AND fkInstitucional = 2)) * 100, 2) <= 15 THEN 'Ótimo'
        WHEN ROUND((((COALESCE(SUM(CASE WHEN a.tipo = 'Urgente' THEN 1 ELSE 0 END), 0)) * 1 + (COALESCE(SUM(CASE WHEN a.tipo = 'Atenção' THEN 1 ELSE 0 END), 0) * 0.5)) / (SELECT COUNT(idMaquina) FROM maquina WHERE fkLaboratorio = 1 AND fkInstitucional = 2)) * 100, 2) <= 25 THEN 'Bom'
        WHEN ROUND((((COALESCE(SUM(CASE WHEN a.tipo = 'Urgente' THEN 1 ELSE 0 END), 0)) * 1 + (COALESCE(SUM(CASE WHEN a.tipo = 'Atenção' THEN 1 ELSE 0 END), 0) * 0.5)) / (SELECT COUNT(idMaquina) FROM maquina WHERE fkLaboratorio = 1 AND fkInstitucional = 2)) * 100, 2) <= 50 THEN 'Atenção'
        WHEN ROUND((((COALESCE(SUM(CASE WHEN a.tipo = 'Urgente' THEN 1 ELSE 0 END), 0)) * 1 + (COALESCE(SUM(CASE WHEN a.tipo = 'Atenção' THEN 1 ELSE 0 END), 0) * 0.5)) / (SELECT COUNT(idMaquina) FROM maquina WHERE fkLaboratorio = 1 AND fkInstitucional = 2)) * 100, 2) <= 75 THEN 'Preocupante'
        ELSE 'Extremamente preocupante'
    END as situacao
FROM laboratorio l
JOIN maquina m ON l.idLaboratorio = m.fkLaboratorio
LEFT JOIN medicoes med ON m.idMaquina = med.fkMaquina
LEFT JOIN alertas a ON med.idMonitoramento = a.fkMonitoramento
WHERE l.idLaboratorio = 1 AND l.fkInstitucional = 2
    AND (med.dataHora >= CURDATE() - INTERVAL 30 DAY OR med.dataHora IS NULL)
GROUP BY l.idLaboratorio, l.nomeSala;

