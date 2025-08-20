const {model, Schema} = require("mongoose");

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        shortDescription: {
            type: String,
            trim: true
        }
    }, 
    {
        timestamps: true
    }
)

const Product = model("Product", productSchema)

module.exports = Product