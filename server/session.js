// server/session.js
import { connectDB } from './database'; // Подключение к базе данных

// Сохранение сессии в базе данных
export const saveSessionToDatabase = async (userId, sessionId) => {
  const db = await connectDB();
  const sessionCollection = db.collection('sessions');

  // Сохраняем сессию с временем жизни (например, 1 час)
  await sessionCollection.insertOne({
    userId,
    sessionId,
    expiresAt: new Date(Date.now() + 3600000), // Срок действия сессии — 1 час
  });
};

// Установка куки для сессии
export const createSessionCookie = (res, sessionId) => {
  res.cookie('session_id', sessionId, {
    httpOnly: true,
    maxAge: 3600000, // 1 час
    secure: false, // На локальном сервере можно без HTTPS
    sameSite: 'strict',
  });
};
