'use strict';

var express = require('express');
var controller = require('./history.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/report/count', auth.isAuthenticated(), controller.generateReportForRestaurantCount);
router.get('/report/type', auth.isAuthenticated(), controller.generateReportForRestaurantType);
router.get('/report/day', auth.isAuthenticated(), controller.generateReportForRestaurantDays);
router.put('/', auth.isAuthenticated(), controller.storeInHistory);

module.exports = router;
