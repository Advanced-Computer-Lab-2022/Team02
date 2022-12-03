const mongoose=require("mongoose")

const Schema= mongoose.Schema

const quizSchema = new Schema({
   Questions:[{
        type:mongoose.Types.ObjectId,
        ref:'questions',
    }],
    CourseId:{
        type:String,
        required:true
    }

},{timestamps:true})

module.exports=mongoose.model('quiz',quizSchema)