const mongoose=require("mongoose")
const Schema= mongoose.Schema

  const CorporateTraineeSchema = new Schema({
    Country: {
      type: String,
      required: true,
    },

    UserName: {
        type: String,
        required:true,

    },

    password: {
        type: String,
        required:true,
    }
  
  }, { timestamps: true });

  module.exports=mongoose.model('CorporateTrainee',CorporateTraineeSchema)