import User from "../models/User";

export default defineEventHandler(async (event) => {
  const { userId, itemId, category } = await readBody(event);

  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw createError({ statusCode: 404, message: "User not found" });
  }

  await user.deleteItem(category, itemId);
  return { message: "Item deleted successfully" };
});
