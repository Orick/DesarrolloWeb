const express = require('express');
const axios = require('axios');
const app = express();
const bodyParser = require('body-parser');
const models = require('../models');
const router = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

app.use(bodyParser.urlencoded({ extended: false }));


//http://localhost:8080/simulador/attack/1/1001/1005/1042/1010/1042/1042
router.get('/attack/:id1/:iditem1/:iditem2/:iditem3/:iditem4/:iditem5/:iditem6/', (req, res, next)=>{
    const id1 = req.params.id1;
    const iditem1 = req.params.iditem1;
    const iditem2 = req.params.iditem2;
    const iditem3 = req.params.iditem3;
    const iditem4 = req.params.iditem4;
    const iditem5 = req.params.iditem5;
    const iditem6 = req.params.iditem6;
    var damage = 0; //0
    var attackDamagePerLevel = 0; //1
    var attackSpeedOffSet = 0; //2
    var attackSpeedPerLevel = 0; //3
    var crit = 0; //4
    var critPerLevel = 0; //5
    var attack = [0,0,0,0,0,0]
    models.item.findAll({
        where: {
            id: {
                [Op.or]: [iditem1, iditem2,iditem3,iditem4,iditem5,iditem6]
            }
        }
    })
    .then(item=>{
            models.champions.findAll({
                where: {id: id1}
            })
            .then(champions=>{
                if (champions){
                    attack[0] = champions[0].attackDamage + attack[0];
                    attack[2] = champions[0].attackSpeedOffSet + attack[2];
                    attack[3] = champions[0].attackSpeedPerLevel + attack[3];
                    attack[1] = champions[0].attackDamagePerLevel + attack[1];
                    attack[4] = champions[0].crit + attack[4];
                    attack[5] = champions[0].critPerLevel + attack[5];
                    if (item){
                    item.forEach(function(element) {
                        if (element.physicalDamageMod != null){
                            attack[0] = attack[0] + element.physicalDamageMod;
                        }
                        if (element.attackSpeedMod != null){
                            attack[2] = attack[2] + element.attackSpeedMod;
                            }
                        /*if (element.attackSpeedMod != null){
                                attackSpeedOffSet = attackSpeedOffSet + element.attackSpeedMod;
                            }*/
                        
                    
                      });
                    }
                    res.json({
                        data: attack
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
    })
    .catch(error => {
        res.status(400).json({
            status:0
        });
    });
    
});

//http://localhost:8080/simulador/recibe/1/1/3/1042/1010/1037/1038
router.get('/recibe/:id1/:iditem1/:iditem2/:iditem3/:iditem4/:iditem5/:iditem6/', (req, res, next)=>{
    const id1 = req.params.id1;
    const iditem1 = req.params.iditem1;
    const iditem2 = req.params.iditem2;
    const iditem3 = req.params.iditem3;
    const iditem4 = req.params.iditem4;
    const iditem5 = req.params.iditem5;
    const iditem6 = req.params.iditem6;
    var armor = 0; //0
    var armorPerLevel = 0; //1
    var magicArmor = 0; //2
    var spellBlockPerLevel = 0; //3
    var recibe = [0,0,0,0];
    models.item.findAll({
        where: {
            id: {
                [Op.or]: [iditem1, iditem2,iditem3,iditem4,iditem5,iditem6]
            }
        }
    })
    .then(item=>{
            models.champions.findAll({
                where: {id: id1}
            })
            .then(champions=>{
                if (champions){
                    recibe[0] = champions[0].armor + recibe[0];
                    recibe[2] = champions[0].spellBlock + recibe[2];
                    recibe[1] = champions[0].armorPerLevel + recibe[1];
                    recibe[3] = champions[0].spellBlockPerLevel + recibe[3];
                    if (item){
                    item.forEach(function(element) {
                        if (element.armorMod != null){
                            recibe[0] = recibe[0] + element.armorMod;
                        }
                        if (element.magicResistanceMod != null){
                            recibe[2] = recibe[2] + element.magicResistanceMod;
                            }
                        
                    
                      });
                    }
                    res.json({
                        data: recibe
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
    })
    .catch(error => {
        res.status(400).json({
            status:0
        });
    });
    
});

    module.exports = router;