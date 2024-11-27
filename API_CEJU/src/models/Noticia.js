const { DataTypes } = require('sequelize');
const sequelize = require('../conn/connection');

const Noticia = sequelize.define('Noticia', {
  titulo: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  conteudo: {
    type: DataTypes.TEXT, // Campo para armazenar o conteúdo da publicação
    allowNull: false,
  },
  imagem_principal: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  imagens_internas: {
    type: DataTypes.TEXT, // Armazenar as imagens internas como uma string JSON
    allowNull: true,
    get() {
      const rawValue = this.getDataValue('imagens_internas');
      return rawValue ? JSON.parse(rawValue) : []; // Retornar um array ao invés de uma string
    },
    set(value) {
      this.setDataValue('imagens_internas', JSON.stringify(value)); // Armazenar o array como string JSON
    }
  },
});

module.exports = Noticia;