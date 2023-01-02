const mongoose=require('mongoose')
const Schema = mongoose.Schema

const courseSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    subtitle:
    [{
        type:mongoose.Types.ObjectId,
        ref:'Subtitles'
    }],
    exercises:[{
        type:mongoose.Types.ObjectId,
        ref:'quiz'

    }],
    summary:{
        type:String,
        required:true

    },
    subject:{
        type:String,
        required:true

    },
    hours:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true

    },
    discount:{
        type:Object,
        default:0
    },
    rating:{
        type:[Number],  
    },
    instructorID:{
        type:mongoose.Types.ObjectId,
        ref:'instructors'
    },
    reviews:{
        type:[String]
    },
    Link:{
        type:String
    }

}, { timestamps: true })

module.exports=mongoose.model('courses',courseSchema)

