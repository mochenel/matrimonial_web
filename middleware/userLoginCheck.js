
const mysql   = require("mysql");
const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const connection = require("../database"); // get our config file


const userLoginCheck = function (req, res) {

	const post  = {
		password:req.body.password,
		email:req.body.email
	}

	let query = "SELECT * FROM ?? WHERE ??=?";

	let table = ["users", "email", post.email];

	query = mysql.format(query,table);

	connection.query(query,async function(err,rows){
		if(err) {
				res.json({
					success: false,
					message: 'Error executing MySQL query',
					token: null,
					currUser: null
				});
		}
		else {

			if(rows.length==1){
				const match = await bcrypt.compare(post.password, rows[0].password);
				if(match){

					let token = jwt.sign(rows, process.env.TOKEN_SECRET, {expiresIn: 1440});
					user_id= rows[0].user_Id;
					let data  = {
							user_id:rows[0].user_Id,
							access_token:token
						}
						res.json({
							success: true,
							message: 'Token generated',
							token: token,
							currUser: user_id
						});

				}
				else{
					res.json({
							success: false,
							message: 'Incorrect password',
							token: null,
							currUser: null
						});
				}
								
			}
			else {
				res.json({
						success: false,
						message: 'Email not found',
						token: null,
						currUser: null
					});

			}

		}
	});
}

module.exports = userLoginCheck;


