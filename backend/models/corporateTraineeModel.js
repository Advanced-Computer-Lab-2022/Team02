const mongoose=require("mongoose")
const Schema= mongoose.Schema

const CorporateTraineeSchema = new Schema({
    
    UserName: {
    type: String,
    required: true,
    },
    Email: {
      type: String
    },
    password: {
      type: String,
      required: true
    },
    FirstName: {
      type: String
    },
    LastName: {
      type: String
    },
    Gender: {
      type: String
    },
    Courses: [{
      type:mongoose.Types.ObjectId,
      ref:'courses'
    }],
    AdministratorID:{
      type:mongoose.Types.ObjectId,
      ref:'administrators'
    },
    reports:[{
      type:mongoose.Types.ObjectId,
      ref:'reports'
    }],
    requests:[{
        type:mongoose.Types.ObjectId,
        ref:'requests'
    }],
    accepted:{
      type:Number,
      default:0
    }
  }, { timestamps: true });

  module.exports=mongoose.model('CorporateTrainee',CorporateTraineeSchema)