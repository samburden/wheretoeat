'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RestaurantSchema = new Schema({
  google: {
    id: String,
    token: String,
    email: String,
    name: String
  },
  restaurantList: [
    {


    }
  ]
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);
