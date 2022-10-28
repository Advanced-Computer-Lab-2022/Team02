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
      FirstName: {
        type: String,
        required: true,
      },
      LastName: {
        type: String,
        required: true
      },
      Gender: {
        type: String,
        required: true
      },
      password: {
        type: String,
        required: true
      },
      Country: {
        type:String,
        required:true,
      }
  }, { timestamps: true });

  module.exports=mongoose.model('IndividualTrainee',IndividualTraineeSchema)