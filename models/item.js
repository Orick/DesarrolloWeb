'use strict';
const models = require('../models');

module.exports = (sequelize, DataTypes) => {
    const item = sequelize.define('item', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        hpMod: {
            type: DataTypes.DOUBLE
        },
        mpMod: {
            type: DataTypes.DOUBLE
        },
        physicalDamageMod: {
            type: DataTypes.DOUBLE
        },
        armorMod: {
            type: DataTypes.DOUBLE
        },
        magicDamageMod: {
            type: DataTypes.DOUBLE
        },
        magicResistanceMod: {
            type: DataTypes.DOUBLE
        },
        attackSpeedMod: {
            type: DataTypes.DOUBLE
        },
        plainDescription: {
            type: DataTypes.STRING,
            allowNull: false
        },
        baseGold: {
            type: DataTypes.INTEGER
        },
        totalGold: {
            type: DataTypes.INTEGER
        },
        sellGold: {
            type: DataTypes.INTEGER
        },
        urlImage: {
            type: DataTypes.STRING
        }
    });

    return item;
};
