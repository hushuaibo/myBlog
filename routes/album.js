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
            DB.find('album',{},function (err,allAlbums) {
                if(err){
                    console.log(err);
                    return;
                }
                res.render('album',{
                    allBlog:allBlogs,
                    allClssify:allClssifys,
                    allAlbum:allAlbums
                });
            })
        })
    })
});

module.exports = router;