const mongoose=require("mongoose")
const Schema= mongoose.Schema

const IndividualTraineeSchema = new Schema({
      UserName: {
      type: String,
      required: true,
      },
      Email: {
        type: String,
        required: true
      },
      password: {
        type: String,
        required: true
      },
      FirstName: {
        type: String,
        required: true
      },
      LastName: {
        type: String,
        required: true
      },
      Gender: {
        type: String,
        required: true
      },
      Courses: [{
        type:mongoose.Types.ObjectId,
        ref:'courses'
      }],
      reports:[{
        type:mongoose.Types.ObjectId,
        ref:'reports'
      }]
  }, { timestamps: true });

  module.exports=mongoose.model('IndividualTrainee',IndividualTraineeSchema)