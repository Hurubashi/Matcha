const mysql = require("../config/db")
const express = require("express");
const router = express.Router();

// @route   api/users
// @desc    Get all users
// @access  Public
router.use("/", (req, res) => {

    mysql.getConnection(function(err, connection) {
        if (err) throw err; // Not connected
    
        connection.query("SELECT * FROM user", function (err, result, fields) {
          console.log(result);
          res.json(result)
          connection.release();
          if (err) throw err;
        });
    });


})
 
module.exports = router;