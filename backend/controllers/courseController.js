const {application, request} = require("express")
var app = require ('express')
var Course = require ('../models/courseModel')

const Search = async (req,res) =>
{
        var courses
        const Search  = req.body.Search
        console.log(Search);

            courses = await Course.find().or([{title:{ $regex: Search, $options: "i"}},{subject:{ $regex: Search, $options: "i"}},{instructorID:{ $regex: Search, $options: "i"}}])
            console.log(JSON.stringify(Search))
        
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

const filterSubjectRating = async (req,res) =>
{
    const subject = req.body.subject
    const rating = req.body.rating
    const courses2 = await Course.find({rating:{ $eq: rating}})
    const courses =  await Course.find({subject:{ $eq: subject}})
    const courses1 = await Course.find({subject:{ $eq: subject}}).and({rating:{ $eq: rating}})
    if(rating === undefined)
    {
        res.status(200).json(courses)
    }
    if(subject === undefined)
    {
        res.status(200).json(courses2)
    }
    else if (rating !== undefined && subject !== undefined)
    {
        res.status(200).json(courses1)
    }
    if(!courses)
        {
            res.status(404).json({error:'No results found'})
        }
    
}

const viewCourses = async (req,res) =>
{
    const courses = await Course.find({},{_id:0,title:1,hours:1,rating:1,price:1,subtitle:1,exercises:1,discount:1})
    if(!courses)
    {
        res.status(404).json({error:'No results found'})
    }
    res.status(200).json(courses)

}
const viewCoursesCor = async (req,res) =>
{
    const courses = await Course.find({},{_id:0,title:1,hours:1,rating:1,subtitle:1,exercises:1,discount:1})
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






module.exports = {filterPrice,filterSubjectRating,Search,viewCourses,viewCoursesCor,viewAllDetails}