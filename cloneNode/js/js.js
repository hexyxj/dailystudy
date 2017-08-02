/**
 * 向onload添加函数
 * @param {*页面加载完成后要执行的函数} func
 */
function addLoadFunc(func) {
    var oldonload = window.onload;
    if (typeof window.onload != "function") {
        window.onload = func;
    } else {
        window.onload = function () {
            oldonload();
            func();
        }
    }
}

function cloneANodetrue(){
    var divNode = document.getElementsByClassName("trueclone")[0];
    var one=divNode.getElementsByClassName("clone")[0];
    one.onclick=function(){
         one.style.backgroundColor="red";
    };
    var newNode = one.cloneNode(true);
    newNode.setAttribute("alt","This is a clone node!");
    one.parentNode.insertBefore(newNode,one);
}

function cloneANodefalse(){
    var divNode = document.getElementsByClassName("falseclone")[0];
    var one=divNode.getElementsByClassName("clone")[0];
    one.onclick=function(){
         one.style.backgroundColor="red";
    };
    var newNode = one.cloneNode(false);
    newNode.setAttribute("alt","This is a clone node!");
    one.parentNode.insertBefore(newNode,one);
}

addLoadFunc(cloneANodefalse);
addLoadFunc(cloneANodetrue);