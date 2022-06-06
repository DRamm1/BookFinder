/* This is requiring the connection to the database, the routes, express, and path. */
const db = require("./config/connection");
const routes = require("./routes");
const express = require("express");
const path = require("path");

/* This is setting up the port for the application. */
const application = express();
const PORT = process.env.PORT || 3001;

/* This is allowing the application to use the express.json() and express.urlencoded() middleware
functions. */
application.use(express.urlencoded({ extended: true }));
application.use(express.json());

/* This is checking to see if the application is in production mode. If it is, then it is using the
express.static() middleware function to serve the static files in the client/build directory. */
if (process.env.NODE_ENV === "production") {
  application.use(express.static(path.join(__dirname, "../client/build")));
}

/* This is telling the application to use the routes that are defined in the routes.js file. */
application.use(routes);

/* This is telling the application to listen on the port that is defined in the PORT variable. */
db.once("open", () => {
  application.listen(PORT, () => console.log(`Listening on:${PORT}`));
});
