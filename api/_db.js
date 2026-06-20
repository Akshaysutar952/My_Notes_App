const mongoose = require('mongoose');

let cachedConnection = null;

async function connectToDatabase() {
  if (cachedConnection && mongoose.connection.readyState === 1) {
    return cachedConnection;
  }

  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error('MONGODB_URI environment variable is required.');
  }

  cachedConnection = await mongoose.connect(mongoUri);
  return cachedConnection;
}

module.exports = connectToDatabase;
