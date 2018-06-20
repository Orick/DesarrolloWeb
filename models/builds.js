'use strict';
const models = require('../models');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('builds', {
        iduser: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        idchamp1: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        idchamp2: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        iditem11: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        iditem12: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        iditem13: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        iditem14: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        iditem15: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        iditem16: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        iditem21: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        iditem22: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        iditem23: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        iditem24: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        iditem25: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        iditem26: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        image1: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image2: {
            type: DataTypes.STRING,
            allowNull: false,
        }
});
};