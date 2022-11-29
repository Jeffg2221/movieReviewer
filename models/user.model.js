// Import mongoose to build a model
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

// The Schema
const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "{PATH} is required"],
        minlength: [3, "{PATH} must be at least 3 charaters long"]

    },

    email:{
        type: String,
        required: [true, "You must add an {PATH}"],
        unique: [true, "Email already in use"],
        trim: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please enter a valid email"
        ]
    },

    password:{
        type: String,
        required: [true, "{PATH} is required"],
        minlength: [8, "{PATH} must contain at least 8 charaters !"]
    },


}, {timestamps: true})

UserSchema.virtual('confirmPassword')
    .get( () => this._confirmPassword )
    .set( value => this._confirmPassword = value );

UserSchema.pre('validate', function(next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password');
        }
        next();
    });

UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
        this.password = hash;
        next();
        });
    });



//Create the schema and export it
const User = mongoose.model("User", UserSchema);
module.exports = User