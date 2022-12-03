const express=require('express')
const router=express.Router()
const Course = require ('../controllers/courseController.js')
const Trainee = require('../controllers/TraineeController')

router.get('/viewAllCourses',Course.viewCourses)
router.put('/filterCoursesSR',Course.filterSubjectRating)
router.put('/filterCoursesP',Course.filterPrice)
router.post('/Search',Course.Search)
router.put('/viewDetails',Course.viewAllDetails)
router.post('/rateInstructor',Trainee.rateInstructor)
router.post('/rateCourse',Trainee.rateCourse)
router.post('/changePassword',Trainee.changePassworddInd)
router.post('/addItrainee',Trainee.addItrainee)



module.exports = router