const {application, request} = require("express")
var app = require ('express')
const mongoose=require('mongoose')
var Course = require ('../models/courseModel')
var Instructor = require('../models/instructorModel')
var Subtitle = require('../models/subtitleModel')
var Quiz = require ('../models/quizModel')
var indTrainee= require('../models/IndividualTrainee')
var Question = require('../models/questionModel')
const Grades = require("../models/Grades")
var reports= require('../models/reports')
var admin = require('../models/administratorModel')
var corTrainee= require('../models/corporateTraineeModel')

const corporateTraineeModel = require("../models/corporateTraineeModel")


const Search = async (req,res) =>
{
        var courses
        const Search  = req.body.Search
        const ids = await Instructor.find({username:{$eq:Search}}).select('_id')
        console.log(Search);
        console.log(ids)

            courses = await Course.find().or([{title:{ $regex: Search, $options: "i"}},{subject:{ $regex: Search, $options: "i"}},{instructorID:{ $in: ids}}])
            console.log(courses)
        
        if(!courses)
        {
            res.status(404).json({error:'No results found'})
        }
        res.status(200).json(courses)
    
}

const filterPrice = async (req,res) =>
{
    
    const price = req.body.price
    const courses = await Course.find({price:{ $lte: price}})

    if(!courses)
        {
            res.status(404).json({error:'No results found'})
        }
    else    
        res.status(200).json(courses)
    
    
}
function average(nums) {
    if(nums.length>0)
        return nums.reduce((a, b) => (a + b)) / nums.length;
}
const filterSubjectRating = async (req,res) =>
{
    const ratingIdarray=[];
    const subject = req.body.subject
    const rating = Number(req.body.rating)
    const courses2 = await Course.find({},{rating:1})
    for (let index = 0; index < courses2.length; index++) {
        const element = courses2[index];
        if(element.rating !== undefined){
        const avgRating = average(element.rating)
        if( avgRating === rating )
        {
            ratingIdarray.push(element._id)
        }
    }
    }
    const courses4 = await Course.find({ '_id': { $in: ratingIdarray } })
    const courses =  await Course.find({subject:{ $eq: subject}})
    const courses1 = await Course.find({subject:{ $eq: subject}}).and({rating:{$eq:rating}})
    const courses3 = await Course.find({subject:{ $eq: '-1'}})
    if(!rating && subject !=='')
    {
        res.status(200).json(courses)
    }
    else if(rating !== '' && !subject)
    {
        res.status(200).json(courses4)
    }
    else if (rating !== '' && subject !== '')
    {
        res.status(200).json(courses1)
    }
    else
    {
        res.status(200).json(courses3)
    }

    
}

const viewCourses = async (req,res) =>
{
    const courses = await Course.find({},{_id:1,title:1,hours:1,rating:1,price:1,subtitle:1,exercises:1,discount:1}).populate('subtitle')  
    if(!courses)
    {
        res.status(404).json({error:'No results found'})
    }
    res.status(200).json(courses)

}
const viewCoursesCor = async (req,res) =>
{
    const courses = await Course.find({},{_id:0,title:1,hours:1,rating:1,subtitle:1,exercises:1,discount:1}).populate('subtitle')
    if(!courses)
    {
        res.status(404).json({error:'No results found'})
    }
    res.status(200).json(courses)

}
const viewAllDetails = async (req,res) =>
{
    const courses = await Course.find()
    if(!courses)
    {
        res.status(404).json({error:'No results found'})
    }
    res.status(200).json(courses)

}

const Link = async (req,res) =>
{
    
    const Link = req.body.Link
    //console.log(Link)
    //const message = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${}" frameborder="0" allowfullscreen></iframe>`
    const courses = await Course.findOneAndUpdate({"_id":req.query.courseId},{Link:Link})

    if(!courses)
        {
            res.status(404).json({error:'No results found'})
        }
    else    
        res.status(200).json(courses)
    
    
}

const getLink = async (req,res) =>
{
    console.log(req.query.Id)
    const courses = await Course.find({_id:req.query.Id},{_id:0,Link:1})
    //const courses = await Course.find({_id:{ $eq: req.query.Id}}).select('Link')
    console.log(courses[0])
    if(!courses)
        {
            res.status(404).json({error:'No results found'})
        }
    else    
        res.status(200).json(courses[0])
    
}
const addSubtitle = async (req,res) =>
{       
    const CourseId = req.query.courseId
    var subtitl = new Subtitle();
    subtitl.name = req.body.name
    subtitl.hours = req.body.hours
    subtitl.description=req.body.description
    subtitl.link = req.body.link
    const s = await Subtitle.create(subtitl)
    const id = await Subtitle.find({},{_id:1}).sort({_id:-1}).limit(1).select('_id')
    console.log(id)
    await Course.updateOne({_id:CourseId},{$push:{subtitle:id}})

}
const viewSubtitles = async (req,res) =>
{
    const courseSub = await Course.find({_id:{$eq:req.query.courseId}},{_id:0,subtitle:1}).populate('subtitle')
    if(!courseSub)
    {
        res.status(404).json({error:'No Subtitles available'})
    }
    res.status(200).json(courseSub[0].subtitle)

    
}
const viewSubtitlesVid = async (req,res) =>
{
    const subVid = await Subtitle.find({_id:{$eq:req.query.subtitleId}},{_id:0,link:1})
    if(!subVid)
    {
        res.status(404).json({error:'No Video'})
    }
    res.status(200).json(subVid[0])

    
}
const viewExercises = async(req,res)=>
{
    const courseEx = await Course.find({_id:{$eq:req.query.courseId}},{_id:0,exercises:1}).populate('exercises')
    if(!courseEx)
    {
        res.status(404).json({error:'No Subtitles available'})
    }
    res.status(200).json(courseEx[0].exercises)

}
const getGrade= async(req,res) =>
{
    const t = req.body.exerciseID
    console.log(t)
    const f = await Grades.findOne({StudentId:{$eq:req.user},QuizId:{$eq:t}})
    res.status(200).json(f)
}
const getCorrectAnswers= async(req,res) =>
{
    const t = req.query.exerciseID
    console.log(t)
    const f = await Quiz.findById({_id:t}).populate('Questions')
    res.status(200).json(f.Questions)
}

const viewQuestions = async(req,res)=>
{
    const ques = await Quiz.find({_id:{$eq:req.query.exerciseID}},{_id:0,Questions:1}).populate('Questions')
    if(!ques)
    {
        res.status(404).json({error:'No Questions available'})
    }
    console.log(ques);
    res.status(200).json(ques[0].Questions)
}
const acceptPolicy = async(req,res)=>
{
    console.log(req.user)
    const user = await indTrainee.findOne({_id:{$eq:req.user}},{_id:0,accepted:1})
    const user1 = await corporateTraineeModel.findOne({_id:{$eq:req.user}},{_id:0,accepted:1})
    const user2 = await Instructor.findOne({_id:{$eq:req.user}},{_id:0,accepted:1})
    console.log(user)
    console.log(user1)
    console.log(user2)
    if(user != null)
    {
        console.log("inf")
        await indTrainee.updateOne({_id:{$eq:req.user}},{$set:{accepted:1}})
    }
    else if(user1 != null)
    {
        console.log("ind")
        await corporateTraineeModel.updateOne({_id:{$eq:req.user}},{$set:{accepted:1}})
    }
    else if(user2 != null)
    {
        console.log("int")
        await Instructor.updateOne({_id:{$eq:req.user}},{$set:{accepted:1}})
    }
    res.status(200).json("accepted")
}

const INreportCourse = async (req,res)=>
{
    var rep = new reports()
    rep.type= req.body.Type
    rep.details=req.body.Details
    rep.userId=req.user
    rep.username=req.body.Username
    rep.course= req.body.CourseName
    await reports.create(rep)
    const repID= await reports.find({},{_id:1}).sort({_id:-1}).limit(1).select('_id')
    console.log(repID)
    const admID= await indTrainee.findOne({_id:{$eq:req.user}},{_id:0,AdministratorID:1})
    console.log(admID)
    await admin.updateOne({_id:admID.AdministratorID},{$push:{reports:repID}})
    await indTrainee.updateOne({_id:req.user},{$push:{reports:repID}})
    res.status(200).json("f")


}

const CORreportCourse = async (req,res)=>
{
    var rep = new reports()
    rep.type= req.body.Type
    rep.details=req.body.Details
    rep.userId=req.user
    rep.username=req.body.Username
    rep.course= req.body.CourseName
    await reports.create(rep)
    const repID= await reports.find({},{_id:1}).sort({_id:-1}).limit(1).select('_id')
    console.log(repID)
    const admID= await corTrainee.findOne({_id:req.user},{_id:0,AdministratorID:1})
    console.log(admID)
    await admin.updateOne({_id:admID.AdministratorID},{$push:{reports:repID}})
    await corTrainee.updateOne({_id:req.user},{$push:{reports:repID}})
    res.status(200).json("f")


}
const INSreportCourse = async (req,res)=>
{
    var rep = new reports()
    rep.type= req.body.Type
    rep.details=req.body.Details
    rep.userId=req.user
    rep.username=req.body.Username
    rep.course= req.body.CourseName
    await reports.create(rep)
    const repID= await reports.find({},{_id:1}).sort({_id:-1}).limit(1).select('_id')
    console.log(repID)
    const admID= await Instructor.findOne({_id:{$eq:req.user}},{_id:0,AdministratorID:1})
    console.log(admID)
    await admin.updateOne({_id:admID.AdministratorID},{$push:{reports:repID}})
    await Instructor.updateOne({_id:req.user},{$push:{reports:repID}})
    res.status(200).json("f")



}








module.exports = {filterPrice,getGrade,acceptPolicy,getCorrectAnswers,filterSubjectRating,Search,viewCourses,viewCoursesCor,viewAllDetails,Link,getLink,viewSubtitles,addSubtitle,viewSubtitlesVid,viewExercises,viewQuestions,INSreportCourse,INreportCourse,CORreportCourse}