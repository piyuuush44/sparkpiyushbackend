const User = require('../../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const randomString = require('randomstring');

exports.getHealth = async (req, res, next) => {
  return res.status(200).json('OK');
};

exports.postLogin = async (req, res, next) => {
  const {email, password} = req.body;
  const user = await User.findOne({email: email});
  if (!user) {
    return res.status(400).json({message: 'User not found'});
  }
  const checkUserPass = await bcrypt.compare(password, user.password);
  if (!checkUserPass) {
    return res.status(400).json({message: 'Password invalid'});
  }
  user.auth = randomString.generate(10);
  return res.status(200).json({message: 'User found!', result: {user: user}})
};

exports.postRegister = async (req, res, next) => {
  const {name, email, password} = req.body;

  const checkUser = await User.findOne({email: email});
  if (checkUser) {
    return res.status(400).json({message: 'User already found'});
  }
  const salt = await bcrypt.genSalt(saltRounds);
  const hashPass = await bcrypt.hash(password, salt);
  let user = new User(
    {
      name: name,
      email: email,
      password: hashPass,
      auth: randomString.generate(10),
      city: [],
    }
  );
  user = await user.save();
  return res.status(200).json({result: {user: user}, message: 'User registered successfully'})
};
