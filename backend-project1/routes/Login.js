const express = require('express')
const router = express.Router()
const User = require('../data/models/User')
const jwt = require('../controller/jwt')
const bcrypt = require('bcrypt')
module.exports = router

router.post('/', (req, res) => {
  let { account, password } = req.body
  User.findOne({ account }, (err, doc) => {
    if (err) res.status(500).send(err)

    if (doc != null) {
      const compare = bcrypt.compareSync(password, doc.password)
      if (compare) {
        let Token = jwt.encrypt(String(doc._id))

        res.send({ Code: 200, Msg: '登录成功', Token, data: doc.name })
      } else res.send({ Code: 500, Msg: '密码错误' })
    } else res.send({ Code: 500, Msg: '账号不存在' })
  })
})
