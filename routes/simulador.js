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
    var damage = 0;
    var attackSpeedOffSet = 0;
    var attackSpeedPerLevel = 0;
    var attackDamagePerLevel = 0;
    var vida = 0;
    var armor = 0;
    var magicArmor = 0;
    var crit = 0;
    var critPerLevel = 0;
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
                    damage = champions[0].attackDamage + damage;
                    attackSpeedOffSet = champions[0].attackSpeedOffSet + attackSpeedOffSet;
                    attackSpeedPerLevel = champions[0].attackSpeedPerLevel + attackSpeedPerLevel;
                    attackDamagePerLevel = champions[0].attackDamagePerLevel + attackDamagePerLevel;
                    crit = champions[0].crit + crit;
                    critPerLevel = champions[0].critPerLevel + critPerLevel;
                    if (item){
                    item.forEach(function(element) {
                        if (element.physicalDamageMod != null){
                            damage = damage + element.physicalDamageMod;
                        }
                        if (element.attackSpeedMod != null){
                            attackSpeedOffSet = attackSpeedOffSet + element.attackSpeedMod;
                            }
                        /*if (element.attackSpeedMod != null){
                                attackSpeedOffSet = attackSpeedOffSet + element.attackSpeedMod;
                            }*/
                        
                    
                      });
                    }
                    res.json({
                        attackDamage: damage,
                        attackSpeed: attackSpeedOffSet,
                        crit: crit,
                        attackSpeedPerLevel: attackSpeedPerLevel,
                        attackDamagePerLevel: attackDamagePerLevel,
                        critPerLevel: critPerLevel
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
    var armor = 0;
    var armorPerLevel = 0;
    var magicArmor = 0;
    var spellBlockPerLevel = 0;
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
                    armor = champions[0].armor + armor;
                    magicArmor = champions[0].spellBlock + magicArmor;
                    armorPerLevel = champions[0].armorPerLevel + armorPerLevel;
                    spellBlockPerLevel = champions[0].spellBlockPerLevel + spellBlockPerLevel
                    if (item){
                    item.forEach(function(element) {
                        if (element.armorMod != null){
                            armor = armor + element.armorMod;
                        }
                        if (element.magicResistanceMod != null){
                            magicArmor = magicArmor + element.magicResistanceMod;
                            }
                        
                    
                      });
                    }
                    res.json({
                        armor: armor,
                        magicArmor: magicArmor,
                        magicArmorPerLevel: spellBlockPerLevel,
                        armorPerLevel: armorPerLevel
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