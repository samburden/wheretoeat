'use strict';

var _ = require('lodash');
var Restaurant = require('./restaurant.model');
var yelp = require('../../yelp');

exports.findRandomRestaurant = function (req, res) {
  if (req.params.type === 'mylist') {
    Restaurant.findOne({ 'google.id' : req.user.google.id }, function(err, user) {
      if (err) {
        handleError(res, err);
      } else {
        if (user.restaurantList && user.restaurantList.length > 0) {
          res.json(user.restaurantList[Math.floor(Math.random() * user.restaurantList.length)]);
        } else {
          res.json(undefined);
        }
      }
    });
  } else {
    var criteria = {
      category_filter: 'restaurants',
      location: req.params.location
    };
    yelp.search(criteria, function(error, data) {
      if (error) {
        handleError(res, error);
      } else {
        if (data.businesses && data.businesses.length > 0) {
          res.json(data.businesses[Math.floor(Math.random() * data.businesses.length)]);
        } else {
          res.json(undefined);
        }
      }
    });
  }
};

exports.retrieveRestaurantList = function (req, res) {
  Restaurant.findOne({ 'google.id' : req.user.google.id }, function(err, rest) {
    if (err) {
      handleError(res, err);
    } else {
      res.json(rest);
    }
  });

};

exports.storeInRestaurantList = function (req, res) {
  var restaurant = req.body.restaurant;
  Restaurant.findOne({ 'google.id' : req.user.google.id }, function(err, rest) {
    if (err) {
      handleError(res, err);
    } else {
      if (!rest) {
        rest = new Restaurant({
          google: req.user.google,
          restaurantList: [restaurant]
        });
        rest.save(function(err) {
          if (err) {
            handleError(res, err);
          } else {
            res.json({success: true});
          }
        });
      } else {
        Restaurant.update({ 'google.id' : req.user.google.id, 'restaurantList.id': {$ne: restaurant.id}},
          {$push: {restaurantList: restaurant}}, function(err) {
            if (err) {
              handleError(res, err);
            } else {
              res.json({success: true});
            }
          });
      }
    }
  });

};

exports.removeFromList = function (req, res) {
  var restaurantId = req.params.restaurantId;
  Restaurant.update({ 'google.id' : req.user.google.id},
    {$pull: {restaurantList: {id: restaurantId}}}, function(err) {
      if (err) {
        handleError(res, err);
      } else {
        res.json({success: true});
      }
    });
};

function handleError(res, err) {
  return res.send(500, err);
}
