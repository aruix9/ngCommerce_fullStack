const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const Category = require('../src/models/category.model');
const connectDB = require("../src/db")
const dotenv = require("dotenv")

// configure dotenv
dotenv.config({
    path: "./.env"
})

async function seedCategories() {
  try {
      
    for (let i = 1; i <= 6; i++) {
        const category = [];
        category.push({
            name: faker.commerce.department()
        });

        const existingCategory = await Category.findOne({
          name: { $regex: new RegExp(`^${category.name}$`, 'i') }
        });

        if(!existingCategory) {
            await Category.create(category)
        }
    }
    console.log(`\n50 Categories are created`);
    process.exit(); // exit script
  } catch (err) {
    console.error('❌ Error seeding brands:', err);
    process.exit(1);
  }
}

connectDB().then(() => {
    seedCategories();
}).catch(error => {
    console.log(`\nSeeding DB connection FAILED!! ${error}`)
})