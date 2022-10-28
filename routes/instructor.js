const express=require('express')
const router=express.Router()
const Instruct = require ('../controllers/instructorController')

router.post('/addCourse',Instruct.addCourse)

module.exports=router