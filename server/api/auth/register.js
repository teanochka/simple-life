import User from '~/server/models/User';
import bcrypt from 'bcrypt';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // Хэшируем пароль перед сохранением
  const hashedPassword = await bcrypt.hash(body.password, 10);

  try {
    const user = new User({
      username: body.username,
      email: body.email,
      password: hashedPassword,
    });

    await user.save();

    return { success: true, message: 'User registered successfully' };
  } catch (error) {
    return { success: false, message: error.message };
  }
});
