import User from "../models/User";

export default defineEventHandler(async (event) => {
  const { userId, category } = await readBody(event);

  if (!["dishes", "clothes", "other"].includes(category)) {
    throw createError({
      message: "Invalid category",
      statusCode: 400,
    });
  }

  try {
    const user = await User.findOne({_id: userId});

    return user[category];
  } catch (error) {
    throw createError({
      message: error.message || "An error occurred while fetching items",
      statusCode: 500,
    });
  }
});
