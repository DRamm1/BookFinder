/* Destructuring the User model and the signToken function from the models and utils folders. */
const { User } = require("../models");
const { signToken } = require("../utils/auth");

/* This is a function that is being exported from the file. */
module.exports = {
  async GetUser({ user = null, params }, res) {
    const foundUser = await User.findOne({
      $or: [
        { _id: user ? user._id : params.id },
        { username: params.username },
      ],
    });

    if (!foundUser) {
      return res.status(400).json({ message: "User with ID not found!" });
    }

    res.json(foundUser);
  },

  /* This is a function that is being exported from the file. */
  async login({ body }, res) {
    const user = await User.findOne({
      $or: [{ username: body.username }, { email: body.email }],
    });
    if (!user) {
      return res.status(400).json({ message: "Having issues finding user" });
    }

    const correctPw = await user.isCorrectPassword(body.password);

    if (!correctPw) {
      return res.status(400).json({ message: "Incorrect Password!" });
    }
    const token = signToken(user);
    res.json({ token, user });
  },

  /* This is a function that is being exported from the file. */
  async createUser({ body }, res) {
    const user = await User.create(body);

    if (!user) {
      return res.status(400).json({ message: "Something went wrong!" });
    }
    const token = signToken(user);
    res.json({ token, user });
  },

  /* This is a function that is being exported from the file. */
  async bookDelete({ user, params }, res) {
    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      { $pull: { savedBooks: { bookId: params.bookId } } },
      { new: true }
    );
    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: "Couldn't find user with this id!" });
    }
    return res.json(updatedUser);
  },

  /* This is a function that is being exported from the file. */
  async bookSave({ user, body }, res) {
    console.log(user);
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $addToSet: { savedBooks: body } },
        { new: true, runValidators: true }
      );
      return res.json(updatedUser);
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  },
};
