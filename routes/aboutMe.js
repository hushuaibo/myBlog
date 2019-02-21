var express = require('express');
var router = express.Router();
var DB = require('./../modules/db.js');

router.get('/',function (req,res) {
    DB.find('blogs',{},function (error,allBlogs) {
        if(error){
            console.log(error);
            return;
        }
        DB.find('blogClassify',{},function (erro,allClssifys) {
            if(erro){
                console.log(erro);
                return;
            }
            res.render('aboutMe',{
                allBlog:allBlogs,
                allClssify:allClssifys
            })
        })
    })
});

module.exports = router;