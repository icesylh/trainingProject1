const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const fs = require('fs')
const cors = require('cors')
const productRoutes = require('./routes/productRoutes');

require('./data/db')

const app = express()

app.use(cors());

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use('/api/products', productRoutes);
//app.use('/api', express.static(path.join(__dirname, 'doc'))) // TODO 上线时关闭 apidoc -i routes/ -o doc/

const routes = fs.readdirSync(path.join(__dirname, 'routes'))
routes.forEach((v) => {
  let rout = v.replace('.js', '')
  app.use(`/${rout}`, require(`./routes/${rout}`)) //以文件名为接口
})

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message });
});
module.exports = app