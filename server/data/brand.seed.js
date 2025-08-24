const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const Brand = require('../src/models/brand.model');
const connectDB = require("../src/db")
const dotenv = require("dotenv")

// configure dotenv
dotenv.config({
    path: "./.env"
})

async function seedBrands() {
  try {
      
    for (let i = 1; i <= 50; i++) {
        const brand = [];
        brand.push({
            name: faker.company.name()
        });

        const existingBrand = await Brand.findOne({name: brand.name});

        if(!existingBrand) {
            await Brand.create(brand)
        }
    }
    console.log(`\n50 Brands are created`);
    process.exit(); // exit script
  } catch (err) {
    console.error('❌ Error seeding brands:', err);
    process.exit(1);
  }
}

connectDB().then(() => {
    seedBrands();
}).catch(error => {
    console.log(`\nSeeding DB connection FAILED!! ${error}`)
})