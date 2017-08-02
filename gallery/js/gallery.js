window.onload = function () {
    preparePlaceholder();
    prepareGallery();
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
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}

/**
 * 在placeholder上显示大图
 * @param {*缩略图元素} e 
 */
function showPic(e) {
    if (!document.getElementById("placeholder")) 
        return true;
    var source = e.getAttribute("href");
    var placeholder = document.getElementById("placeholder");
    if (placeholder.nodeName != "IMG") 
        return true;
    placeholder.setAttribute("src", source);
    if (!document.getElementById("description")) 
        return false;
    var text = e.getAttribute("title")
        ? e.getAttribute("title")
        : "";
    var description = document.getElementById("description");
    if (description.firstChild.nodeType == 3) {
        description.firstChild.nodeValue = text;
    }
    return false;
}

/**
 * 预加载Gallery，绑定Onclick事件
 */
function prepareGallery() {
    if (!document.getElementById || !document.getElementsByTagName) 
        return false;
    if (!document.getElementById("imagegallery")) 
        return false;
    var gallery = document.getElementById("imagegallery");
    var links = gallery.getElementsByTagName("a");
    showPic(links[0]);
    for (var i = 0, l = links.length; i < l; i++) {
        links[i].onclick = function () {
            return showPic(this);
        }
        // links[i].onkeypress = links[i].onclick;
    }
}

/**
 * 预加载placeholder
 */
function preparePlaceholder() {
    if (!document.createElement || !document.createTextNode || !document.getElementById || !document.getElementById("imagegallery")) 
        return false;
    var gallery = document.getElementById("imagegallery");
    var placeholder = document.createElement("img");
    placeholder.setAttribute("id", "placeholder");
    placeholder.setAttribute("src", "");
    var description = document.createElement("p");
    var textNode = document.createTextNode("Please choose a pictuure!");
    description.appendChild(textNode);
    description.setAttribute("id", "description");

    insertAfter(placeholder, gallery);
    insertAfter(description, gallery);

}

// function addLoadEvent(func) {
//     var oldonload = window.onload;
//     if (typeof window.onload != 'function') {
//         window.onload = func;
//     } else {
//         window.onload = function () {
//             oldonload();
//             func();
//         }
//     }
// }
// addLoadEvent(preparePlaceholder);
// addLoadEvent(prepareGallery);