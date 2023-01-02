const {application, request} = require("express")
var app = require ('express')
var Admin = require ('../models/administratorModel')
const Instructor = require("../models/instructorModel")
const CorporateTrainee = require("../models/corporateTraineeModel")
const indTrainee = require('../models/IndividualTrainee')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const corporateTraineeModel = require("../models/corporateTraineeModel")
const requests = require("../models/requests")
const requests = require("../models/requests")


const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, 'supersecret', {
        expiresIn: maxAge
    });
};

async function addAdministrator(req,res)
{
    var admin = new Admin()
    admin.username = req.body.username
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    admin.password = hashedPassword

    const x = await indTrainee.findOne({UserName:req.body.username})
    const user2 = await CorporateTrainee.findOne({UserName:req.body.username})
    const user3 = await Instructor.findOne({username:req.body.username})
    const user4 = await Admin.findOne({username:req.body.username})
    if(x !== null || user2 !== null  || user3 !== null  || user4 !== null)
    {
        res.status(404).json({error: 'Username already used'})
    }

    else{
    return Admin.create(admin).then(function(users)
    {
        res.send(JSON)
    },function(err)
    {
        res.send(JSON)
    })
}


}

async function addInstructor(req,res){
    var instruct= new Instructor()
    instruct.username = req.body.username
    instruct.AdministratorID=req.user
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    instruct.password = hashedPassword

    const x = await indTrainee.findOne({UserName:req.body.username})
    const user2 = await CorporateTrainee.findOne({UserName:req.body.username})
    const user3 = await Instructor.findOne({username:req.body.username})
    const user4 = await Admin.findOne({username:req.body.username})
    if(x !== null || user2 !== null  || user3 !== null  || user4 !== null)
    {
        res.status(404).json({error: 'Username already used'})
    }
    else{
    return Instructor.create(instruct).then(function(users)
    {
        res.send(JSON)
    },function(err)
    {
        res.send(JSON)
    })
}

}

async function addCorporateTrainee(req,res){
    var CorpTrainee = new CorporateTrainee()
    CorpTrainee.UserName = req.body.UserName
    CorpTrainee.AdministratorID=req.user
    console.log(req.body.UserName)
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    CorpTrainee.password = hashedPassword
    
    const x = await indTrainee.findOne({UserName:req.body.UserName})
    const user2 = await CorporateTrainee.findOne({UserName:req.body.UserName})
    const user3 = await Instructor.findOne({username:req.body.UserName})
    const user4 = await Admin.findOne({username:req.body.UserName})
    if(x !== null || user2 !== null  || user3 !== null  || user4 !== null)
    {
        res.status(404).json({error: 'Username already used'})
    }
    else{
    console.log(CorpTrainee)
    return await CorporateTrainee.create(CorpTrainee).then(function(users)
    {
        res.send(JSON)
    },function(err)
    {
        res.send(JSON)
    })
    }

}

const logout = async (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true, 
        secure: true,
        sameSite: "none",    
        expires: new Date(1)
    });
    res.send("cookie cleared")
}

const login = async (req, res) => 
{
    const {username,password} = req.body;
    const user = await Admin.findOne({username:username})
    console.log(await bcrypt.compare(password,user.password))
    if(user === null || !await bcrypt.compare(password,user.password))
    {
        res.status(404).json({error: 'Wrong Username or password'})
    }
    else if(await bcrypt.compare(password,user.password))
    {
        const token = createToken(user._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        console.log(token) 
        res.status(200).json(user)
    }
}
const getRequests = async (req,res)=>
{
    var corId=[];
    const request = await Admin.findOne({_id:{$eq:req.user}},{_id:0,requests:1}).populate('requests')
    if(!request)
    {
        res.status(404).json({error:'No requests available'})
    }
    const t = request.requests
    res.status(200).json(t)
}
const accReq = async (req,res)=>
{
    const reqId = req.body.id
    const courId= req.body.course
    const corpId= req.body.from
    await requests.deleteOne({_id:reqId})
    await CorporateTrainee.updateOne({_id:corpId},{$push:{Courses:courId}})
   // await Course.updateOne({_id:CourseId},{$push:{subtitle:id}})

}

const rejReq = async (req,res)=>
{
    const reqId = req.body.id
    await requests.deleteOne({_id:reqId})

}
const getReport = async (req,res)=>    
{
    const report = await Admin.findOne({_id:{$eq:req.user}},{_id:0,reports:1}).populate('reports')
    if(!report)
    {
        res.status(404).json({error:'No reports available'})
    }
    const t = report.reports
    console.log(t)
    res.status(200).json(t)
}
const getReportDetails = async (req,res)=>    
{
    const reportt = await reports.find({_id:{$eq:req.query.reportID}},{_id:1,username:1,type:1,course:1,details:1,seeen:1})
    if(!reportt)
    {
        res.status(404).json({error:'No reports available'})
    }
    const t = reportt
    console.log(t)
    res.status(200).json(t)
}
const ReportStatus = async (req,res) =>
{
    const id = req.query.reportID
    console.log(id)
    
    await reports.findByIdAndUpdate({_id:id},{$set:{status:"Resolved"},$set:{seeen:"Seen"}})
   // await reports.findByIdAndUpdate({_id:id},{$set:{seen:"Seen"}})
    //reports.answer=req.body.answer
    res.status(200).json("Resolved")

}


module.exports={addAdministrator,addInstructor,addCorporateTrainee,logout,login,rejReq,getRequests,accReq,getReport,ReportStatus,getReportDetails}