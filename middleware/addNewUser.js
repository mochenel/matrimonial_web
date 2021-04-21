
const mysql   = require("mysql");
const express = require("express");
const bcrypt = require('bcrypt');
const connection = require("../database");

const saltRounds = 10;

 let addNewUser = function(req,res, next){
 	let date = new Date();
    let post  = {
      first_name:req.body.first_name,
      last_name:req.body.last_name,
      email:req.body.email,
      password:req.body.password,
      date_of_birth:req.body.date_of_birth,
      phone_number:req.body.phone_number,
      address_city:req.body.address_city,
      address_state:req.body.address_state,
      address_code:req.body.address_code,
      college:req.body.college
      
  };

  bcrypt.hash(post.password, saltRounds, function(err, hash) {

  	if(err){
  		res.json({"success" : false, "Message" : "Password hash code error"});

  	}
  	else{
  		post.password = hash;
		// Store hash in your password DB.
    	let query = "SELECT email FROM ?? WHERE ??=?";

		let table = ["users", "email", post.email];

		query = mysql.format(query,table);

		connection.query(query,function(err,rows){
		if(err) {
			res.json({"success" : false, "Message" : "Error executing MySQL query"});
		}
		else {

			if(rows.length==0){

				let query = "INSERT INTO  ?? SET  ?";
				let table = ["users"];
				query = mysql.format(query,table);
				connection.query(query, post, function(err,rows){
					if(err) {
						res.json({"success" : false, "Message" : "Error executing MySQL query"});
					} else {
						res.json({"success" : true, "Message" : "Success"});
					}
				});

			}
			else{
				res.json({"success" : false, "Message" : "Email Id already registered"});
			}
		}
    });
  	}
    


  });
 }

   module.exports = addNewUser;


