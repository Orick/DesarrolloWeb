const express = require('express');
const axios = require('axios');
const app = express();
const bodyParser = require('body-parser');
const models = require('../models');
const router = express.Router();
const firebaseAdmin = require('../config/firebaseConfig');

app.use(bodyParser.urlencoded({ extended: false }));

router.post('/', (req, res, next) => {
                var iduser = req.body['iduser'];
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
                var image1 = req.body['image1'];
                var image2 = req.body['image2'];
                console.log(iduser,name,idchamp1,idchamp2,iditem11,iditem12,iditem13,iditem14,iditem15,iditem16,iditem21,iditem22,iditem23,iditem24,iditem25,iditem26, )

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
                        iditem26: iditem26,
                        image1: image1,
                        image2: image2


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

});

router.get('/all', (req, res, next)=>{
    models.builds
    .findAll()
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
});

router.get('/:token', (req, res, next)=>{
    const token = req.params.token;
    let nombres = [];
    models.builds
    .findAll({
        where: {iduser: token}
    })
    .then(builds=>{
        builds.forEach(function(element) {
            nombres.push(element.name)      
        });
        if (builds){
            res.json({
            data: nombres
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
});


router.get('/obtener/:token/:name', (req, res, next)=>{
    const iduser = req.params.token;
    const name = req.params.name;
    let aux = [];
    console.log(aux,iduser,name)
    models.builds
    .findAll({
        where: {iduser: iduser, name: name}
    })
    .then(builds=>{
        builds.forEach(function(element) {
            aux.push(element.idchamp1);
            aux.push(element.idchamp2);
            aux.push(element.iditem11);
            aux.push(element.iditem12);
            aux.push(element.iditem13);
            aux.push(element.iditem14);
            aux.push(element.iditem15);
            aux.push(element.iditem16);
            aux.push(element.iditem21);
            aux.push(element.iditem22);
            aux.push(element.iditem23);
            aux.push(element.iditem24);
            aux.push(element.iditem25);
            aux.push(element.iditem26);
            aux.push(element.image1);
            aux.push(element.image2);
        });
        if (builds){
            res.json({
            data: aux
            });
        } else {
            res.status(400).json({
                status:0,
                error: 'builds vacio'
            });
        }
    }).catch(error => {
        res.status(400).json({
            status:0,
            error: 'catch'
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