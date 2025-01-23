// server/server.js
import express from 'express';
import cookieParser from 'cookie-parser'; // Для работы с куки
import bodyParser from 'body-parser'; // Для обработки тела запросов
import login from './login'; // Маршрут для логина
import register from './register'; // Маршрут для регистрации
import { connectDB } from './database'; // Подключение к базе данных

const app = express();
const PORT = 3000; // Порт для локального сервера

// Подключение к базе данных
connectDB()
  .then(() => console.log('Database initialized'))
  .catch((err) => {
    console.error('Failed to initialize database:', err);
    process.exit(1); // Завершаем процесс при ошибке подключения
  });

// Middleware для обработки тела запросов и куки
app.use(bodyParser.json());
app.use(cookieParser());

// Роуты
app.post('/api/auth/login', login);  // Убедитесь, что login экспортируется правильно
app.post('/api/auth/register', register); // Убедитесь, что register экспортируется правильно

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
