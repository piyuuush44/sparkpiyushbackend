exports.getCitiesByUser = async (req, res, next) => {
  const {user} = req;
  let {cities} = user;
  if (!cities || cities.length === 0) {
    cities = [];
  }
  return res.status(200).json({result: {cities: cities}})
};
exports.postAddCity = async (req, res, next) => {
  const {user} = req;
  const {city} = req.body;
  console.log(user);

  if (user.cities.indexOf(city) > -1) {
    return res.status(202).json({message: 'City already added for this user'})
  }
  user.cities.push(city);
  const response = await user.save();
  if (!response) {
    return res.status(500).json({message: 'Please try again later'})
  }
  return res.status(200).json({message: 'City added for this user successfully'})
};
exports.putRemoveCity = async (req, res, next) => {
  const {user} = req;
  const {city} = req.body;
  const cityIndex = user.cities.indexOf(city);
  if (cityIndex === -1) {
    return res.status(202).json({message: 'City not found for this user'})
  }
  user.cities.splice(cityIndex, 1);
  const response = await user.save();
  if (!response) {
    return res.status(500).json({message: 'Please try again later'})
  }
  return res.status(200).json({message: 'City removed for this user successfully'})
};

