const {application, request} = require("express")
var app = require ('express')
var Admin = require ('../models/administratorModel')
const Instructor = require("../models/instructorModel")
const CorporateTrainee = require("../models/corporateTraineeModel")

function addAdministrator(req,res)
{
    var admin = new Admin()
    admin.username = req.body.username
    admin.password = req.body.password

    return Admin.create(admin).then(function(users)
    {
        res.send(JSON)
    },function(err)
    {
        res.send(JSON)
    })


}

function addInstructor(req,res){
    var instruct= new Instructor()
    instruct.username = req.body.username
    instruct.password = req.body.password

    return Instructor.create(instruct).then(function(users)
    {
        res.send(JSON)
    },function(err)
    {
        res.send(JSON)
    })

}

function addCorporateTrainee(req,res){
    var CorpTrainee = new CorporateTrainee()
    CorpTrainee.username = req.body.username
    CorpTrainee.password = req.body.password
    
    return CorporateTrainee.create(CorpTrainee).then(function(users)
    {
        res.send(JSON)
    },function(err)
    {
        res.send(JSON)
    })

}


module.exports={addAdministrator,addInstructor,addCorporateTrainee}