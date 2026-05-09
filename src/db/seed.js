const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Department = require('../models/Department');

dotenv.config({ path: './.env' });

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        // 1. Purana data saaf karo (Optional)
        await Department.deleteMany();

        // 2. Default Departments add karo
        const depts = [
            { name: 'Computer Science', code: 'CS' },
            { name: 'Information Technology', code: 'IT' },
            { name: 'Mechanical Engineering', code: 'ME' },
            { name: 'Electronics', code: 'EC' }
        ];

        await Department.insertMany(depts);
        console.log('✅ Departments Seeded!');

        // 3. Exit process
        process.exit();
    } catch (error) {
        console.error(`❌ Seeding Error: ${error.message}`);
        process.exit(1);
    }
};

// Command: node src/db/seed.js
seedData();