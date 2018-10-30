
//列表数据
const list = (page) => {
    return $.ajax({
        url: '/api/cinema/list',
        data: page,
        success:(results) => {
           return results
        }
    })
}

//表单提交
const save = (data) => {
    //新的版本，用于文件上传等数据
    return new Promise((resolve) =>{//ajaxSubmit不是Promise，所以要new一个Promise
        $('.cinema-save #cineamSave-form').ajaxSubmit({
            url : '/api/cinema/save',
            type : 'post',
            success : (results) =>{
                resolve(results)
            }
        })
    })

    //以前的版本
    // return $.ajax({
    //     url: '/api/cinema/save',
    //     type : 'post',
    //     data,//要传数据！！！！找了半天！！！
    //     success:(results) => {
    //        return results
    //     }
    // })
}

//删除列表
const remove = (data) => {
    return $.ajax({
        url: '/api/cinema/remove',
        data,
        success:(results) => {
           return results
        }
    })
}

//根据ID查找信息（修改信息）
const selectID = (data) => {
    return $.ajax({
        url: '/api/cinema/selectID',
        data,
        success:(results) => {
           return results
        }
    })
}

//修改的提交
const update = (data) => {
    //新版本修改图片并上传
    return new Promise((resolve) => {
        $('.cinema-update #cineamUpdate-form').ajaxSubmit({
            url: '/api/cinema/update',
            type: 'POST',
            success: (results) => {
                resolve(results)
            }
        })
    })

    //旧的版本
    // return $.ajax({
    //     url: '/api/cinema/update',
    //     type : 'post',
    //     data,
    //     success:(results) => {
    //        return results
    //     }
    // })
}


export default {
    list,
    save,
    remove,
    selectID,
    update
}