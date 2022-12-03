var Course = require ('../models/courseModel')
var Instructor = require('../models/instructorModel')
var indTrainee = require ('../models/IndividualTrainee')
var corTrainee = require ('../models/corporateTraineeModel')

const rateInstructor = async(req,res) =>{
    const rating = req.body.rating
    const f = await Instructor.findByIdAndUpdate({_id:req.query.Id},{$push:{rating:rating}})
    res.status(200).json(f)
}
const rateCourse = async(req,res) =>{
    const rating = req.body.rating
    const f = await Course.findByIdAndUpdate({_id:req.body.CourseId},{$push:{rating:rating}})
    res.status(200).json(f)
}
function changePassworddInd(req,res)
{
    const passBody = req.body.password
    indTrainee.updateOne(
        {"_id": req.query.Id },
        {$set: { "password" : passBody}}).then(result => {
            res.send();
        });

}
function changePassworddCor(req,res)
{
    const passBody = req.body.password
    corTrainee.updateOne(
        {"_id": req.query.Id },
        {$set: { "password" : passBody}}).then(result => {
            res.send();
        });

}
const addItrainee = async(req,res) =>
{
    var Itrainee = new indTrainee()
    Itrainee.UserName=req.body.Username
    Itrainee.password=req.body.password
    Itrainee.Email=req.body.email
    await indTrainee.create(Itrainee)
    res.send("bye")

}

module.exports= {rateInstructor,rateCourse,changePassworddInd,changePassworddCor,addItrainee}