const {application, request} = require("express")
var app = require ('express')
var Course = require ('../models/courseModel')

function addCourse(req,res)
{
    var cours = new Course()
    cours.title = req.body.title
    cours.subtitle=req.body.subtitle
    cours.exercises=req.body.exercises
    cours.summary=req.body.summary
    cours.subject=req.body.subject
    cours.hours=req.body.hours
    cours.price = req.body.price
    cours.discount = req.body.discount
    cours.rating = req.body.rating
    cours.instructorID = req.query.Id
    
    return Course.create(cours).then(function(users)
    {
        res.send('success')
    }, function(err)
    {
        res.send('error 12')
    })

}
const viewCourses = async (req,res) =>
{
    const ID = req.query.Id
    const courses = await Course.find({instructorID:{ $eq: ID}}).select('title')

    if(!courses)
    {
        res.status(404).json({error:'No results found'})
    }
    res.status(200).json(courses)

}
const filterCourses = async (req,res) =>
{
    const ID = req.body.ID
    const subject = req.body.subject
    const price = req.body.price
    const courses = await Course.find({instructorID:{ $eq: ID}}).and({subject:{ $eq: subject}})
    const courses2 = await Course.find({instructorID:{ $eq: ID}}).and({price:{ $lte: price}})

    if(price === undefined)
    {
        res.status(200).json(courses)
    }
    if(subject === undefined)
    {
        res.status(200).json(courses2)
    }

    if(!courses)
    {
        res.status(404).json({error:'No results found'})
    }
}
const InstructSearch = async (req,res) =>
{
        
        const ID = req.query.Id
        const Search  = req.body.Search

           const courses = await Course.find({instructorID:{ $eq: ID}}).or([{title:{ $regex: Search, $options: "i"}},{subject:{ $regex: Search, $options: "i"}}])
            console.log(JSON.stringify(Search))
        
        if(!courses)
        {
            res.status(404).json({error:'No results found'})
        }
        res.status(200).json(courses)
    
}

module.exports={addCourse,viewCourses,filterCourses,InstructSearch}