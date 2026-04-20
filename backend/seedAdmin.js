// backend/seedAdmin.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

async function seed() {
  try {
    // Use the CORRECT variable name: MONGO_URI
    const mongoURI = process.env.MONGO_URI;
    
    if (!mongoURI) {
      console.error('MONGO_URI not found in .env file');
      console.log('Current env variables:', Object.keys(process.env));
      process.exit(1);
    }
    
    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoURI);
    console.log('Connected successfully!');

    const adminEmail = 'admin@thefolio.com';
    const exists = await User.findOne({ email: adminEmail });
    
    if (exists) {
      console.log(`Admin already exists: ${adminEmail}`);
      // Update password to be sure
      const newHashed = await bcrypt.hash('Admin1234', 10);
      await User.updateOne({ email: adminEmail }, { password: newHashed, role: 'admin' });
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
