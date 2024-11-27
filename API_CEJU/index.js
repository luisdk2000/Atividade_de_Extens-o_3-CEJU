//npm install express sequelize mysql2 multer nodemailer bcryptjs jsonwebtoken dotenv
//npm install cors
//npm install express

require('dotenv').config();


const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const sequelize = require('./src/conn/connection'); // Importe sua configuração do Sequelize
const bannerRoutes = require('./src/routes/bannerRoutes');
const faqRoutes = require('./src/routes/faqRoutes');
const cursoRoutes = require('./src/routes/cursoRoutes');
const noticiaRoutes = require('./src/routes/noticiaRoutes');
//const produtoRoutes = require('./src/routes/produtoRoutes');
//const publicacaoRoutes = require('./src/routes/publicacaoRoutes');
//const trabalhoRoutes = require('./src/routes/trabalhoRoutes');
//const perguntasRoutes = require('./src/routes/PerguntasRoutes');
//const depoimentoRoutes = require('./src/routes/depoimentoRoutes');
const usuarioRoutes = require('./src/routes/usuarioRoutes');
const cors = require('cors');


// Middleware para o corpo da solicitação JSON
app.use(bodyParser.json());

// Configurar o middleware bodyParser.urlencoded() para "form url encoded"
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração do middleware express.static para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Configurar o middleware CORS
app.use(cors());

// Rota raiz
app.get('/', (req, res) => {
  res.send('Bem-vindo à API de banners!');
});

// Use as rotas da API
app.use('/api', bannerRoutes);
//app.use('/api', produtoRoutes);
//app.use('/api', publicacaoRoutes);
//app.use('/api', depoimentoRoutes);
//app.use('/api', trabalhoRoutes);
//app.use('/api', perguntasRoutes);
app.use('/api', faqRoutes);
app.use('/api', cursoRoutes);
app.use('/api', noticiaRoutes);
app.use('/api',  usuarioRoutes);

// Porta de escuta
const PORT = process.env.PORT || 3000;

// Sincronizar o Sequelize com o banco de dados
sequelize.sync({ force: false }) // Altere para true se quiser que as tabelas sejam recriadas
  .then(async () => {
    console.log('Conectado ao banco de dados MySQL.');

    // Comandos para criar usuário admin caso ele não exista (recomendado comentar as linhas após a criação)
    try {
      // Importa a controller
      const usuarioController = require('./src/controllers/usuarioController');

      // Chama a função para criar o usuario admin (email: admin@admin.com, senha: admin@)
      await usuarioController.createUsuarioAdmin();
      console.log('Usuário admin criado ou já existente.');

    } catch (error) {
      console.error('Erro ao criar usuário admin:', error);
    }

    // Iniciar o servidor
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Erro ao conectar ao banco de dados:', err);
  });