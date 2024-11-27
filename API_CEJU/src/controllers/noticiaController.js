const Noticia = require('../models/Noticia');
const { Op } = require('sequelize');

// Método para criar uma nova publicação
exports.createNoticia = async (req, res) => {
  try {
    const { titulo, conteudo } = req.body;
    const files = req.files;

    // Adicione os logs para verificar se os arquivos foram carregados corretamente
    console.log('Imagem Principal:', files['imagem_principal']);
    console.log('Imagens Internas:', files['imagens_internas']);


    if (!files || !files['imagem_principal']) {
      return res.status(400).json({ error: 'Imagem principal é obrigatória.' });
    }

    const imagem_principal = files['imagem_principal'][0].filename;
    let imagens_internas = '';

    if (files['imagens_internas']) {
      imagens_internas = files['imagens_internas'].map((file) => file.filename);
    }

    const noticia = await Noticia.create({
      titulo,
      conteudo,
      imagem_principal,
      imagens_internas: JSON.stringify(imagens_internas) // Armazenando como JSON
    });

    res.status(201).json(noticia);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar a noticia' });
  }
};

// Método para listar todas as publicações
exports.getAllNoticias = async (req, res) => {
  try {
    const noticias = await Noticia.findAll();
    res.status(200).json(noticias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar as noticias' });
  }
};

// Método para buscar uma publicação por ID
exports.getNoticiaById = async (req, res) => {
  const { id } = req.params;
  try {
    const noticia = await Noticia.findByPk(id);
    if (!noticia) {
      res.status(404).json({ error: 'Noticia não encontrada' });
      return;
    }
    res.status(200).json(noticia);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar a noticia' });
  }
};

// Método para buscar publicações por título
exports.searchNoticiasByTitle = async (req, res) => {
  try {
    const { titulo } = req.query;

    const noticias = await Noticia.findAll({
      where: {
        titulo: {
          [Op.like]: `%${titulo}%`,
        },
      },
    });

    res.status(200).json(noticias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar noticias por título' });
  }
};

// Método para atualizar uma publicação
// Método para atualizar uma publicação
exports.updateNoticia = async (req, res) => {
  const { id } = req.params;
  try {
    const { titulo, conteudo } = req.body;
    let imagem_principal = req.files['imagem_principal'] ? req.files['imagem_principal'][0].filename : null;
    let imagens_internas = [];

    // Verificar se os arquivos foram carregados corretamente
    console.log('Imagem Principal (atualização):', req.files['imagem_principal']);
    console.log('Imagens Internas (atualização):', req.files['imagens_internas']);

    if (req.files['imagens_internas']) {
      imagens_internas = req.files['imagens_internas'].map(file => file.filename);
    }

    const noticia = await Noticia.findByPk(id);
    if (!noticia) {
      return res.status(404).json({ error: 'Noticia não encontrada' });
    }

    if (!imagem_principal) {
      imagem_principal = noticia.imagem_principal;
    }

    const [updated] = await Noticia.update({
      titulo,
      conteudo,
      imagem_principal,
      imagens_internas: JSON.stringify(imagens_internas.length > 0 ? imagens_internas : JSON.parse(noticia.imagens_internas))
    }, {
      where: { id }
    });

    if (updated) {
      const updatedNoticia = await Noticia.findByPk(id);
      res.status(200).json(updatedNoticia);
    } else {
      res.status(404).json({ error: 'noticia não encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar a noticia' });
  }
};


// Método para excluir uma publicação por ID
exports.deleteNoticia = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Noticia.destroy({
      where: { id },
    });
    if (deleted) {
      res.status(200).json({ message: ' Noticia excluída com sucesso' });
    } else {
      res.status(404).json({ error: 'Noticia não encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir a noticia' });
  }
};