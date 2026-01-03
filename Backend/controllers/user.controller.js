

const User = require("../models/User");
const bcrypt = require("bcryptjs");


exports.getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};


exports.createUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ msg: "All fields required" });
  }

  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(400).json({ msg: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: role || "user"
  });

  res.json(user);
};


exports.deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }

  await user.deleteOne();
  res.json({ msg: "User deleted" });
};



