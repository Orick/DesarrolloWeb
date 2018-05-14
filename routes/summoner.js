const express = require('express');
const router = express.Router();
const models = require('../models');
const axios = require('axios');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// router.post('/', (req, res, next) => {
//     const name = req.body['name'];
//     const email = req.body['email'];
//     const password = req.body['password'];
//     res.json({
//         status: 1,
//         statusCode: 'user/created',
//     });
// });

const apiKey = 'RGAPI-a5bd1a27-7f42-4250-b0dc-6c60185e712a';

router.get('/find/:server/:summonerName', (req, res, next) => {
    const summonerName = req.params.summonerName;//.charAt(0).toUpperCase() + req.params.summonerName.slice(1);
    const summonerServer = req.params.server;
    models.summoner
    .findOne({
        where: {
            // $ilike
            name :{ [Op.like]: '%'+summonerName+'%'},
            server: summonerServer,
        }
    })
    .then( user => {
        if ( user ) {
            res.json({
                status: 1,
                statusCode: 'summoner/ok',
                description: 'usuario encontrado',
                data: user
            });
        }else{
            let urlSummoner = 'https://'+summonerServer+'.api.riotgames.com/lol/summoner/v3/summoners/by-name/'+summonerName + '?api_key='+ apiKey;
            console.log(urlSummoner);
            axios.get(urlSummoner)
            .then( response => {
                models.summoner.create({
                    summonerId:response.data.id,
                    accountId:response.data.accountId,
                    name: response.data.name,
                    profileIconId:response.data.profileIconId,
                    summonerLevel:response.data.summonerLevel,
                    revisionDate:response.data.revisionDate,
                    server:summonerServer
                }).then( userCreate => {
                    if (userCreate) {
                        res.json({
                            status: 1,
                            statusCode: 'summoner/find/created',
                            data: userCreate.toJSON()
                        });
                    } else {
                        res.status(400).json({
                            status: 0,
                            statusCode: 'summoner/find/error',
                            description: "No se pudo crear el summoner"
                        });
                    }
                }).catch( errorCreate => {
                    res.status(400).json({
                        status: 0,
                        statusCode: 'database/error',
                        description: errorCreate.toString()
                    });
                });
            })
            .catch( error => {
                res.json({
                    status: 0,
                    statusCode: 'summoner/find/error',
                    description: 'Nombre de invocador invalido',
                    error:error.toString()
                });
            });
        }
    })
    .catch( error =>{
        res.json({
            status: 0,
            statusCode: 'summoner/error',
            description: 'Error en base de datos',
            error:error.toString()
        });
    });
});


router.get( '/update/:server/:summonerName', (req, res, next) => {
    const summonerName = req.params.summonerName;//.charAt(0).toUpperCase() + req.params.summonerName.slice(1);
    const summonerServer = req.params.server;

    models.summoner.findOne({
        where:{
            name: { [Op.like]: '%'+summonerName+'%'},
            server: summonerServer
        }
    }).then( userUpdate => {
        if ( userUpdate ) {
            let urlSummoner = 'https://'+summonerServer+'.api.riotgames.com/lol/summoner/v3/summoners/by-name/'+summonerName + '?api_key='+ apiKey;
            axios.get( urlSummoner )
            .then( response => {
                userUpdate.updateAttributes({
                    // name:response.data.name,
                    profileIconId:response.data.profileIconId,
                    summonerLevel:response.data.summonerLevel,
                    revisionDate:response.data.revisionDate
                });
                res.json({
                    status: 1,
                    statusCode: 'summoner/updated/ok',
                    data: userUpdate.toJSON()
                });
            }).catch( error => {
                res.json({
                    status: 0,
                    statusCode: 'summoner/update/error',
                    description: 'Nombre de invocador invalido'
                });
            });
        } else {
            res.status(400).json({
                status: 0,
                statusCode: 'summoner/update/error',
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
    .findAll()
    .then(users => {
        if (users) {
            res.json({
                status: 1,
                statusCode: 'summoner/listing',
                data: users
            });
        } else {
            res.status(400).json({
                status: 0,
                statusCode: 'summoner/all/not-found',
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
