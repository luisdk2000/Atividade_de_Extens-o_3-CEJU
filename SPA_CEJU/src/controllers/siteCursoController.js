// src/controllers/sitePublicacaoController.js

const api = require('../config/api');

// Method to display all publications
exports.getAllCursos = async (req, res) => {
  try {
    const response = await api.get('/cursos');
    const cursos = response.data;

    // Converta o campo `imagens_internas` de JSON para array, se necessário
    cursos.forEach(curso => {
      if (curso.imagens_internas) {
        curso.imagens_internas = JSON.parse(curso.imagens_internas);
        console.log(curso.imagens_internas);
      }
    });

    res.render('site/site_cursos', { cursos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar cursos' });
  }
  
};

// Method to display a single publication by ID
exports.getCursoById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await api.get(`/cursos/${id}`);
    const curso = response.data;
    console.log(curso.imagens_internas);

    // Se imagens_internas for uma string JSON, convertê-la em array
    if (curso.imagens_internas) {
      curso.imagens_internas = JSON.parse(curso.imagens_internas);
    }

    console.log(curso.imagens_internas);  // Log para verificar o conteúdo das imagens

    res.render('site_cursos_detalhe', { curso });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar curso' });
  }
};
