function getPageScroll() {
    var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft ||
        document.body.scrollLeft || 0;
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop ||
        document.body.scrollTop || 0;
    return {
        scrollLeft: scrollLeft, //左边是对象属性名，右边是属性值
        scrollTop: scrollTop
    }
}

function getClientSize() {
    return {
        clientWidth: window.innerWidth || document.documentElement.clientWidth || document.body
            .clientWidth || 0,
        clientHeight: window.innerHeight || document.documentElement.clientHeight || document.body
            .clientHeight || 0,
    }
}

function getPagePoint(e) {
    e = e || window.event; //事件对象兼容
    return {
        pageX: e.pageX || getPageScroll().scrollLeft + e.clientX,
        pageY: e.pageY || getPageScroll().scrollTop + e.clientY,
    };
};