const User = require("../models/User");
const bcrypt = require("bcryptjs");

const seedAdmin = async () => {
  try {
    
    const adminExists = await User.findOne({ role: "admin" });
    if (adminExists) {
      console.log("ℹ️ Admin already exists. Skipping seed.");
      return;
    }

    
    const hashedPassword = await bcrypt.hash("admin123", 10);

    await User.create({
      name: "Default Admin",
      email: "admin@taskmanager.com",
      password: hashedPassword,
      role: "admin"
    });

    console.log("Default admin created (first run)");
  } catch (error) {
    console.error(" Admin seed failed:", error.message);
  }
};

module.exports = seedAdmin;
