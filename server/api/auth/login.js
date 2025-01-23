// server/login.js
import { connectDB } from '../../database'; // Подключение к MongoDB
import bcrypt from 'bcryptjs'; // Используем bcrypt для сравнения паролей
import { createSessionCookie } from '../../session'; // Функция для работы с куки

// Функция для поиска пользователя по email
const findUserByEmail = async (email) => {
  try {
    const db = await connectDB();
    const userCollection = db.collection('users');
    return await userCollection.findOne({ email });
  } catch (error) {
    console.error('Error finding user by email:', error);
    throw new Error('Database query failed.');
  }
};

// Сохранение сессии в базе данных
const saveSessionToDatabase = async (userId, sessionId) => {
  try {
    const db = await connectDB();
    const sessionCollection = db.collection('sessions');
    await sessionCollection.insertOne({
      userId,
      sessionId,
      expiresAt: new Date(Date.now() + 3600000), // 1 час
    });
  } catch (error) {
    console.error('Error saving session to database:', error);
    throw new Error('Failed to save session.');
  }
};

// Основная функция для обработки логина
const loginHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Проверяем, переданы ли email и пароль
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    // Найти пользователя по email
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Проверить пароль
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Генерируем уникальный sessionId
    const sessionId = `session-${new Date().getTime()}`;

    // Сохранить сессию в базе данных
    await saveSessionToDatabase(user._id, sessionId);

    // Установить куку с sessionId
    createSessionCookie(res, sessionId);

    // Успешный ответ
    return res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

export default loginHandler;
