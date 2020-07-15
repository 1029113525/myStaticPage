/**
 * @description:
 * @param {type} ele:要运动的对象 attrs:要改变的属性对象 fn：回调函数
 * @return: 
 */
function animationSlow(ele, attrs, fn) {
    //清楚以前的定时器
    clearInterval(ele.timeID);

    //开始本次移动
    ele.timeID = setInterval(function () {
        //开关思想
        //假设所有属性都到达目标点
        var isAllok = true;
        //遍历对象的属性 验证假设
        for (var key in attrs) {
            var attr = key; //属性名
            var target = attrs[key] //属性值

            if (attr == "zIndex") {
                //层级没有动画 直接修改属性
                ele.style[attr] = target;
            } else if (attr == "opacity") { //由于透明度与一般属性区别比较大，所以透明度单独逻辑
                //获取元素当前透明度
                //注意getComputedStyle(ele)获取的为字符串 要将其转为number类型小数才可以进行*100
                var current = parseFloat(getComputedStyle(ele)[attr]) * 100;
                target *= 100; //目标透明度0.5*100 =50
                //计算变化的距离
                var step = (target - current) / 10;
                //取整
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                //开始移动
                current += step;
                ele.style[attr] = current / 100; //透明度没有单位
                //然后进行判断是否属性到达目标点
                if (current != target) {
                    isAllok = false;
                }
            } else if (attr == "backgroundColor") {
                //获取当前的颜色rgb3个值
                var currentrgb = getComputedStyle(ele)[attr];
                var rgb1 = getComputedStyle(ele)[attr].split(",")[0].replace(/[^0-9]/ig, "");
                var rgb2 = parseInt(getComputedStyle(ele)[attr].split(",")[1]);
                var rgb3 = parseInt(getComputedStyle(ele)[attr].split(",")[2]);
                if (attrs[attr].indexOf("#") != -1) {
                    //转成rgb格式
                    var target1 = attrs[attr].colorRgb().split(",")[0].replace(/[^0-9]/ig, "");
                    var target2 = parseInt(attrs[attr].colorRgb().split(",")[1]);
                    var target3 = parseInt(attrs[attr].colorRgb().split(",")[2]);
                }
                //计算每次变化的值并且取整
                var step1 = (target1 - rgb1) / 10;
                var step2 = (target2 - rgb2) / 10;
                var step3 = (target3 - rgb3) / 10;
                step1 = step1 > 0 ? Math.ceil(step1) : Math.floor(step1);
                step2 = step2 > 0 ? Math.ceil(step2) : Math.floor(step2);
                step3 = step3 > 0 ? Math.ceil(step3) : Math.floor(step3);
                //开始移动
                rgb1 += step1;
                rgb2 += step2;
                rgb3 += step3;
                currentrgb = "rgb(" + rgb1 + "," + rgb2 + "," + rgb3 + ")";
                ele.style[attr] = currentrgb;
                if (rgb1 != target1 && rgb2 != target2 && rgb3 != target3) {
                    isAllok = false;
                }
            } else {
                //获取元素的当前位置
                //注意点将getComputedStyle转成number类型
                var current = parseInt(getComputedStyle(ele)[attr]);

                //计算本次移动的距离
                var step = (target - current) / 10;

                //取整
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                //开始移动
                current = current + step;
                ele.style[attr] = current + "px";
                //开关思想第二步 如果任何属性没有到达终点则让 isAllok=false；
                if (current != target) {
                    isAllok = false;
                }
            }
        }
        //根据isAllok判断是否所有属性都到达了目标点
        if (isAllok) {
            clearInterval(ele.timeID);
            //如果调用者传递了第三个参数,并且是函数类型则执行函数体代码
            if (typeof fn == "function") {
                fn();
            }
        }
    }, 20);

}