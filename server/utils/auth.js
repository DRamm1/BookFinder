/* Importing the jsonwebtoken library. */
const jsonToken = require("jsonwebtoken");

/* Setting the secret key and the experation time for the token. */
const personal = "personal";
const experationTime = "2h";

/* This is the middleware that is used to check if the user has a token. */
module.exports = {
  authMiddleware: function (req, res, next) {
    let token = req.query.token || req.headers.authorization;
    if (req.headers.authorization) {
      token = token.split(" ")
      .pop()
      .trim();
    }

    /* This is the middleware that is used to check if the user has a token. */
    if (!token) {
      return res.status(400).json({ message: "No token found!" });
    }
    try {
      const { data } = jsonToken.verify(token, personal, {
        maxAge: experationTime,
      });
      req.user = data;
    } catch {
      console.log("Token not valid!");
      return res.status(400).json({ message: "Token not valid!!" });
    }
    next();
  },

  /* This is the function that is used to sign the token. */
  tokenSigning: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jsonToken.sign({ data: payload }, personal, {
      expiresIn: experationTime,
    });
  },
};
