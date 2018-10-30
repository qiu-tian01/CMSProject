
const none = ()=>{}

//数据处理
const dataHandler = (data,res,template,callbacks = {})=>{
    
    let{success,fail} = {
        success:callbacks.success||none,
        fail:callbacks.fail||none,
    }
    if(!data){//失败
        fail();
        response.call(res,{template,"status":"500","data":JSON.stringify("发生了一个预期之外的错误的错误")})
    }else{
        success();
        response.call(res,{template,"status":'200',"data":JSON.stringify(data)})
    }
}

const response = function({template,status,data}){
    this.render(template,{
        "status":status,
        "data":data
    })
} 


const hash = (textplain) => {  
    const saltRounds = 10; // 加密强度 10
    return new Promise((resolve) => {
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(textplain, salt, function(err, hash) {
                // Store hash in your password DB.
                resolve(hash)
            });
        });
    })
    
}

module.exports = {
    dataHandler,
    hash
}