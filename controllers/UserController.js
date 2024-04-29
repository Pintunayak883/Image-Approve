import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/UserSchema.js";

class UserController {
  static async register(req, res) {
    try {
      // Check if there are any existing users
      const existingUsers = await User.find();

      // If there are existing users, return an error
      if (existingUsers.length > 0) {
        return res.status(400).json({ error: "Admin already registered" });
      }

      // If no existing users, proceed to register the admin user
      const { name, email, password } = req.body;

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new admin user
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        role: "admin",
      });

      await newUser.save();

      res.status(201).json({ message: "Admin registered successfully" });
    } catch (error) {
      console.error("Error registering admin:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;

      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Check if password is correct
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid Password or email" });
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

      // Set token in cookie
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      });

      res.status(200).json({ message: `Welcome back ${user.name}`, user });
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default UserController;
