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

/**
 * 在一个给定节点之后添加一个节点
 * @param {*要添加的节点} newElement
 * @param {*给定节点} targetElement
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
 * @param {*被交换节点} firstNode
 * @param {*被交换节点} secondNode
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

