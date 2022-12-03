const mongoose=require("mongoose")

const Schema= mongoose.Schema

const quesSchema = new Schema({
    Question:{
        type:String,
        required:true
    },
    Choice1:{
        type:String,
        required:true
    },
    Choice2:{
        type:String,
        required:true
    },
    Choice3:{
        type:String,
        required:true
    },
    Choice4:{
        type:String,
        required:true
    },
    CorrectAnswer:{
        type:String,
        required:true
    }


},{timestamps:true})

module.exports=mongoose.model('questions',quesSchema)