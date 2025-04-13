const express = require('express');
const app = express();
const cors = require('cors');
const { connectToDB } = require('./database/db');
const productRoutes = require('./routes/productRoutes');
const path = require('path');

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/products', productRoutes);

// DB & Server Start
connectToDB();
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
