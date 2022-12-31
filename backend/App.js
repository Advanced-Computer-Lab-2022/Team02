require('dotenv').config()
const express= require('express');
const AdminRouter= require('./routes/administrator')
const mongoose=require('mongoose')
const InstructRouter= require('./routes/instructor')
const InTraineeRouter= require('./routes/individualTrainee')
const corTraineeRouter= require('./routes/corporateTrainee')
const guestRouter= require('./routes/guest')

const app= express();
app.set("view engine","ejs")
app.use(express.urlencoded({extended:false}))
app.use(express.json())


app.use('/Admin',AdminRouter)
app.use('/Instructor',InstructRouter)
app.use('/indTrainee',InTraineeRouter)
app.use('/corTrainee',corTraineeRouter)
app.use('/guest',guestRouter)


mongoose.connect(process.env.MONGO_URI2)
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log('connection to db successful and listening on port 4000');
    
    })
    


})
.catch((error)=>{
    console.log(error)


})