const {model, Schema} = require("mongoose")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Full name is required"],
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            trim: true,
            lowercase: true,
            unique: true
        },
        phone: String,
        profileImage: String,
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, 'Password is too short'],
        },
        passwordChangedAt: Date,
        passwordResetCode: String,
        passwordResetExpires: Date,
        passwordResetVerified: Boolean,
        role: {
            type: String,
            enum: ['user', 'manager', 'admin'],
            default: 'user',
        },
        active: {
            type: Boolean,
            default: true,
        },
        wishlist: [{
            type: Schema.Types.ObjectId,
            ref: 'Product',
        }],
        addresses: [{
            id: { type: Schema.Types.ObjectId },
            alias: String,
            details: String,
            phone: String,
            city: String,
            postalCode: String,
        }],
        refreshToken: {
            type: String
        }
    },
    { timestamps: true }
)

// hash password before save
userSchema.pre("save", async function(next) {
    // check if password is modified
    if(!this.isModified("password")) return next();

    // hash password
    this.password = await bcrypt.hash(this.password, 10);

    // pass to next method
    next();
})

// create a schem method to check password
userSchema.methods.isPasswordCorrect = async function(password) {
    // compare changed password with saved db password
    return await bcrypt.compare(password, this.password);
}

// create a schema method to generate access tokens
userSchema.methods.generateAccessToken = function() {
    // generate token with _id, email, username, fullName
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullName: this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {expiresIn: process.env.ACCESS_TOKEN_EXPIRY});
}

// create a schema method to refresh token
userSchema.methods.generateRefreshToken = function() {
    // generate token with _id
    return jwt.sign({
        _id: this._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {expiresIn: process.env.REFRESH_TOKEN_EXPIRY})
}

const User = model('User', userSchema)

module.exports = User;