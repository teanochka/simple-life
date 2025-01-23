import User from "../../../models/User";

export default defineEventHandler(async (event) => {
  const { userId } = event.context.params; // ID пользователя
  const item = await readBody(event); // Новый предмет

  const user = await User.findById(userId);
  if (!user) {
    throw createError({ statusCode: 404, message: "User not found" });
  }

  await user.addItem(item);
  return { message: "Item added successfully", item };
});
