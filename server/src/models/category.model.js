const {model, Schema} = require("mongoose");

const categorySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            index: true
        }
    }, 
    {
        timestamps: true
    }
)

const Category = model("Category", categorySchema)

module.exports = Category