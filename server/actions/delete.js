import User from '~/server/models/User';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const userId = event.context.user.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      throw createError({ statusCode: 404, statusMessage: 'User not found' });
    }

    await user.deleteItem(body.category, body.itemId);

    return { success: true, message: 'Item deleted successfully' };
  } catch (error) {
    return { success: false, message: error.message };
  }
});
