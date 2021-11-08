const express = require('express');
const router = express.Router();

const userTokenController = require('../controllers/user-token');

router.get('/', userTokenController.GenerateUserToken)

module.exports = router;