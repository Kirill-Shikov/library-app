const Book = require('../models/Book');
const path = require('path');

class BookController {
  // получить все книги
  getAllBooks(req, res) {
    const books = global.books || [];
    const booksJson = books.map(book => book.toJSON());
    res.status(200).json(booksJson);
  }

  //  получить книгу по ID
  getBookById(req, res) {
    const { id } = req.params;
    const book = global.books?.find(book => book.id === id);

    if (!book) {
      return res.status(404).json({ error: 'Книга не найдена' });
    }

    res.status(200).json(book.toJSON());
  }

  // создать книгу (с загрузкой файла)
  createBook(req, res) {
    try {
      const { title, description, authors, favorite, fileCover, fileName } = req.body;
      
      // Проверка обязательных полей
      if (!title || !authors) {
        return res.status(400).json({ error: 'Не все обязательные поля заполнены' });
      }

      // Получаем информацию о загруженном файле
      const fileBook = req.file ? req.file.path : '';

      // Создаем экземпляр класса Book
      const newBook = new Book(
        Book.generateId(),
        title,
        description,
        authors,
        favorite === 'true' || favorite === true,
        fileCover,
        fileName || (req.file ? req.file.originalname : ''),
        fileBook
      );

      if (!global.books) global.books = [];
      global.books.push(newBook);
      
      res.status(201).json(newBook.toJSON());
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // редактировать книгу
  updateBook(req, res) {
    const { id } = req.params;
    const updateData = req.body;

    const bookIndex = global.books?.findIndex(book => book.id === id);

    if (bookIndex === -1) {
      return res.status(404).json({ error: 'Книга не найдена' });
    }

    // Если загружен новый файл, обновляем и его
    if (req.file) {
      updateData.fileBook = req.file.path;
      updateData.fileName = req.file.originalname;
    }

    // Обновляем книгу
    const updatedBook = global.books[bookIndex].update(updateData);
    global.books[bookIndex] = updatedBook;

    res.status(200).json(updatedBook.toJSON());
  }

  // удалить книгу
  deleteBook(req, res) {
    const { id } = req.params;
    const fs = require('fs');
    
    const bookIndex = global.books?.findIndex(book => book.id === id);

    if (bookIndex === -1) {
      return res.status(404).json({ error: 'Книга не найдена' });
    }

    // Удаляем файл книги, если он существует
    const book = global.books[bookIndex];
    if (book.fileBook && fs.existsSync(book.fileBook)) {
      fs.unlinkSync(book.fileBook);
    }

    global.books.splice(bookIndex, 1);
    res.status(200).json('ok');
  }

  // скачать файл книги
  downloadBook(req, res) {
    const { id } = req.params;
    const book = global.books?.find(book => book.id === id);

    if (!book) {
      return res.status(404).json({ error: 'Книга не найдена' });
    }

    if (!book.fileBook || !book.fileBook.trim()) {
      return res.status(404).json({ error: 'Файл книги не найден' });
    }

    // Проверяем существование файла
    const fs = require('fs');
    if (!fs.existsSync(book.fileBook)) {
      return res.status(404).json({ error: 'Файл книги отсутствует на сервере' });
    }

    // Отправляем файл на скачивание
    res.download(book.fileBook, book.fileName || 'book.pdf', (err) => {
      if (err) {
        console.error('Ошибка при скачивании файла:', err);
        res.status(500).json({ error: 'Ошибка при скачивании файла' });
      }
    });
  }
}

module.exports = new BookController();