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
    getAllUsers
} = require('../controllers/user.controller')

// const authService = require('../controllers/auth.controller')

const router = express.Router()

router
  .route('/')
  .get(getAllUsers)
  // .post(uploadUserImage, resizeImage, createUserValidator, createUser)
// router
//   .route('/:id')
//   .get(getUserValidator, getUser)
//   .put(uploadUserImage, resizeImage, updateUserValidator, updateUser)
//   .delete(deleteUserValidator, deleteUser)

// // user
// router.use(authService.protect)
// router.get('/profile', getLoggedUserData, getUser)
// router.put('/changeMyPassword', updateLoggedUserPassword)
// router.put('/update-profile', updateLoggedUserValidator, updateLoggedUserData)
// router.delete('/delete-profile', deleteLoggedUserData)

// // Admin
// router.use(authService.allowedTo('admin', 'manager'))
// router.put(
//   '/change-password/:id',
//   changeUserPasswordValidator,
//   changeUserPassword
// )

module.exports = router