const User = require('../models/User');

exports.register = async (req, res, next) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'User already exists' });

    const user = new User({ firstname, lastname, email, password });
    await user.save();

    // Only send response after login
    req.login(user, err => {
      if (err) return next(err);
      res.status(201).json({
        message: 'Registered and logged in',
        user: {
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
        },
      });
    });
  } catch (err) {
    next(err);
  }
};


exports.logout = (req, res)=>{
  req.logout(()=>{
    res.json({mesage:'Logged out'});
  })
}