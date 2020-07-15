/* 给导航栏的地址区域添加点击改变事件*/
var aDdres = document.querySelectorAll(".navgation .item a");
var aDdsho = document.querySelectorAll(".navgation .add span")[0];
for (var i = 0; i < aDdres.length; i++) {
    aDdres[i].onclick = function () {
        for (var j = 0; j < aDdres.length; j++) {
            aDdres[j].className = ""
        }
        aDdsho.innerText = this.innerText;
        this.className = "seaon";
    }
}

/* 京东LOGO添加变换效果 */
var jdImg = document.querySelectorAll("#header .headw .jdmk img");
var jdIa = document.querySelectorAll("#header .headw .jdmk a")[0];
var index = 0; //定义下标
var p = document.createElement("p");
p.innerHTML = "老板大气！";

var timer1 = setInterval(function () {
    jdImg[index].className = "";
    index++;
    if (index > jdImg.length - 1) index = 0;
    jdImg[index].className = "ochange";
    if (index == 1) {
        jdIa.appendChild(p);
    } else {
        jdIa.removeChild(p);
    }
}, 5000);


/* 中间轮播图渐变js */
var oBanner = document.getElementsByClassName("banLeft")[0];
var oImg = document.querySelectorAll("#recinfo .infomain .infoM .banLeft img");
var opBtn = document.querySelectorAll("#recinfo .infomain .infoM .banLeft p");
var oLi = document.querySelectorAll("#recinfo .infomain .infoM .banLeft .banUl li");
var indexBan = 0; //定义下标
var timer = setInterval(function () {
    next();
}, 2000);
//鼠标点击向前切换图片
opBtn[0].onclick = function () {
    oImg[indexBan].className = "";
    indexBan--;
    //当下标的值小于0 那么让下标变为最大值 到最后一张
    if (indexBan < 0) indexBan = oImg.length - 1;
    oImg[indexBan].className = "banOn";
}
//鼠标点击向后切换图片
opBtn[1].onclick = function () {
    next();
}
//给轮播图添加鼠标移入移出事件 移入停止轮播  移出恢复轮播
oBanner.onmouseover = function () {
    clearInterval(timer);
}
oBanner.onmouseout = function () {
    timer = setInterval(function () {
        next();
    }, 2000)
}
//给小圆点添加鼠标移入事件
for (var i = 0; i < oLi.length; i++) {
    (function (m) {
        oLi[m].onmouseover = function () {
            oImg[indexBan].className = "";
            indexBan = m;
            oImg[indexBan].className = "banOn";
            onChange();
        }
    })(i) //回调函数
}
//封装下一张图片的犯法
function next() {
    oImg[indexBan].className = "";
    indexBan++;
    //当下标的值大于图片长度-1 那么让下标变为0 回到第一张图片
    if (indexBan > oImg.length - 1) indexBan = 0;
    oImg[indexBan].className = "banOn";
    onChange();
}
//给小圆点封装变色事件
function onChange() {
    for (var i = 0; i < oLi.length; i++) {
        oLi[i].className = ""
    }
    oLi[indexBan].className = "on"
}



/* 动态京东秒杀倒计时 */
var Hour = document.getElementsByClassName("hours")[0];
var Mins = document.getElementsByClassName("mins")[0];
var Seconds = document.getElementsByClassName("seconds")[0];

var cdtime = setInterval(function () {
    var date = new Date();
    var fhour = 0;
    var fmin = 60 - date.getMinutes();
    var fsed = 60 - date.getSeconds();
    if (fsed < 10) {
        Seconds.innerText = "0" + fsed;
    } else if (fsed == 60) {
        Seconds.innerText = "00";
    } else {
        Seconds.innerText = fsed;
    }
    if (fmin < 10) {
        Mins.innerText = "0" + fmin;
    } else if (fmin == 60) {
        Mins.innerText = "00";
    } else {
        Mins.innerText = fmin;
    }
    if (date.getHours() >= 20) {
        fhour = 23 - (date.getHours() - 20);
    } else {
        fhour = 19 - date.getHours();
    }
    if (fhour < 10) {
        Hour.innerText = "0" + fhour;
    } else if (fhour == 60) {
        Hour.innerText = "00";
    } else {
        Hour.innerText = fhour;
    }
}, 100);




/* 每日特价部分选项卡效果 */
var tjLi = document.querySelectorAll(".jInfo1 .box_hd ul li");
var tjBox = document.querySelectorAll(".jInfo1 .box_txt .tjbox");
for (var i = 0; i < tjLi.length; i++) {
    tjLi[i].num = i;
    tjLi[i].onmouseenter = function () {
        for (var j = 0; j < tjLi.length; j++) {
            tjLi[j].childNodes[0].className = "";
            tjBox[j].style.display = "none";
        }
        this.childNodes[0].className = "fitem";
        tjBox[this.num].style.display = "block";
    }

}




/* 随着滚动条到一定的位置右边导航栏变成固定定位 */
window.onscroll = function () {
    var html = document.getElementsByTagName("html");
    var rigNav = document.getElementById("ritNav");
    var hidsech = document.getElementById("hidsech");

    if (html[0].scrollTop >= 680) {
        rigNav.style.position = "fixed";
        rigNav.style.top = 70 + "px";
        rigNav.style.right = 280 + "px";
        animationSlow(hidsech, {
            top: 0
        });
    } else if (html[0].scrollTop <= 680) {
        rigNav.style.position = "absolute";
        rigNav.style.top = 680 + "px";
        rigNav.style.right = 280 + "px";
        animationSlow(hidsech, {
            top: -53
        });
    }
}
ritNavcg();
window.onresize = function () { //监听浏览器窗口的变化
    ritNavcg();
}

function ritNavcg() {
    var inWidht = window.innerWidth;
    // var width1 = document.body.clientWidth;

    var rigNav = document.getElementById("ritNav");
    if (inWidht <= 1870) {
        rigNav.style.display = "none"
    } else {
        rigNav.style.display = "block"
    }
}


//实现 findban的无限轮播滚动效果
var findban = document.querySelector(".findban");
var findwrap = document.querySelector(".findban .findwrap");
var scrollwrap = document.querySelector(".scrollbar");
var scrollbar = document.querySelector(".scrollbar span");
var step = 0;
var step2 = 0;
var isEnd = true;
var maxleft = scrollwrap.offsetWidth - scrollbar.offsetWidth; //滚动条的最大宽度


//将第1,2,3,4,5张克隆一组到最后
var findbanList = document.querySelectorAll(".findban .findwrap a");
for (var i = 0; i < 5; i++) {
    var a = document.createElement("a");
    a.innerHTML = findbanList[i].innerHTML;
    findwrap.appendChild(a);
}

//开启自动轮播
var timeID = setInterval(function () {
    sportBan()
}, 30);

//鼠标移入清除定时器
findban.onmouseover = function () {
    scrollwrap.style.visibility = "visible"
    clearInterval(timeID);
}
//鼠标移出wrap就重新开始定时器
findban.onmouseout = function (e) {
    //鼠标移出的时候判断scrollbar 是否onmousedown了
    if (isEnd) {
        scrollwrap.style.visibility = "hidden";
        timeID = setInterval(function () {
            sportBan()
        }, 30)
    }
}

/* 滚动条拖拽事件 */
scrollbar.onmousedown = function (e) {

    isEnd = false;
    var x = getPagePoint().pageX - findban.offsetLeft - scrollwrap.offsetLeft - scrollbar.offsetLeft;
    e.stopPropagation();
    document.onmousemove = function (e) {
        var x1 = getPagePoint().pageX - findban.offsetLeft - scrollwrap.offsetLeft - x;
        //边界值检测
        x1 = x1 < 0 ? 0 : x1;
        x1 = x1 > maxleft ? maxleft : x1;
        scrollbar.style.left = x1 + "px";
        step2 = x1;
        step = x1 * 1980 / maxleft;
        findwrap.style.left = -step + "px";
    }
    window.onmouseup = function () {
        //先清除上一次的定时器
        clearInterval(timeID);
        isEnd = true;
        scrollwrap.style.visibility = "hidden";
        document.onmousemove = null;
        if (isEnd) {
            timeID = setInterval(function () {
                sportBan()
            }, 30)
        }
    }
    findban.onmouseup = function (e) {
        isEnd = true;
        document.onmousemove = null;
        e.stopPropagation(); //阻止冒泡
    }
}

function sportBan() {
    step += 1;
    step2 += maxleft / 1980;
    findwrap.style.left = -step + "px";
    scrollbar.style.left = step2 + "px";
    if (parseInt(findwrap.style.left) <= -1980) {
        scrollbar.style.left = 0 + "px";
        findwrap.style.left = 0 + "px";
        step2 = 0;
        step = 0;
    }
}

/* 新品首发轮播图JS */
//获取左右两边按钮
var bLbtn = document.querySelector("#J_core .bL");
var bRbtn = document.querySelector("#J_core .bR");
//获取所有的items
var boxitems = document.querySelectorAll(".J_newArrival .boxbanner .boxitem");
var boxban = document.querySelector(".boxbanner");
var msgname = document.querySelectorAll(".msgname");
var JnewArrival = document.querySelector(".J_newArrival");
var banstep = 130;
var cIndex = 0;

for (var i = 0; i < boxitems.length; i++) {
    boxitems[i].onmouseover = function () {
        this.children[0].children[1].children[0].style.color = "#d65763";
    }
    boxitems[i].onmouseout = function () {
        this.children[0].children[1].children[0].style.color = "";
    }
}
/* 
    移动的是套在最外层的boxban
    每次移动改变下标
    根据下标的值来给对应下标的boxitems元素加上show类名
    show类名就会将boxmsg中的信息改为可见 并且scal为1 原始比例
*/
bLbtn.onclick = function () {
    if (cIndex <= 0) {
        cIndex = 4;
        boxban.style.left = "-520px"
    }
    cIndex--;
    animationSlow(boxban, {
        left: -cIndex * banstep
    });
    for (var i = 0; i < boxitems.length; i++) {
        boxitems[i].className = "boxitem"
    }
    boxitems[cIndex + 1].className += " show";
}

bRbtn.onclick = function () {
    coreBegin()
}
//开启自动轮播
var coreTime = setInterval(function () {
    coreBegin()
}, 3000);

//鼠标移入移出JnewArrival 开启和关闭定时器
JnewArrival.onmouseover = function () {
    clearInterval(coreTime);
}
JnewArrival.onmouseout = function () {
    coreTime = setInterval(function () {
        coreBegin()
    }, 3000);
}

function coreBegin() {
    if (cIndex >= 5) {
        cIndex = 1;
        boxban.style.left = "-130px"
    }
    cIndex++;
    animationSlow(boxban, {
        left: -cIndex * banstep
    });
    for (var i = 0; i < boxitems.length; i++) {
        boxitems[i].className = "boxitem"
    }
    boxitems[cIndex + 1].className += " show";
}


/* 排行榜部分动态js效果 */
var hdList = document.querySelectorAll(".J_top .box_bd .tab_hd li");
var bdItems = document.querySelectorAll(".J_top .box_bd .tab_bd>div");
// 排他思想解决
for (var i = 0; i < hdList.length; i++) {
    hdList[i].index = i;
    hdList[i].onmouseover = function () {
        for (var j = 0; j < hdList.length; j++) {
            if (this == hdList[j]) {
                this.className = "current";
                bdItems[this.index].style.display = "block";
            } else {
                hdList[j].className = "";
                bdItems[j].style.display = "none";
            }
        }
    }
}


/* 实现话费机票酒店游戏 移入移出动态效果 */
var jItems = document.querySelectorAll(".jentry .jitems");
var jenul = document.querySelector(".jentry .jenul");
var jDesc = document.querySelector(".jentry .jdesc");
var cancel = document.querySelector(".jentry .cancel");
var huafei = document.querySelectorAll(".jentry .huafei");
//绑定鼠标移入事件
for (var i = 0; i < jItems.length; i++) {
    jItems[i].index = i;
    jItems[i].onmouseover = function () {
        jenul.style.transform = "translateY(-45px)"
        jDesc.style.bottom = "0px"
        //排他思想
        for (var j = 0; j < jItems.length; j++) {
            if (this == jItems[j]) {
                huafei[this.index].style.display = "block";
                this.children[0].children[1].style.borderBottom = "2px solid red"
                this.children[0].children[1].style.color = "red"
            } else {
                jItems[j].children[0].children[1].style.borderBottom = "none"
                jItems[j].children[0].children[1].style.color = ""
                huafei[j].style.display = "none";
            }
        }
    }
}

cancel.onclick = function () {
    for (var j = 0; j < jItems.length; j++) {
        jItems[j].children[0].children[1].style.borderBottom = "none"
        jItems[j].children[0].children[1].style.color = ""
    }
    jenul.style.transform = "translateY(0px)"
    jDesc.style.bottom = "-213px"
}