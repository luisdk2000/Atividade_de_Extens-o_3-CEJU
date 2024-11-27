// routes/siteRoutes.js

const express = require('express');
const router = express.Router();
const siteController = require('../controllers/siteController');
const siteCursoController = require('../controllers/siteCursoController');

router.get('/lista-cursos', siteController.getCursosPage);
router.get('/lista-noticias', siteController.getNoticiasPage);
//router.get('/lista-produtos', siteController.getProdutosPage);
router.get('/lista-sobre_nos', siteController.getSobreNosPage);
router.get('/lista-faqs', siteController.getFaqsPage);
//router.get('/lista-trabalhos', siteController.getTrabalhosPage);
//router.get('/lista-publicacoes', siteController.getPublicacoesPage);
//router.get('/lista-produtos', siteController.getProdutosPage);
router.get('/', siteController.getAllDatas);

// Route to display all publications


// Route to display a single publication by ID
router.get('/curso/:id', siteCursoController.getCursoById);

module.exports = router;