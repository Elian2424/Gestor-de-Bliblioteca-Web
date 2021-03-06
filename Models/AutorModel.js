const Sequelize = require("sequelize");

const sequelize = require("../Util/database");


const Autor = sequelize.define(
    "Autor",
    {
        id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        Nombre:{
            type: Sequelize.STRING,
            allowNull: false,
        },
        Correo:{
            type: Sequelize.STRING,
            allowNull: false,
        },
        ImagePath:{
            type: Sequelize.STRING,
            allowNull: true,
        }

    }
);

module.exports = Autor;