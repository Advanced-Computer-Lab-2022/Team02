const mongoose=require('mongoose')

const Schema = mongoose.Schema

const courseSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    subtitle:{
        type:String,
        required:true

    },
    exercises:{
        type:String,
        required:true

    },
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
        type:Number,
        
    },
    rating:{
        type:Number,
        
    },
    instructorID:{
        type:String,
        required:true
    }

}, { timestamps: true })

module.exports=mongoose.model('courses',courseSchema)

