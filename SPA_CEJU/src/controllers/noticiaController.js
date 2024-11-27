const api = require('../config/api');

// Método para buscar todas as notícias
exports.getAllNoticias = async (req, res) => {
  try {
    // Faz uma solicitação GET para a API que fornece as notícias
    const response = await api.get(`/noticias`);

    // Obtenha os dados JSON da resposta
    const noticias = response.data;

    // Renderiza a página noticia/index.handlebars e passa as notícias como contexto
    res.render('noticia/index', { noticias });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar notícias' });
  }
};

// Método para buscar notícia para edição
exports.editNoticia = async (req, res) => {
  try {
    const { id } = req.params;
    // Faz uma solicitação GET para a API que fornece a notícia
    const response = await api.get(`/noticias/${id}`);

    // Obtenha os dados JSON da resposta
    const noticia = response.data;

    // Renderiza a página noticia/edit.handlebars e passa a notícia como contexto
    res.render('noticia/edit', { noticia });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar grerggrnotícia' });
  }
};

// Método para apresentar formulário de criação de notícia
// Método para apresentar formulário de criação de notícia
exports.createNoticia = async (req, res) => {
  try {
    // Log de depuração para verificar que a requisição foi recebida corretamente
    console.log('Solicitação para renderizar formulário de criação de notícia recebida');

    // Renderiza a página noticia/create.handlebars
    res.render('noticia/create');
  } catch (error) {
    // Log do erro completo para depuração
    console.error('Erro ao renderizar o formulário de criação de notícia:', error);

    // Verifica se a resposta já foi enviada antes de tentar enviá-la novamente
    if (!res.headersSent) {
      // Responde com erro 500 (Erro interno do servidor)
      return res.status(500).json({ error: 'Erro ao mostrar formulário de criação de notícias. Tente novamente mais tarde.' });
    }
  }
};

// Método para buscar notícias por título
exports.searchNoticiasByTitle = async (req, res) => {
  try {
    // Obter o valor inserido no campo de pesquisa
    const { valorPesquisa } = req.body;

    // Fazer uma solicitação GET para buscar notícias com base no título
    const response = await api.get(`/noticias/search?titulo=${valorPesquisa}`);

    // Obtenha os dados JSON da resposta
    const noticias = response.data;

    // Renderiza a página noticia/index.handlebars e passa as notícias como contexto
    res.render('noticia/index', { noticias });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar notícias' });
  }
};