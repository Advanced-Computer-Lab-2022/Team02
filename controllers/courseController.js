const {application, request} = require("express")
var app = require ('express')
var Course = require ('../models/courseModel')

const Search = async (req,res) =>
{
        var courses
        const titlee  = req.body.title
        const subjct = req.body.subject
        if(titlee !== undefined)
        {
            courses = await Course.find({title:{ $eq: titlee}})
            console.log(JSON.stringify(titlee))
        }
        else if(subjct !== undefined)
        {
            courses = await Course.find({subject:{ $eq: subjct}})
            console.log(JSON.stringify(subjct))
        }
        if(!courses)
        {
            res.status(404).json({error:'No results found'})
        }
        res.status(200).json(courses)
    
}

const filterPrice = async (req,res) =>
{
    try {
        const prce = req.body.prices
        const courses = await Course.find({prices:{ $lte: prce}})
        if(!courses)
        {
            res.status(404).json({error:'No results found'})
        }
        res.status(200).json(courses)
    } catch (error) {
        res.status(400).json({error:'error'})
    }
}
const filterSubject = async (req,res) =>
{
    try {
        const subject = req.body.subject
        const courses = await Course.find({subject:{ $eq: subject}})
        if(courses.length==0)
        {
            res.status(404).json({error:'No results found'})
        }
        res.status(200).json(courses)
    } catch (error) {
        res.status(400).json({error:'error'})
    }
}

module.exports = {filterPrice,filterSubject,Search}