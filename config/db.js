const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    // Retry logic could be implemented here or managed by process managers
    setTimeout(connectDB, 5000); // Simple retry after 5 seconds
  }
};

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected!');
});

module.exports = connectDB;
