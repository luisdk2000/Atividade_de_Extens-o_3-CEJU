const Curso = require('../models/Curso');
const { Op } = require('sequelize');

// Método para criar um curso
exports.createCurso = async (req, res) => {
  try {
    console.log('Dados recebidos no body:', req.body);
    console.log('Arquivos recebidos:', req.files);

    const { titulo, conteudo } = req.body;
    const files = req.files;

    if (!files || !files['imagem_principal']) {
      console.error('Erro: Imagem principal não fornecida.');
      return res.status(400).json({ error: 'Imagem principal é obrigatória.' });
    }

    const imagem_principal = files['imagem_principal'][0].filename;
    let imagens_internas = [];

    if (files['imagens_internas']) {
      imagens_internas = files['imagens_internas'].map((file) => file.filename);
    }

    const curso = await Curso.create({
      titulo,
      conteudo,
      imagem_principal,
      imagens_internas: JSON.stringify(imagens_internas),
    });

    console.log('Curso criado com sucesso:', curso);
    res.status(201).json(curso);
  } catch (error) {
    console.error('Erro ao criar o curso:', error);
    res.status(500).json({ error: 'Erro ao criar o curso' });
  }
};

// Método para listar todos os cursos
exports.getAllcursos = async (req, res) => {
  try {
    const cursos = await Curso.findAll();
    console.log('Cursos encontrados:', cursos);
    res.status(200).json(cursos);
  } catch (error) {
    console.error('Erro ao buscar os cursos:', error);
    res.status(500).json({ error: 'Erro ao buscar os cursos' });
  }
};

// Método para buscar um curso por ID
exports.getCursoById = async (req, res) => {
  const { id } = req.params;
  try {
    console.log(`Buscando curso com ID: ${id}`);
    const curso = await Curso.findByPk(id);
    if (!curso) {
      console.error('Curso não encontrado:', id);
      return res.status(404).json({ error: 'Curso não encontrado' });
    }
    console.log('Curso encontrado:', curso);
    res.status(200).json(curso);
  } catch (error) {
    console.error('Erro ao buscar o curso:', error);
    res.status(500).json({ error: 'Erro ao buscar o curso' });
  }
};

// Método para buscar cursos por título
exports.searchCursosByTitle = async (req, res) => {
  try {
    const { titulo } = req.query;
    console.log('Buscando cursos por título:', titulo);

    if (!titulo) {
      console.error('Erro: Título não fornecido.');
      return res.status(400).json({ error: 'Título é obrigatório para busca.' });
    }

    const cursos = await Curso.findAll({
      where: {
        titulo: {
          [Op.like]: `%${titulo}%`,
        },
      },
    });

    console.log('Cursos encontrados:', cursos);
    res.status(200).json(cursos);
  } catch (error) {
    console.error('Erro ao buscar cursos por título:', error);
    res.status(500).json({ error: 'Erro ao buscar cursos por título' });
  }
};

// Método para atualizar um curso
exports.updateCurso = async (req, res) => {
  const { id } = req.params;

  try {
    console.log(`Atualizando curso com ID: ${id}`);
    console.log('Dados recebidos no body:', req.body);
    console.log('Arquivos recebidos:', req.files);

    const { titulo, conteudo } = req.body;
    const imagem_principal = req.files['imagem_principal'] ? req.files['imagem_principal'][0].filename : null;
    let imagens_internas = [];

    if (req.files['imagens_internas']) {
      imagens_internas = req.files['imagens_internas'].map(file => file.filename);
    }

    const curso = await Curso.findByPk(id);
    if (!curso) {
      console.error('Curso não encontrado:', id);
      return res.status(404).json({ error: 'Curso não encontrado' });
    }

    const updated = await Curso.update({
      titulo,
      conteudo,
      imagem_principal: imagem_principal || curso.imagem_principal,
      imagens_internas: JSON.stringify(imagens_internas.length > 0 ? imagens_internas : curso.imagens_internas),
    }, {
      where: { id },
    });

    if (updated[0] > 0) {
      const updatedCurso = await Curso.findByPk(id);
      console.log('Curso atualizado com sucesso:', updatedCurso);
      res.status(200).json(updatedCurso);
    } else {
      console.error('Erro: Curso não foi atualizado:', id);
      res.status(500).json({ error: 'Erro ao atualizar o curso' });
    }
  } catch (error) {
    console.error('Erro ao atualizar o curso:', error);
    res.status(500).json({ error: 'Erro ao atualizar o curso' });
  }
};

// Método para excluir um curso por ID
exports.deleteCurso = async (req, res) => {
  const { id } = req.params;
  try {
    console.log(`Excluindo curso com ID: ${id}`);
    const deleted = await Curso.destroy({ where: { id } });
    if (deleted) {
      console.log('Curso excluído com sucesso:', id);
      res.status(200).json({ message: 'Curso excluído com sucesso' });
    } else {
      console.error('Curso não encontrado para exclusão:', id);
      res.status(404).json({ error: 'Curso não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao excluir o curso:', error);
    res.status(500).json({ error: 'Erro ao excluir o curso' });
  }
};
