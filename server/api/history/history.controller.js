'use strict';

var _ = require('lodash');
var History = require('./history.model');

exports.storeInHistory = function (req, res) {
  History.findOne({ 'google.id' : req.user.google.id }, function(err, history) {
    if (err) {
      handleError(res, err);
    } else {
      if (!history) {
        history = new History({
          google: req.user.google
        });
      }
      var meal = {
        dateEaten: new Date(),
        restaurant: req.body.restaurant
      }
      if (history.historyList && history.historyList.length > 0) {
        history.historyList.push(meal);
      } else {
        history.historyList = [meal];
      }
      history.save(function(err) {
        if (err) {
          handleError(res, err);
        } else {
          res.json({success: true});
        }
      });
    }
  });
};

exports.generateReportForRestaurantCount = function (req, res) {
  History.aggregate([
    { $match: {
      'google.id' : req.user.google.id
    }},
    { $unwind: '$historyList' },
    { $group: {
      _id: {id: '$historyList.restaurant.id', name: '$historyList.restaurant.name'},
      value: { $sum: 1  }
    }},
    { $project: {label: '$_id.name', value: 1, _id: 0}},
    { $sort : { value : 1 } }
  ], function (err, result) {
      if (err) {
        handleError(res, err);
      } else {
        res.json(result);
      }
  });
};

exports.generateReportForRestaurantType = function (req, res) {
  History.aggregate([
    { $match: {
      'google.id' : req.user.google.id
    }},
    { $unwind: '$historyList' },
    { $unwind: '$historyList.restaurant.categories'},
    { $group: {
      _id: '$historyList.dateEaten',
      category: { $first: '$historyList.restaurant.categories' }
    }},
    { $unwind: '$category'},
    { $group: {
      _id: '$_id',
      categoryName: { $first: '$category' }
    }},
    { $group: {
      _id: '$categoryName',
      value: { $sum: 1 }
    }},
    { $project: {label: '$_id', value: 1, _id: 0}},
    { $sort : { value : 1 } }
  ], function (err, result) {
      if (err) {
        handleError(res, err);
      } else {
        res.json(result);
      }
  });
};

exports.generateReportForRestaurantDays = function (req, res) {
  History.aggregate([
    { $match: {
      'google.id' : req.user.google.id
    }},
    { $unwind: '$historyList' },
    { $project: {day: {$dayOfWeek: '$historyList.dateEaten'}}},
    { $group: {
      _id: '$day',
      value: { $sum: 1  }
    }},
    { $project: {label: '$_id', value: 1, _id: 0}},
    { $sort : { label : 1 } }
  ], function (err, result) {
      if (err) {
        handleError(res, err);
      } else {
        var daysOfWeek = [{
          label: 'Sunday',
          value: 0
          },
          {
            label: 'Monday',
            value: 0
          },
          {
            label: 'Tuesday',
            value: 0
          },
          {
            label: 'Wednesday',
            value: 0
          },
          {
            label: 'Thursday',
            value: 0
          },
          {
            label: 'Friday',
            value: 0
          },
          {
            label: 'Saturday',
            value: 0
          }];
        for (var i = 0; i < result.length; i++) {
          daysOfWeek[result[i].label - 1].value = result[i].value;
        }
        res.json(daysOfWeek);
      }
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
