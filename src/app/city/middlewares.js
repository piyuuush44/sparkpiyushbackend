const asyncHandler = require('express-async-handler');

const User = require('../../models/user');

exports.checkUserById = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  console.log('piyush', user);
  if (!user) {
    return res.status(400).json({message: 'User not found'});
  }
  req.user = user;
  next();
});
