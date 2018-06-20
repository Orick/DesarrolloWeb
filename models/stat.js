'use strict';
const models = require('../models');

module.exports = (sequelize, DataTypes) => {
    const stat = sequelize.define('stat', {
        champId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false
        },
        winRate: {
            type: DataTypes.STRING,
            allowNull: false
        },
        kills: {
            type: DataTypes.STRING
        },
        deaths: {
            type: DataTypes.STRING
        },
        assists: {
            type: DataTypes.STRING
        },
        gamesPlayed: {
            type: DataTypes.INTEGER
        },
        percentRolePlayed: {
            type: DataTypes.STRING
        },
        banRate: {
            type: DataTypes.STRING
        },
        goldEarned: {
            type: DataTypes.STRING
        },
        firstItemCount: {
            type: DataTypes.INTEGER
        },
        firstItemWins: {
            type: DataTypes.INTEGER
        },
        firstItemWinRate: {
            type: DataTypes.STRING
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
            type: DataTypes.STRING
        },
        finalItemHash: {
            type: DataTypes.STRING
        },
        summonerCount: {
            type: DataTypes.INTEGER
        },
        summonerWins: {
            type: DataTypes.INTEGER
        },
        summonerWinRate: {
            type: DataTypes.STRING
        },
        summonerHash: {
            type: DataTypes.STRING
        }
    });

    return stat;
};
