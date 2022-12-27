const express=require('express')

const router=express.Router()
const Admin = require('../controllers/adminController.js')
const CheckLogin = require('../middleware/CheckLogin')

router.use(CheckLogin.adminLogin)
router.post('/addAdministrator',Admin.addAdministrator)
router.post('/addInstructor',Admin.addInstructor)
router.post('/addCorpTrainee',Admin.addCorporateTrainee)
router.post('/login', Admin.login)
router.post('/logout', Admin.logout)


module.exports=router

