/* This is importing the mongoose module. */
const mongoose = require("mongoose");

/* This is connecting to the database. */
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/googlebooks", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

/* This is exporting the connection to the database. */
module.exports = mongoose.connection;