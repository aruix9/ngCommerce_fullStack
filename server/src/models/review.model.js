const {model, Schema} = require("mongoose");
const Product = require("./product.model");

const reviewSchema = new Schema(
    {
        title: {
            type: String,
        },
        ratings: {
            type: Number,
            max: [5, 'Max ratings value is 5.0'],
            required: [true, 'Ratings is required'],
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Review must belong to a user'],
        },
        // parent reference (one to many)
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: [true, 'Review must belong to a product'],
        },
    },
    {timestamps:true}
)

reviewSchema.statics.calcAverageRatingsAndQuantity = async function (
  productId
) {
    const result = await this.aggregate([
        // Stage 1 : get all reviews in specific product
        {
            $match: { product: productId },
        },
        // Stage 2: Grouping reviews based on productID and calc avgRatings, ratingsQuantity
        {
            $group: {
                _id: 'product',
                avgRatings: { $avg: '$ratings' },
                ratingsQuantity: { $sum: 1 },
            },
        },
    ]);

    if (result.length > 0) {
        await Product.findByIdAndUpdate(productId, {
            ratingsAverage: result[0].avgRatings,
            ratingsQuantity: result[0].ratingsQuantity,
        });
    } else {
        await Product.findByIdAndUpdate(productId, {
            ratingsAverage: 0,
            ratingsQuantity: 0,
        });
    }
};

reviewSchema.pre(/^find/, function (next) {
    this.populate({ path: 'user', select: 'name' });
    next();
});

reviewSchema.post('save', async function () {
    await this.constructor.calcAverageRatingsAndQuantity(this.product);
});

reviewSchema.post('remove', async function () {
    await this.constructor.calcAverageRatingsAndQuantity(this.product);
});

const Review = model("Review", reviewSchema);

module.exports = Review;