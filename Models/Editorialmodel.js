const Sequelize = require("sequelize");

const sequelize = require("../Util/database");



const Editorial = sequelize.define(
    "Editorial",
    {
        id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        nombre:{
            type: Sequelize.STRING,
            allowNull: true,
        },
        telefono:{
            type: Sequelize.STRING,
            allowNull: true,
        },
        pais:{
            type: Sequelize.STRING,
            allowNull: true,
        }

    }
);

module.exports = Editorial;