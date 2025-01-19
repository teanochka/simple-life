import User from '../../../models/User';

export default defineEventHandler(async (event) => {
  const { userId } = event.context.params;
  const { itemId, category } = event.context.query;

  const user = await User.findById(userId);
  if (!user) {
    throw createError({ statusCode: 404, message: 'User not found' });
  }

  await user.deleteItem(category, itemId);
  return { message: 'Item deleted successfully' };
});