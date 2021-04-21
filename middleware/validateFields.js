const express = require("express");

let validateFields = function (req,res,next) {
	let errors = {
		success:true,
		message:{
			  first_name:null,
		      last_name:null,
		      email:null,
		      password:null,
		      date_of_birth:null,
		      phone_number:null,
		      address_city:null,
		      address_state:null,
		      address_code:null,
		      college:null
		}
	}
	console.log(req.body)

	if(req.body.first_name.trim() === ''){
		errors.success = false;
		errors.message.first_name = "first name is required";
	}
	if(req.body.last_name.trim() === ''){
		errors.success = false;
		errors.message.last_name = "last name is required";
	}
	if(req.body.password.trim() === ''){
		errors.success = false;
		errors.message.password = "password  is required";
	}
	if(req.body.date_of_birth.trim() === ''){
		errors.success = false;
		errors.message.date_of_birth = "date_of_birth  is required";
	}
	if(req.body.address_city.trim() === ''){
		errors.success = false;
		errors.message.address_city = "address_city  is required";
	}
	if(req.body.address_state.trim() === ''){
		errors.success = false;
		errors.message.address_state = "address_state  is required";
	}
	if(req.body.address_code.trim() === ''){
		errors.success = false;
		errors.message.address_code = "address_code  is required";
	}
	if(req.body.college.trim() === ''){
		errors.success = false;
		errors.message.college = "college  is required";
	}
	const mail = validateEmail(req.body.email);
	if(mail){
		errors.success = false;
		errors.message.email = mail;
	}


	const phone = phonenumber(req.body.phone_number);
	if(phone){
		errors.success = false;
		errors.message.phone_number = phone;
	}
	console.log(errors)
	if(errors.success === false){
		return res.json(errors);
	}
	next();
}
function validateEmail(email) {
	if(email.trim() === ''){
		return "Email is required";
	}
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(String(email).toLowerCase())?null:"Invalid Email";
}
function phonenumber(phone) {
	if(phone.trim() === ''){
		return "phone number is required";
	}
	  const pattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
	  return pattern.test(phone)?null:"Invalid phone number";
 }
 module.exports = validateFields;