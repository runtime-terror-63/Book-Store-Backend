const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  title: {
    type: String,
    required:true
  },
  author: {
    name: {
      type: String,
      required: true,
    },
    birthDate: {
      type: Date,
    },
  },
  publicationDate: {
    type: Date,
  },
  pageCount: {
    type: Number,
  },
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
