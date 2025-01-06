import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import User from "./model/user.model.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Register User
app.post("/register", async (req, res) => {
  const { name, email, password, salary, date_of_birth } = req.body;

  if (!name || !email || !password) {
    return res.status(422).json({ error: "Please fill all the fields" });
  }

  try {
    const user = new User({ name, email, password, salary, date_of_birth });
    const savedUser = await user.save();
    res.json({ message: "Successfully registered", user: savedUser });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Failed to register user" });
  }
});

// Edit User
app.put("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, password, salary, date_of_birth } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, password, salary, date_of_birth },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "Successfully updated", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Failed to update user" });
  }
});

// Delete User
app.delete("/delete-user", async (req, res) => {
  const { email } = req.body;

  try {
    const deletedUser = await User.findOneAndDelete({ email });

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "Successfully deleted", user: deletedUser });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Failed to delete user" });
  }
});

// Get All Users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Root Route
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(8000, () => {
      console.log("Server is running on port 8000");
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
