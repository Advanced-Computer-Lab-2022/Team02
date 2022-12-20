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
    }]
  }, { timestamps: true });

  module.exports=mongoose.model('CorporateTrainee',CorporateTraineeSchema)