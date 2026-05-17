import mongoose, { Schema } from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const userSchema = new Schema({
    watchHistory:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Video'
    }],
    username:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        trim:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    fullName:{
        type:String,
        required:true,
        trim:true,
        index:true

    },
    avatar:{
        type:String, //cloudinary url 
        required:true
    },
    coverImage:{
        type:String // cloudinary
    },
    password:{
        type:String,
        required:[true, 'password is required'],
    },
    refreshToken:{
        type:String
    }
},{timestamps:true})

export const User = mongoose.model('User', userSchema)