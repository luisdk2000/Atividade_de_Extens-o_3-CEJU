const express = require('express');
const router = express.Router();
const faqController = require('../controllers/faqController');

// Rota para criar uma nova FAQ
router.post('/faqs', faqController.createFaq);

// Rota para listar todas as FAQs
router.get('/faqs', faqController.getAllFaqs);

// Rota para buscar uma FAQ por ID
router.get('/faqs/:id', faqController.getFaqById);  // Added this route

// Rota para buscar FAQs por título
router.get('/faqs/search', faqController.searchFaqsByTitle);

// Rota para atualizar uma FAQ por ID
router.put('/faqs/:id', faqController.updateFaq);

// Rota para excluir uma FAQ por ID
router.delete('/faqs/:id', faqController.deleteFaq);

module.exports = router;