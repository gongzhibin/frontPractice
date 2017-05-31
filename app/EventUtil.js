/**
 * Created by zxlg on 2017/4/16.
 */

//跨浏览器事件处理
var EventUtil = {
    //添加事件
    addHandler: function (element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        }
        else if (element.attachEvent) {
            element.attachEvent('on' + type, handler);
        } else {
            element['on' + type] = handler;
        }
    },
    //移除事件
    removeHandler: function (element, type, handler) {
        if (element.removeHandler) {
            element.removeHandler(type, handler, false);
        }
        else if (element.detachEvent) {
            element.detachEvent('on' + type, handler);
        } else {
            element['on' + type] = null;
        }
    },

    //返回对event对象的引用
    getEvent: function (event) {
        return event ? event : window.event;
    },
    //返回事件的目标
    getTarget: function (event) {
        return event.target || event.srcElement;
    },
    //取消事件默认行为
    preventDefault: function (event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },
    //阻止事件流
    stopPropagation: function (event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    }
}
module.exports = EventUtil;