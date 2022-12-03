const mongoose=require("mongoose")

const Schema= mongoose.Schema

const instructorSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    country:{
        type:String,
        
    },
    email:{
        type:String,

    },
    biography:{
        type:String,
        
    },
    rating:{
        type:[Number]
    },
    reviews:{
        type:[String]
    }









},{timestamps:true})

module.exports=mongoose.model('instructors',instructorSchema)