var express = require('express')

var router = express.Router()

var user_controller = require('../controller/login_controller')

var {  resApplicationJson } = require('../middleware')

router.use( resApplicationJson)

router.post('/register',user_controller.register)
router.post('/login',user_controller.login)

module.exports=router