const mongoose=require("mongoose")
//const { required } = require("nodemon/lib/config")

const Schema= mongoose.Schema

const reportSchema = new Schema({
    type:{
        type:String,
        required:true
    },
    details:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:"Pending"
    }, 
    username:{
        type:String
    },
    userId:{
        type:String
    },
    course:{
        type:String
    },
    seeen:{
        type:String,
        default:"Unseen"
    },
    reply:{
        type:String,
    },
    folowUp:{
        type:String
    },
    answer:{
        type:String

    }

},{timestamps:true})

module.exports=mongoose.model('reports',reportSchema)