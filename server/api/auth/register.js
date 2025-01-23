// server/register.js
import bcrypt from 'bcryptjs';
import { connectDB } from '../../database'; // Подключение к базе данных

export default async (req, res) => {
  const { username, email, password } = req.body;

  try {
    console.log('Received registration data:', { username, email });

    // Проверка наличия всех полей
    if (!username || !email || !password) {
      console.log('Missing fields:', { username, email, password });
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const db = await connectDB();
    const userCollection = db.collection('users');

    // Проверяем, существует ли пользователь с таким email
    const existingUser = await userCollection.findOne({ email });
    if (existingUser) {
      console.log('User already exists with email:', email);
      return res.status(400).json({ message: 'Email already in use.' });
    }

    // Хешируем пароль
    const hashedPassword = await bcrypt.hash(password, 10);

    // Сохраняем нового пользователя в базу данных
    const result = await userCollection.insertOne({
      username,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    console.log('User successfully registered:', result);

    // Отправляем успешный ответ
    res.status(200).json({ message: 'Registration successful!' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};
