const express=require('express')
const router=express.Router()
const Course = require ('../controllers/courseController.js')

router.get('/viewAllCourses',Course.viewCourses)
router.put('/filterCoursesSR',Course.filterSubjectRating)
router.put('/filterCoursesP',Course.filterPrice)
router.post('/Search',Course.Search)
router.put('/viewDetails',Course.viewAllDetails)



module.exports = router