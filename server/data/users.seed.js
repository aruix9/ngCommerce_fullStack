const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const User = require('../src/models/user.model');
const connectDB = require("../src/db")
const dotenv = require("dotenv")

// configure dotenv
dotenv.config({
    path: "./.env"
})

async function seedUsers() {
  try {
      
    for (let i = 1; i <= 50; i++) {
        const user = [];
        user.push({
            name: faker.person.fullName(),
            email: faker.internet.email().toLowerCase(),
            password: 'Test@123',
            passwordConfirm: "Test@123"
        });

        const existingUser = await User.findOne({email: user.email});

        if(!existingUser) {
            await User.create(user)
        }
    }
    console.log(`\n50 Users are created`);
    process.exit(); // exit script
  } catch (err) {
    console.error('❌ Error seeding users:', err);
    process.exit(1);
  }
}

connectDB().then(() => {
    seedUsers();
}).catch(error => {
    console.log(`\nSeeding DB connection FAILED!! ${error}`)
})