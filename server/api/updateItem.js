import User from "../models/User";

export default defineEventHandler(async (event) => {
  const { userId } = event.context.params;
  const { itemId, category } = event.context.query;
  const updatedItem = await useBody(event);

  const user = await User.findById(userId);
  if (!user) {
    throw createError({ statusCode: 404, message: "User not found" });
  }

  await user.updateItem(category, itemId, updatedItem);
  return { message: "Item updated successfully", updatedItem };
});
