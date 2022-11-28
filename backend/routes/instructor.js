const express=require('express')
const router=express.Router()
const Instruct = require ('../controllers/instructorController')
const Course = require ('../controllers/courseController')

router.post('/addCourse',Instruct.addCourse)
router.get('/viewMyCourses',Instruct.viewCourses)
router.post('/filterMyCourses',Instruct.filterCourses)
router.post('/SearchMyCourses',Instruct.InstructSearch)
router.post('/viewAllCourses',Course.viewCourses)
router.put('/filterCoursesSR',Course.filterSubjectRating)
router.post('/filterCoursesP',Course.filterPrice)
router.post('/SearchAllCourses',Course.Search)
router.put('/viewDetails',Course.viewAllDetails)

module.exports=router