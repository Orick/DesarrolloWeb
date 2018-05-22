const express = require('express');
const axios = require('axios');
const app = express();
const bodyParser = require('body-parser');
const models = require('../models');
const router = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

app.use(bodyParser.urlencoded({ extended: false }));

router.post('/', (req, res, next)=>{
    var idchamp1 = req.body['idchamp1'];
    var idchamp2 = req.body['idchamp2'];
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
    models.item.findAll({
        where: {
            id: {
                [Op.or]: [iditem11, iditem12,iditem13,iditem14,iditem15,iditem16,iditem21,iditem22,iditem23,iditem24,iditem25,iditem26]
            }
        }
    })
    .then(item=>{
        if (item){
            models.champions.findAll({
                where: {
                    id: {
                        [Op.or]: [idchamp1, idchamp2]
                    }
                }
            })
            .then(champions=>{
                if (champions){
                    res.json({
                        status: 1,
                        items: item,
                        champions: champions
                    });                    
                } else {
                    res.status(400).json({
                        status:0
                    });
                }
            })
            .catch(error => {
                res.status(400).json({
                    status:0
                });
            });
        } else {
            res.status(400).json({
                status:0
            });
        }
    })
    .catch(error => {
        res.status(400).json({
            status:0
        });
    });
    
});


/*router.post('/', (req, res, next)=>{
    var idchamp1 = req.body['idchamp1'];
    var idchamp2 = req.body['idchamp2'];
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
    res.json({
        daño: calcularDaño(idchamp1,idchamp2,iditem11,iditem12,iditem13,iditem14,iditem15,iditem16,iditem21,iditem22,iditem23,iditem24,iditem25,iditem26)
    });
});

const calcularDaño = async (idchamp1,idchamp2,iditem11,iditem12,iditem13,iditem14,iditem15,iditem16,iditem21,iditem22,iditem23,iditem24,iditem25,iditem26) =>{
    models.item.findAll({
        where: {
            id: {
                [Op.or]: [iditem11, iditem12,iditem13,iditem14,iditem15,iditem16,iditem21,iditem22,iditem23,iditem24,iditem25,iditem26]
            }
        }
    })
    .then(item=>{
        if (item){
            models.champions.findAll({
                where: {
                    id: {
                        [Op.or]: [idchamp1, idchamp2]
                    }
                }
            })
            .then(champions=>{
                if (champions){
                    console.log(champions[0].id + ' ' + champions[1].id);
                    atackDamage = champions[0].atackDamage;
                    attackDamagePerLevel = champions[0].attackDamagePerLevel;
                    attackSpeedOffSet = champions[0].attackSpeedOffSet;
                    attackSpeedPerLevel = champions[0].attackSpeedPerLevel;
                    crit = champions[0].crit;
                    critPerLevel = champions[0].critPerLevel;
                    damage = [];
                    damage.append(atackDamage);
                    damage.append(attackDamagePerLevel);
                    damage.append(attackSpeedOffSet);
                    damage.append(attackSpeedPerLevel);
                    damage.append(crit);
                    damage.append(critPerLevel);
                    return damage;
                }
            })
            .catch(error => {
                return error;
            });
        }
    })
    .catch(error => {
        return error;
    });
    
};

const obtenerChamps = async (idchamp1,idchamp2) =>{
    //console.log("entre a la funcion")
    models.champions.findAll({
        where: {
            id: {
                [Op.or]: [idchamp1, idchamp2]
            }
        }
    })
    .then(champions=>{
        if (champions){
            //console.log(champions)
            return champions}
    }).catch(error => {
        return error
    });

};

const obtenerItems = async (iditem11,iditem12,iditem13,iditem14,iditem15,iditem16,iditem21,iditem22,iditem23,iditem24,iditem25,iditem26) =>{
    return new Promise((resolve,reject)=>{
    models.items.findAll({
        where: {
            id: {
                [Op.or]: [iditem11, iditem12,iditem13,iditem14,iditem15,iditem16,iditem21,iditem22,iditem23,iditem24,iditem25,iditem26]
            }
        }
    })
    .then(items=>{
        if (items){
            resolve({item: items});
        }
    }).catch(error => {
        reject({error:error});
    });
    });
};
*/
    module.exports = router;