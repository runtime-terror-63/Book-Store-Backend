const User = require('../models/User');

exports.register = async (req, res, next) => {
  try {
    const { firstname, lastname, email, password, role } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'User already exists' });

    const user = new User({ firstname, lastname, email, password, role });
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
          role:user.role,
        },
      });
    });
  } catch (err) {
    next(err);
  }
};


exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);

    req.session.destroy((err) => {
      if (err) return next(err);
      res.clearCookie("connect.sid");
      res.json({ message: "Logged out and session destroy" });
    });
  });
};