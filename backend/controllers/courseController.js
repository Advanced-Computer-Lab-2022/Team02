const {application, request} = require("express")
var app = require ('express')
const mongoose=require('mongoose')
var Course = require ('../models/courseModel')
var Instructor = require('../models/instructorModel')

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






module.exports = {filterPrice,filterSubjectRating,Search,viewCourses,viewCoursesCor,viewAllDetails,Link,getLink}