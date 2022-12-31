const {application, request} = require("express")
var app = require ('express')
const mongoose=require('mongoose')
var Course = require ('../models/courseModel')
var Subtitle = require('../models/subtitleModel')
var Instructor = require('../models/instructorModel')
var Question=require('../models/questionModel')
var Quiz = require('../models/quizModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, 'supersecret', {
        expiresIn: maxAge
    });
};

async function addCourse(req,res)
{   
    var subtitl = new Subtitle();
    subtitl.name = req.body.subtitle.name
    subtitl.hours = req.body.subtitle.hours
    const s = await Subtitle.create(subtitl)
    const id = await Subtitle.find({},{_id:1}).sort({_id:-1}).limit(1).select('_id')
    var cours = new Course();
    cours.title = req.body.title
    cours.subtitle = [id[0]]
    if(req.body.exercises!='')
    {
        cours.exercises=req.body.exercises
    }
    cours.summary=req.body.summary
    cours.subject=req.body.subject
    cours.hours=req.body.hours
    cours.price = req.body.price
    cours.rating = req.body.rating
    cours.instructorID = req.user;
    console.log(id)

    return Course.create(cours).then(async function(users)
    {
        const f = await Course.find({})
        res.status(200).json(f)
    })

}
const addSub = async(req,res) => {

    const id = await Subtitle.find({},{_id:1}).sort({_id:-1}).limit(1).select('_id')
    const f = await Course.updateOne({_id:req.query.Id},{$push :{subtitle:id}})
    res.status(200).json(f)
}

const viewCourses = async (req,res) =>
{
    const ID = req.user
    const courses = await Course.find({instructorID:{ $eq: ID}},{title:1,rating:1,price:1,reviews:1}) 
    res.status(200).json(courses); 
    // if(courses)
    //     //res.status(200).json(courses)
}
const filterCourses = async (req,res) =>
{
    const ID = req.query.Id
    const subject = req.body.subject
    const price = req.body.price
    const courses = await Course.find({instructorID:{ $eq: ID}}).and({subject:{ $eq: subject}})
    const courses2 = await Course.find({instructorID:{ $eq: ID}}).and({price:{ $lte: price}})
    const courses3 = await Course.find({instructorID:{ $eq: '-1'}});
    const courses4 = await Course.find({instructorID:{ $eq: ID}}).and([{subject:{ $eq: subject}},{price:{ $lte: price}}])


    if(price === '' && subject !== '')
    {
        res.status(200).json(courses)
    }
    else if(subject === '' && price !== '')
    {
        res.status(200).json(courses2)
    }
    else if(subject === '' && price === '')
    {
        res.status(200).json(courses3)
    }
    else if(subject !== '' && price !=='')
    {
        res.status(200).json(courses4)
    }
}
const InstructSearch = async (req,res) =>
{
        
        const ID = req.query.Id
        const Search  = req.body.Search

           const courses = await Course.find({instructorID:{ $eq: ID}}).or([{title:{ $regex: Search, $options: "i"}},{subject:{ $regex: Search, $options: "i"}}])
            console.log(JSON.stringify(Search))
            console.log(JSON.stringify(courses))
        
        if(!courses)
        {
            res.status(404).json({error:'No results found'})
        }
        res.status(200).json(courses)
    
}
const addDiscount = async (req,res) =>
{
    const CourseId = req.body.CourseId
    const discountt = {discount:req.body.discount,time:req.body.time}
    const f = await Course.findByIdAndUpdate({_id:CourseId},{$set :{discount:discountt}},{multi:true})
    res.status(200).json(f)
}
const getMyRating = async(req,res) =>{
    const ID = req.user
    const f = await Instructor.findById({_id:ID},{_id:0,rating:1})
    res.status(200).json(f.rating)
    
}
const getMyReviews = async(req,res) =>{
    const ID = req.user
    const f = await Instructor.findById({_id:ID},{_id:0,reviews:1})
    res.status(200).json(f.reviews)

}
async function editBio(req,res)
{
    const bioBody = req.body.biography
    const f = await Instructor.updateOne(
        {"_id": req.user },
        {$set: { "biography" : `${bioBody}`}}).then(result => {
            res.status(200).send('Biography edited');
        });
    
}
function editEmail(req,res)
{
    const emailBody = req.body.email
        Instructor.updateOne(
            {"_id": req.user },
            {$set: { "email" : `${emailBody}`}}).then(result => {
                res.status(200).json("Email Edited");
            });
}

async function changePassword(req,res)
{
    const passBody = req.body.password

    Instructor.updateOne(
        {"_id": req.user },
        {$set: { "password" : passBody}}).then(result => {
            res.send();
        });

}


async function CreateQuiz(req,res)
{
    const quizz = new Quiz()
    quizz.CourseId=req.query.courseId
    await Quiz.create(quizz)
    const quizId = await Quiz.find({},{_id:1}).sort({_id:-1}).limit(1).select('_id')._id
    await Course.updateOne({_id:quizz.CourseId},{$push:{exercises:quizId}})
    res.send('added')


}
async function CreateQuestion (req,res)
{
    const quizId = await Quiz.find({},{_id:1}).sort({_id:-1}).limit(1).select('_id')
    var Ques = new Question()
    Ques.Question = req.body.Question
    Ques.Choice1=req.body.Choice1
    Ques.Choice2=req.body.Choice2
    Ques.Choice3=req.body.Choice3
    Ques.Choice4=req.body.Choice4
    Ques.CorrectAnswer=req.body.CorrectAnswer
    await Question.create(Ques)
    const quesId = await Question.find({},{_id:1}).sort({_id:-1}).limit(1).select('_id')
    await Quiz.updateOne({_id:quizId},{$push:{Questions:quesId}})
    res.status(200).json(quizId)
}

const getallusers = async(req,res) => {

    const x = await Instructor.find({});
    res.status(200).json(x);
}


const fetchAccount = async(req,res) => 
{
    const Ins = await Instructor.findOne({_id:req.user})
    console.log(Ins)
    res.status(200).json(Ins);
}

const checkAccepted = async(req,res) =>
{
    const Ins = await Instructor.findOne({_id:req.user}).select('acceptedContract')
    console.log(Ins)
    if(Ins.acceptedContract === 1)
         res.status(200).json("Instructor");
    else
        res.status(404).json("please accept contract")
}

const acceptContract = async(req,res) =>
{
    await Instructor.updateOne({_id:req.user},{$set:{acceptedContract:1}})
    console.log("hello")
    res.status(200).json("Contract accepted")
}

module.exports={fetchAccount,checkAccepted,acceptContract,getallusers,addCourse,viewCourses,filterCourses,InstructSearch,addSub,addDiscount,getMyRating,getMyReviews,editBio,editEmail,changePassword,CreateQuiz,CreateQuestion}