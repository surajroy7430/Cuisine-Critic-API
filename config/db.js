const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connect to MongoDB");
  } catch (error) {
    console.error("Error connecting to DB");
  }
};

module.exports = connectToDB;
