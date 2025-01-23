import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
});

// Метод для добавления предмета
userSchema.methods.addItem = async function (item) {
  this.items.push(item); // Добавляем новый предмет в массив
  await this.save();
};

// Метод для обновления предмета
userSchema.methods.updateItem = async function (itemId, updatedItem) {
  const itemIndex = this.items.findIndex((item) => item._id.toString() === itemId);
  if (itemIndex === -1) {
    throw new Error("Item not found");
  }

  this.items[itemIndex] = updatedItem; // Обновляем данные предмета
  await this.save();
};

// Метод для удаления предмета
userSchema.methods.deleteItem = async function (itemId) {
  this.items = this.items.filter((item) => item._id.toString() !== itemId);
  await this.save();
};

const User = mongoose.model("User", userSchema);

export default User;
