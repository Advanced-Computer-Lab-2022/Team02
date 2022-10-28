const mongoose=require("mongoose")
const Schema= mongoose.Schema

const GuestSchema = new Schema({
    Country: {
      type: String,
      required: true,
    },
  
  }, { timestamps: true });
  
  module.exports=mongoose.model('guests',GuestSchema)