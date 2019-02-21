var express = require('express');
var router = express.Router();
var DB = require('./../modules/db.js');
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());

var messageNum;
DB.find('leavingMessage',{},function (err,data) {
    if(err){
        console.log(err);
    }else{
        messageNum = data[0].messageId;
        for(var i=0;i<data.length;i++){
            if(data[i].messageId>messageNum){
                messageNum = data[i].messageId;
            }
        }
    }
});

router.get('/',function (req,res) {
    DB.find('blogs',{},function (error,allBlog) {
        if(error){
            console.log(error);
            return;
        }
        DB.find('blogClassify',{},function (erro,allClssify) {
            if(erro){
                console.log(erro);
                return;
            }
            DB.find('leavingMessage',{},function (err,allLeavingMessage) {
                if(err){
                    console.log(err);
                    return;
                }
                res.render('LeavingMessage',{
                    allBlog:allBlog,
                    allClssify:allClssify,
                    allLeavingMessage:allLeavingMessage,
                    user:req.session.userInfo
                });
            })
        })
    });
});

router.post('/writeMessage',function (req,res) {
    messageNum+=1;
    var MessageId = messageNum;
    var MessageText = req.body.messageText;
    var myDate = new Date();
    var year = myDate.getFullYear();
    var month = myDate.getMonth()+1;
    var date = myDate.getDate();
    var hours = myDate.getHours();
    var minutes = myDate.getMinutes();
    var seconds = myDate.getSeconds();
    var Time = year + '/' + month + '/' + date + '   ' + hours + ':' + minutes + ':' + seconds;
    DB.insert('leavingMessage',{
        messageId:MessageId,
        userName:req.session.userInfo.username,
        messageText:MessageText,
        isTop:'1',
        reply:'',
        time:Time
    },function (err,data) {
        if(err){
            console.log(err);
        }else {
            res.send("<script>alert('留言成功');location.href='/LeavingMessage'</script>");
        }
    })
});
router.post('/replyMessage',function (req,res) {
    messageNum+=1;
    var MessageId = messageNum;
    var MessageText = req.body.messageText;
    var Reply = req.body.messageReply;
    var myDate = new Date();
    var year = myDate.getFullYear();
    var month = myDate.getMonth()+1;
    var date = myDate.getDate();
    var hours = myDate.getHours();
    var minutes = myDate.getMinutes();
    var seconds = myDate.getSeconds();
    var Time = year + '/' + month + '' + date + '   ' + hours + ':' + minutes + ':' + seconds;
    DB.insert('leavingMessage',{
        messageId:MessageId,
        userName:req.session.userInfo.username,
        messageText:MessageText,
        isTop:'0',
        reply:Reply,
        time:Time
    },function (err,data) {
        if(err){
            console.log(err);
        }else {
            res.send("<script>alert('留言成功');location.href='/LeavingMessage'</script>");
        }
    })
});

module.exports = router;