const asyncHandler = require('express-async-handler')
const bcrypt = require("bcrypt");

const ApiError = require('../utils/ApiError')
const sendEmail = require('../utils/sendEmail')
const { cookieOptions } = require("../constants")
const User = require('../models/user.model');
const {generateAccessAndRefreshToken} = require("../utils/generateTokens.js");

// @desc    Signup
// @route   GET /api/v1/auth/signup
// @access  Public
exports.signup = asyncHandler(async (req, res) => {
    // get user data from body
    const {name, email, password} = req.body;

    const createdUser = await User.create({
        name, email, password
    })

    return res.status(201).json({data: createdUser})
})

// @desc    Login
// @route   GET /api/v1/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
    // 1) check if password and email in the body (validation)
    // 2) check if user exist & check if password is correct
    const user = await User.findOne({ email: req.body.email })

    // password check
    const isPasswordValid = await user.isPasswordCorrect(req.body.password);
    if(!isPasswordValid) {
        return next(new ApiError("Ivalid credentials!", 401));
    }

    // generate access and refresh tokens
    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id);
    
    // save tokens in cookies and db
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    // 4) send response to client side
    return res
        .status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json({
            user: loggedInUser,
            accessToken,
            refreshToken
        })
})

// @desc    Logout
// @route   GET /api/v1/auth/logout
// @access  Public
exports.logout = asyncHandler(async (req, res) => {
    // get user from middleware
    const user = req.user._id;

    // remove refresh token from user db
    await User.findByIdAndUpdate(user,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    );

    // clear cookies and send response
    return res
        .status(200)
        .clearCookie("accessToken", cookieOptions)
        .clearCookie("refreshToken", cookieOptions)
        .json({data: {}});
})

// @desc    Forgot password
// @route   POST /api/v1/auth/forgotPassword
// @access  Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
    // 1) Get user by email
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return next(
            new ApiError(`There is no user with that email ${req.body.email}`, 404)
        )
    }
    // 2) If user exist, Generate hash reset random 6 digits and save it in db
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString()
    const hashedResetCode = await bcrypt.hash(resetCode, 10)

    // Save hashed password reset code into db
    user.passwordResetCode = hashedResetCode
    // Add expiration time for password reset code (10 min)
    user.passwordResetExpires = Date.now() + 10 * 60 * 1000
    user.passwordResetVerified = false

    await user.save()

    // 3) Send the reset code via email
    const message = `Hi ${user.name},\n We received a request to reset the password on your E-shop Account. \n ${resetCode} \n Enter this code to complete the reset. \n Thanks for helping us keep your account secure.\n The E-shop Team`
    try {
        await sendEmail({
            email: user.email,
            subject: 'Your password reset code (valid for 10 min)',
            message,
        })
    } catch (err) {
        user.passwordResetCode = undefined
        user.passwordResetExpires = undefined
        user.passwordResetVerified = undefined

        await user.save();
        return next(new ApiError('There is an error in sending email', 500));
    }

    res.status(200).json({ status: 'Success', message: 'Reset code sent to email' })
})

// @desc    Verify password reset code
// @route   POST /api/v1/auth/verifyResetCode
// @access  Public
exports.verifyPassResetCode = asyncHandler(async (req, res, next) => {
    // 1) Get user based on reset code
    const hashedResetCode =  await bcrypt.hash(req?.body?.resetCode, 10)

    const user = await User.findOne({
        passwordResetCode: hashedResetCode,
        passwordResetExpires: { $gt: Date.now() },
    })
    if (!user) {
        return next(new ApiError('Reset code invalid or expired'))
    }

    // 2) Reset code valid
    user.passwordResetVerified = true
    await user.save()

    res.status(200).json({
        status: 'Success',
    })
})

// @desc    Reset password
// @route   POST /api/v1/auth/resetPassword
// @access  Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
    // 1) Get user based on email
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return next(new ApiError(`There is no user with email ${req.body.email}`, 404))
    }
    
    // 2) Check if reset code verified
    if (!user.passwordResetVerified) {
        return next(new ApiError('Reset code not verified', 400))
    }

    user.password = req.body.newPassword
    user.passwordResetCode = undefined
    user.passwordResetExpires = undefined
    user.passwordResetVerified = undefined

    await user.save()

    // 3) if everything is ok, generate token
    const token = createToken(user._id)
    res.status(200).json({ token })
})