const {model, Schema} = require("mongoose");

const categorySchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: [true, "Category name is required"],
            unique: [true, "Category name must be unique"],
            minlength: [3, "Category name is too short"],
            maxlength: [32, "Category name is too long"]
        },
        slug: {
            type: String,
            trim: true,
            lowercase: true
        },
        image: String
    }, 
    {timestamps: true}
);

const setImageURL = (doc) => {
  if (doc.image) {
    const imageUrl = `/categories/${doc.image}`;
    doc.image = imageUrl;
  }
};

categorySchema.post("init", (doc) => {
    setImageURL(doc)
})

categorySchema.post("save", (doc) => {
    setImageURL(doc)
})

const Category = model("Category", categorySchema)

module.exports = Category