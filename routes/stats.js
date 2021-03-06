const express = require('express');
const router = express.Router();
const axios = require('axios');
const apiKey = "6a150049b8fff764c64f75489d6d7664";
const models = require('../models');

router.get('/', (req, res) => {
    res.json({
        title: 'Estadisticas'
    })
});

router.get('/insertStatistics', (req, res) => { // ID, role y Winrates de todos los campeones
    let url = 'http://api.champion.gg/v2/champions?champData=winRate,hashes,goldEarned,kills,deaths,assists&sort=winRate-desc&limit=250&api_key=' + apiKey;

    axios.get(url)
        .then(function (response) {
            let statistics = response.data;
            let keys = Object.keys(statistics);

            for(let i=0;i<keys.length;i++){
                let key = keys[i];
                // Estadisticas Basicos del Campeon

                let champId = statistics[key].championId; // ID de Campeon
                let role = statistics[key].role; // Rol Correspondiente
                let winRate = Number(100*statistics[key].winRate).toFixed(2)+"%"; // Su razon de victorias con el Rol que esta jugando

                let kills = Number(statistics[key].kills).toFixed(2); // Promedio de Kills
                let deaths = Number(statistics[key].deaths).toFixed(2); // Promedio de Muertes
                let assists = Number(statistics[key].assists).toFixed(2); // Promedio de Asistencias

                let gamesPlayed = statistics[key].gamesPlayed; // Partidos Jugados
                let percentRolePlayed = Number(100*statistics[key].percentRolePlayed).toFixed(2)+"%"; // El Porcentaje de veces que el Campeon juega como este Rol
                let banRate = Number(100*statistics[key].banRate).toFixed(2); // Razon de Bans
                let goldEarned = Number(statistics[key].goldEarned).toFixed(2); // Promedio del Oro que gana en un partido
                // Todas las Estadisticas mas Complejas
                // Items Iniciales - Mas Popular

                let firstItemCount = statistics[key].hashes.firstitemshash.highestCount.count; // cantidad de veces repetido
                let firstItemWins = statistics[key].hashes.firstitemshash.highestCount.wins; // numero de victorias
                let firstItemWinRate = Number(100*statistics[key].hashes.firstitemshash.highestCount.winrate).toFixed(2)+"%"; // razon de victorias
                let firstItemHash = statistics[key].hashes.firstitemshash.highestCount.hash; // IDs de los objetos
                // Items Finales - Mas Popular

                let finalItemCount = statistics[key].hashes.finalitemshashfixed.highestCount.count; // cantidad de veces repetido
                let finalItemWins = statistics[key].hashes.finalitemshashfixed.highestCount.wins; // numero de victorias
                let finalItemWinRate = Number(100*statistics[key].hashes.finalitemshashfixed.highestCount.winrate).toFixed(2)+"%"; // razon de victorias
                let finalItemHash = statistics[key].hashes.finalitemshashfixed.highestCount.hash; // IDs de los objetos
                // Orden de Habilidades - Mas Popular
				/*
                let skillCount = statistics[key].hashes.skillorderhash.highestCount.count; // cantidad de veces repetido
                let skillWins = statistics[key].hashes.skillorderhash.highestCount.wins; // numero de victorias
                let skillWinRate = statistics[key].hashes.skillorderhash.highestCount.winrate; // razon de victorias
                let skillHash = statistics[key].hashes.skillorderhash.highestCount.hash; // IDs de los objetos
                // Habilidades de Summoner - Mas Popular
				
                let summonerCount = statistics[key].hashes.summonershash.highestCount.count; // cantidad de veces repetido
                let summonerWins = statistics[key].hashes.summonershash.highestCount.wins; // numero de victorias
                let summonerWinRate = Number(100*statistics[key].hashes.summonershash.highestCount.winrate).toFixed(2)+"%"; // razon de victorias
                let summonerHash = statistics[key].hashes.summonershash.highestCount.hash; // IDs de los objetos
                // Runas Ocupadas - Mas Popular
				
                let runeCount = statistics[key].hashes.runehash.highestCount.count; // cantidad de veces repetido
                let runeWins = statistics[key].hashes.runehash.highestCount.wins; // numero de victorias
                let runeWinRate = statistics[key].hashes.runehash.highestCount.winrate; // razon de victorias
                let runeHash = statistics[key].hashes.runehash.highestCount.hash; // IDs de los objetos
				*/
                // Al registrar estos 3 stats, se guardan todos los datos obtenidos
                if (champId && winRate && role) { 
                    models.stat.create({
                        champId: champId,
                        role: role,
                        winRate: winRate,

                        kills: kills,
                        deaths: deaths,
                        assists: assists,

                        gamesPlayed: gamesPlayed,
                        percentRolePlayed: percentRolePlayed,
                        banRate: banRate,
                        goldEarned: goldEarned,

                        firstItemCount: firstItemCount,
                        firstItemWins: firstItemWins,
                        firstItemWinRate: firstItemWinRate,
                        firstItemHash: firstItemHash,

                        finalItemCount: finalItemCount,
                        finalItemWins: finalItemWins,
                        finalItemWinRate: finalItemWinRate,
                        finalItemHash: finalItemHash,
						
						/*
                        skillCount: skillCount,
                        skillWins: skillWins,
                        skillWinRate: skillWinRate,
                        skillHash: skillHash,
						
						
                        summonerCount: summonerCount,
                        summonerWins: summonerWins,
                        summonerWinRate: summonerWinRate,
                        summonerHash: summonerHash
						
						
                        runeCount: runeCount,
                        runeWins: runeWins,
                        runeWinRate: runeWinRate,
                        runeHash: runeHash
						*/
                    })
                    .then(stat => {
                        if (stat) {
                            res.json({
                                status: 1,
                                statusCode: 'stat/created',
                                data: stat.toJSON()
                            });
                        } else {
                            res.status(400).json({
                                status: 0,
                                statusCode: 'stat/error',
                                description: "Couldn't create the statistics"
                            });
                        }
                    })
                    .catch(error => {
                        res.status(400).json({
                            status: 0,
                            statusCode: 'database/error',
                            description: error.toString()
                        });
                    });
                } else {
                    res.status(400).json({
                        status: 0,
                        statusCode: 'stat/wrong-body',
                        description: 'The body is wrong! :('
                    });
                }
            }

        })
        .catch(function (error) {
           console.log(error);
        });
});

router.get('/recover/all', (req, res, next)=>{
    models.stat
    .findAll()
    .then(stat=>{
        if (stat){
            res.json({
                status: 1,
                data: stat
            });
        } else {
            res.status(400).json({
                status:0
            });
        }
    })
    .catch(error=>{
        res.status(400).json({
            status:0
        });
    });
});

module.exports = router;
