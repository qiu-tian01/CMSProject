
const user_model = require('../module/login_model')

const { handleData } =require('../utils')


//注册
const register = async (req,res,next) =>{
    let _judge_result = await user_model.judgeUserByusername(req.body.username)

    if(!!_judge_result.length){
        let _data = await user_model.register(req.body)
        handleData(_data,res,'user')
    }else{
        res.render('user',{
            code:201,
            status:JSON.stringify('用户名存在')
        })
    }
}

const login =async( req,res, next) =>{

    let _judge_result = await user_model.judgeUserByusername(req.body.username)

    if(!!_judge_result.length){
      let _data = await user_model.login(req.body.password,_judge_result[0])

      if(_data) {
          //存session
          req.session.userinfo ={
                userid : _judge_result[0].id,
                level :5
          }
          res.render('user',{code:200,status:JSON.stringify('success')})
      }else{
          res.render('user',{code:202,status:JSON.stringify('密码错误')})
      }
    }else{
          res.render('user',{code:203,status:JSON.stringify('用户名不存在')})
    }

}

module.exports={
    register,
    login
}

