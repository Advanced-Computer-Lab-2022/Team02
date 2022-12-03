const express=require('express')
const router=express.Router()
const Course = require ('../controllers/courseController.js')
const Trainee = require('../controllers/TraineeController')


router.post('/viewAllCourses',Course.viewCoursesCor)
router.post('/filterCoursesSR',Course.filterSubjectRating)
router.post('/Search',Course.Search)
router.post('/changePassword',Trainee.changePassworddCor)




module.exports = router