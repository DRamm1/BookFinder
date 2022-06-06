/* This is importing the express router, the api routes, and the path module. */
const router = require("express").Router();
const apiRoutes = require("./api");
const path = require("path");

/* This is telling the router to use the apiRoutes file when the url contains /api. */
router.use("/api", apiRoutes);

/* This is telling the router to send the index.html file when the url does not contain /api. */
router.use((req, res) => {
  res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

/* This is exporting the router to be used in the server.js file. */
module.exports = router;
