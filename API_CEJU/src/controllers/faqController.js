const Faq = require('../models/Faq');
const { Op } = require('sequelize');

// Método para criar uma nova FAQ
exports.createFaq = async (req, res) => {
  try {
    const { titulo, resposta, ordem } = req.body;

    const faq = await Faq.create({ titulo, resposta, ordem });
    res.status(201).json(faq);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar a FAQ' });
  }
};

// Método para listar todas as FAQs
exports.getAllFaqs = async (req, res) => {
  try {
    const faqs = await Faq.findAll();
    res.status(200).json(faqs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar as FAQs' });
  }
};

// Método para buscar uma FAQ por ID
exports.getFaqById = async (req, res) => {
  const { id } = req.params;
  try {
    const faq = await Faq.findByPk(id);
    if (!faq) {
      res.status(404).json({ error: 'FAQ não encontrada' });
      return;
    }
    res.status(200).json(faq);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar a FAQ' });
  }
};

// Método para buscar FAQs por título
exports.searchFaqsByTitle = async (req, res) => {
  try {
    const { titulo } = req.query;

    const faqs = await Faq.findAll({
      where: {
        titulo: {
          [Op.like]: `%${titulo}%`,
        },
      },
    });

    res.status(200).json(faqs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar FAQs por título' });
  }
};

// Método para atualizar uma FAQ por ID
exports.updateFaq = async (req, res) => {
  const { id } = req.params;
  try {
    const { titulo, resposta, ordem } = req.body;

    const [updated] = await Faq.update({ titulo, resposta, ordem }, {
      where: { id },
    });
    if (updated) {
      const updatedFaq = await Faq.findByPk(id);
      res.status(200).json(updatedFaq);
    } else {
      res.status(404).json({ error: 'FAQ não encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar a FAQ' });
  }
};

// Método para excluir uma FAQ por ID
exports.deleteFaq = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Faq.destroy({
      where: { id },
    });
    if (deleted) {
      res.status(200).json({ message: 'FAQ excluída com sucesso' });
    } else {
      res.status(404).json({ error: 'FAQ não encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir a FAQ' });
  }
};