import login_template from '../view/login_body.html'
import admin_model from '../model/login_model'
import qs from 'querystring'
import toast from '../util/toast'


//初始化
const init = () =>{
    //渲染视图
    render()
    //绑定事件
    bindEvent()
    
}

const bindEvent = () =>{

    $('#regist_btn').on('click',async function(e){
        e.preventDefault()
        let _params = $(this).serialize()
        let _result = await admin_model.register(qs.parse(_params))
        console.log(_params)
        switch ( _result.status ) {
            case 500: toast('失败，服务器出了问题'); break;
            case 201:  toast('用户已存在'); break;
            default: 
                toast('注册成功');
                render('signin')
                break;
        }
    })
    //  登录表单
    $('#login_btn').on('click',async function(e) {
        e.preventDefault()
        let _params = $(this).serialize()
        console.log(_params)
        let _result = await admin_model.login(qs.parse(_params))
        console.log(_result)
        switch ( _result.status ) {
            case 203: toast('密码错误'); break;
            case 202:  toast('用户不存在'); break;
            default: 
                window.location.href = "/#/"; 
            break;
        }
    })

}



const render = () =>{
    var _html = template.render(login_template)
    $('#_start').html(_html)
     $(document).ready(function() {
        //打开会员登录 
        $("#Login_start_").click(function() {
            $("#regist_container").hide();
            $("#_close").show();
            $("#_start").animate({
                left: '350px',
                height: '520px',
                width: '400px'
            }, 500, function() {
                $("#login_container").show(500);
                $("#_close").animate({
                    height: '40px',
                    width: '40px'
                }, 500);
            });
        });
        //打开会员注册
        $("#Regist_start_").click(function() {
            $("#login_container").hide();
            $("#_close").show();
            $("#_start").animate({
                left: '350px',
                height: '520px',
                width: '400px'
            }, 500, function() {
                $("#regist_container").show(500);
                $("#_close").animate({
                    height: '40px',
                    width: '40px'
                }, 500);
            });
        });
        //关闭
        $("#_close").click(function() {
            
            $("#_close").animate({
                height: '0px',
                width: '0px'
            }, 500, function() {
                $("#_close").hide(500);
                $("#login_container").hide(500);
                $("#regist_container").hide(500);
                $("#_start").animate({
                    left: '0px',
                    height: '0px',
                    width: '0px'
                }, 500);
            });
        });
        //去 注册
        $("#toRegist").click(function(){
            $("#login_container").hide(500);
            $("#regist_container").show(500);
        });
        //去 登录
        $("#toLogin").click(function(){
            $("#regist_container").hide(500);
            $("#login_container").show(500);
        });
    });
  
}





export default{
    render,
    init
}