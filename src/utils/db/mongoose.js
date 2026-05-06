import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config({ path: 'local.env' });

const dbUrl =
  process.env.DB_URL && process.env.DB_URL.startsWith('mongodb')
    ? process.env.DB_URL
    : 'mongodb://127.0.0.1:27017/task-manager-api';

(async () => {
  try {
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
})();
