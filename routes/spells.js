const express = require('express');
const axios = require('axios');
const app = express();
const bodyParser = require('body-parser');
const models = require('../models');
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));

var apiKey = 'RGAPI-cd3ec24d-9d89-4e36-9a98-7090bfe808e9';

router.get('/', async (req, res, next) =>{

    let url = 'https://la2.api.riotgames.com/lol/static-data/v3/champions?locale=es_MX&champListData=all&tags=all&dataById=false&api_key='+apiKey;
    console.log(url);


    axios.get(url)
        .then(function (response) {
            let lista = response.data.keys
            let a = response.data;
            var datos = []
            //p = 3 ; //0 1 2 y 3 habilidades. -1 pasiva
            for(var i in lista){
                for(var p = 0; p<5; p++){
                var idchamp = a.data[lista[i]].id;
                if (p<4){
                var name = a.data[lista[i]].spells[p].name; //para las activas
                var description = a.data[lista[i]].spells[p].description;
                var habilidadn = p + 1
                } else {
                var name = a.data[lista[i]].passive.name; //para las pasivas
                var description = a.data[lista[i]].passive.description;
                var habilidadn = -1
                }
                console.log (idchamp);
                console.log (name);
                console.log (description);
                datos.push(idchamp)
                datos.push(name)
                datos.push(description)
                datos.push(habilidadn)
                if (idchamp && name) {
                    console.log("entre al if")
                    models.spells.create({
                        idchamp: idchamp,
                        name: name,
                        description: description,
                        habilidadn: habilidadn
                    }).then(spell => {
                        if (spell) {
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
            }
            //res.json(datos);
        }).catch(function (error) {
           console.log(error);
        });


});

router.get('/all', (req, res, next)=>{
    models.spells
    .findAll()
    .then(spells=>{
        if (spells){
            res.json({
                status: 1,
            data: spells
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
