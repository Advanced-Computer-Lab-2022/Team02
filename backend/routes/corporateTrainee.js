const express=require('express')
const router=express.Router()
const Course = require ('../controllers/courseController.js')
const Trainee = require('../controllers/TraineeController')
const CheckLogin = require('../middleware/CheckLogin')

router.use(CheckLogin.CorLogin)
router.get('/viewAllCourses',Course.viewCourses)
router.post('/filterCoursesSR',Course.filterSubjectRating)
router.post('/Search',Course.Search)
router.post('/changePassword',Trainee.changePassworddCor)
router.post('/login',Trainee.loginC)
router.post('/logout',Trainee.logout)
router.post('/rateInstructor',Trainee.rateInstructor)
router.get('/Account',Trainee.fetchCorAccount)





module.exports = router