/* This is importing the express router and the user routes. */
const router = require("express").Router();
const userRoutes = require("./userRoutes");

/* This is telling the router to use the user routes. */
router.use("/users", userRoutes);

/* This is exporting the router. */
module.exports = router;
