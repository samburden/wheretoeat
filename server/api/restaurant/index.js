'use strict';

var express = require('express');
var controller = require('./restaurant.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/random/:location/:type', auth.isAuthenticated(), controller.findRandomRestaurant);
router.get('/list', auth.isAuthenticated(), controller.retrieveRestaurantList);
router.put('/list', auth.isAuthenticated(), controller.storeInRestaurantList);
router.delete('/list/:restaurantId', auth.isAuthenticated(), controller.removeFromList);

module.exports = router;
