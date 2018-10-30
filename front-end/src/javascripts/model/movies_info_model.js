const list = (data) => {
    return new Promise((resolve) => {
        $.ajax({
            url: '/api/movies/movies-list',
            data,
            success: function (results) {
                resolve(results)
            }
        });
    })
}
const addMovieInfo = (data) => {
    return new Promise((resolve) => {
        $('#save-form').ajaxSubmit({
            url: '/api/movies/save',
            type: 'POST',
            success: (results) => {
                resolve(results)
            }
        })
    })
}

const searchMoviesByName=(data)=>{
   return new Promise((resolve)=>{
    $.ajax({
        url: '/api/movies/getbyname',
        data,
        success: function (results) {
            resolve(results)
        },
    });
   }) 
}

const searchMoviesById=(data)=>{
   
   return  $.ajax({
        url: '/api/movies/getbyid',
        data,
        success: function (results) {
           return results
        },
    });
}

const deleteMovieInfo = (data) => { //删除电影信息

   return $.ajax({
        url: '/api/movies/deletebyid',
        data,
        success: function (results) {
            
            return (results)
        }
    });

}

const updataMovieInfo = (data) => {
    return new Promise((resolve) => {
        $('#updata-form').ajaxSubmit({
            url: '/api/movies/updatamovie',
            type: 'POST',
            success: (results) => {
                resolve(results)
            }
        })
    })
}



export default {
    list,
    addMovieInfo,
    deleteMovieInfo,
    searchMoviesByName,
    searchMoviesById,
    updataMovieInfo
}