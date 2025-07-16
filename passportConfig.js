const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/User");

passport.use(
  new LocalStrategy(
    { usernameField: 'email' }, 
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) return done(null, false, { message: "Incorrect email" });

        const isPasswordMatch = await user.comparePassword(password);

        if (isPasswordMatch) return done(null, user);
        else return done(null, false, { message: "Incorrect password" });
      } catch (err) {
        return done(err);
      }
    }
  )
);

// ✅ Add session support
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;
