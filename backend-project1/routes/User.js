const express = require('express')
const router = express.Router()
const User = require('../data/models/User')
const jwt = require('../controller/jwt')
const bcrypt = require('bcrypt')
const nodemailder = require('nodemailer')

module.exports = router

const transPort = nodemailder.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  auth: {
    pass: 'dbtxtbxrfipceyej',
    user: 'icesylh@gmail.com'
  },
  secure: false // 加密发送
})

router.post('/Register', (req, res) => {
  let { account, password, name, type } = req.body
  User.findOne({ account }, (err, doc) => {
    if (doc != null) res.send({ Code: 500, Msg: 'Username already exists' })
    else
      User.create(
        {
          account,
          name: name ? name : account,
          password: bcrypt.hashSync(password, 5),
          code: '',
          type: type || 1,
          superior: req.user
        },
        () => {
          res.send({ Code: 200, Msg: 'Successful registration' })
        }
      )
  })
})
var code = ''
router.post('/sendCode', (req, res) => {
  let { account } = req.body
  User.findOne({ account }, (err, doc) => {
    if (doc == null) res.send({ Code: 500, Msg: 'User name does not exist' })

    for (var i = 0; i < 6; i++) {
      code += Math.floor(Math.random() * 10)
    }
    let options = {
      from: 'icesylh@gmail.com',
      to: account,
      subject: 'Activation code', //邮件主题
      text: 'Your verification code:' + code, // 邮件正文
      html: `
            <h1>Hi, your email has been sent!</h1>,<a href="http://localhost:3000/forgot?id=${account}&code=${code}">点击修改密码</a>`
    }

    transPort.sendMail(options, (err, info) => {
      if (err) {
        res.send({ Code: 500, Msg: err })
      } else {
        res.send({ Code: 200, Msg: 'Sent successfully' })
      }
    })
  })
})
router.post('/forgot', (req, res) => {
  let { account, password } = req.body
  User.findOne({ account }, (err, doc) => {
    if (doc == null) res.send({ Code: 500, Msg: 'User name does not exist' })
    if (req.body.code === code) {
      User.updateOne(
        { account: account },
        { $set: { password: bcrypt.hashSync(password, 5) } },
        function (err) {
          res.send({ Code: 200, Msg: 'Modified successfully' })
        }
      )
    } else {
      res.send({ Code: 500, Msg: 'You have not sent email verification' })
    }
  })
})
