// backend/seedAdmin.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

// HARDCODE your connection string (remove after testing)
const MONGO_URI = "mongodb://thefoliouser:FaithStephanie@ac-3nkat5p-shard-00-00.3zo9c6t.mongodb.net:27017,ac-3nkat5p-shard-00-01.3zo9c6t.mongodb.net:27017,ac-3nkat5p-shard-00-02.3zo9c6t.mongodb.net:27017/thefolio?ssl=true&replicaSet=atlas-fhuuvm-shard-0&authSource=admin&retryWrites=true&w=majority";

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    console.log('Using connection string:', MONGO_URI.substring(0, 50) + '...');
    
    await mongoose.connect(MONGO_URI);
    console.log('Connected successfully!');

    const adminEmail = 'admin@thefolio.com';
    const exists = await User.findOne({ email: adminEmail });
    
    if (exists) {
      console.log(`Admin already exists: ${adminEmail}`);
      const newHashed = await bcrypt.hash('Admin1234', 10);
      await User.updateOne({ email: adminEmail }, { password: newHashed, role: 'admin' });
      console.log('Admin password reset to: Admin1234');
    } else {
      const hashed = await bcrypt.hash('Admin1234', 10);
      await User.create({
        name: 'TheFolio Admin',
        email: adminEmail,
        password: hashed,
        role: 'admin',
        status: 'active'
      });
      console.log('✅ Admin created successfully!');
    }
    
    console.log('📧 Email: admin@thefolio.com');
    console.log('🔑 Password: Admin1234');
    process.exit();
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

seed();