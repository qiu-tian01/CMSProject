//引入样式
import '../stylesheets/app.scss'
//引入路由
import router from './router'


const body_template = require('./view/body.html')

//渲染页面
$('#wrapper').html(body_template);

router.init(); 

