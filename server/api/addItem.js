import User from "../models/User";

export default defineEventHandler(async (event) => {
  const { userId, item, category } = await readBody(event);

  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw createError({ statusCode: 404, message: "User not found" });
  }

  await user.addItem(category, item);
  return { message: "Item added successfully", item };
});
