const express = require('express');
const mongoose = require("./db");
const passport = require("passport");
require('./passportConfig')
const session = require("express-session");
const MongoStore = require("connect-mongo");
require("dotenv").config();
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");

const app = express();

// Middleware
app.use(bodyParser.json());


app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
    }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session()); 

// Routes
app.get("/", (req, res) => {
  res.send("Hey Welcome to our Book Store!");
});

app.use(authRoutes);
app.use("/books", bookRoutes);

// Start server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
