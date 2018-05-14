const express = require('express');
const router = express.Router();
const axios = require('axios');
const apiKey = "RGAPI-df45ad16-cfab-4b8b-a26f-2ecc59c968a8";
const models = require('../models');

router.get('/', (req, res) => {
    res.json({
        title: 'Best Items Las'
    })
});

router.get('/insertitems', (req, res) => {
    let url = 'https://la2.api.riotgames.com/lol/static-data/v3/items?locale=es_MX&itemListData=all&tags=all&api_key=' + apiKey;

    axios.get(url)
        .then(function (response) {
            //res.json(response.data.data);

            let items = response.data.data;
            let keys = Object.keys(items);

            for(let i=0;i<keys.length;i++){
                let key = keys[i];
                let id = items[key].id;
                let name = items[key].name;
                let hpmod = items[key].stats.FlatHPPoolMod;
                let mpmod = items[key].stats.FlatMPPoolMod;
                let phyattack = items[key].stats.FlatPhysicalDamageMod;
                let armor = items[key].stats.FlatArmorMod;
                let magicattack = items[key].stats.FlatMagicDamageMod;
                let magicre = items[key].stats.FlatSpellBlockMod;
                let attackspeed = items[key].stats.PercentAttackSpeedMod;
                let descrip = items[key].description;
                let bgold = items[key].gold.base;
                let tgold = items[key].gold.total;
                let sgold = items[key].gold.sell;
                //let from = items[key].from;
                //let into = items[key].into;

                if (id && name && descrip) {
                    models.item.create({
                        id: id,
                        name: name,
                        hpMod: hpmod,
                        mpMod: mpmod,
                        physicalDamageMod: phyattack,
                        armorMod: armor,
                        magicDamageMod: magicattack,
                        magicResistanceMod: magicre,
                        attackSpeedMod: attackspeed,
                        plainDescription: descrip,
                        baseGold: bgold,
                        totalGold: tgold,
                        sellGold: sgold
                    })
                        .then(item => {
                            if (item) {
                                res.json({
                                    status: 1,
                                    statusCode: 'item/created',
                                    data: item.toJSON()
                                });
                            } else {
                                res.status(400).json({
                                    status: 0,
                                    statusCode: 'item/error',
                                    description: "Couldn't create the item"
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
                    console.log('The body of item is wrong! :(');
                }
            }

            res.status(400).json({
                status: 1,
                statusCode: 'Update success',
                description: "update calls in items were right"
            });

        })
        .catch(function (error) {
            console.log(error);
        });
});

router.get('/assign', (req, res) => {
    let url = 'https://la2.api.riotgames.com/lol/static-data/v3/items?locale=es_MX&itemListData=all&tags=all&api_key=' + apiKey;

    axios.get(url)
        .then(function (response) {
            //res.json(response.data.data);

            let items = response.data.data;
            let keys = Object.keys(items);

            for(let i=0;i<keys.length;i++){
                let key = keys[i];
                let id = items[key].id;
                let from = items[key].from;
                //let into = items[key].into;

                if (id && from) {
                    for(let j=0;j<from.length;j++){
                        let fitem = from[j];
                        models.fromItem.create({
                            idItem: id,
                            fromItemId: fitem
                        })
                            .then(fromItem => {
                                if (fromItem) {
                                    res.json({
                                        status: 1,
                                        statusCode: 'fromItem/created',
                                        data: item.toJSON()
                                    });
                                } else {
                                    res.status(400).json({
                                        status: 0,
                                        statusCode: 'fromItem/error',
                                        description: "Couldn't create the fromItem"
                                    });
                                }
                            })
                            .catch(error => {
                                console.log('statusCode: database/error');
                                console.log(error.toString());
                            });
                    }
                } else {
                    continue;
                }
            }

            res.status(400).json({
                status: 1,
                statusCode: 'Update success',
                description: "update calls in fromItems were right"
            });
        })
        .catch(function (error) {
            console.log(error);
        });
});

router.get('/:id', (req, res) => {
    let url = 'https://la2.api.riotgames.com/lol/static-data/v3/items/' + req.params.id + '?locale=es_MX&tags=all&itemData=all&api_key=' + apiKey;

    axios.get(url)
        .then(function (response) {
            console.log(response.data.id);
            console.log(response.data.name);
            console.log(response.data.stats.FlatHPPoolMod);
            console.log(response.data.stats.FlatMPPoolMod);
            console.log(response.data.stats.FlatPhysicalDamageMod);
            console.log(response.data.stats.FlatArmorMod);
            console.log(response.data.stats.FlatMagicDamageMod);
            console.log(response.data.stats.FlatSpellBlockMod);
            console.log(response.data.stats.PercentAttackSpeedMod);
            console.log(response.data.description);
            console.log(response.data.gold.base);
            console.log(response.data.gold.total);
            console.log(response.data.gold.sell);
            console.log(response.data.from);
            console.log(response.data.into);
        })
        .catch(function (error) {
            console.log(error);
        });
});

router.get('/recover/all', (req, res, next)=>{
    models.item
        .findAll()
        .then(item=>{
            if (item){
                res.json({
                    status: 1,
                    data: item
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

router.get('/recover/allrelations', (req, res, next)=>{
    models.fromItem
        .findAll()
        .then(fromItem=>{
            if (fromItem){
                res.json({
                    status: 1,
                    data: fromItem
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

module.exports = router;
