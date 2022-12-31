const mongoose=require("mongoose")

const Schema= mongoose.Schema

const GradesSchema = new Schema({
    StudentId:{
        type:String,
        required:true

    },
    QuizId:{
        type:String,
        required:true
    },
    Status:{
        type:String,
        default:"Not Finished"
    },
    Grade:{
        type:Number,
    }
},{timestamps:true})

module.exports=mongoose.model('Grades',GradesSchema)