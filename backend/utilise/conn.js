const mongoose = require('mongoose');

const conn = async () => {
  try {
    await mongoose.connect("mongodb+srv://ankit:ankitkl93@cluster0.mlbln6b.mongodb.net/");
    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = conn;
