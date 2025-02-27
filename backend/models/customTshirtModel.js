const { DataTypes } = require('sequelize');
const Sequelize = require('../config/db');

const Customize = Sequelize.define('customize', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    size: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        
    },
    style: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    designPreference: {
        type: DataTypes.STRING,
        allowNull:false
    },
    
});

module.exports = Customize;
