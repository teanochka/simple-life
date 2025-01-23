import User from "../../../models/User";

export default defineEventHandler(async (event) => {
  const { userId } = event.context.params; // ID пользователя
  const { itemId } = event.context.query; // ID предмета
  const updatedItem = await readBody(event); // Обновлённые данные предмета

  const user = await User.findById(userId);
  if (!user) {
    throw createError({ statusCode: 404, message: "User not found" });
  }

  await user.updateItem(itemId, updatedItem);
  return { message: "Item updated successfully", updatedItem };
});
