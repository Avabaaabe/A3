
/******************************************************************************************************************
* File:REST.js
* Course: 17655
* Project: Assignment A3
* Copyright: Copyright (c) 2018 Carnegie Mellon University
* Versions:
*   1.0 February 2018 - Initial write of assignment 3 for 2018 architectures course(ajl).
*
* Description: This module provides the restful webservices for the Server.js Node server. This module contains GET,
* and POST services.  
*
* Parameters: 
*   router - this is the URL from the client
*   connection - this is the connection to the database
*   md5 - This is the md5 hashing/parser... included by convention, but not really used 
*
* Internal Methods: 
*   router.get("/"... - returns the system version information
*   router.get("/orders"... - returns a listing of everything in the ws_orderinfo database
*   router.get("/orders/:order_id"... - returns the data associated with order_id
*   router.post("/order?"... - adds the new customer data into the ws_orderinfo database
*
* External Dependencies: mysql
*
******************************************************************************************************************/
const fs = require('fs'); // feature 3
var mysql   = require("mysql");     //Database

function REST_ROUTER(router,connection) {
    var self = this;
    self.handleRoutes(router,connection);
}


// Here is where we define the routes. Essentially a route is a path taken through the code dependent upon the 
// contents of the URL

REST_ROUTER.prototype.handleRoutes= function(router,connection) {

    // GET with no specifier - returns system version information
    // req paramdter is the request object
    // res parameter is the response object

    router.get("/",function(req,res){
        res.json({"Message":"Orders Webservices Server Version 1.0"});
    });
    
    // GET for /orders specifier - returns all orders currently stored in the database
    // req paramdter is the request object
    // res parameter is the response object
  
    router.get("/orders",function(req,res){
        // const fs = require('fs');
        // add a line to a txt file, using appendFile
        fs.appendFile('log.txt', '\nRetriveServices', (err) => {  
        if (err) throw err;
        console.log('log.txt updated.');
        });

        console.log("Getting all database entries..." );
        var query = "SELECT * FROM ??";
        var table = ["orders"];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Orders" : rows});
            }
        });
    });

    // GET for /orders/order id specifier - returns the order for the provided order ID
    // req paramdter is the request object
    // res parameter is the response object
     
    router.get("/orders/:order_id",function(req,res){
        // const fs = require('fs');
        // add a line to a txt file, using appendFile
        fs.appendFile('log.txt', '\nRetriveServices', (err) => {  
        if (err) throw err;
        console.log('log.txt updated.');
        });

        console.log("Getting order ID: ", req.params.order_id );
        var query = "SELECT * FROM ?? WHERE ??=?";
        var table = ["orders","order_id",req.params.order_id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Users" : rows});
            }
        });
    });

    // POST for /orders?order_date&first_name&last_name&address&phone - adds order
    // req paramdter is the request object - note to get parameters (eg. stuff afer the '?') you must use req.body.param
    // res parameter is the response object 
  
    router.post("/orders",function(req,res){
        // const fs = require('fs');
        // add a line to a txt file, using appendFile
        fs.appendFile('log.txt', '\nCreateServices', (err) => {  
        if (err) throw err;
        console.log('log.txt updated.');
        });
        //console.log("url:", req.url);
        //console.log("body:", req.body);
        console.log("Adding to orders table ", req.body.order_date,",",req.body.first_name,",",req.body.last_name,",",req.body.address,",",req.body.phone);
        var query = "INSERT INTO ??(??,??,??,??,??) VALUES (?,?,?,?,?)";
        var table = ["orders","order_date","first_name","last_name","address","phone",req.body.order_date,req.body.first_name,req.body.last_name,req.body.address,req.body.phone];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "User Added !"});
            }
        });
    });

    // Delete for /orders/order id specifier - returns the order for the provided order ID
    // req paramdter is the request object
    // res parameter is the response object
     
    router.delete("/orders/:order_id",function(req,res){
        // const fs = require('fs');
        // add a line to a txt file, using appendFile
        fs.appendFile('log.txt', '\nDeleteServices', (err) => {  
        if (err) throw err;
        console.log('log.txt updated.');
        });
        console.log("Getting order ID: ", req.params.order_id );
        var query = "DELETE FROM ?? WHERE ??=?";
        var table = ["orders","order_id",req.params.order_id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" :  "Users Delete !"});
            }
        });
    });

    // POST for /orders?order_date&first_name&last_name&address&phone - adds order
    // req paramdter is the request object - note to get parameters (eg. stuff afer the '?') you must use req.body.param
    // res parameter is the response object 
  
    router.post("/signup",function(req,res){
        // const fs = require('fs');
        // add a line to a txt file, using appendFile
        fs.appendFile('log.txt', '\nSignUpServices', (err) => {  
        if (err) throw err;
        console.log('log.txt updated.');
        });
        //console.log("url:", req.url);
        //console.log("body:", req.body);
        console.log("Adding to users table ", req.body.order_date,",",req.body.user_name,",",req.body.password);
        var query = "INSERT INTO ??(??,??,??) VALUES (?,?,?)";
        var table = ["users","user_date","user_name","password",req.body.user_date,req.body.user_name,req.body.password];
        query = mysql.format(query,table);
        console.log("query:"+ req.body.user_date+ " "+req.body.user_name+ " "+req.body.password);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "User Added !"});
            }
        });
    });

     // POST for /orders?order_date&first_name&last_name&address&phone - adds order
    // req paramdter is the request object - note to get parameters (eg. stuff afer the '?') you must use req.body.param
    // res parameter is the response object 
  
    router.post("/login",function(req,res){

        // add a line to a txt file, using appendFile
        fs.appendFile('log.txt', '\nLoginServices', (err) => {  
        if (err) throw err;
        console.log('log.txt updated.');
        });
        //console.log("url:", req.url);
        //console.log("body:", req.body);
        console.log("checking the users table ",req.body.user_name,",",req.body.password);
        var query = "SELECT COUNT(*) FROM ?? WHERE ?? == ? AND ?? == ?";
        var table = ["users","user_name","password",req.body.user_name,req.body.password];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                if(rows[0] == 1){
                    res.json({"Error" : false, "Message" : "User Logged in !"});
                }
                res.json({"Error" : false, "Message" : "Wrong Account !"});
            }
        });
    });
}

// The next line just makes this module available... think of it as a kind package statement in Java

module.exports = REST_ROUTER;