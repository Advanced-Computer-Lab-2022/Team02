var Course = require ('../models/courseModel')
var Instructor = require('../models/instructorModel')
var indTrainee = require ('../models/IndividualTrainee')
var corTrainee = require ('../models/corporateTraineeModel')
var Admin = require ('../models/administratorModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validator = require('validator')
var report= require('../models/reports')
var requests = require ('../models/requests')
var quiz = require('../models/quizModel')
var nodemailer = require('nodemailer')
var Grades = require('../models/Grades')




const maxAge = 60 * 60 * 4;
const createToken = (_id) => {
    return jwt.sign({ _id },process.env.SECRET, {
        expiresIn: maxAge
    });
};

const rateInstructor = async(req,res) =>{
    const rating = req.body.ratingg
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
    var email;
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
        email = "Trainee"
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
        email = "Corporate"
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
        email = "Instructor"
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
        email = "Admin"
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
    res.status(200).json({id,nav,token,email})
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

const fetchIndAccount = async(req,res) => 
{
    const Trainee = await indTrainee.find({_id:req.user})
    console.log(Trainee)
    res.status(200).json(Trainee[0]);
}
const fetchCorAccount = async(req,res) => 
{
    const Trainee = await corTrainee.findOne({_id:req.user})
    console.log(Trainee)
    res.status(200).json(Trainee);
}
const forgotPassword = async(req,res) =>
{
    const email = req.body.Email
    try{
        const user = await indTrainee.findOne({Email:email})
        const user2 = await corTrainee.findOne({Email:email})
        const user3 = await Instructor.findOne({email:email})
        var link;
        console.log(user)
        console.log(user2)
        console.log(user3)
        if(!user && !user2 && !user3){
            return res.status(404).json({status:"User does not exist"})
        }
        else if(user && !user2 && !user3)
        {
            const secret = 'supersecret' + user.password
            const token = jwt.sign({email: user.Email,id: user._id},secret, {expiresIn:'5m'})
            link = `http://localhost:4000/guest/reset-password/${user._id}/${token}`
        }
        else if(!user && user2 && !user3)
        {
        const secret = 'supersecret' + user2.password
        const token = jwt.sign({email: user2.Email,id: user2._id},secret, {expiresIn:'5m'})
        link = `http://localhost:4000/guest/reset-password/${user2._id}/${token}`
        }
        else
        {
            const secret = 'supersecret' + user3.password
            const token = jwt.sign({email: user3.email,id: user3._id},'supersecret', {expiresIn:'5m'})
            link = `http://localhost:4000/guest/reset-password/${user3._id}/${token}`
        }
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'learningoApp@gmail.com',
              pass: 'pkpfrybyodahmxun'
            }
          });
          
          var mailOptions = {
            from: 'youremail@gmail.com',
            to: email,
            subject: 'Password Change',
            text: link
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
               res.status(200).json("Email Sent");
            }
          });
        console.log(link)
    }catch(error){
       // res.status(404).json({ error: error.message })
    }
}
const resetPass = async (req,res)=>{
    const { id, token } = req.params;
    console.log(req.params);
    //res.send("Done")
    const user = await indTrainee.findOne({_id:id})
    const user2 = await corTrainee.findOne({_id:id})
    const user3 = await Instructor.findOne({_id:id}) 
    console.log(user) 
    console.log(user2) 
    console.log(user3) 
    if(!user&& !user2 && !user3){
        return res.json({status:"User does not exist"})
    }
    else if(user && !user2 && !user3)
    {
    const secret = 'supersecret' + user.password
    try{
       const verify=jwt.verify(token,secret)
       res.render("index",{email:verify.email, status:"Not Verified"})
    }catch(error){
        console.log(error)
        res.send("Not Verified")
    }
}
    else if(!user && user2 && !user3)
        {
        const secret = 'supersecret' + user2.password
        try{
        const verify=jwt.verify(token,secret)
        res.render("index",{email:verify.email, status:"Not Verified"})
        }catch(error){
            console.log(error)
            res.send("Not Verified")
        }
        }
    else if(!user && !user2 && user3)
        {
        const secret = 'supersecret' + user3.password
        try{
        const verify=jwt.verify(token,secret)
        res.render("index",{email:verify.email, status:"Not Verified"})
        }catch(error){
         console.log(error)
         res.send("Not Verified")
        }
        }

}
const resetPassw = async (req,res)=>{
    const { id, token } = req.params;
    const {password}=req.body
    //res.send("Done")
    const user = await indTrainee.findOne({_id:id})
    const user2 = await corTrainee.findOne({_id:id})
    const user3 = await Instructor.findOne({_id:id})    
    if(!user && !user2 && !user3){
        return res.json({status:"User does not exist"})
    }
    else if(user && !user2 && !user3)
    {
    const secret = 'supersecret' + user.password
    try{
       const verify=jwt.verify(token, secret)
       const salt = await bcrypt.genSalt();
       const encryptedPassword = await bcrypt.hash(password, salt)
       await indTrainee.updateOne({
        _id:id
       },
       {
        $set:{
            password: encryptedPassword
        }
       })
       console.log(user)
       res.json({status:"Password Updated"})
    }catch(error){
        console.log(error)
        res.json({status:"Error"})
    }
}
    else if(!user && user2 && !user3)
    {
        const secret = 'supersecret' + user2.password
        try{
       const verify=jwt.verify(token, secret)
       const salt = await bcrypt.genSalt();
       const encryptedPassword = await bcrypt.hash(password, salt)
       await corTrainee.updateOne({
        _id:id
       },
       {
        $set:{
            password: encryptedPassword
        }
       })
       console.log(user2)
       res.json({status:"Password Updated"})
        }catch(error){
        console.log(error)
        res.json({status:"Error"})
    }
    }
    else
    {
        const secret = 'supersecret' + user3.password
        try{
       const verify=jwt.verify(token, secret)
       const salt = await bcrypt.genSalt();
       const encryptedPassword = await bcrypt.hash(password, salt)
       await Instructor.updateOne({
        _id:id
       },
       {
        $set:{
            password: encryptedPassword
        }
       })
       console.log(user3)
       res.json({status:"Password Updated"})
        }catch(error){
        console.log(error)
        res.json({status:"Error"})
    }
    }
    
}

const reqCourse = async (req,res)=>
{
    const CourseID= req.body.CourseId
    const CorpId=req.user
    const request = new requests()
    request.course=CourseID
    request.from=CorpId
    const name = await corTrainee.findOne({_id:{$eq:req.user}},{_id:0,UserName:1})
    request.username=name.UserName
    const coursName= await Course.findOne({_id:{$eq:CourseID}},{_id:0,title:1})
    request.coursename=coursName.title
    await requests.create(request)
    const f =await requests.find({}).sort({_id:-1}).limit(1).select('_id')
    const adminId = await corTrainee.findOne({_id:{$eq:req.user}},{_id:0,AdministratorID:1})
    console.log(adminId)
    await Admin.updateOne({"_id":adminId.AdministratorID},{$push:{requests:f}})
    await corTrainee.updateOne({"_id":req.user},{$push:{requests:f}})
    res.send('request submitted')

}
const regCourse = async(req,res)=>
{
    const CourseID= req.body.CourseId
    const indId=req.query.Id
    const course = await Course.find({_id:{$eq:CourseID}},{_id:1,title:0})
    await indTrainee.findOneAndUpdate({_id:{$eq:indId}},{$push:{Courses:course}})
    //console.log('Registration Successful')
    res.send('Registration Successful')

}
const viewMyCourses = async (req,res)=>
{
    const ID = req.user
    const g = await corTrainee.findOne({_id:ID}).populate('Courses')
    if(!viewMyCourses)
    {
        res.status(404).json({error:'No Courses available'})
    }
    res.status(200).json(g.Courses)

}
const connectMail = async (req,res)=>
{
    const ID = req.user
    await corTrainee.updateOne({"_id":ID},{"Email":req.body.Email})
    res.status(200).json("ok");

}
const quizGrade= async (req,res)=>
{
    const userID=req.user
    const quizID=req.query.exerciseID
    const grade = req.body.score
    await Grades.findOneAndUpdate({StudentId:{$eq:userID},QuizId:{$eq:quizID}},{$set:{Grade:grade}})
}

module.exports= {rateInstructor,rateCourse,changePassworddInd,changePassworddCor,addItrainee,signUpI,loginI,logout,loginC,fetchIndAccount,fetchCorAccount,forgotPassword,resetPass,resetPassw,reqCourse,regCourse,viewMyCourses,connectMail,quizGrade};