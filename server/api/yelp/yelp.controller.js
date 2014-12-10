'use strict';

var yelp = require('../../yelp');

exports.searchYelp = function(req, res) {
  var criteria = {
    category_filter: 'restaurants',
    location: req.params.location
  };
  if (req.params.term) {
    criteria.term = req.params.term
  }
  yelp.search(criteria, function(error, data) {
    if (error) {
      handleError(res, error);
    } else {
      res.json(data);
    }
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
