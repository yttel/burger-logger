const connection = require("./connection.js");

const dal = {
  newBurger: function(burgerName, callback) {
    const queryString =
    "INSERT INTO burgers (burger_name) " +
    "VALUES (?)"

    connection.query(                          
      queryString,
      [burgerName],
      function(err, result) {
        if (err) throw err;
        console.table(result);
        callback(result);
      }
    );
  },

  selectAll: function(callback) { 
    const queryString =
      "SELECT * " + 
      "FROM burgers";

    connection.query(
      queryString,
      function(err, result) {
        if (err) throw err;
        //console.log(`isActive: ${isActive}`)
        //console.table(result);
        callback(result);
      }             
    );
  },

  getAllByDevoured: function(devoured, callback) { 
    const queryString =
      "SELECT id, burger_name, devoured" + 
      "FROM burgers" +
      "WHERE devoured = ?";

    connection.query(
      queryString,
      [devoured],
      function(err, result) {
        if (err) throw err;
        //console.log(`isActive: ${isActive}`)
        //console.table(result);
        callback(result);
      }             
    );
  },

  //
  eat: function(condition, callback) {
    const queryString = 
      "UPDATE burgers " +
      "SET devoured = true "+
      "WHERE ?";

    console.log(queryString);
    connection.query(
      queryString,
      condition,
      function(err, result) {
      if (err) {
        throw err;
      }
      callback(result);
    });
  }
};

module.exports = dal;
