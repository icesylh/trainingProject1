const express = require('express')
const router = express.Router()
const User = require('../data/models/User')
const jwt = require('../controller/jwt')
const bcrypt = require('bcrypt')
module.exports = router

router.post('/Register', (req, res) => {
  let { account, password, name } = req.body
  User.findOne({ account }, (err, doc) => {
    if (doc != null) res.send({ Code: 500, Msg: '用户名已存在' })
    else
      User.create(
        {
          account,
          name: name ? name : account,
          password: bcrypt.hashSync(password, 5),
          superior: req.user
        },
        () => {
          res.send({ Code: 200, Msg: '注册成功' })
        }
      )
  })
})
