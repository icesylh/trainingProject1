const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const User = require("../data/models/User");

const encrypt = (data) => {
  const privateKey = fs.readFileSync(path.join(__dirname, "../keys/rsa_private_key.pem"));
  const payload = {
    userId: data.userId,
    email: data.email  
  };
  const tk = jwt.sign(payload, privateKey, { algorithm: "RS256" });
  return tk;
};

const decrypt = (tk) => {
  const publicKey = fs.readFileSync(path.join(__dirname, "../keys/rsa_public_key.pem"));
  const result = jwt.verify(tk, publicKey);
  return result;
};

module.exports = {
  decrypt,
  encrypt,
  validateToken: (req, res) => {
    const { token, userId } = req.body;
    console.log("Received token for validation:", token);
    console.log("Received userId for validation:", userId);

    try {
      const decoded = decrypt(token);
      console.log("Decoded token:", decoded);

      if (decoded.email === userId) {
        console.log("Token and userId match");
        res.json({ isValid: true });
      } else {
        console.log("Token and userId do not match");
        res.json({ isValid: false });
      }
    } catch (error) {
      console.error("Token validation failed:", error);
      res.status(401).json({ isValid: false, message: "Token validation failed" });
    }
  },
  check: (req, res, next) => {
    try {
      let token = req.headers.authorization;
      console.log("Received token:", token);
      let decrypted = decrypt(token);
      let id = decrypted.userId
      console.log("Decrypted token id:", id);
      User.findById(id, (err, doc) => {
        if (err) return res.status(500).send(err);
        if (doc) {
          req.user = id;
          return next();
        } else return res.send({ Code: 401, Msg: "No login status" });
      });
    } catch (error) {
      console.error("Token validation failed:", error);
      return res.send({ Code: 401, Msg: "Token Failure" });
    }
  },
};
