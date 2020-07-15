window.onload = function () {
    var logMeth = document.querySelector(".l_method");
    var logList = logMeth.getElementsByTagName("a");
    var linput = document.querySelector(".l_input");
    var lerwm = document.querySelector(".l_erwm");
    var erwmImg = document.querySelector(".erwmimg .img");
    var erwmBg = document.querySelector(".erwmimg .erwmbg");
    var erwmBig = document.querySelector(".erwmimg");

    /* 给二维码添加鼠标移入移出事件 */
    erwmBig.onmouseover = function () {
        erwmImg.style.left = "20px"
        erwmBg.style.opacity = "1"

    }
    erwmBig.onmouseout = function () {
        console.log(1);

        erwmImg.style.left = "95px"
        erwmBg.style.opacity = "0"
    }

    /* 点击扫码登录和账号登录 切换两种登录方式 */
    for (var i = 0; i < logList.length; i++) {
        logList[i].onclick = function () {
            for (var j = 0; j < logList.length; j++) {
                if (this == logList[j]) {
                    this.className = "current";
                } else {
                    logList[j].className = " ";
                }
            }
            if (this.id == "saoma") {
                linput.style.display = "none";
                lerwm.style.display = "block";
            } else {
                linput.style.display = "block";
                lerwm.style.display = "none";
            }
        }
    }


}