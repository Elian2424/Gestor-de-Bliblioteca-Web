const Sequelize = require("sequelize");

const sequelize = require("../Util/database");


const Usuario = sequelize.define(
    "Usuario",
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
        Apellido:{
            type: Sequelize.STRING,
            allowNull: false,
        },
        Correo:{
            type: Sequelize.STRING,
            allowNull: false,
        },
        Usuario:{
            type: Sequelize.STRING,
            allowNull: false,
        },
        Contraseña:{
            type: Sequelize.STRING,
            allowNull: false,
        },

    }
);

module.exports = Usuario;