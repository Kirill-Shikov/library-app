const express = require('express');
const bookRouter = require('./routes/books');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Создаем папку для загрузок, если её нет
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Глобальное хранилище книг
global.books = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Статическая папка для файлов 
app.use('/uploads', express.static('uploads'));

// Подключение роутера для книг
app.use('/api', bookRouter);

// Обработка ошибок
app.use((req, res) => {
  res.status(404).json({ error: 'Маршрут не найден' });
});

app.use((err, req, res, next) => {
  res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});