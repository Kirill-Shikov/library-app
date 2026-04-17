const express = require('express');
const bookRouter = require('./books');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Подключение роутера для книг
app.use('/api', bookRouter);

// Обработка ошибки
app.use((req, res) => {
  res.status(404).json({ error: 'Маршрут не найден' });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});