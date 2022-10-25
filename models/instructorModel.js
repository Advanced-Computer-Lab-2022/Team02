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
        required:true
    },
    email:{
        type:String,
        required:true

    },
    biography:{
        type:String,
        required:true

    }








},{timestamps:true})

module.exports=mongoose.Schema('instructors',instructorSchema)