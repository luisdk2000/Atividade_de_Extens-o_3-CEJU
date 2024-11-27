// models/Noticia.js

const { DataTypes } = require('sequelize');
const sequelize = require('../conn/connection');

const Faq = sequelize.define('Faq', {
     titulo: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      resposta: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      ordem: {
        type: DataTypes.INTEGER(2),
        allowNull: true,
      },
    }, {
     // tableName: 'faqs',
      timestamps: true, // Se você quiser timestamps automáticos (createdAt, updatedAt)
    });

module.exports = Faq;