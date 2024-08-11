
const { lowerCase } = require('lodash');
const express = require ('express');
const mongoose = require ('mongoose');
const {isEmail}= require ('validator');
const bcrypt = require ('bcryptjs')
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    username: {
        type: String,
        required:[true,'Please enter valid username'],
        unique:[true,'Username is not available'],
    },
    email: {
        type: String,
        required:[true,'Please enter valid email adress'],
        unique:true,
        lowerCase:true,
        validate:[isEmail,'Please enter valid E mail']
    },
    password: {
        type: String,
        required: [true,'Please enter valid password with atleast 6 characters'],
        minlength: 6
    },
    dob: {
        type:String,
        required: [true,'Please enter valid date of birth']
    }
});

//{ timestamps: true});
const User = mongoose.model('User',userSchema);
userSchema.pre ('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
//hashing


    
    
    userSchema.statics.login = async function(username,password)  {
        const user = await this.findOne({ username });
        if (user)  {
            const auth = await bcrypt.compare(password,user.password)
            if  (auth) {
                return user
            }
            throw Error ('Incorrect password')
        }
        throw Error('Incorrect Username')

    }


   



module.exports = User;
export default user;
