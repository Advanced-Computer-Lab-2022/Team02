const express=require('express')
const router=express.Router()
const Course = require ('../controllers/courseController.js')




router.post('/Search',Course.Search)
router.post('/filterSubject',Course.filterSubject)


module.exports=router