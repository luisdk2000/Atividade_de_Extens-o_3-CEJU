// Carregar as variáveis de ambiente do arquivo .env
require('dotenv').config();

const { Sequelize } = require('sequelize');

// Verificar se todas as variáveis de ambiente necessárias estão definidas
const requiredEnvVars = ['DB_NAME', 'DB_USER', 'DB_PASSWORD', 'DB_HOST', 'DB_DIALECT', 'DB_PORT'];

requiredEnvVars.forEach(varName => {
  if (!process.env[varName]) {
    throw new Error(`Variável de ambiente ${varName} não está definida.`);
  }
});

// Criar a conexão com o banco de dados usando as variáveis de ambiente
const sequelize = new Sequelize(
  process.env.DB_NAME,        // Nome do banco de dados
  process.env.DB_USER,        // Usuário do banco de dados
  process.env.DB_PASSWORD,    // Senha do banco de dados
  {
    host: process.env.DB_HOST,     // Host do banco de dados
    dialect: process.env.DB_DIALECT, // Dialeto do banco de dados (mysql, neste caso)
    port: process.env.DB_PORT      // Porta do banco de dados
  }
);

module.exports = sequelize;