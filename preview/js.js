window.onload = function () {
    prepareSlideshow();
};

/**
 * 预加载Slideshow，绑定onmouseover事件
 */
function prepareSlideshow() {
    if (!document.getElementById || !document.getElementsByTagName) 
        return false;
    if (!document.getElementById("linklist")) 
        return false;
    var slideshow = document.createElement("div");
    slideshow.setAttribute("id", "slideshow");
    var preview = document.createElement("img");
    preview.setAttribute("id", "preview");
    preview.setAttribute("src", "image/topic.png");
    preview.setAttribute("alt", "The preview of the picture");
    slideshow.appendChild(preview);
   
    var linklist = document.getElementById("linklist");
    insertAfter(slideshow,linklist);
    var links = linklist.getElementsByTagName("a");
    links[0].onmouseover = function () {
        moveElement("preview", -100, 0, 10);
    }
    links[1].onmouseover = function () {
        moveElement("preview", -200, 0, 10);
    }
    links[2].onmouseover = function () {
        moveElement("preview", -300, 0, 10);
    }
}

/**
 * 移动元素
 * @param {*目标元素ID} elementID
 * @param {*目的地坐标} final_x
 * @param {*目的地坐标} final_y
 * @param {*移动时间间隔} interval
 */
function moveElement(elementID, final_x, final_y, interval) {
    if (!document.getElementById || !document.getElementById(elementID)) 
        return false;
    var elem = document.getElementById(elementID);
    if (elem.movement) {
        clearTimeout(elem.movement);
    }
    if (!elem.style.top) {
        elem.style.top = '0px';
    }
    if (!elem.style.left) {
        elem.style.left = '0px';
    }
    var xpos = parseInt(elem.style.left);
    var ypos = parseInt(elem.style.top);
    if (xpos == final_x && ypos == final_y) 
        return true;
    if (xpos > final_x) {
        var dist = Math.ceil((xpos - final_x) / 10)
        xpos -= dist;
    }
    if (xpos < final_x) {
        var dist = Math.ceil((final_x - xpos) / 10);
        xpos += dist;
    }
    if (ypos > final_y) {
        var dist = Math.ceil((ypos - final_y) / 10)
        ypos -= dist;
    }
    if (ypos < final_y) {
        var dist = Math.ceil((final_y - ypos) / 10);
        ypos += dist;
    }
    elem.style.left = xpos + "px";
    elem.style.top = ypos + "px";
    var repeat = "moveElement('" + elementID + "'," + final_x + "," + final_y + "," + interval + ")";
    elem.movement = setTimeout(repeat, interval);
}

/**
 * 在目标元素节点之后添加一个新的兄弟节点
 * @param {*新元素节点} newElement 
 * @param {*目标元素节点} targetElement 
 */
function insertAfter(newElement, targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
        parent.appendChild(newElement);
    } else {
        parent.appendChild(newElement, targetElement.nextSibling);
    }
}
