const mongoose = require('../utils/mongoose');
const Moment = require('moment');
const fs = require('fs-extra')
const PATH = require('path') // 时间格式化

var Movies = mongoose.model('movies', new mongoose.Schema({
    movieName: String,//电影名称
    director: String,//导演
    company: String,//发行公司
    type: String,//类型
    country: String,//国家
    time: String,//上映时间
    year: String,//年份
    duringTime: String,//时长
    language: String,//语言
    posterPic: String,//海报图片
    actor: String,//演员
    intro: String,//简介
    createTime: String,//发布时间（毫秒）
    createTimeFormat: String,//（创建时间）
    
}));

const _getall = (query) => {//获得所有电影数据
    let _query = query || {}
    return Movies.find(_query).sort({ createTime: -1 })//查找所有电影信息 * 按照时间降序排列
        .then((results) => {
            return results
        })
        .catch((err) => {
            return false
        })
}

const list = async({pageNo = 1,pageSize = 10, search =''})=>{
    let reg = new RegExp(search,'i')
    let _query = search ? {movieName:reg}:{}//查询条件
    let _all_items = await _getall(_query)

    return Movies.find(_query)
    .sort({createTime:-1})
    .skip((pageNo-1)*pageSize)
    .limit(~~pageSize)
    .then((result)=>{
        return{
            items:result,
            pageInfo:{
                pageNo,
                pageSize,
                total:_all_items.length,
                totalPage:Math.ceil(_all_items.length/pageSize)
            }
        }
    }).catch(err=>{
        return false
    })


}


let default_pic = '/uploads/posterPic/defaultPic.jpg'
const _save = (body) => {//增加电影数据
    let _timestamp = Date.now()
    let moment = Moment(_timestamp)
    body.posterPic =  body.posterPic || default_pic
    return new Movies({
        ...body,
        createTime: _timestamp,
        createTimeFormat: moment.format("YYYY-MM-DD, hh:mm")
    }).save()
        .then((results) => {
            return results
        })
        .catch((err) => {
            return false
        })
}

const getMovieInfoById = ({id}) => {//按照id查找
    return Movies.findById(id)
        .then((results) => {
            return results
        })
        .catch((err) => {
            return false
        })
}

const getMovieInfoByName = (name) => {
    
    
     return Movies.find({"movieName":{$regex: eval(`/${name}/ig`)}}).sort({ createTime: -1 })
        .then((results) => {
            return results
        })
        .catch((err) => {
            return false
        })
}

const delMovieInfoById = async ({id}) => {//按照id删除
    let _row = await getMovieInfoById ({id:id})
    let data = {id}.id
    return Movies.deleteOne({ _id: id })
        .then((results) => {
            results.deleteId = data;
            if ( _row.posterPic && _row.posterPic !== default_pic ) {
                fs.removeSync(PATH.resolve(__dirname, '../public'+_row.posterPic))
            }  
            return results
        })
        .catch((err) => {
            return false
        })
}


const updataMovie = async(body)=>{
    if(!body.posterPic)delete body.posterPic
    let _row = await getMovieInfoById ({id: body._id})
    if ( _row.posterPic && _row.posterPic !== default_pic) {
        fs.removeSync(PATH.resolve(__dirname, '../public'+_row.posterPic))
    }  
    if(body.republish){
        let _timestamp = Date.now()
        let moment = Moment(_timestamp)
        body.createTime = _timestamp,
        body.createTimeFormat = moment.format("YYYY-MM-DD, hh:mm")
        
    }
    body.posterPic = body.posterPic|| _row.posterPic || default_pic
    return Movies.updateOne({ _id: body._id }, { ...body }).then((results) => {
        return results
    }).catch((err) => {
        return false
    }) 
}




module.exports = {
    getAll: _getall,//取出全部
    list:list,
    save: _save,//增加数据
    getById:getMovieInfoById,//根据ID取出数据
    delById:delMovieInfoById,//根据ID删除数据
    getByName:getMovieInfoByName,
    updataMovie:updataMovie
}