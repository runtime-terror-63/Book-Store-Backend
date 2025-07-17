const express = require('express');
const passport = require("passport");
const { register, logout } = require("../controllers/authController");
const router = express.Router();

router.post("/signup", register);

//FIXED SIGNIN 
router.post('/signin', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: 'Authentication failed' });

    // This stores the session in MongoDB
    req.login(user, (err) => {
      if (err) return next(err);
      return res.json({ message: 'Logged in', user: { email: user.email } });
    });
  })(req, res, next);
});

router.post("/logout", logout);

// testing purpose: session check
router.get("/check-session", (req, res) => {
  res.json({
    isAuthenticated: req.isAuthenticated(),
    session: req.session,
    user: req.user,
  });
});

module.exports = router;
