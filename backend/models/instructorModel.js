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
    },
    acceptedContract:{
        type:Number,
        default:0
    },
    reports:[{
        type:mongoose.Types.ObjectId,
        ref:'reports'
    }],
    AdministratorID:{
        type:mongoose.Types.ObjectId,
        ref:'administrators'
    }









},{timestamps:true})

module.exports=mongoose.model('instructors',instructorSchema)