const deleteAlert = (remove,_page, _id) => {
    swal({
        title: '确定删除吗？',
        text: '你将无法恢复它！',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '确定删除！',
        cancelButtonText: '取消删除！',
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false
    }).then(async function (isConfirm) {
        if (isConfirm.value) {
            let result = await remove(_id,_page)
            if (result.status == 200) {
                swal(
                    '已删除',
                    '这条数据已经被删除。',
                    'success'
                );
            } else {
                swal(
                    '删除失败！',
                    '删除过程中发生了一个预期之外的错误。',
                    'error'
                );
            }
        } else {
            swal(
                '已取消！',
                '您取消了删除操作:)',
                'error'
            );
        }
    })

}
 
const Alert = (status)=>{
    if(status==200){
        swal(
            '保存成功',
            '您的数据已成功添加',
            'success'
          )
    }else{
        swal(
            '保存失败',
            '保存过程中发生了一个预期之外的错误',
            'error'
          )
    }
}



export default {
    deleteAlert,
    Alert
}