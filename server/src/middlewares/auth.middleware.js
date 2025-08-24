const jwt = require("jsonwebtoken");
const asyncHandler = require('express-async-handler')

const User = require('../models/user.model');
const ApiError = require('../utils/ApiError')

// @desc   make sure the user is logged in
exports.isLoggedIn = asyncHandler(async (req, res, next) => {
    // 1) Check if token exist, if exist get
    const accessToken = req.cookies?.accessToken || req.headers?.authorization?.split(" ")[1];
    // check if access token exists
    if(!accessToken) {
        return next(
            new ApiError(
                'You are not login, Please login to get access this route',
                401
            )
        )
    }

    // 2) Verify token (no change happens, expired token)
    const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
    const currentUser = await User.findById(decodedToken?._id).select("-password -refreshToken");

    if (!currentUser) {
        return next(
            new ApiError(
                'Invalid access token',
                401
            )
        )
    }
        
    // add user details into request
    req.user = currentUser;    
    next();
})

// @desc    Get Logged user data
// @route   GET /api/v1/users/getMe
// @access  Private/Protect
exports.getLoggedUserData = asyncHandler(async (req, res, next) => {
  req.params.id = req.user._id;
  next();
});

// @desc    Authorization (User Permissions)
// ["admin", "manager"]
exports.accessRouteAs = (...roles) => 
    asyncHandler(async (req, res, next) => {
        // 1) access roles
        // 2) access registered user (req.user.role)
        if (!roles.includes(req.user.role)) {
            return next(new ApiError('You are not allowed to access this route', 403))
        }
        next()
    })