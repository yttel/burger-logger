const dal = require("../config/dal.js");

const burger = {
  all: function(cb) {
    dal.selectAll(function(res) {
      cb(res);
    });
  },

  create: function(name, cb) {
    dal.newBurger(name, function(res) {
      cb(res);
    });
  },

  update: function(condition, cb) {
    dal.eat(condition, function(res) {
      cb(res);
    });
  }
};

// Export the database functions for the controller (catsController.js).
module.exports = cat;
