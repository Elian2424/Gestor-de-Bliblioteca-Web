const Sequelize = require("sequelize");

const sequelize = require("../Util/database");


const Libro = sequelize.define(
    "Libro",
    {
        id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        Nombre:{
            type: Sequelize.STRING,
            allowNull: true,
        },
        año:{
            type: Sequelize.STRING,
            allowNull: true,
        },
        autor:{
            type: Sequelize.STRING,
            allowNull: true,
        },
        editorial:{
            type: Sequelize.STRING,
            allowNull: true,
        },


    }
);

module.exports = Libro;