require('dotenv').config()
const express= require('express');
const AdminRouter= require('./routes/administrator')
const mongoose=require('mongoose')
const CourseRouter= require('./routes/courses')
const InstructRouter= require('./routes/instructor')

const app= express();

app.use(express.json())


app.use('/',AdminRouter)
app.use('/Course',CourseRouter)
app.use('/Instructor',InstructRouter)


mongoose.connect(process.env.MONGO_URI2)
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log('connection to db successful and listening on port 4000');
    
    })
    


})
.catch((error)=>{
    console.log(error)


})