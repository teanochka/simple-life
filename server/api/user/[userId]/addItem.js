import User from "../../../models/User";

export default defineEventHandler(async (event) => {
  const { userId } = event.context.params;
  const category = event.context.query.category;
  const item = await useBody(event);

  const user = await User.findById(userId);
  if (!user) {
    throw createError({ statusCode: 404, message: "User not found" });
  }

  await user.addItem(category, item);
  return { message: "Item added successfully", item };
});
