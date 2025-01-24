import User from "~/server/models/User";

export default eventHandler(async (event) => {
  const { username, email, password } = await readBody(event);

  const existingUser = await User.findOne({ email });
  
  if (existingUser) {
    throw createError({ statusCode: 400, statusMessage: "Email already exists!" });
  }

  const hashedPassword = await hash(password);

  try {
    const newUser = await User.create({ username, email, password: hashedPassword });
    return { success: true, user: newUser };
  } catch (error) {
    const err = error as Error;
    console.log('Registration error:', err.message);
    return { success: false, error: err.message };
  }
});
