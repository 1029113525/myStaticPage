window.onload = function () {
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



    //获取所有的颜色款式
    var steCol = document.querySelectorAll(".stecol ul>li");
    //获取所有大小样式
    var steSize = document.querySelectorAll(".stesize ul>li");
    //获取增值样式
    var zengZhi = document.querySelectorAll(".zengzhi .li");
    // 获取分期样式
    var fenQi = document.querySelectorAll(".fenqi .li");
    var baiTiao = document.querySelector(".baitiao");
    //获取商品数量元素和加减按钮
    var gsNum = document.querySelector(".gsm_f .num input");
    var jia = document.querySelector(".gsm_f .num .jia");
    var jian = document.querySelector(".gsm_f .num .jian");
    //获取商品图片展示的图片元素和上一张下一张按钮
    var imgList = document.querySelectorAll(".gs_l .gsl_list li");
    var imgShow = document.querySelector(".gs_l .gsl_img img");
    var prev = document.querySelector(".gs_l .icon-Group-");
    var next = document.querySelector(".gs_l .icon-you");
    var index = 0;

    //给所有的颜色款式绑定点击事件
    for (var i = 0; i < steCol.length; i++) {
        steCol[i].onclick = function () {
            //排他思想
            for (var j = 0; j < steCol.length; j++) {
                if (steCol[j] == this) {
                    this.className = "current";
                } else {
                    steCol[j].className = "";
                }
            }
        }
    }
    //给尺寸大小添加点击事件
    for (var i = 0; i < steSize.length; i++) {
        steSize[i].onclick = function () {
            for (var j = 0; j < steSize.length; j++) {
                if (steSize[j] == this) {
                    this.className = "current";
                } else {
                    steSize[j].className = "";
                }
            }
        }
    }
    //给增值样式绑定点击事件
    for (var i = 0; i < zengZhi.length; i++) {
        zengZhi[i].onclick = function () {
            if (this.className == "li current") {
                this.className = "li";
            } else {
                this.className = "li current"
            }
        }
    }
    //给分期样式绑定点击事件
    for (var i = 0; i < fenQi.length; i++) {
        fenQi[i].onclick = function () {
            for (var j = 0; j < fenQi.length; j++) {
                if (fenQi[j] == this) {
                    this.className = "current";
                } else {
                    fenQi[j].className = "";
                }
            }
            if (this.id != "nofq") {
                baiTiao.style.display = "block";
            } else {
                baiTiao.style.display = "none";
            }
        }
    }
    //给加号减号绑定点击事件
    jia.onclick = function () {
        gsNum.value++;
        isGtone()
    }
    jian.onclick = function () {
        gsNum.value--;
        isGtone()
    }

    function isGtone() {
        if (gsNum.value > 1) {
            jian.disabled = false;
        } else {
            jian.disabled = true;
        }
    }
    var bigImg = document.querySelector(".gs_bigbox img");
    //给商品展示小图片绑定点击事件
    for (var i = 0; i < imgList.length; i++) {
        //给所有的li绑定一个index索引
        imgList[i].setAttribute("index", i);
        imgList[i].onclick = function () {
            index = this.getAttribute("index"); //每次点击给index重新复制下标
            imgShow.src = this.getAttribute("data-src");
            bigImg.src = this.getAttribute("bigImg-src");
            for (var j = 0; j < imgList.length; j++) {
                if (imgList[j] == this) {
                    this.className = "current";
                } else {
                    imgList[j].className = "";
                }
            }
        }
    }

    //上一张下一张切换事件
    prev.onclick = function () {
        index--;
        if (index < 0) {
            index = imgList.length - 1
        }
        changeImg();
    }
    next.onclick = function () {
        index++;
        if (index > imgList.length - 1) {
            index = 0
        }
        changeImg();
    }
    //封装改变图片样式的的方法
    function changeImg() {
        for (var j = 0; j < imgList.length; j++) {
            imgList[j].className = "";
        }
        imgList[index].className = "current"
        imgShow.src = imgList[index].getAttribute("data-src");
        bigImg.src = imgList[index].getAttribute("bigImg-src");
    }


    /* 商品图片放大展示效果 */
    var gsBigbox = document.querySelector(".gs_bigbox");
    var mask = document.querySelector(".mask");
    var gslImgbox = document.querySelector(".gsl_img");
    var gscontent = document.querySelector("#gscontent");
    gslImgbox.onmouseover = function () {
        gsBigbox.style.display = "block";
        mask.style.display = "block";
    }
    gslImgbox.onmouseout = function () {
        gsBigbox.style.display = "none";
        mask.style.display = "none";
    }
    //绑定鼠标移动事件
    gslImgbox.onmousemove = function (e) {
        e = e || window.event;
        var w = getPagePoint().pageX - gscontent.offsetLeft - mask.offsetWidth / 2
        var h = getPagePoint().pageY - gscontent.offsetTop - mask.offsetHeight / 2

        //边界检测
        w = w < 0 ? 0 : w;
        w = w > 112 ? 112 : w;
        h = h < 0 ? 0 : h;
        h = h > 112 ? 112 : h;
        mask.style.left = w + "px";
        mask.style.top = h + "px";

        //大图显示对应位置
        bigImg.style.left = -w*gslImgbox.offsetWidth/mask.offsetWidth+"px";
        bigImg.style.top = -h*gslImgbox.offsetHeight/mask.offsetHeight+"px";
    }




}