const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/User");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username });
      if (!user) return done(null, false, { message: "Incorrect username" });

      const isPasswordMatch = await user.comparePassword(password);

      if (isPasswordMatch) return done(null, user);
      else done(null, false, { message: "Incorrect password" });
    } catch (err) {
      return done(err);
    }
  })
);


module.exports = passport;