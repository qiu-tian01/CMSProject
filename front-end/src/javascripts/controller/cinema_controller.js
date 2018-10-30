import { bus,handleToastByData } from '../util/'

import cinemaList_template from '../view/cinemaList.html'; 
import cinemaList_save_template from '../view/cinema_save.html'; 
import cinemaList_update_template from '../view/cinema_update.html'; 

import cinema_model from '../model/cinema_model'
import qs from 'querystring'



const cinema = async (req,res,next) =>{
    req.query = req.query || {} //防止没有参数的时候，req.query为null

    let _page = {
        pageNo: req.query.pageNo,
        pageSize: req.query.pageSize,
        search: req.query.search
    }

    let html = template.render(cinemaList_template,{//将数据渲染进模板
        data : (await cinema_model.list(_page)).data
    })
    res.render(html);
    addClickEvent(_page);//添加点击事件
}

//影院添加
const cinemaSave = async (req,res,next) =>{
    
    res.render(cinemaList_save_template)
    saveEvent();//添加按钮
}

//修改信息
const cinemaUpdate = async (req,res) =>{
    let { id } = req.body// 要更新的数据的id
    //1获取对应id的数据进行渲染，后端要给接口
    let html = template.render(cinemaList_update_template,{
        data : (await cinema_model.selectID( { id })).data//要传入ID
    })
    res.render(html)
    bindUpdateEvent();
}


//添加点击事件
const addClickEvent = (_page) =>{
    //列表跳转页面
    $('.cinema-list #addbtn').on('click',function(){
        bus.emit('go','/cinema-save');
    })

    //点击删除
    $('.pos-remove').on('click', removeCinemaListEvent.bind(null,_page))

    //点击修改信息
    $('.pos-update').on('click',function(){
        let id = $(this).parents('tr').data('id')
        bus.emit('go','/cinema-update' , { id } );//路由隐式传参
    })

}
//删除影院列表事件
const removeCinemaListEvent = async function (_page) {
    //删除影院信息
    let id = $(this).parents('tr').data('id')
    let _data = await cinema_model.remove({ id : id })
     // 删除的时候此页还有多少条数据
    handleToastByData(_data,{
        isReact: false,
        success: (data) => {
            // 删除成功
            console.log(data)
            
            bus.emit('go', '/cinema-list?pageNo='+_page.pageNo+'&_='+data.deleteid)
        }
    })
}

//返回列表的事件
const saveEvent = () =>{
    //返回列表
    $('.returnCinemaList #returnList').on('click',function(){
        bus.emit('go','/cinema-list');
    })
    //表单提交
    $('#cineamSave-form').submit(handleSaveSubmit)
}

//表单提交方法
//连续点击的开关判断，防止多次提交
let _isLoading = false;
const handleSaveSubmit = async function (e){
    e.preventDefault()//阻止表单的默认提交
    if(_isLoading) return false;
    _isLoading =true 
    //旧的版本，新的版本要上传文件
    //let datastr = $(this).serialize();//得到表单的数据
    //let params = qs.parse(datastr)//转换为对象
    let _result = await cinema_model.save()

    _isLoading = false;
    handleToastByData(_result)
}
//表单提交方法结束

//修改信息的绑定事件
const bindUpdateEvent = () =>{
    //返回列表
    $('.cinema-update #returnList').on('click',function(){
        bus.emit('go','/cinema-list');
    })

    //修改后的表单提交
    $('.cinema-update #cineamUpdate-form').submit(bindUpdateSubmit)
}

//修改信息的提交
const bindUpdateSubmit = async function(e) {//因为this绑定问题不能用箭头函数
    e.preventDefault();
    //  使用jquery.form.js不用再传数据，它会自己找
    // let _datastr = $(this).serialize()
    // let _data = qs.parse(_datastr)
    let _results = await cinema_model.update()  
    handleToastByData(_results)
}




export default{
    cinema,  
    cinemaSave,
    cinemaUpdate
}