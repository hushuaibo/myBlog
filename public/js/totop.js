window.onscroll=function () {
    if(document.documentElement.scrollTop>300){
        document.getElementsByClassName('toTop')[0].style.display='block';
    }else{
        document.getElementsByClassName('toTop')[0].style.display='none';
    }
};
function totop() {
    window.scrollBy(0,-15);
    scrolldelay = setTimeout("totop()",1);
    if(document.documentElement.scrollTop == 0){
        clearTimeout(scrolldelay);
    }
}