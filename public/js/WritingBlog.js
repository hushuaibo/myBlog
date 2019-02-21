$(document).ready(function () {
   $('.WriteBlogsSubmit').click(function () {
       var Title = $('.WriteBlogsTitle').val();
       var Abstract = $('.WriteBlogsAbstract').val();
       var Text = $('.note-editable').html();
       var Classify = $(".WriteBlogsclassify option:selected").val();
       var myDate = new Date();
       var year = myDate.getFullYear();
       var month = myDate.getMonth()+1;
       var date = myDate.getDate();
       var hours = myDate.getHours();
       var minutes = myDate.getMinutes();
       var seconds = myDate.getSeconds();
       var Time = year + '年' + month + '月' + date + '日'+ '   ' + hours + ':' + minutes + ':' + seconds;
       $.ajax({
           type: 'post',
           url: '/blogs/submit',
           data: {
               Title:Title,
               Abstract:Abstract,
               Text:Text,
               Classify:Classify,
               Time:Time
           },
           success: function (data) {
               alert('上传失败');
           },
           error:function(data){
               alert('上传成功');
               location.href='/blogs';
           }
       });
   })
});