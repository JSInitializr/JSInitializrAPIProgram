var express = require('express');
var router = express.Router();
var projectController = require('./../controller/projectController')

/* GET users listing. */
router.post('/', projectController.create);

module.exports = router;
