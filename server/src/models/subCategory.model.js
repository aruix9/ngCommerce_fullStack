const {model, Schema} = require('mongoose');

const subCategorySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: [true, 'SubCategory name must be unique'],
      minlength: [2, 'SubCategory name too short'],
      maxlength: [32, 'SubCategory name too long'],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'SubCategory must belong to a parent category'],
    },
    slug: {
      type: String,
      lowercase: true,
    },
  },
  { timestamps: true }
);

module.exports = model('SubCategory', subCategorySchema);