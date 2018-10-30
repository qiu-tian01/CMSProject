
import SMERouter from 'sme-router'

import home_template from '../view/home.html';
import notFound_template from '../view/404.html';
import movies_info_controller from'../controller/movies_info_controller';
import {bus} from '../util'

//controller控制器
import cinema_controller from '../controller/cinema_controller';

var router = null;

//启动路由
const _init = () =>{    

    router = new SMERouter('router-view')

    // 中间件会先执行
    router.use((req, res, next) => {
        _activeLink(req.route) 
    })

    router.route('/home',(req,res,next) =>{
        res.render(home_template)
    })
    router.route('/cinema-list',cinema_controller.cinema)
    router.route('/cinema-save',cinema_controller.cinemaSave)
    router.route('/cinema-update',cinema_controller.cinemaUpdate)
    router.route('/movies-list',movies_info_controller.list)
    router.route('/movies-add',movies_info_controller.showAddMovie)
    router.route('/movies-update',movies_info_controller.update)
    router.route('/notFound',(req,res,next) =>{
        res.render(notFound_template)
        _navLink('.not-found a[to]')
    })
    
    //重定向
    // router.route('*', (req, res, next) => {
    //     if ( req.url === '' ) { // 刚进入项目，没有hash值，重定向到home
    //         res.redirect('/home')
    //     }else { // 如果路径匹配不到，导向404
    //          res.redirect('/notFound')
    //     }
    // })




    _navLink();
}

//给导航添加事件
const _navLink = () =>{
    let navname = $('.sidebar-menu li[to]');
    navname.on("click",function(){
        //获取to的属性值 
        let _path = $(this).attr('to');
        router.go(_path);
    })
}

 //给点击事件添加类名
 const _activeLink = (route) =>{
    let navname = $('.sidebar-menu li[to]')
     //根据不同的hash值来判断
     navname.filter(`[to='${route}']`)
             .addClass('active')
             .siblings()
             .removeClass('active')
}

bus.on('go', (path, body = {}) =>  router.go(path, body) )




export default {
    init : _init
};


