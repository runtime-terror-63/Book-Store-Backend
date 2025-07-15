const express = require('express');
const {createBook, updateBook, deleteBook, getBooks} = require('../controllers/bookController');
const router = express.Router();

router.get('/', getBooks);
router.post('/create', createBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);


module.exports = router;