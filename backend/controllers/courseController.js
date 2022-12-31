const {application, request} = require("express")
var app = require ('express')
const mongoose=require('mongoose')
var Course = require ('../models/courseModel')
var Instructor = require('../models/instructorModel')
var Subtitle = require('../models/subtitleModel')
var Quiz = require ('../models/quizModel')
var indTrainee= require('../models/IndividualTrainee')
var Question = require('../models/questionModel')


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







module.exports = {filterPrice,filterSubjectRating,Search,viewCourses,viewCoursesCor,viewAllDetails,Link,getLink,viewSubtitles,addSubtitle,viewSubtitlesVid,viewExercises,viewQuestions}