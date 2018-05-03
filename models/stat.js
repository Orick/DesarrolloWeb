'use strict';
const models = require('../models');

module.exports = (sequelize, DataTypes) => {
    const stat = sequelize.define('stat', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false
        },
        winRate: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        kills: {
            type: DataTypes.DOUBLE
        },
        deaths: {
            type: DataTypes.DOUBLE
        },
        assists: {
            type: DataTypes.DOUBLE
        },
        gamesPlayed: {
            type: DataTypes.INTEGER
        },
        percentRolePlayed: {
            type: DataTypes.DOUBLE
        },
        banRate: {
            type: DataTypes.DOUBLE
        },
        goldEarned: {
            type: DataTypes.DOUBLE
        },
        firstItemCount: {
            type: DataTypes.INTEGER
        },
        firstItemWins: {
            type: DataTypes.INTEGER
        },
        firstItemWinRate: {
            type: DataTypes.DOUBLE
        },
        firstItemHash: {
            type: DataTypes.STRING
        },
        finalItemCount: {
            type: DataTypes.INTEGER
        },
        finalItemWins: {
            type: DataTypes.INTEGER
        },
        finalItemWinRate: {
            type: DataTypes.DOUBLE
        },
        finalItemHash: {
            type: DataTypes.STRING
        },
        skillCount: {
            type: DataTypes.INTEGER
        },
        skillWins: {
            type: DataTypes.INTEGER
        },
        skillWinRate: {
            type: DataTypes.DOUBLE
        },
        skillHash: {
            type: DataTypes.STRING
        },
        summonerCount: {
            type: DataTypes.INTEGER
        },
        summonerWins: {
            type: DataTypes.INTEGER
        },
        summonerWinRate: {
            type: DataTypes.DOUBLE
        },
        summonerHash: {
            type: DataTypes.STRING
        },
        runeCount: {
            type: DataTypes.INTEGER
        },
        runeWins: {
            type: DataTypes.INTEGER
        },
        runeWinRate: {
            type: DataTypes.DOUBLE
        },
        runeHash: {
            type: DataTypes.STRING
        }
    });

    return stat;
};
