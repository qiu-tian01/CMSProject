var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/movies', {
  useNewUrlParser: true
});
//connect() 返回一个状态待定（pending）的连接， 接着我们加上成功提醒和失败警告

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
}); //连接成功时，回调函数会被调用。

module.exports = mongoose