const express = require('express');
const router = express.Router();
const noticiaController = require('../controllers/noticiaController');
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const checkToken = require('../helpers/check-token');

// Configuração do multer para lidar com uploads de arquivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../public/img/noticias'));
  },
  filename: (req, file, cb) => {
    // Gera um nome de arquivo único usando um hash criptográfico
    cb(null, crypto.randomBytes(24).toString('hex') + path.extname(file.originalname));
  },
});

// Configuração do multer com o storage definido
const upload = multer({ storage });

// Rota para criar uma nova publicação com upload de arquivo e verificação de token
router.post('/noticias', checkToken, upload.fields([
  { name: 'imagem_principal', maxCount: 1 },
  { name: 'imagens_internas', maxCount: 10 },
]), noticiaController.createNoticia);

// Rota para listar todas as publicações
router.get('/noticias', noticiaController.getAllNoticias);

// Rota para listar as publicações pelo título
router.get('/noticias/search', noticiaController.searchNoticiasByTitle);

// Rota para listar uma publicação pelo ID
router.get('/noticias/:id', noticiaController.getNoticiaById);

// Rota para atualizar uma publicação com upload de arquivo e verificação de token
router.put('/noticias/:id', checkToken, upload.fields([
  { name: 'imagem_principal', maxCount: 1 },
  { name: 'imagens_internas', maxCount: 10 },
]), noticiaController.updateNoticia);

// Rota para excluir uma publicação por ID e verificação de token
router.delete('/noticias/:id', checkToken, noticiaController.deleteNoticia);

module.exports = router;