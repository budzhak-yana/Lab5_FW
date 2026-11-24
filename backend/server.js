
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const productRoutes = require("./routes/products");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
// Маршрути для роботи з послугами
app.use("/api/products", productRoutes);

// Головна сторінка сервера
app.get("/", (req, res) => {
  res.json({
    message: "Сервер Lash Studio працює успішно!"
  });
});

// Підключення до MongoDB
async function startServer() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("Не вказано MONGO_URI у файлі .env");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("Успішно підключено до MongoDB!");

    app.listen(PORT, () => {
      console.log(`Сервер запущено на порту ${PORT}`);
    });
  } catch (error) {
    console.error("Помилка підключення до MongoDB:", error.message);
    process.exit(1);
  }
}

startServer();
