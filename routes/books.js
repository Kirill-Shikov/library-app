const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const upload = require('../middleware/upload');
const User = require('../models/User');

// Авторизация пользователя
router.post('/user/login', (req, res) => {
  const user = User.login();
  res.status(201).json(user.getInfo());
});

// Маршруты для книг
router.get('/books', (req, res) => bookController.getAllBooks(req, res));
router.get('/books/:id', (req, res) => bookController.getBookById(req, res));
router.get('/books/:id/download', (req, res) => bookController.downloadBook(req, res));

// запрос с загрузкой файла
router.post('/books', upload, (req, res) => bookController.createBook(req, res));

// запрос с возможностью обновления файла
router.put('/books/:id', upload, (req, res) => bookController.updateBook(req, res));

router.delete('/books/:id', (req, res) => bookController.deleteBook(req, res));

module.exports = router;