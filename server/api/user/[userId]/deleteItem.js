import User from "../../../models/User";

export default defineEventHandler(async (event) => {
  const { userId } = event.context.params; // ID пользователя
  const { itemId } = event.context.query; // ID предмета

  const user = await User.findById(userId);
  if (!user) {
    throw createError({ statusCode: 404, message: "User not found" });
  }

  await user.deleteItem(itemId);
  return { message: "Item deleted successfully" };
});
