const express = require('express');
const router = express.Router();
const models = require('../models');
const axios = require('axios');
const sequelize = require('Sequelize');
const Op = sequelize.Op;

const apiKey = 'RGAPI-afd57380-a0ac-40a5-8b28-76dabb71a13f';

router.get('/find/:server/:accountId', (req, res, next) => {
    models.summoner
    .findOne({
        where: {
            accountId : req.params.accountId,
            server : req.params.server
        }
    })
    .then( summoner => {
        if ( summoner ) {
            models.matchlist
            .findAll({
                order: [['timestamp', 'DESC']],
                include: {
                    model: models.summoner,
                    through: 'summonerMatchList',
                    where:{
                        accountId : req.params.accountId,
                        server : req.params.server
                    }
                }
            })
            .then( listMatchs => {
                if( listMatchs.length > 0 ){
                    let urlMatchList = 'https://'+req.params.server+'.api.riotgames.com/lol/match/v3/matchlists/by-account/'+req.params.accountId +'?beginTime='+listMatchs[0].timestamp +'&api_key='+ apiKey;
                    axios.get(urlMatchList)
                        .then( response => {
                            response.data.matches.map((dataApi, index) => {

                                if (index < (response.data.matches.length-1)){
                                    models.matchlist.create({
                                        lane: dataApi.lane,
                                        gameId: dataApi.gameId,
                                        champion: dataApi.champion,
                                        platformId: dataApi.platformId,
                                        timestamp: dataApi.timestamp,
                                        queue: dataApi.queue,
                                        role: dataApi.role,
                                        season: dataApi.season
                                    }).then(matchlistCreate => {
                                        if (matchlistCreate) {
                                            summoner.addSumlist(matchlistCreate);
                                            //https://la2.api.riotgames.com/lol/match/v3/matches/567587094?api_key=RGAPI-afd57380-a0ac-40a5-8b28-76dabb71a13f
                                            // let urlMatch = 'https://'+req.params.server+'.api.riotgames.com/lol/match/v3/matches/'+dataApi.gameId+'?api_key='+ apiKey;
                                            // console.log(urlMatch);
                                            // axios.get(urlMatch)
                                            //     .then(matchResponse =>{
                                            //         let dataMatch = {};
                                            //         dataMatch.gameId = dataApi.gameId;
                                            //         dataMatch.accountId = req.params.accountId;
                                            //
                                            //         matchResponse.participantIdentities.map( parti =>{
                                            //             if (parti.player.accountId == req.params.accountId){
                                            //                 dataMatch.participantId = parti.participantId;
                                            //                 dataMatch.summonerId = parti.player.summonerId;
                                            //                 dataMatch.profileIcon = parti.player.profileIcon;
                                            //             }
                                            //         });
                                            //
                                            //         matchResponse.participants.map( detalles => {
                                            //            if( detalles.participantId == dataMatch.participantId ){
                                            //
                                            //                dataMatch.win   = detalles.stats.win;
                                            //                dataMatch.item0 = detalles.stats.item0;
                                            //                dataMatch.item1 = detalles.stats.item1;
                                            //                dataMatch.item2 = detalles.stats.item2;
                                            //                dataMatch.item3 = detalles.stats.item3;
                                            //                dataMatch.item4 = detalles.stats.item4;
                                            //                dataMatch.item5 = detalles.stats.item5;
                                            //                dataMatch.item6 = detalles.stats.item6;
                                            //                dataMatch.deaths = detalle.stats.dataMatch;
                                            //                dataMatch.kills = detalle.stats.kills;
                                            //                dataMatch.assists= detalle.stats.assists;
                                            //            }
                                            //         });
                                            //
                                            //         models.match.create(dataMatch)
                                            //             .then( matchCreate => {
                                            //                 if ( matchCreate ){
                                            //                     matchlistCreate.addListMatch(matchCreate);
                                            //                 }
                                            //             })
                                            //             .catch(errorCreate =>{
                                            //                 res.json({
                                            //                     status: 0,
                                            //                     statusCode: 'matchlist/find/error',
                                            //                     description: 'Error base de datos',
                                            //                     error: errorCreate.toString()
                                            //                 });
                                            //             })
                                            //
                                            //     })
                                            //     .catch(error =>{
                                            //         res.json({
                                            //             status: 0,
                                            //             statusCode: 'matchlist/find/error',
                                            //             description: 'Matchlist error url match o datos invalidos',
                                            //             error: error.toString()
                                            //         });
                                            //     });
                                        }
                                    }).catch(errorCreate => {
                                        res.json({
                                            status: 0,
                                            statusCode: 'matchlist/find/error',
                                            description: 'Error base de datos',
                                            error: errorCreate.toString()
                                        });
                                    });
                                }
                            });
                            res.json({
                                status: 1,
                                statusCode: 'matchlist/find/ok',
                                description: 'Match list cargada desde ' + listMatchs[0].timestamp
                            });
                        })
                        .catch( error => {
                            res.json({
                                status: 0,
                                statusCode: 'matchlist/find/error',
                                description: 'Matchlist error url matchlist o datos invalidos',
                                error: error.toString()
                            });
                        });
                }else{
                    let urlMatchList = 'https://'+req.params.server+'.api.riotgames.com/lol/match/v3/matchlists/by-account/'+req.params.accountId + '?api_key='+ apiKey;
                    // console.log(urlMatchList);
                    axios.get(urlMatchList)
                    .then( response => {
                        response.data.matches.map( (dataApi, ind ) => {
                            models.matchlist.create({
                                lane:dataApi.lane,
                                gameId:dataApi.gameId,
                                champion: dataApi.champion,
                                platformId: dataApi.platformId,
                                timestamp:dataApi.timestamp,
                                queue:dataApi.queue,
                                role:dataApi.role,
                                season:dataApi.season
                            }).then( matchlistCreate => {
                                if (matchlistCreate) {
                                    summoner.addSumlist(matchlistCreate);
                                }
                            }).catch( errorCreate => {
                                res.json({
                                    status: 0,
                                    statusCode: 'matchlist/find/error',
                                    description: 'Error base de datos',
                                    error: errorCreate.toString()
                                });
                            });
                        });
                        res.json({
                            status: 1,
                            statusCode: 'mathlist/find/ok',
                            description: 'Matchlist actualizada',
                        });


                    })
                    .catch( error => {
                        res.json({
                            status: 0,
                            statusCode: 'matchlist/find/error',
                            description: 'Matchlist error summoner sin games',
                            error: error.toString()
                        });
                    });
                }
            })
            .catch( error => {
                res.json({
                    status: 0,
                    statusCode: 'matchlist/find/error',
                    description: 'Error base de datos',
                    error: error.toString()
                });
            });
        }else{
            res.json({
                status: 0,
                statusCode: 'matchlist/find/error',
                description: 'Summoner no existe',
                error: error.toString()
            });
        }
    })
    .catch(error =>{
        res.json({
            status: 0,
            statusCode: 'matchlist/find/error',
            description: 'Error base de datos',
            error: error.toString()
        });
    });
});

router.get('/matchEs/:gameId/:server/:accountId/:summonerId', (req, res, next) => {
    models.matchlist
        .findOne({
            where:{
                gameId: req.params.gameId
            }
        }).then( listMatchs => {
            console.log(listMatchs);
            if(listMatchs){
                        let urlMatch = 'https://'+req.params.server+'.api.riotgames.com/lol/match/v3/matches/'+listMatchs.gameId+'?api_key='+ apiKey;
                        console.log(urlMatch);
                        axios.get(urlMatch)
                            .then(matchResponse =>{
                                let dataMatch = {};
                                dataMatch.gameId = listMatchs.gameId;
                                dataMatch.accountId = parseInt(req.params.accountId);
                                matchResponse.data.participantIdentities.map( parti =>{
                                    if (parti.player.summonerId == req.params.summonerId){
                                        dataMatch.participantId = parti.participantId;
                                        dataMatch.summonerId = parti.player.summonerId;
                                        dataMatch.profileIcon = parti.player.profileIcon;
                                    }
                                });

                                matchResponse.data.participants.map( detalles => {
                                    if( detalles.participantId == dataMatch.participantId ){

                                        dataMatch.win   = detalles.stats.win;
                                        dataMatch.item0 = detalles.stats.item0;
                                        dataMatch.item1 = detalles.stats.item1;
                                        dataMatch.item2 = detalles.stats.item2;
                                        dataMatch.item3 = detalles.stats.item3;
                                        dataMatch.item4 = detalles.stats.item4;
                                        dataMatch.item5 = detalles.stats.item5;
                                        dataMatch.item6 = detalles.stats.item6;
                                        dataMatch.deaths = detalles.stats.deaths;
                                        dataMatch.kills = detalles.stats.kills;
                                        dataMatch.assists= detalles.stats.assists;
                                    }
                                });
                                //console.log(dataMatch);
                                models.match.create(dataMatch)
                                    .then( matchCreate => {
                                        if ( matchCreate ){

                                            listMatchs.addListMatch(matchCreate);

                                            res.json({
                                                status: 1,
                                                statusCode: 'matchlist/find/ok',
                                                description: 'busqueda correcta',
                                                data: listMatchs
                                            });
                                        }
                                    })
                                    .catch(errorCreate =>{
                                        res.json({
                                            status: 0,
                                            statusCode: 'matchlist/find/error',
                                            description: 'Error base de datos',
                                            error: errorCreate.toString()
                                        });
                                    });
                            })
                            .catch(error =>{
                                res.json({
                                    status: 0,
                                    statusCode: 'matchlist/find/error',
                                    description: 'Matchlist error url match o datos invalidos',
                                    error: error.toString()
                                });
                            });
            }else{
                res.json({
                    status: 0,
                    statusCode: 'matchlist/matchLast20/error',
                    description: 'sin datos de match',
                    error: error.toString()
                });
            }
        }).catch(error => {
            res.json({
                status: 0,
                statusCode: 'matchlist/matchLast20/error',
                description: 'Error base de datos',
                error: error.toString()
            });
        });
});

// let urlMatch = 'https://'+req.params.server+'.api.riotgames.com/lol/match/v3/matches/'+dataApi.gameId+'?api_key='+ apiKey;
// console.log(urlMatch);
// axios.get(urlMatch)
//     .then(matchResponse =>{
//         console.log('AAAAAAA AAAA ->>>>>>>>',ind,matchResponse.data);
//         let dataMatch = {};
//         dataMatch.gameId = dataApi.gameId;
//         dataMatch.accountId = req.params.accountId;
//
//         matchResponse.data.participantIdentities.map( parti =>{
//             if (parti.player.accountId == req.params.accountId){
//                 dataMatch.participantId = parti.participantId;
//                 dataMatch.summonerId = parti.player.summonerId;
//                 dataMatch.profileIcon = parti.player.profileIcon;
//             }
//         });
//
//         matchResponse.data.participants.map( detalles => {
//             if( detalles.participantId == dataMatch.participantId ){
//
//                 dataMatch.win   = detalles.stats.win;
//                 dataMatch.item0 = detalles.stats.item0;
//                 dataMatch.item1 = detalles.stats.item1;
//                 dataMatch.item2 = detalles.stats.item2;
//                 dataMatch.item3 = detalles.stats.item3;
//                 dataMatch.item4 = detalles.stats.item4;
//                 dataMatch.item5 = detalles.stats.item5;
//                 dataMatch.item6 = detalles.stats.item6;
//                 dataMatch.deaths = detalle.stats.dataMatch;
//                 dataMatch.kills = detalle.stats.kills;
//                 dataMatch.assists= detalle.stats.assists;
//             }
//         });
//         console.log('BBBBBBBBBB ->>>>>>>>',ind,dataMatch);
//         models.match.create(dataMatch)
//             .then( matchCreate => {
//                 if ( matchCreate ){
//                     matchlistCreate.addListMatch(matchCreate);
//                 }
//             })
//             .catch(errorCreate =>{
//                 res.json({
//                     status: 0,
//                     statusCode: 'matchlist/find/error',
//                     description: 'Error base de datos',
//                     error: errorCreate.toString()
//                 });
//             })
//
//     })
//     .catch(error =>{
//         res.json({
//             status: 0,
//             statusCode: 'matchlist/find/error',
//             description: 'Matchlist error url match o datos invalidos',
//             error: error.toString()
//         });
//     });



//primero hacer el find y despues get
router.get('/getMatchlist/:server/:accountId', (req, res, next) => {
    models.matchlist
        .findAll({
            order: [['timestamp', 'DESC']],
            include: {
                model: models.summoner,
                through: 'summonerMatchList',
                where:{
                    accountId : req.params.accountId,
                    server : req.params.server
                }
            }
        })
        .then(users => {
            if (users) {
                res.json({
                    status: 1,
                    statusCode: 'users/listing',
                    data: users
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



router.get('/all', (req, res, next) => {
    models.matchlist
    .findAll({
        order: [['timestamp', 'DESC']],
        include: {
            model: models.summoner,
            through: 'summonerMatchList'
        }
    })
    .then(users => {
        if (users) {
            res.json({
                status: 1,
                statusCode: 'users/listing',
                data: users
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


router.get('/allMatch', (req, res, next) => {
    models.summoner
        .findAll({
            include: {
                model: models.matchlist,
                order: [['timestamp', 'DESC']],
                through: 'summonerMatchList',
                as: 'sumlist',
                include: {
                    model: models.match,
                    through: 'listM',
                    as: 'listMatch'
                }
            }
        })
        .then(users => {
            if (users) {
                res.json({
                    status: 1,
                    statusCode: 'users/listing',
                    data: users
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

router.get('/allMatchAA', (req, res, next) => {
    models.match
        .findAll()
        .then(users => {
            if (users) {
                res.json({
                    status: 1,
                    statusCode: 'users/listing',
                    data: users
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
