const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Post = require("../models/Post");

// Middleware de tratamento de erros
const handleErrors = (res, error) => {
  console.error(error);
  res.status(500).json({ error: "Ocorreu um erro interno." });
};

// Pegar todos os dados salvos no banco com paginação
router.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = 10; 

  try {
    const totalCount = await Post.countDocuments();
    const posts = await Post.find().skip((page - 1) * perPage).limit(perPage).exec();
    res.json({ data: posts, total: totalCount });
  } catch (error) {
    handleErrors(res, error);
  }
});

// Criar um dado
router.post("/", [
  check("title").notEmpty().withMessage("O título não pode estar vazio"),
  check("text").isLength({ max: 1000 }).withMessage("O texto deve ter no máximo 1000 caracteres"),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const post = new Post({
    title: req.body.title,
    text: req.body.text,
  });

  try {
    const newData = await post.save();
    res.json(newData);
  } catch (error) {
    handleErrors(res, error);
  }
});

// Pegar um dado específico
router.get("/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ error: "Dado não encontrado" });
    }
    res.json(post);
  } catch (error) {
    handleErrors(res, error);
  }
});

// Atualizar um dado
router.patch("/:postId", async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.postId, {
      title: req.body.title,
      text: req.body.text,
    }, { new: true });

    if (!post) {
      return res.status(404).json({ error: "Dado não encontrado" });
    }
    res.json(post);
  } catch (error) {
    handleErrors(res, error);
  }
});

// Deleta um dado
router.delete("/:postId", async (req, res) => {
  try {
    const result = await Post.findByIdAndRemove(req.params.postId);
    if (!result) {
      return res.status(404).json({ error: "Dado não encontrado" });
    }
    res.json({ message: "Dado removido com sucesso" });
  } catch (error) {
    handleErrors(res, error);
  }
});

module.exports = router;
