const mongoose = require("../utils/mongoose");
//引入处理时间戳
const Moment = require("moment");

//创建model模型
var Cinema = mongoose.model("cinemas",new mongoose.Schema({
    name: String, //影院名称
    city: String, //影院地点
    boxOffice: String, //票房
    createTime: String, //发布时间
    formaTime: String,
    cinemaLogo : String //影院的logo
  })
);

//返回影院的全部列表,用于查找
const listall = (query) => {
  let _query = query || {} ; ////查询的约定条件
  return Cinema.find(_query)
    .sort({ createTime: -1 }) //按时间降序排列
    .then((results) => {
      return results
    })
    .catch((err) => {
      return false;
    });
};

//返回影院的列表
const list = async ( { pageNo = 1 , pageSize = 10} ) => {
  let _query = {}; ////查询的约定条件

  let _all_items = await listall(_query)
  return Cinema.find(_query)
  //按时间降序排列
  //skip 从哪里开始取
  //limit 去几条
    .sort({ createTime: -1 })
    .skip((pageNo - 1)*(pageSize))
    .limit(~~pageSize)//~~是将pageSize转成Number，pageSize原本是string,效率最高
    .then((results) => {
      return {
        items : results,//数据信息
        pageInfo : {
          pageNo,
          pageSize,
          total: _all_items.length, // 总数
          totalPage: Math.ceil(_all_items.length / pageSize) // 总页数
        }
      }
    })
    .catch((err) => {
      return false;
    });
};
//返回列表结束

let default_logo = '/uploads/logos/logo.jpg'


//保存添加影院数据
const save = (body) => {
  let _timestamp = Date.now(); //保存时间
  let moment = Moment(_timestamp);
  body.cinemaLogo =  body.cinemaLogo || default_logo
  return new Cinema({
    ...body,
    createTime: _timestamp,
    formaTime: moment.format("YYYY-MM-DD, hh:mm")
  })
    .save()
    .then((results) => {
      return results;
    })
    .catch((err) => {
      return false;
    });
};
//添加影院结束

//删除影院信息
const remove = ( { id } ) => {//传入iD删除这条信息
  //数据库操作删除，Cinema是数据库模板
   //数据库中存的是_id所以要找到_id中的id
   let _row = selectID({id})
  return Cinema.deleteOne({ _id: id }).then( (results) => {
    results.deleteid = id //找到这个id
    //判断删除的文件的图片,有图片就删除图片
    if ( _row.cinemaLogo && _row.cinemaLogo !== default_logo ) {
      fs.removeSync(PATH.resolve(__dirname, '../public'+_row.cinemaLogo))
    }  
    return results;
  }).catch( (err) => {
    return false;
  })
 
}

//删除影院信息结束

//查找ID
const selectID = ({ id }) =>{
  return Cinema.findById(id)
    .then((results) => {
      return results
    })
    .catch((err) => {
      return false;
    });
}

//修改表单提交
const  update = (body) =>{
  if(!body.cinemaLogo) delete body.cinemaLogo;
  //是否重新发布
  if(body.isRupublish){//存在勾选就重新发布信息
    let _timestamp = Date.now(); //保存时间
    let moment = Moment(_timestamp);
    body.createTime = _timestamp;
    body.formaTime = moment.format("YYYY-MM-DD, hh:mm");

  }
  return Cinema.updateOne({ _id: body.id }, { ...body })
    .then((results) => {
      return results
    })
    .catch((err) => {
      return false;
    });
}



module.exports = {
  list,
  save,
  remove,
  selectID,
  update,
  listall

};
