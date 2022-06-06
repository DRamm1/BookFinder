/* This is a destructuring assignment. It is equivalent to: */
const { Schema } = require("mongoose");

/* This is a destructuring assignment. It is equivalent to: */
const bookSchema = new Schema({
  authors: [
    {
      type: String,
    },
  ],
  bookId: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
  },
  image: {
    type: String,
  },
});

/* This is a destructuring assignment. It is equivalent to: */
module.exports = bookSchema;
