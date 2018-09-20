import AV from "leancloud-storage"

var APP_ID = 'VjGAoyLEOUXGeNS805hWtpSB-gzGzoHsz';
var APP_KEY = 'o0hVP6cRGPFn9pzy5BK4YCFf';

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});

var stuA = AV.Object.extend('stu');      // 学生表

var stuS = "stu";

var sqlStr = [stuS];
var sqlArr = [stuA];

// 增加
export function save(db, data) {
    var db = sqlArr[sqlStr.indexOf(db)];
    var dbObj = new db();
    for (var k in data) {
        dbObj.set(k, data[k]);
    }
    dbObj.save().then(function (res) {
        alert("保存成功");
    }, function () {
        alert("ERROR");
    })
}
// 根据id查找
export function query(db, _id) {
    var queryObj = new AV.Query(db);
    queryObj.get(_id).then(function (res) {
        console.log(res.toJSON());
    }, function () {
        alert("ERROR");
    })
}
// 根据id删除
export function destroy(db, _id) {
    var todo = AV.Object.createWithoutData(db, _id);
    todo.destroy().then(function (success) {
        // 删除成功
        alert("删除成功")
    }, function (error) {
        // 删除失败
        alert("ERROR");
    });
}
// 查询所有
export function findAll(db) {
    var commentQuery = new AV.Query(db);
    commentQuery.limit(10);
    commentQuery.find().then(function (res) {
        console.log(res);
        console.log(res.toJSON());
    }, function (error) {
        alert("ERROR");
    });
}
// 注册{password:"密码",email:"邮箱"}
export function register(info, callback) {
    var user = new AV.User();
    user.setUsername(info.email);
    user.setPassword(info.password);
    user.setEmail(info.email);
    user.signUp().then(function (res) {
        callback({ code: 0, message: res.toJSON() });
    }, function (error) {
        callback({ code: 500, message: "注册失败，用户已存在或服务器繁忙" });
    })
}
// 登录{email:"姓名",password:"密码"}
export function login(info, callback) {
    AV.User.logIn(info.email, info.password).then(function (res) {
        callback({code:0,message:res.toJSON()});
    }, function (error) {
        callback({ code: 500, message: "用户名或密码错误" });
    })
}
// 判断是否登录
export function islogin() {
    var currentUser = AV.User.current();
    if (currentUser) return true;
    else return false;
}
// 登出
