// backend/seedAdmin.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

async function seed() {
  try {
    // Use MONGO_URI (your actual environment variable name)
    const mongoURI = process.env.MONGO_URI || process.env.MONGODB_URI || process.env.DATABASE_URL;
    
    if (!mongoURI) {
      console.error('No MongoDB connection string found in environment variables');
      process.exit(1);
    }
    
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');

    const adminEmail = 'admin@thefolio.com';
    const exists = await User.findOne({ email: adminEmail });
    
    if (exists) {
      console.log(`Admin already exists: ${adminEmail}`);
      // Optional: Update password
      const newHashed = await bcrypt.hash('Admin1234', 10);
      await User.updateOne({ email: adminEmail }, { password: newHashed });
      console.log('Admin password reset to: Admin1234');
      process.exit();
    }

    const hashed = await bcrypt.hash('Admin1234', 10);
    await User.create({
      name: 'TheFolio Admin',
      email: adminEmail,
      password: hashed,
      role: 'admin',
      status: 'active'
    });

    console.log('========================================');
    console.log('✅ Admin created successfully!');
    console.log('📧 Email: admin@thefolio.com');
    console.log('🔑 Password: Admin1234');
    console.log('========================================');
    process.exit();
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

seed();
