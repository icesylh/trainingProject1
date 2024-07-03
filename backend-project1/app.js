const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fs = require('fs');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes'); // 添加购物车路由
const jwtController = require('./controller/jwt'); // 确保有身份验证中间件

require('./data/db');

const app = express();

app.use(cors());

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 路由设置
app.use('/api/products', productRoutes);
app.use('/api/cart', jwtController.check, cartRoutes); // 添加购物车路由并应用身份验证中间件

const routes = fs.readdirSync(path.join(__dirname, 'routes'));
routes.forEach((v) => {
  let rout = v.replace('.js', '');
  app.use(`/${rout}`, require(`./routes/${rout}`)); //以文件名为接口
});

// 捕获404错误并转发到错误处理器
app.use((req, res, next) => {
  next(createError(404));
});

// 错误处理器
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message });
});

module.exports = app;
