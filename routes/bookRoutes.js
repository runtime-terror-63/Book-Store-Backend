const express = require('express');
const {createBook, updateBook, deleteBook, getBooks} = require('../controllers/bookController');
const router = express.Router();

function ensureAuth(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ message: 'Unauthorized' });
}

router.use(ensureAuth);


router.get('/', getBooks);
router.post('/create', createBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);


module.exports = router;