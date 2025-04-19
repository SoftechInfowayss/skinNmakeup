require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { connectToDB } = require('./database/db');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/Authroutes');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'Uploads')));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

// Connect to MongoDB and start server
const startServer = async () => {
  try {
    await connectToDB();
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();