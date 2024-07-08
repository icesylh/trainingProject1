const express = require('express');
const router = express.Router();
const User = require('../data/models/User');
const jwt = require('../controller/jwt');
const bcrypt = require('bcrypt');
module.exports = router;

router.post('/', (req, res) => {
  let { account, password } = req.body;
  User.findOne({ account }, (err, doc) => {
    if (err) res.status(500).send(err);

    if (doc != null) {
      const compare = bcrypt.compareSync(password, doc.password);
      if (compare) {
        let Token = jwt.encrypt({ userId: doc._id, email: doc.account }); 
        res.send({
          Code: 200,
          Msg: 'Login Successful',
          Token,
          data: { name: doc.name, type: doc.type }
        });
      } else res.send({ Code: 500, Msg: 'incorrect password' });
    } else res.send({ Code: 500, Msg: 'Account does not exist' });
  });
});
