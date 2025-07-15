const Book = require('../models/Book');

exports.createBook = async (req, res)=>{
  const data = req.body;
  const newBook = await new Book(data);
  const savedBook = await newBook.save();
  res.status(200).json(savedBook);
};

exports.updateBook = async(req, res)=>{
  const id = req.params.id;
  const data = req.body;
  const book = await Book.findByIdAndUpdate(id, data);
  res.json(book);
};

exports.deleteBook = async(req, res)=>{
  const id = req.params.id;
  await Book.findByIdAndDelete(id);
  res.json({message: 'Book deleted'});
};

exports.getBooks = async(req, res)=>{
  const books = await Book.find();
  res.json(books);
};
