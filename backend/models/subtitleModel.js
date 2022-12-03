const mongoose=require("mongoose")
const Schema= mongoose.Schema

const SubtitleSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    hours: {
        type : Number,
        required : true
    },
    link: {
        type : String
    },
    description: {
        type: String
    }

  
  }, { timestamps: true });
  
  module.exports=mongoose.model('Subtitles',SubtitleSchema)