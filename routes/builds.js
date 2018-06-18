const express = require('express');
const axios = require('axios');
const app = express();
const bodyParser = require('body-parser');
const models = require('../models');
const router = express.Router();
const firebaseAdmin = require('../config/firebaseConfig');

app.use(bodyParser.urlencoded({ extended: false }));

router.post('/', (req, res, next) => {
    firebaseAdmin.auth().verifyIdToken(req.body.token)
        .then(decodedToken => {
                var iduser = decodedToken.uid;
                var idchamp1 = req.body['idchamp1'];
                var idchamp2 = req.body['idchamp2'];
                var name = req.body['name'];
                var iditem11 = req.body['iditem11'];
                var iditem12 = req.body['iditem12'];
                var iditem13 = req.body['iditem13'];
                var iditem14 = req.body['iditem14'];
                var iditem15 = req.body['iditem15'];
                var iditem16 = req.body['iditem16'];
                var iditem21 = req.body['iditem21'];
                var iditem22 = req.body['iditem22'];
                var iditem23 = req.body['iditem23'];
                var iditem24 = req.body['iditem24'];
                var iditem25 = req.body['iditem25'];
                var iditem26 = req.body['iditem26'];

                if (idchamp1 && idchamp2) {
                    models.builds.create({
                        iduser: iduser,
                        name: name,
                        idchamp1: idchamp1,
                        idchamp2: idchamp2,
                        iditem11: iditem11,
                        iditem12: iditem12,
                        iditem13: iditem13,
                        iditem14: iditem14,
                        iditem15: iditem15,
                        iditem16: iditem16,
                        iditem21: iditem21,
                        iditem22: iditem22,
                        iditem23: iditem23,
                        iditem24: iditem24,
                        iditem25: iditem25,
                        iditem26: iditem26


                    }).then(builds => {
                        if (builds) {
                            res.json({
                                status: 1,
                                description: "Se ingresó correctamente."
                            });
                        } else {
                            res.json({
                                status: 0,
                                description: "Couldn't create the user"
                            });
                        }
                    }).catch(error => {
                        console.log(error);
                        res.json({
                            status: 0
                        });
                    });
                } else {
                    res.json({
                        status: 0,
                        description: 'The body is wrong! :('
                    });
                }

        }).catch(error =>{
        res.json({
            code:'0',
            description:'error al verificar token de usuario',
        });
    });
});

router.post('/search', (req, res, next)=>{
    firebaseAdmin.auth().verifyIdToken(req.body.token)
        .then(decodedToken => {
                var iduser = decodedToken.uid;
    models.builds
    .findAll({
        where: {token: iduser}
    })
    .then(builds=>{
        if (builds){
            res.json({
                status: 1,
            data: builds
            });
        } else {
            res.status(400).json({
                status:0
            });
        }
    }).catch(error => {
        res.status(400).json({
            status:0
        });
    });
}).catch(error =>{
        res.json({
            code:'0',
            description:'error al verificar token de usuario',
        });
    });
});

module.exports = router;