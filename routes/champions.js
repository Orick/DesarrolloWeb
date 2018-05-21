const express = require('express');
const axios = require('axios');
const app = express();
const bodyParser = require('body-parser');
const models = require('../models');
const router = express.Router();
const apiKey = require('../config/apiriot');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

app.use(bodyParser.urlencoded({ extended: false }));


router.get('/', async (req, res, next) =>{

    let url = 'https://la2.api.riotgames.com/lol/static-data/v3/champions?locale=es_MX&champListData=all&tags=all&dataById=false&api_key='+apiKey;
    console.log(url);


    axios.get(url)
        .then(function (response) {
            let lista = response.data.keys
            let a = response.data;
            var datos = []
            /*let i = 2;
            var id = a.data[lista[i]].id;
            var name = a.data[lista[i]].name;
            var armor = a.data[lista[i]].stats.armor;
            var armorPerLevel = a.data[lista[i]].stats.armorperlevel;
            var attackDamage = a.data[lista[i]].stats.attackdamage;
            var attackDamagePerLevel = a.data[lista[i]].stats.attackdamageperlevel;
            var attackRange = a.data[lista[i]].stats.attackrange;
            var attackSpeedOffSet = a.data[lista[i]].stats.attackspeedoffset;
            var attackSpeedPerLevel = a.data[lista[i]].stats.attackspeedperlevel;
            var crit = a.data[lista[i]].stats.crit;
            var critPerLevel = a.data[lista[i]].stats.critperlevel;
            var hp = a.data[lista[i]].stats.hp;
            var hpPerLevel = a.data[lista[i]].stats.hpperlevel;
            var hpRegen = a.data[lista[i]].stats.hpregen;
            var hpRegenPerLevel = a.data[lista[i]].stats.hpregenperlevel;
            var moveSpeed = a.data[lista[i]].stats.movespeed;
            var mp = a.data[lista[i]].stats.mp;
            var mpPerLevel = a.data[lista[i]].stats.mpperlevel;
            var mpRegen = a.data[lista[i]].stats.mpregen;
            var mpRegenPerLevel = a.data[lista[i]].stats.mpregenperlevel;
            var spellBlock = a.data[lista[i]].stats.spellblock;
            var spellBlockPerLevel = a.data[lista[i]].stats.spellblockperlevel;*/
            for(var i in lista){
                var id = a.data[lista[i]].id;
                var name = a.data[lista[i]].name;
                var armor = a.data[lista[i]].stats.armor;
                var armorPerLevel = a.data[lista[i]].stats.armorperlevel;
                var attackDamage = a.data[lista[i]].stats.attackdamage;
                var attackDamagePerLevel = a.data[lista[i]].stats.attackdamageperlevel;
                var attackRange = a.data[lista[i]].stats.attackrange;
                var attackSpeedOffSet = a.data[lista[i]].stats.attackspeedoffset;
                var attackSpeedPerLevel = a.data[lista[i]].stats.attackspeedperlevel;
                var crit = a.data[lista[i]].stats.crit;
                var critPerLevel = a.data[lista[i]].stats.critperlevel;
                var hp = a.data[lista[i]].stats.hp;
                var hpPerLevel = a.data[lista[i]].stats.hpperlevel;
                var hpRegen = a.data[lista[i]].stats.hpregen;
                var hpRegenPerLevel = a.data[lista[i]].stats.hpregenperlevel;
                var moveSpeed = a.data[lista[i]].stats.movespeed;
                var mp = a.data[lista[i]].stats.mp;
                var mpPerLevel = a.data[lista[i]].stats.mpperlevel;
                var mpRegen = a.data[lista[i]].stats.mpregen;
                var mpRegenPerLevel = a.data[lista[i]].stats.mpregenperlevel;
                var spellBlock = a.data[lista[i]].stats.spellblock;
                var spellBlockPerLevel = a.data[lista[i]].stats.spellblockperlevel;
                var image = a.data[lista[i]].image.full;

                datos.push(id);
                datos.push(name);
                datos.push(armor);
                datos.push(armorPerLevel);
                datos.push(attackDamage);
                datos.push(attackDamagePerLevel);
                datos.push(attackRange);
                datos.push(attackSpeedOffSet);
                datos.push(attackSpeedPerLevel);
                datos.push(crit);
                datos.push(critPerLevel);
                datos.push(hp);
                datos.push(hpPerLevel);
                datos.push(hpRegen);
                datos.push(hpRegenPerLevel);
                datos.push(moveSpeed);
                datos.push(mp);
                datos.push(mpPerLevel);
                datos.push(mpRegen);
                datos.push(mpRegenPerLevel);
                datos.push(spellBlock);
                datos.push(spellBlockPerLevel);
                datos.push(image)
                
                if (id && name) {
                    console.log("entre al if")
                    console.log(name)
                    models.champions.create({
                        id: id,
                        name: name,
                        armor: armor,
                        armorPerLevel: armorPerLevel,
                        attackDamage: attackDamage,
                        attackDamagePerLevel: attackDamagePerLevel,
                        attackRange: attackRange,
                        attackSpeedOffSet: attackSpeedOffSet,
                        attackSpeedPerLevel: attackSpeedPerLevel,
                        crit: crit,
                        critPerLevel: critPerLevel,
                        hp: hp,
                        hpPerLevel: hpPerLevel,
                        hpRegen: hpRegen,
                        hpRegenPerLevel: hpRegenPerLevel,
                        moveSpeed: moveSpeed,
                        mp: mp,
                        mpPerLevel: mpPerLevel,
                        mpRegen: mpRegen,
                        mpRegenPerLevel: mpRegenPerLevel,
                        spellBlock: spellBlock,
                        spellBlockPerLevel: spellBlockPerLevel,
                        image: image

                    }).then(champion => {
                        if (champion) {
                            res.json({
                                datos,
                                status: 1
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
                
                }
            //res.json(datos);
        }).catch(function (error) {
           console.log(error);
        });


});

router.get('/all', (req, res, next)=>{
    models.champions
    .findAll()
    .then(champions=>{
        if (champions){
            res.json({
                status: 1,
            data: champions
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

router.get('/:id1/:id2', (req, res, next)=>{
    const id1 = req.params.id1;
    const id2 = req.params.id2;
    models.champions
    .findAll({
        where: {
            id: {
                [Op.or]: [id1, id2]
            }
        }
    })
    .then(champions=>{
        if (champions){
            res.json({
                status: 1,
            data: champions
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


    module.exports = router;
