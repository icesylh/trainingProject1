const express = require('express');
const router = express.Router();
const jwtController = require('../controller/jwt');

router.post('/validate-token', jwtController.validateToken);

module.exports = router;
