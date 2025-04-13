const mongoose = require('mongoose');

const connectToDB = async () => {
  try {
    const dbUri = process.env.MONGODB_URI || 'mongodb+srv://taruna:Taruna123@cluster0.3wyu8.mongodb.net/skinNmakeup?retryWrites=true&w=majority&appName=Cluster0';
    
    await mongoose.connect(dbUri); 
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = { connectToDB };