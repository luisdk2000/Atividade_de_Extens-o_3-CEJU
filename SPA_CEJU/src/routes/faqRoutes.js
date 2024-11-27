const express = require('express');
const router = express.Router();
const faqController = require('../controllers/faqController');

// Importa o método para verificar a sessão do usuário
const checkSession = require("../helpers/sessao").checkSession;

// Rota para listar todas as FAQs
router.get('/faqs/', checkSession, faqController.getAllFaqs);

// Rota para mostrar o formulário de criação de FAQ
router.get('/faqsCreate/', checkSession, faqController.createFaq);

// Rota para buscar FAQs por título
router.get('/faqsSearch/', checkSession, faqController.searchFaqsByTitle);

// Rota para editar uma FAQ por ID
router.get('/faqs/:id', checkSession, faqController.editFaq);

module.exports = router;