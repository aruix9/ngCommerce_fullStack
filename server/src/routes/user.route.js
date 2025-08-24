const express = require('express')
const {
    getUserValidator,
    createUserValidator,
    updateUserValidator,
    deleteUserValidator,
    changeUserPasswordValidator,
    updateLoggedUserValidator,
} = require('../utils/validators/user.validator')

const {
    getUser,
    createUser,
    updateUser,
    deleteUser,
    getAllUsers,
    resizeImage,
    uploadUserImage,
    changeUserPassword,
    updateLoggedUserData,
    deleteLoggedUserData,
    updateLoggedUserPassword
} = require('../controllers/user.controller')

const {
    isLoggedIn,
    accessRouteAs,
    getLoggedUserData
} = require("../middlewares/auth.middleware")

const router = express.Router()

router
  .route('/')
  .get(getAllUsers)
  .post(uploadUserImage, resizeImage, createUserValidator, createUser)

// user
router.use(isLoggedIn)
router.get('/profile', getLoggedUserData, getUser)
router.put('/changeMyPassword', updateLoggedUserPassword)
router.put('/update-profile', updateLoggedUserValidator, updateLoggedUserData)
router.delete('/delete-profile', deleteLoggedUserData)

// Admin
router.use(accessRouteAs('admin', 'manager'))
router.put(
  '/change-password/:id',
  changeUserPasswordValidator,
  changeUserPassword
)

router
  .route('/u/:id')
  .get(getUserValidator, getUser)
  .put(uploadUserImage, resizeImage, updateUserValidator, updateUser)
  .delete(deleteUserValidator, deleteUser)

module.exports = router