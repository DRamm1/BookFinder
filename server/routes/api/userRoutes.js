/* This is importing the router from express and the functions from the user-controller. */
const router = require("express").Router();
const {
  createUser,
  getSingleUser,
  saveBook,
  deleteBook,
  login,
} = require("../../controllers/userController");

/* This is importing the authMiddleware function from the auth.js file in the utils folder. */
const { authMiddleware } = require("../../utils/auth");
router.route("/login").post(login);
router.route("/me").get(authMiddleware, getSingleUser);
router.route("/").post(createUser).put(authMiddleware, saveBook);
router.route("/books/:bookId").delete(authMiddleware, deleteBook);

/* This is exporting the router to be used in the server.js file. */
module.exports = router;
