var Course = require ('../models/courseModel')
var Instructor = require('../models/instructorModel')
var indTrainee = require ('../models/IndividualTrainee')
var corTrainee = require ('../models/corporateTraineeModel')
var Admin = require ('../models/administratorModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validator = require('validator')

const maxAge = 3 * 24 * 60 * 60;
const createToken = (_id) => {
    return jwt.sign({ _id }, 'supersecret', {
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
async function changePassworddInd(req,res)
{
    const passBody = req.body.password
    console.log(passBody)
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(passBody, salt);
    indTrainee.updateOne(
        {"_id": req.user },
        {$set: { "password" : hashedPassword}}).then(result => {
            res.send();
        });

}
async function changePassworddCor(req,res)
{
    const passBody = req.body.password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(passBody, salt);
    corTrainee.updateOne(
        {"_id": req.user },
        {$set: { "password" : hashedPassword}}).then(result => {
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
    var em=0;
    const x = await indTrainee.findOne({UserName:UserName})
    const user2 = await corTrainee.findOne({UserName:UserName})
    const user3 = await Instructor.findOne({username:UserName})
    const user4 = await Admin.findOne({username:UserName})
    if(x !== null || user2 !== null  || user3 !== null  || user4 !== null)
    {
        res.status(404).json({error: 'Username is taken please choose another one'})
    }
    else
    {
    try {
        if(!validator.isEmail(Email))
        {
            res.status(400).json({ error: 'Invalid Email' });
            em=1;
        }
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await indTrainee.create({ UserName: UserName, Email: Email, password: hashedPassword , FirstName: FirstName , LastName: LastName , Gender: Gender});
        const token = createToken(user._id);

        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json(user)
    } catch (error) {
        if(em === 0)
            res.status(400).json({ error: 'Please fill in all fields' })
    }
    }
}

const loginI = async (req, res) => 
{
    var token;
    var I = 1;
    var A = 1;
    var C = 1;
    var Ind = 1;
    var nav = 0;
    var id;
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
        id = user1._id
        token = createToken(user1._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        console.log(token) 
    }
    if(user2 === null || !await bcrypt.compare(password,user2.password))
    {
        C = 0;
    }
    else if(await bcrypt.compare(password,user2.password))
    {
        id = user2._id
        token = createToken(user2._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        console.log(token) 
    }
    if(user3 === null || !await bcrypt.compare(password,user3.password))
    {
        I = 0;
    }
    else if(await bcrypt.compare(password,user3.password))
    {
        id = user3._id
        token = createToken(user3._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        console.log(token) 
    }
    if(user4 === null || !await bcrypt.compare(password,user4.password))
    {
        A = 0;
    }
    else if(await bcrypt.compare(password,user4.password))
    {
        id = user4._id
        token = createToken(user4._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        console.log(token) 
    }
    console.log('Admin:',A)
    console.log('Cor:',C)
    console.log('Ins:',I)
    console.log('Ind:',Ind)
    if(A === 0 && I === 0 && Ind === 0 && C === 0)
    {
        res.status(404).json({error: 'Invalid Username or password'})
    }
    else{
    if(A === 1)
    {
        nav = "1"
    }
    else if(I === 1)
    {
        nav = "2"
    }
    else if(Ind === 1)
    {
        nav = "3"
    }
    else if(C === 1)
    {
        nav = "4"
    }
    res.status(200).json({id,nav,token})
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