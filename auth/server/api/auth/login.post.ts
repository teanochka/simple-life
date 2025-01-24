import User from "~/server/models/User";

export default eventHandler(async (event) => {
  const { email, password } = await readBody(event);
  const user = await User.findOne({ email });

  if (!user) {
    throw createError({
      message: "Email not found! Please register.",
      statusCode: 401,
    });
  }

  const hashedPassword = await hash(password);
  const isPasswordValid = user.password === hashedPassword;
  console.log(password, hashedPassword, user.password, isPasswordValid);
  if (!isPasswordValid) {
    throw createError({
      message: "Incorrect password!",
      statusCode: 401,
    });
  }

  const session = await useAuthSession(event);
  console.log("Session:", session);
  if (!session) {
    throw createError({
      message: "Session creation failed!",
      statusCode: 500,
    });
  }
  await session.update({
    id: user._id.toString(),
    name: user.username,
    email: user.email,
  });

  return session;
});
