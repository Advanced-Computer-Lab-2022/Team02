const express=require('express')
const router=express.Router()
const addCourse = require ('../controllers/courseController.js')



router.post('/',addCourse)


module.exports=router