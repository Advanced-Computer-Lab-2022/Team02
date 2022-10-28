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
    cours.prices = req.body.prices
    cours.discount = req.body.discount
    cours.rating = req.body.rating
    
    return Course.create(cours).then(function(users)
    {
        res.send('success')
    }, function(err)
    {
        res.send('error 12')
    })

}

module.exports={addCourse}