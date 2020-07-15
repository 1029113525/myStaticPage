/*
* 已知：
*   1. 起点
*   2. 终点
*   3. 变化量 = 终点 - 起点
*   4. 帧 = 总时间/定时器间隔时间
*   5. 步长 = 变化量/帧
* obj   表示运动的对象
* myJson    表示运动属性目标值
* time  持续运动的时间
*
* animate.0.1.5
* 新增isanimate属性
* */
function animate(obj,myJson,time,tweenString,callBack) {
    var startJson = {}; //起始位置
    var targetJson = {}; //目标值
    var deltaJson = {}; //变化量
    var maxCount = Math.floor(time/20);  //总帧数  向下向上取整都可以，因为最终会拉终停表
    var timer = null;  //定时器
    var count = 0;  //当前帧编号
    obj.isanimate = true;  //自定义属性  判断动画是否在进行

    /*函数重载*/
    if(arguments.length === 3){
        tweenString = "Linear";
    }else if(arguments.length === 4){
        switch(typeof arguments[3]){
            case "string" :
                break;
            case "function" :
                callBack = arguments[3];
                tweenString = "Linear";
                break;
        }
    }


    for (var k in myJson) {
        startJson[k] = parseFloat(getStyle(obj,k));  //获取所有属性初始值
        targetJson[k] = parseFloat(myJson[k]);  //获取所有属性目标值
        deltaJson[k] = targetJson[k] - startJson[k];  //变化量
    }
    timer = setInterval(function () {
        for (var k in myJson) {
            var number = Tween[tweenString](count,startJson[k],deltaJson[k],maxCount); //拿到了当前帧位置

            if(k === "opacity"){
            obj.style[k] = number;
            obj.style.filter = "alpha(opacity = "+number*100+")";
            }else{
                obj.style[k] = number + "px";
            }
        }
        count++;
        if(count === maxCount) {
            for( var k in myJson ){
                if(k === "opacity"){
                    obj.style[k] = targetJson[k];
                    obj.style.filter = "alpha(opacity = "+targetJson[k]*100+")";
                }else{
                    obj.style[k] = targetJson[k] + "px";
                }

            }
            clearInterval(timer);
            obj.isanimate = false;//自定义属性  判断动画是否在进行
            //if(callBack)callBack();
            callBack && callBack.call(obj); //短路算法：callBack为真 抛出callBack() callBack假 什么都不做
        }

    },20);

    //获取实际样式
    function getStyle(obj,property) {
        return obj.currentStyle ? obj.currentStyle[property] : getComputedStyle(obj)[property];
    }

    //缓冲公式
    var Tween = {
        Linear: function(t, b, c, d) {
            return c * t / d + b;
        },
        //二次的
        QuadEaseIn: function(t, b, c, d) {
            return c * (t /= d) * t + b;
        },
        QuadEaseOut: function(t, b, c, d) {
            return -c * (t /= d) * (t - 2) + b;
        },
        QuadEaseInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t + b;
            return -c / 2 * ((--t) * (t - 2) - 1) + b;
        },
        //三次的
        CubicEaseIn: function(t, b, c, d) {
            return c * (t /= d) * t * t + b;
        },
        CubicEaseOut: function(t, b, c, d) {
            return c * ((t = t / d - 1) * t * t + 1) + b;
        },
        CubicEaseInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
            return c / 2 * ((t -= 2) * t * t + 2) + b;
        },
        //四次的
        QuartEaseIn: function(t, b, c, d) {
            return c * (t /= d) * t * t * t + b;
        },
        QuartEaseOut: function(t, b, c, d) {
            return -c * ((t = t / d - 1) * t * t * t - 1) + b;
        },
        QuartEaseInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
            return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
        },
        QuartEaseIn: function(t, b, c, d) {
            return c * (t /= d) * t * t * t * t + b;
        },
        QuartEaseOut: function(t, b, c, d) {
            return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
        },
        QuartEaseInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
            return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
        },
        //正弦的
        SineEaseIn: function(t, b, c, d) {
            return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
        },
        SineEaseOut: function(t, b, c, d) {
            return c * Math.sin(t / d * (Math.PI / 2)) + b;
        },
        SineEaseInOut: function(t, b, c, d) {
            return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
        },
        ExpoEaseIn: function(t, b, c, d) {
            return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
        },
        ExpoEaseOut: function(t, b, c, d) {
            return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
        },
        ExpoEaseInOut: function(t, b, c, d) {
            if (t == 0) return b;
            if (t == d) return b + c;
            if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
            return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
        },
        CircEaseIn: function(t, b, c, d) {
            return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
        },
        CircEaseOut: function(t, b, c, d) {
            return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
        },
        CircEaseInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
            return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
        },
        ElasticEaseIn: function(t, b, c, d, a, p) {
            if (t == 0) return b;
            if ((t /= d) == 1) return b + c;
            if (!p) p = d * .3;
            if (!a || a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            } else var s = p / (2 * Math.PI) * Math.asin(c / a);
            return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        },
        ElasticEaseOut: function(t, b, c, d, a, p) {
            if (t == 0) return b;
            if ((t /= d) == 1) return b + c;
            if (!p) p = d * .3;
            if (!a || a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            } else var s = p / (2 * Math.PI) * Math.asin(c / a);
            return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
        },
        ElasticEaseInOut: function(t, b, c, d, a, p) {
            if (t == 0) return b;
            if ((t /= d / 2) == 2) return b + c;
            if (!p) p = d * (.3 * 1.5);
            if (!a || a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            } else var s = p / (2 * Math.PI) * Math.asin(c / a);
            if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
            return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
        },
        //冲过头系列
        BackEaseIn: function(t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            return c * (t /= d) * t * ((s + 1) * t - s) + b;
        },
        BackEaseOut: function(t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
        },
        BackEaseInOut: function(t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
            return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
        },
        //弹跳系列
        BounceEaseIn: function(t, b, c, d) {
            return c - Tween.BounceEaseOut(d - t, 0, c, d) + b;
        },
        BounceEaseOut: function(t, b, c, d) {
            if ((t /= d) < (1 / 2.75)) {
                return c * (7.5625 * t * t) + b;
            } else if (t < (2 / 2.75)) {
                return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
            } else if (t < (2.5 / 2.75)) {
                return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
            } else {
                return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
            }
        },
        BounceEaseInOut: function(t, b, c, d) {
            if (t < d / 2) return Tween.BounceEaseIn(t * 2, 0, c, d) * .5 + b;
            else return Tween.BounceEaseOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
        }
    }
}