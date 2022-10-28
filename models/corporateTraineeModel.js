const mongoose=require("mongoose")
const Schema= mongoose.Schema

const CorporateTraineeSchema = new Schema({
    
  username: {
      type: String,
      required:true,

    },

  password: {
      type: String,
      required:true,
    },
  country: {
    type: String,
      
    }

  
  }, { timestamps: true });

  module.exports=mongoose.model('CorporateTrainee',CorporateTraineeSchema)