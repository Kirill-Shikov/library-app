const express = require('express');
const router = express.Router();

//хранилище книг

let books = [];

//генерация ID
const generateId = () => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

//авторизация пользователя
router.post('/user/login', (req, res) => {
  res.status(201).json({
    id: 1,
    mail: "test@mail.ru"
  });
});

//получение книг
router.get('/books', (req, res) => {
  res.status(200).json(books);
});

//получение книги по ID
router.get('/books/:id', (req, res) => {
  const { id } = req.params;
  const book = books.find(book => book.id === id);

  if (!book) {
    return res.status(404).json({ error: 'Книга не найдена'});
  }

  res.status(200).json(book);
});

//добавление книги
router.post('/books', (req, res) => {
  const { title, description, authors, favorite, fileCover, fileName } = req.body;

  //проверка обязательных полей
  if (!title || !authors) {
    return res.status(400).json({ error: 'Не все обязательные поля заполнены'});
  }


  const newBook = {
    id: generateId(),
    title,
    description: description || '',
    authors,
    favorite: favorite || '',
    fileCover: fileCover || '',
    fileName: fileName || ''
  };

  books.push(newBook);

  res.status(201).json(newBook);
});

// редактирование книги по ID
router.put('/books/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, authors, favorite, fileCover, fileName } = req.body;

  const bookIndex = books.findIndex(book => book.id === id);

  if (bookIndex === -1) {
    return res.status(404).json({ error: 'Книга не найдена'});
  }

  //обноление книги
  const updatedBook = {
    ...books[bookIndex],
    title: title || books[bookIndex].title,
    description: description !== undefined ? description : books[bookIndex].description,
    authors: authors || books[bookIndex].authors,
    favorite: favorite !== undefined ? favorite : books[bookIndex].favorite,
    fileCover: fileCover !== undefined ? fileCover : books[bookIndex].fileCover,
    fileName: fileName !== undefined ? fileName : books[bookIndex].fileName
  };

  books[bookIndex] = updatedBook;

  res.status(200).json(updatedBook);
});

// удаление книги по ID
router.delete('/books/:id', (req, res) => {
  const { id } = req.params;

  const bookIndex = books.findIndex(book => book.id === id);

  if (bookIndex === -1) {
    return res.status(404).json({ error: 'Книга не найдена'});
  }

  books.splice(bookIndex, 1);

  res.status(200).json({ message: 'ok'});
});

module.exports = router;