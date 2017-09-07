/**
 * 向onload添加函数
 * @param {*function} func:页面加载完成后要执行的函数
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

/**
 * 在一个给定节点之后添加一个节点
 * @param {*HTMLElement} newElement:要添加的节点
 * @param {*HTMLElement} targetElement:给定节点
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
 * 交换两个节点
 * @param {*HTMLElement} firstNode:被交换节点
 * @param {*HTMLElement} secondNode:被交换节点
 */
function changeNode(firstNode, secondNode) {
    if (firstNode.nextSibling) {
        var firstNextNode = firstNode.nextSibling;
        var secondNode = secondNode
            .parentNode
            .replaceChild(firstNode, secondNode);
        firstNextNode
            .parentNode
            .insertBefore(secondNode, firstNextNode);

    } else if (firstNode.previousSibling) {
        var firstPreviousNode = firstNode.previousSibling;
        var secondNode = secondNode
            .parentNode
            .replaceChild(firstNode, secondNode);
        insertAfter(secondNode, firstPreviousNode);
    } else {
        var firstParentNode = firstNode.parentNode;
        var secondNode = secondNode
            .parentNode
            .replaceChild(firstNode, secondNode);
        firstParentNode.appendChild(secondNode);
    }
    firstNode.style.color = "white";
    firstNode.style.backgroundColor = "black";
    secondNode.style.backgroundColor = "gray";
}

function elementEventAgency() {
    // 事件代理
    var elem = document.getElementById("test");
    elem.addEventListener('click', function (e) {
        if (e.target.nodeName.toLowerCase() == 'p') {
            console.log(e);
            console.log(e.target.innerHTML);
        }
    });
}
addLoadFunc(elementEventAgency);