import User from "~/server/models/User";

export default defineEventHandler(async (event) => {
  try {
    // Получаем текущего пользователя из токена (или сессии)
    const userId = event.context.auth?.userId;
    if (!userId) {
      throw createError({
        statusCode: 401,
        message: "User not authenticated.",
      });
    }

    // Находим пользователя в базе данных
    const user = await User.findById(userId).populate("items");
    if (!user) {
      throw createError({
        statusCode: 404,
        message: "User not found.",
      });
    }

    // Возвращаем предметы пользователя
    return {
      items: user.items,
    };
  } catch (error) {
    console.error("Error fetching user items:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Internal Server Error",
    });
  }
});

