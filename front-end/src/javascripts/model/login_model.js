const login = (data) =>{
    return $.ajax({
        url : '/api/user/login',
        type:'post',
        data,
        success:(result) =>{
            return result
        }
    })
    
}
const register=(data) =>{
    return $.ajax({
        url : '/api/user/register',
        type:'post',
        data,
        success:(result) =>{
            return result
        }
    })
}

export default{
    login,
    register
}