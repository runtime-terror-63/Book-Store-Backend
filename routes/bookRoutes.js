const express = require('express');
const {createBook, updateBook, deleteBook, getBooks} = require('../controllers/bookController');
const { isAdmin } = require("../middlewares/authorize");
const router = express.Router();

function ensureAuth(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ message: "Unauthorized" });
}

router.use(ensureAuth);

router.get("/", getBooks);
router.post("/create", isAdmin, createBook);
router.put("/:id", isAdmin, updateBook);
router.delete("/:id", isAdmin, deleteBook);


module.exports = router;