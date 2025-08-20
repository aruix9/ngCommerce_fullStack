const {model, Schema} = require("mongoose")

const userSchema = new Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        refreshToken: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

const User = model('User', userSchema)

model.exports = User;