import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dishes: [itemSchema],
  clothes: [itemSchema],
  other: [itemSchema],
});

// Статические методы (работают с коллекцией)
userSchema.statics.findUserByEmail = async function (email) {
  const user = await this.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

userSchema.statics.createUser = async function (userData) {
  const existingUser = await this.findOne({ email: userData.email });
  if (existingUser) {
    throw new Error("Email already exists!");
  }

  const newUser = new this(userData);
  return await newUser.save();
};

userSchema.statics.updateUserByEmail = async function (email, updates) {
  const updatedUser = await this.findOneAndUpdate({ email }, updates, {
    new: true,
    runValidators: true,
  });
  if (!updatedUser) {
    throw new Error("User not found");
  }
  return updatedUser;
};

// Методы экземпляра (работают с конкретным пользователем)
userSchema.methods.addItem = async function (category, item) {
  if (!["dishes", "clothes", "other"].includes(category)) {
    throw new Error("Invalid category");
  }

  this[category].push(item);
  await this.save();
};

userSchema.methods.updateItem = async function (category, itemId, updatedItem) {
  if (!["dishes", "clothes", "other"].includes(category)) {
    throw new Error("Invalid category");
  }

  const itemIndex = this[category].findIndex(
    (item) => item._id.toString() === itemId
  );
  if (itemIndex === -1) {
    throw new Error("Item not found");
  }

  this[category][itemIndex] = updatedItem;
  await this.save();
};

userSchema.methods.deleteItem = async function (category, itemId) {
  if (!["dishes", "clothes", "other"].includes(category)) {
    throw new Error("Invalid category");
  }

  this[category] = this[category].filter(
    (item) => item._id.toString() !== itemId
  );
  await this.save();
};

const User = mongoose.model("User", userSchema);

export default User;
