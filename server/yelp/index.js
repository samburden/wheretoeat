var yelp = require('yelp');

// load the auth variables
var config = require('../config/environment');

module.exports = yelp.createClient({
  consumer_key: config.yelp.consumerKey,
  consumer_secret: config.yelp.consumerSecret,
  token: config.yelp.token,
  token_secret: config.yelp.tokenSecret
});
