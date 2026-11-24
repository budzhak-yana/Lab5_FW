
const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

// Отримання всіх послуг
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Помилка отримання послуг" });
  }
});

// Отримання послуги за ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Послугу не знайдено" });
    }

    res.json(product);
  } catch (error) {
    res.status(400).json({ message: "Некоректний ID послуги" });
  }
});

// Додавання нової послуги
router.post("/", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: "Помилка додавання послуги" });
  }
});

// Оновлення послуги
router.put("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Послугу не знайдено" });
    }

    res.json(product);
  } catch (error) {
    res.status(400).json({ message: "Помилка оновлення послуги" });
  }
});

// Видалення послуги
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Послугу не знайдено" });
    }

    res.json({ message: "Послугу успішно видалено" });
  } catch (error) {
    res.status(400).json({ message: "Помилка видалення послуги" });
  }
});

module.exports = router;
