const mongoose=require("mongoose")

const Schema= mongoose.Schema

const administratorSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true

    },
    reports:[{
        type:mongoose.Types.ObjectId,
        ref:'reports'
    }],
    requests:[{
        type:mongoose.Types.ObjectId,
        ref:'requests'
    }]










},{timestamps:true})

module.exports=mongoose.model('administrators',administratorSchema)