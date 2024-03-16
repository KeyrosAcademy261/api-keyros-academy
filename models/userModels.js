
require('dotenv').config()
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')
const bcrypt = require('bcrypt')


const userSchema = new Schema({
    lastname:{
        type: String,
        requiered: true
    },
    firstname:{
        type: String,
        requiered: true
    },
    email:{
        type: String,
        required: true,
        unique : true
    },
    password:{
        type: String,
        requiered: true
    }
})
//static sign up method
userSchema. statics.signup = async function(email, password, firstname, lastname){
    //validation 
    if(!email|| !password){
        throw Error('All field must be filled')
    }
    if(!validator.isEmail(email)){
        throw Error('Email is not valid')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Password not strong enough')
    }


    const exists = await this.findOne({email})
    if(exists){
        throw Error('Email already in use')
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({email, password: hash, lastname, firstname})
    return user

}

//static login method
userSchema.statics.login = async function (email, password){
    if(!email || !password){
        throw Error('All fields must be filled')
    }
    const user = await this.findOne({email})
    if(!user){
        throw Error('Incorrect email or password')
    }
    const match = await bcrypt.compare(password, user.password)

    if(!match){
        throw Error ('Incorrect email or password')
    }

    return user
}

module.exports = mongoose.model('User', userSchema)