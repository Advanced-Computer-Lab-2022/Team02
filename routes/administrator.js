const express=require('express')

const router=express.Router()
const Admin = require('../controllers/adminController.js')

router.post('/',Admin.addAdministrator)

router.post('/addInstructor',Admin.addInstructor)

router.post('/addCorpTrainee',Admin.addCorporateTrainee)


module.exports=router

