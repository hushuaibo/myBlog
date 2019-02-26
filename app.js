//引入实例化express
var express=require('express');
var app=new express;
var session = require('express-session');

//引入自定义模块
var DB = require('./modules/db.js');
var index = require('./routes/index.js');
var admin = require('./routes/admin.js');
var aboutMe = require('./routes/aboutMe.js');
var album = require('./routes/album.js');
var blogs = require('./routes/blogs.js');
var user = require('./routes/user.js');
var LeavingMessage = require('./routes/LeavingMessage.js');

//配置session
app.use(session({
    secret:'keyboard cat',
    resave:false,
    saveUninitialized:true,
    cookie:{
        maxAge:1000*60*60*24*7
    },
    rolling:true
}));

app.use(function (req,res,next) {
    if(req.session.userInfo){
        app.locals['state'] = 1;
        app.locals['userInfo'] = req.session.userInfo;
        next();
    }else{
        app.locals['state'] = 0;
        next();
    }
});

//使用ejs模板引擎   默认找views这个目录
app.set('view engine','ejs');

//配置静态资源
app.use(express.static('public'));

//路由匹配
app.use('/',index);
app.use('/admin',admin);
app.use('/aboutMe',aboutMe);
app.use('/album',album);
app.use('/blogs',blogs);
app.use('/user',user);
app.use('/LeavingMessage',LeavingMessage);

app.use(function (req,res) {
    res.render('404');
});

//端口监听
app.listen('8888','127.0.0.1');