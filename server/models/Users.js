/* This is importing the mongoose library, the bcrypt library, and the bookSchema from the Book.js
file. */
const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const bookSchema = require("./Books");

/* This is creating a new schema for the user. */
const SchemaForUser = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    savedBooks: [bookSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

/* This is creating a virtual property that is returning the length of the savedBooks array. */
SchemaForUser.virtual("bookAmnt").get(function () {
  return this.savedBooks.length;
});

/* This is a pre-save hook that is hashing the password before saving it to the database. */
SchemaForUser.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

/* This is a method that is comparing the password that the user is entering to the password that is
stored in the database. */
SchemaForUser.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

/* This is creating a new model for the user. */
const User = model("User", SchemaForUser);

/* This is exporting the User model so that it can be used in other files. */
module.exports = User;
