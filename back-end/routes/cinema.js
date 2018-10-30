
var express = require('express');
var router = express.Router();
var cinema_controller = require('../controller/cinema_controller')
//文件上传的引入
var fileUpload = require('../middleware/cinemaPicUpload')

/* GET home page. */
router.get('/list', cinema_controller.list);//列表
router.get('/listall', cinema_controller.listall);//查找数据
router.post('/save',fileUpload,cinema_controller.save);//添加数据
router.get('/remove', cinema_controller.remove);//删除数据
router.get('/selectID', cinema_controller.selectID);//查找ID
router.post('/update',fileUpload, cinema_controller.update);//更新提价

module.exports = router;