const {application, request} = require("express")
var app = require ('express')
var Course = require ('../models/courseModel')

function addCourse(req,res)
{
    var cours = new Course()
    cours.title = req.body.title
    cours.hours = req.body.hours

    return Course.create(cours).then(function(users)
    {
        res.send('success')
    }, function(err)
    {
        res.send('error 12')
    })

}

module.exports = addCourse