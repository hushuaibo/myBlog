var express = require('express');
var router = express.Router();
var DB = require('./../modules/db.js');
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());

router.get('/login',function (req,res) {
    res.render('login');
});

router.post('/doLogin',function (req,res) {
    DB.find('user',{'username':req.body.userName,"password":req.body.passWord},function (error,data) {
        if(data.length>0){
            req.session.userInfo = data[0];
            DB.find('user',req.session.userInfo,function (err,data) {
                if(err){
                    console.log(err)
                }else{
                    DB.update('user',{
                        'username': req.session.userInfo.username,
                        'password': req.session.userInfo.password,
                        'phone': req.session.userInfo.phone
                    },{'state':'1'},function (error) {
                        if(error){
                            console.log(error);
                        }else{
                            res.redirect('/blogs');
                        }
                    })
                }
            });
        }else{
            console.log('登录失败');
            res.send("<script>alert('登录失败');location.href='/user/login'</script>");
        }
    });
});

router.get('/register',function (req,res) {
    res.render('register');
});

router.post('/doRegister',function (req,res) {
    var username = req.body.userName;
    var password = req.body.passWord;
    var phone = req.body.mobilePhone;
    if(!(/^1[34578]\d{9}$/.test(phone))){
        res.send("<script>alert('手机号码格式有误，请输入有效的手机号！');location.href='/user/register'</script>");
    }else{
        DB.find('user',{username:username},function (error,data) {
            if(data.length>0){
                res.send("<script>alert('用户名已被占用，换个名字吧');location.href='/user/register'</script>");
            }else{
                DB.insert('user',{
                    username:username,
                    password:password,
                    phone:phone,
                    state:1
                },function (error,data) {
                    res.send("<script>alert('注册成功，现在去登录吧！');location.href='/user/login'</script>");
                });
            }
        });
    }
});

router.get('/Out',function (req,res) {
    DB.update('user',{
        'username': req.session.userInfo.username,
        'password': req.session.userInfo.password,
        'phone': req.session.userInfo.phone
    },{'state':'0'},function (error) {
        if(error){
            console.log(error);
        }else{
            req.session.destroy(function (err) {
                if(err){
                    console.log(err);
                }else{
                    res.redirect('/user/login');
                }
            })
        }
    })
});

module.exports = router;