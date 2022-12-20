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
router.post('/addSub',Instruct.addSub)
router.post('/addDiscount',Instruct.addDiscount)
router.get('/getMyRating',Instruct.getMyRating)
router.get('/getMyReviews',Instruct.getMyReviews)
router.post('/instructorLink',Course.Link)
router.get('/getLink',Course.getLink)
router.post('/editBio',Instruct.editBio)
router.post('/editEmail',Instruct.editEmail)
router.post('/changePassword',Instruct.changePassword)
router.post('/createQuiz',Instruct.CreateQuiz)
router.post('/createQuestion',Instruct.CreateQuestion)
router.post('/allUsers',Instruct.getallusers);
router.post('/login',Instruct.login);
router.post('/logout',Instruct.logout);
module.exports=router