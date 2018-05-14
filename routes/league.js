const express = require('express');
const router = express.Router();
const models = require('../models');
const axios = require('axios');


const apiKey = 'RGAPI-a5bd1a27-7f42-4250-b0dc-6c60185e712a';

router.get('/find/:server/:summonerId', (req, res, next) => {
    models.summoner
        .findOne({
            where: {
                summonerId : req.params.summonerId,
                server: req.params.server,
            }
        })
        .then( summonerX => {
            if ( summonerX ) {
                models.league.findOne({
                    include:{
                        model:models.summoner,
                        as: 'summonerLeague',
                        where: {
                            summonerId : req.params.summonerId,
                            server: req.params.server,
                        }
                    }
                }).then( league => {
                    if( league ){
                        res.status(400).json({
                            status: 0,
                            statusCode: 'database/error',
                            data: league.toJSON()
                        });
                    }else{
                        //https://la2.api.riotgames.com/lol/league/v3/positions/by-summoner/113649?api_key=RGAPI-b8f4527d-c46d-4a31-8260-80a062bf2b10

                        let urlLeague = 'https://'+req.params.server+'.api.riotgames.com/lol/league/v3/positions/by-summoner/'+req.params.summonerId + '?api_key='+ apiKey;

                        console.log(urlLeague);
                        axios.get(urlLeague)
                        .then( response => {
                            let dateCreate = {};
                            response.data.map(data =>{
                                if(data.queueType == 'RANKED_SOLO_5x5'){
                                    dateCreate.soloWins  = data.wins;
                                    dateCreate.soloLosses = data.losses;
                                    dateCreate.soloLeagueName = data.leagueName ;
                                    dateCreate.soloRank = data.rank;
                                    dateCreate.soloLeagueId = data.leagueId ;
                                    dateCreate.soloTier = data.tier;
                                    dateCreate.soloLeaguePoints  = data.leaguePoints;
                                }
                                if(data.queueType == 'RANKED_FLEX_SR') {
                                    dateCreate.flexWins = data.wins;
                                    dateCreate.flexLosses = data.losses;
                                    dateCreate.flexLeagueName = data.leagueName;
                                    dateCreate.flexRank = data.rank;
                                    dateCreate.flexLeagueId = data.leagueId;
                                    dateCreate.flexTier = data.tier;
                                    dateCreate.flexLeaguePoints = data.leaguePoints;
                                }
                            });
                            dateCreate.summonerId = req.params.summonerId;
                            dateCreate.server = req.params.server;

                            models.league.create(dateCreate)
                                .then(leagueCreate =>{
                                    if (leagueCreate) {
                                        summonerX.setSummonerLeague(leagueCreate);
                                        res.json({
                                            status: 1,
                                            statusCode: 'league/find/created',
                                            data: leagueCreate.toJSON()
                                        });
                                    } else {
                                        res.status(400).json({
                                            status: 0,
                                            statusCode: 'league/find/error',
                                            description: "Couldn't create the league"
                                        });
                                    }
                                })
                                .catch( error => {
                                    res.status(400).json({
                                        status: 0,
                                        statusCode: 'database/error',
                                        description: error.toString()
                                    });
                                });
                        })
                        .catch( error => {
                            console.log(error);
                            res.json({
                                status: 0,
                                statusCode: 'league/find/error',
                                description: 'server o summonerid error'
                            });
                        });
                    }
                }).catch( error => {
                    res.status(400).json({
                        status: 0,
                        statusCode: 'database/error',
                        description: error.toString()
                    });
                });
            }else{
                res.json({
                    status: 0,
                    statusCode: 'league/find',
                    description: 'Summoner no encontrado'
                });
            }
        })
        .catch( error =>{
            res.json({
                status: 0,
                statusCode: 'league/find/error',
                description: 'Error en base de datos',
                error:error.toString()
            });
        });
});


router.get( '/update/:server/:summonerId', (req, res, next) => {

    models.league.findOne({
        where:{
            summonerId: req.params.summonerId ,
            server: req.params.server
        }
    }).then( userUpdate => {
        if ( userUpdate ) {
            let urlLeague = 'https://'+req.params.server+'.api.riotgames.com/lol/league/v3/positions/by-summoner/'+req.params.summonerId + '?api_key='+ apiKey;
            axios.get( urlLeague )
                .then( response => {
                    dateCreate = {};
                    response.data.map(data =>{
                        if(data.queueType == 'RANKED_SOLO_5x5'){
                            dateCreate.soloWins  = data.wins;
                            dateCreate.soloLosses = data.losses;
                            dateCreate.soloLeagueName = data.leagueName ;
                            dateCreate.soloRank = data.rank;
                            dateCreate.soloLeagueId = data.leagueId ;
                            dateCreate.soloTier = data.tier;
                            dateCreate.soloLeaguePoints  = data.leaguePoints;
                        }
                        if(data.queueType == 'RANKED_FLEX_SR') {
                            dateCreate.flexWins = data.wins;
                            dateCreate.flexLosses = data.losses;
                            dateCreate.flexLeagueName = data.leagueName;
                            dateCreate.flexRank = data.rank;
                            dateCreate.flexLeagueId = data.leagueId;
                            dateCreate.flexTier = data.tier;
                            dateCreate.flexLeaguePoints = data.leaguePoints;
                        }

                    });
                    userUpdate.updateAttributes(dateCreate);
                    res.json({
                        status: 1,
                        statusCode: 'league/updated/ok',
                        data: userUpdate.toJSON()
                    });
                }).catch( error => {
                res.json({
                    status: 0,
                    statusCode: 'league/updated/error',
                    description: 'id erronea',
                    error:error
                });
            });
        } else {
            res.status(400).json({
                status: 0,
                statusCode: 'league/updated/error',
                description: "Summoner no existe"
            });
        }
    }).catch( errorCreate => {
        res.status(400).json({
            status: 0,
            statusCode: 'database/error',
            description: errorCreate.toString()
        });
    });
});

router.get('/all', (req, res, next) => {
    models.summoner
        .findAll({
            include:{
                model:models.league,
                as : 'summonerLeague'
            }
        })
        .then(league => {
            if (league) {
                res.json({
                    status: 1,
                    statusCode: 'users/listing',
                    data: league
                });
            } else {
                res.status(400).json({
                    status: 0,
                    statusCode: 'users/not-found',
                    description: 'There\'s no user information!'
                });
            }
        }).catch(error => {
        res.status(400).json({
            status: 0,
            statusCode: 'database/error',
            description: error.toString()
        });
    });
});




module.exports = router;
