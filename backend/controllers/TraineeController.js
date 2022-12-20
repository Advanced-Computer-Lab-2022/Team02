var Course = require ('../models/courseModel')
var Instructor = require('../models/instructorModel')
var indTrainee = require ('../models/IndividualTrainee')
var corTrainee = require ('../models/corporateTraineeModel')
var Admin = require ('../models/administratorModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, 'supersecret', {
        expiresIn: maxAge
    });
};

const rateInstructor = async(req,res) =>{
    const rating = req.body.rating
    const f = await Instructor.findByIdAndUpdate({_id:req.query.Id},{$push:{rating:rating}})
    res.status(200).json(f)
}
const rateCourse = async(req,res) =>{
    const rating = req.body.rating
    const f = await Course.findByIdAndUpdate({_id:req.body.CourseId},{$push:{rating:rating}})
    res.status(200).json(f)
}
function changePassworddInd(req,res)
{
    const passBody = req.body.password
    indTrainee.updateOne(
        {"_id": req.query.Id },
        {$set: { "password" : passBody}}).then(result => {
            res.send();
        });

}
function changePassworddCor(req,res)
{
    const passBody = req.body.password
    corTrainee.updateOne(
        {"_id": req.query.Id },
        {$set: { "password" : passBody}}).then(result => {
            res.send();
        });

}
const addItrainee = async(req,res) =>
{
    var Itrainee = new indTrainee()
    Itrainee.UserName=req.body.Username
    Itrainee.password=req.body.password
    Itrainee.Email=req.body.email
    await indTrainee.create(Itrainee)
    res.send("bye")

}

const signUpI = async (req, res) => {
    const { UserName, Email, password ,FirstName,LastName,Gender} = req.body;
    const x = await indTrainee.findOne({UserName:UserName})
    const user2 = await corTrainee.findOne({UserName:UserName})
    const user3 = await Instructor.findOne({username:UserName})
    const user4 = await Admin.findOne({username:UserName})
    if(x !== null || user2 !== null  || user3 !== null  || user4 !== null)
    {
        res.status(404).json({error: 'Username already used'})
    }
    else
    {
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await indTrainee.create({ UserName: UserName, Email: Email, password: hashedPassword , FirstName: FirstName , LastName: LastName , Gender: Gender});
        const token = createToken(user._id);

        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
    }
}

const loginI = async (req, res) => 
{
    var I = 1;
    var A = 1;
    var C = 1;
    var Ind = 1;
    const {UserName,password} = req.body;
    const user1 = await indTrainee.findOne({UserName:UserName})
    const user2 = await corTrainee.findOne({UserName:UserName})
    const user3 = await Instructor.findOne({username:UserName})
    const user4 = await Admin.findOne({username:UserName})
    if(user1 === null || !await bcrypt.compare(password,user1.password))
    {
        Ind = 0;
    }
    else if(await bcrypt.compare(password,user1.password))
    {
        const token = createToken(user1._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        console.log(token) 
    }
    if(user2 === null || !await bcrypt.compare(password,user2.password))
    {
        C = 0;
    }
    else if(await bcrypt.compare(password,user2.password))
    {
        const token = createToken(user2._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        console.log(token) 
    }
    if(user3 === null || !await bcrypt.compare(password,user3.password))
    {
        I = 0;
    }
    else if(await bcrypt.compare(password,user3.password))
    {
        const token = createToken(user3._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        console.log(token) 
    }
    if(user4 === null || !await bcrypt.compare(password,user4.password))
    {
        A = 0;
    }
    else if(await bcrypt.compare(password,user4.password))
    {
        const token = createToken(user4._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        console.log(token) 
    }
    console.log('Admin:',A)
    console.log('Cor:',C)
    console.log('Ins:',I)
    console.log('Ind:',Ind)
    if(A === 0 && I === 0 && Ind === 0 && C === 0)
    {
        res.status(404).json({error: 'Wrong Username or password'})
    }

    if(A === 1)
    {
        res.status(200).json("1")
    }
    else if(I === 1)
    {
        res.status(200).json("2")
    }
    else if(Ind === 1)
    {
        res.status(200).json("3")
    }
    else if(C === 1)
    {
        res.status(200).json("4")
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

const loginC = async (req, res) => 
{
    const {UserName,password} = req.body;
    const user = await corTrainee.findOne({UserName:UserName})
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

module.exports= {rateInstructor,rateCourse,changePassworddInd,changePassworddCor,addItrainee,signUpI,loginI,logout,loginC};