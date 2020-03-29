const connection = require("./connection.js");

// Helper function for SQL syntax.
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  var arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {sleepy: true} => ["sleepy=true"]
      arr.push(key + "=" + value);
    }
  }

  return arr.toString();
}

const dal = {
  newBurger: function(burgerName, callback) {
    const queryString =
    "INSERT INTO burgers (name)" +
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
      "SELECT id, burger_name, devoured" + 
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
