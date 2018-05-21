'use strict';
const models = require('../models');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('champions', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        armor: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        armorPerLevel: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        attackDamage: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        attackDamagePerLevel: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        attackRange: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        attackSpeedOffSet: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        attackSpeedPerLevel: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        crit: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        critPerLevel: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        hp: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        hpPerLevel: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        hpRegen: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        hpRegenPerLevel: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        moveSpeed: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        mp: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        mpPerLevel: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        mpRegen: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        mpRegenPerLevel: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        spellBlock: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        spellBlockPerLevel: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
};
