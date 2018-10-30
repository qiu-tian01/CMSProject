const express = require("express");
const router = express.Router();
const movies = require('../controller/movies_controller')
const fileupload = require('../middleware/moviesPicUpload')
//routes/movies/get
router.get('/movies-list',movies.list)
router.post('/save',fileupload,movies.save)
router.get('/getbyid',movies.getById)
router.get('/deletebyid',movies.delById)
router.get('/getbyname',movies.getByName)
router.post('/updatamovie',fileupload,movies.updataMovie)


module.exports = router