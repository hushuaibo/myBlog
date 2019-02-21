var express = require('express');
var router = express.Router();
var DB = require('./../modules/db.js');
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());

var blogNum;
DB.find('blogs',{},function (err,data) {
    if(err){
        console.log(err);
    }else{
        blogNum = data[0].blogId;
        for(var i=0;i<data.length;i++){
            if(data[i].blogId>blogNum){
                blogNum = data[i].blogId;
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
            res.render('blogs',{
                allBlog:allBlog,
                allClssify:allClssify
            });
        })
    })
});

router.get('/write',function (req,res) {
    DB.find('blogs',{},function (error,allBlogs) {
        if(error){
            console.log(error);
            return;
        }
        DB.find('blogClassify',{},function (erro,allClssify) {
            if(erro){
                console.log(error);
                return;
            }
            res.render('WritingBlog',{
                allBlogs:allBlogs,
                allClssify:allClssify
            });
        })
    })
});

router.post('/submit',function (req,res) {
    blogNum = blogNum+1;
    var title = req.body.Title,
        time = req.body.Time,
        abstract = req.body.Abstract,
        text = req.body.Text,
        classify = req.body.Classify,
        blogId = blogNum;
    DB.insert('blogs',{
        title:title,
        time:time,
        abstract:abstract,
        visit:'0',
        text:text,
        src:'/blogs/blogContent/'+blogId,
        classify:classify,
        blogId:blogId
    },function (error,data) {
        if(!error){
            res.redirect('');
        }
    })
});

router.get('/blogContent/:blogId',function (req,res) {//req.params获取传过来的值
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
            DB.find('blogs',{
                blogId:parseInt(req.params.blogId)
            },function (err,thisBlog) {
                if(err){
                    console.log(err);
                }
                res.render('blogContent',{
                    allBlog:allBlog,
                    allClssify:allClssify,
                    thisBlog:thisBlog[0]
                });
            })
        })
    })
});

router.post('/addVisited',function (req,res) {
    var Visit = parseInt(req.body.visit)+1;
    var blogid = parseInt(req.body.blogId);
    DB.update('blogs',{'blogId':blogid},{'visit':Visit},function (error,data) {
        if(error){
            console.log(error);
        }
    })
});

module.exports = router;