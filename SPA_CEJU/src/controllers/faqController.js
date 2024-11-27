const api = require('../config/api');

// Método para buscar todas as FAQs
exports.getAllFaqs = async (req, res) => {
  try {
    // Faz uma solicitação GET para a API que fornece as FAQs
    const response = await api.get(`/faqs`);

    // Obtenha os dados JSON da resposta
    const faqs = response.data;

    // Renderiza a página faq/index.handlebars e passa as FAQs como contexto
    res.render('faq/index', { faqs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar FAQs' });
  }
};

// Método para buscar FAQ para edição
exports.editFaq = async (req, res) => {
  try {
    const { id } = req.params;
    // Faz uma solicitação GET para a API que fornece a FAQ
    const response = await api.get(`/faqs/${id}`);

    // Obtenha os dados JSON da resposta
    const faq = response.data;

    // Renderiza a página faq/edit.handlebars e passa a FAQ como contexto
    res.render('faq/edit', { faq });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar FAQ' });
  }
};

// Método para apresentar formulário de criação da FAQ
exports.createFaq = async (req, res) => {
  try {
    // Renderiza a página faq/create.handlebars
    res.render('faq/create');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao mostrar formulário de criação de FAQs' });
  }
};

// Método para buscar FAQs por título
exports.searchFaqsByTitle = async (req, res) => {
  try {
    // Obter o valor inserido no campo de pesquisa
    const valorPesquisa = req.query.titulo;

    // Fazer uma solicitação GET para buscar FAQs com base no título
    const response = await api.get(`/faqs/search?titulo=${valorPesquisa}`);

    // Obtenha os dados JSON da resposta
    const faqs = response.data;

    // Renderiza a página faq/index.handlebars e passa as FAQs como contexto
    res.render('faq/index', { faqs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar FAQs' });
  }
};
