const jwt = require('jsonwebtoken')
const Instructor = require('../models/instructorModel')
const indTrainee = require('../models/IndividualTrainee')
const corTrainee = require('../models/corporateTraineeModel')
const Administrator = require('../models/administratorModel')

const InstructorLogin = async(req, res , next) => {
    const {authorization} = req.headers
    if(!authorization)
    {
        return res.status(401).json({error: 'Please Login'})
    }
    const token = req.headers.authorization.split(" ")[1];
    try {
        const {_id} = jwt.verify(token , 'supersecret');
        const f = await Instructor.findOne({_id}).select('_id')
        if(!f)
            throw new Error();
        req.user=f._id
    } catch (Error) {
        console.log(Error)
        return res.status(401).json({error:'Request is not authorized'});
    }
    next();
}

const IndLogin = async(req, res , next) => {
    const {authorization} = req.headers
    if(!authorization)
    {
        return res.status(401).json({error: 'Please Login'})
    }
    const token = req.headers.authorization.split(" ")[1];
    try {
        const {_id} = jwt.verify(token , 'supersecret');
        const f = await indTrainee.findOne({_id}).select('_id')
        if(!f)
            throw new Error();
        req.user=f._id
    } catch (error) {
        console.log(error)
        return res.status(401).json({error:'Request is not authorized'});
    }
    next();
}

const GuestLogin = async(req, res , next) => {
    const token = req.headers.authorization.split(" ")[1];
        const {_id} = jwt.verify(token , 'supersecret');
        const f = await Instructor.findOne({_id}).select('_id')
        const f1 = await corTrainee.findOne({_id}).select('_id')
        const f2 = await indTrainee.findOne({_id}).select('_id')
        if(f!=null)
            req.user=f._id
        else if(f1!=null)
            req.user=f1._id
        else if(f2!=null)
            req.user=f2._id
    next();
}

const CorLogin = async(req, res , next) => {
    const {authorization} = req.headers
    if(!authorization)
    {
        return res.status(401).json({error: 'Please Login'})
    }
    const token = req.headers.authorization.split(" ")[1];
    try {
        const {_id} = jwt.verify(token , 'supersecret');
        const f = await corTrainee.findOne({_id}).select('_id')
        if(!f)
            throw new Error();
        req.user=f._id
    } catch (error) {
        console.log(error)
        return res.status(401).json({error:'Request is not authorized'});
    }
    next();
}

const adminLogin = async(req, res , next) => {
    const {authorization} = req.headers
    console.log(req.headers)
    if(!authorization)
    {
        return res.status(401).json({error: 'Please Login'})
    }
    const token = req.headers.authorization.split(" ")[1];
    try {
        const {_id} = jwt.verify(token , 'supersecret');
        const f = await Administrator.findOne({_id}).select('_id')
        if(!f)
            throw new Error();
        req.user=f._id
    } catch (error) {
        console.log(error)
        return res.status(401).json({error:'Request is not authorized'});
    }
    next();
}
module.exports = {InstructorLogin,GuestLogin,adminLogin,CorLogin,IndLogin}