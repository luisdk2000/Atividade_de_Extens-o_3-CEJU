const express = require('express');
const router = express.Router();
const cursoController = require('../controllers/cursoController');
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const checkToken = require('../helpers/check-token');

// Configuração do multer para lidar com uploads de arquivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../public/img/cursos'));
  },
  filename: (req, file, cb) => {
    // Gera um nome de arquivo único usando um hash criptográfico
    cb(null, crypto.randomBytes(24).toString('hex') + path.extname(file.originalname));
  },
});

// Configuração do multer com o storage definido
const upload = multer({ storage });

// Rota para criar uma nova publicação com upload de arquivo e verificação de token
router.post('/cursos', checkToken, upload.fields([
  { name: 'imagem_principal', maxCount: 1 },
  { name: 'imagens_internas', maxCount: 10 },
]), cursoController.createCurso);

// Rota para listar todas as publicações
router.get('/cursos', cursoController.getAllcursos);

// Rota para listar as publicações pelo título
router.get('/cursos/search', cursoController.searchCursosByTitle);

// Rota para listar uma publicação pelo ID
router.get('/cursos/:id', cursoController.getCursoById);

// Rota para atualizar uma publicação com upload de arquivo e verificação de token
router.put('/cursos/:id', checkToken, upload.fields([
  { name: 'imagem_principal', maxCount: 1 },
  { name: 'imagens_internas', maxCount: 10 },
]), cursoController.updateCurso);

// Rota para excluir uma publicação por ID e verificação de token
router.delete('/cursos/:id', checkToken, cursoController.deleteCurso);

module.exports = router;
