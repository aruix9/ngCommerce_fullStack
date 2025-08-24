const User = require('../models/user.model');
const ApiError = require('./ApiError')

exports.generateAccessAndRefreshToken = async (userId) => {
    try {
        // get user
        const user = await User.findById(userId)

        // generate tokens
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        // save refreshtoken to db
        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave: false});

        // return access and refresh token
        return {accessToken, refreshToken}
    } catch (error) {
        console.log("Error while TOKEN GENERATION: " + error)
        throw new ApiError(500, "Something went wrong while generating tokens!");
    }
}