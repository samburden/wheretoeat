'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var HistorySchema = new Schema({
  google: {
    id: String,
    token: String,
    email: String,
    name: String
  },
  historyList: [
    {


    }
  ]
});

module.exports = mongoose.model('History', HistorySchema);
