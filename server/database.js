// server/database.js
import { MongoClient } from 'mongodb';

const uri = 'mongodb://127.0.0.1:27017'; // Подключение к локальной MongoDB
const dbName = 'simple-life'; // Название базы данных

let client = null;
let db = null;

// Функция подключения к базе данных
export const connectDB = async () => {
    if (!db) {
      try {
        client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        db = client.db(dbName);
        console.log('Connected to MongoDB');
      } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw new Error('Database connection failed.');
      }
    }
    return db;
  };
  

// Закрытие подключения
export const closeDB = async () => {
  try {
    if (client) {
      await client.close();
      client = null;
      db = null;
      console.log('MongoDB connection closed');
    }
  } catch (error) {
    console.error('Error closing MongoDB connection:', error.message);
  }
};
