const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); //used for hashing passwords to ensure that passwords are encrypted
const validator = require('validator'); //used to check for email and passwords validation

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
})


//making a custom static method for signup --> used to handle signup 
//Note: when we use 'this' keyword, we should use the regular functions and not arrow functions
userSchema.statics.signup = async function(email, password) {

    // email and password validation
    if(!email || !password){
        throw Error("All fields must be filled");
    }
    if(!validator.isEmail(email)){
        throw Error('Email is not valid');
    }
    if(!validator.isStrongPassword(password)){
        throw Error("Password not strong enough");
    }


    const exists = await this.findOne({ email }); //to make sure only unique emails will be sent for signup

    if (exists) {
        throw Error("Email already in use");
    }

    //password hashing
    const salt = await bcrypt.genSalt(10); //generates a salt that is used to hash passwords
    const hash = await bcrypt.hash(password, salt);

    //creating the user in the database
    const user = await this.create({ email, password: hash });
    return user;


}




//static login method
userSchema.statics.login = async function(email, password){

    if(!email || !password){
        throw Error("All fields must be filled");
    }

    const user = await this.findOne({ email }); //if the email exists in database, we will get the user

    //else the user doesn't exist
    if (!user) {
        throw Error("Incorrect Email");
    }

    //to match the password if the user email exists in the database
    const match = await bcrypt.compare(password, user.password);

    if(!match){
        throw Error("Incorrect Password");
    }

    return user;


    


}




module.exports = mongoose.model('User', userSchema);