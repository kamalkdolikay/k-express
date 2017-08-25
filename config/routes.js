var express = require('express');
var router = express.Router();
var UsersController = require('../api/controllers/UsersController');

router.get('/', UsersController.index);

module.exports = router;