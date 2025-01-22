import User from '~/server/models/User';

export default defineEventHandler(async (event) => {
  const userId = event.context.user.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      throw createError({ statusCode: 404, statusMessage: 'User not found' });
    }

    return { success: true, actions: user.actions };
  } catch (error) {
    return { success: false, message: error.message };
  }
});
