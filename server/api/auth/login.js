import User from '~/server/models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  console.log('вызван логин');
  const user = await User.findOne({ email: body.email });

  if (!user) {
    return { success: false, message: 'User not found' };
  }

  // Сравниваем пароль
  const isPasswordValid = await bcrypt.compare(body.password, user.password);

  if (!isPasswordValid) {
    return { success: false, message: 'Invalid password' };
  }

  // Создаём токен для пользователя
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  return { success: true, token };
});
