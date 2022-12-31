const mongoose=require("mongoose")
//const { required } = require("nodemon/lib/config")

const Schema= mongoose.Schema

const reqSchema = new Schema({
    course:{
        type:mongoose.Types.ObjectId,
        ref:'courses'
    },
    status:{
        type:String,
        enum: [ 'pending', 'accepted','rejected'],
        default:'pending'

    },
    from:{
        type:mongoose.Types.ObjectId,
        ref:'CorporateTrainee',
        required:true
    },
    username:{
        type:String,
        required:true
    },
    coursename:{
        type:String,
        required:true
    }
},{timestamps:true})

module.exports=mongoose.model('requests',reqSchema)