
//引入module层
const cinema_module = require('../module/cinema_module')

//引入错误处理
const {dataHandler} = require("../utils")

//列表显示
const list = async (req,res) => {
    res.set('content-type','application/json;charset=utf8')
    let _data = await cinema_module.list(req.query);
    dataHandler(_data,res,'cinema')//返回的数据处理
}

//添加影院
const save = async (req,res) =>{
    res.set('content-type','application/json;charset=utf8')
    let _data = await cinema_module.save(req.body);
    //判断是否插入成功
    dataHandler(_data,res,'cinema')//返回的数据处理
    
}

//删除影院信息
const remove = async (req,res) =>{
    res.set('content-type','application/json;charset=utf8')
    let _data = await cinema_module.remove(req.query);
    dataHandler(_data,res,'cinema')//返回的数据处理
}

//查找ID
const selectID = async (req,res) =>{
    res.set('content-type','application/json;charset=utf8')
    let _data = await cinema_module.selectID(req.query);
    dataHandler(_data,res,'cinema')//返回的数据处理
}

//修改提交
const update = async (req,res) =>{
    res.set('content-type','application/json;charset=utf8')
    let _data = await cinema_module.update(req.body);
    dataHandler(_data,res,'cinema')//返回的数据处理
}

//查询
const listall = async (req,res) => {
    res.set('content-type','application/json;charset=utf8')
    let _data = await cinema_module.listall(req.query);
    dataHandler(_data,res,'cinema')//返回的数据处理
}

module.exports = {
    list,
    save,
    remove,
    selectID,
    update,
    listall
}