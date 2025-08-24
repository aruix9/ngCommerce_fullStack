const User = require('../models/user.model');
const factory = require('../utils/handlerFactory');

const getAllUsers = async (req, res) => {
    const users = await User.find();

    res.status(201).json(users)
}


module.exports = {getAllUsers}