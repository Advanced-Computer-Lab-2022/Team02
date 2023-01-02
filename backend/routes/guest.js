const express=require('express')
const router=express.Router()
const Course = require ('../controllers/courseController.js')
const Trainee = require('../controllers/TraineeController')
const CheckLogin = require('../middleware/CheckLogin')


router.get('/viewAllCourses',Course.viewCourses)
router.put('/filterCoursesSR',Course.filterSubjectRating)
router.put('/filterCoursesP',Course.filterPrice)
router.post('/Search',Course.Search)
router.put('/viewDetails',Course.viewAllDetails)
router.post('/addItrainee',Trainee.addItrainee)
router.post('/signUp',Trainee.signUpI)
router.post('/login',Trainee.loginI)
router.get('/getLink',Course.getLink)
router.post('/forgotPass',Trainee.forgotPassword)
router.get('/reset-password/:id/:token',Trainee.resetPass)
router.post('/reset-password/:id/:token',Trainee.resetPassw)
router.post('/acceptPolicy',CheckLogin.GuestLogin,Course.acceptPolicy)




module.exports = router