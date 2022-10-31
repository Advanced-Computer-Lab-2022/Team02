const express=require('express')
const router=express.Router()
const Course = require ('../controllers/courseController.js')


router.post('/viewAllCourses',Course.viewCoursesCor)
router.put('/filterCoursesSR',Course.filterSubjectRating)
router.post('/Search',Course.Search)




module.exports = router