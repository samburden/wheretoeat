'use strict';

var express = require('express');
var controller = require('./yelp.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/:location', auth.isAuthenticated(), controller.searchYelp);
router.get('/:location/:term', auth.isAuthenticated(), controller.searchYelp);

module.exports = router;
