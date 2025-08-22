const {model, Schema} = require("mongoose");

const productSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Product name is required"],
            trim: true,
            minLength: [3, "Product name is too short"],
            maxLength: [100, "Product name is too long"]
        },
        slug: {
            type: String,
            required: true,
            lowercase: true
        },
        shortDescription: {
            type: String,
            trim: true,
            required: [true, "Short description is required"],
            minLength: [20, "Short description must be atleast 20 Characters"]
        },
        quantity: {
            type: Number,
            required: [true, 'Product quantity is required'],
        },
        sold: {
            type: Number,
            default: 0,
        },
        price: {
            type: Number,
            trim: true,
            required: [true, 'Product price is required'],
            max: [200000, 'Product price is too long'],
        },
        description: {
            type: String,
            trim: true
        },
        priceAfterDiscount: {
        type: Number,
        },
        colors: [String],
        coverImage: {
            type: String,
            required: [true, 'Product cove image is required'],
        },
        images: [String],
        category: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: [true, "Product must belong to a category"]
        },
        subcategories: [
            {
                type: Schema.Types.ObjectId,
                ref: 'SubCategory',
            }
        ],
        brand: {
            type: Schema.Types.ObjectId,
            ref: 'Brand'
        },
        ratingsAverage: {
            type: Number,
            min: [1, 'Rating must be above or equal 1.0'],
            max: [5, 'Rating must be below or equal 5.0'],
        },
        ratingsQuantity: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
)

productSchema.virtual("reviews", {
    ref: "Review",
    foreignField: "product",
    localField: "_id"
})

productSchema.pre(/^find/, function(next) {
    this.populate({
        patch: "category",
        select: 'name -_id'
    })

    next()
})

const setImageURL = (doc) => {
  if (doc.coverImage) {
    const imageUrl = `/products/${doc.coverImage}`
    doc.coverImage = imageUrl
  }
  if (doc.images) {
    const imagesList = []
    doc.images.forEach((image) => {
      const imageUrl = `/products/${image}`
      imagesList.push(imageUrl)
    })
    doc.images = imagesList
  }
}

// findOne, findAll and update
productSchema.post('init', (doc) => {
  setImageURL(doc)
})

// create
productSchema.post('save', (doc) => {
  setImageURL(doc)
})

module.exports = model("Product", productSchema);