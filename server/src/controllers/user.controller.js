const User = require('../models/user.model');
const factory = require('../utils/handlerFactory');

const getAllUsers = factory.getAll(User)


module.exports = {getAllUsers}