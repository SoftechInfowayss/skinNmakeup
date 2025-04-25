const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Basic input validation
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email, and password are required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already in use' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save user to database
    await newUser.save();

    // Generate JWT
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET || 'your_jwt_secret_key',
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    res.status(201).json({ 
      success: true, 
      message: 'User registered successfully', 
      user: { 
        id: newUser._id,
        name: newUser.name,
        email: newUser.email 
      },
      token 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error registering user', error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic input validation
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || 'your_jwt_secret_key',
      { expiresIn: '1h' }
    );

    res.status(200).json({ 
      success: true, 
      message: 'Login successful', 
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      },
      token
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error logging in', error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find().select('name email _id');

    // Check if there are any users
    if (!users || users.length === 0) {
      return res.status(404).json({ success: false, message: 'No users found' });
    }

    // Map users to the desired response format
    const userList = users.map(user => ({
      id: user._id,
      name: user.name,
      email: user.email
    }));

    res.status(200).json({ 
      success: true, 
      message: 'Users retrieved successfully', 
      users: userList 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error retrieving users', error: error.message });
  }
};

// Get total number of users (GET API)
const getUserCount = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    res.status(200).json({
      success: true,
      message: 'Total user count retrieved successfully',
      totalUsers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving user count',
      error: error.message
    });
  }
};



module.exports = { signup, login, getAllUsers ,getUserCount };