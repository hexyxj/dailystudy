function changeNodeOne() {
    var one = document.getElementById("one");
    var two = document.getElementById("two");
    one.onclick = function () {
        changeNode(one, two);
    }
    two.onclick = function () {
        changeNode(one, two);
    }
}
function changeNodeFirst() {
    var one = document.getElementById("first");
    var two = document.getElementById("second");
    one.onclick = function () {
        changeNode(one, two);
    }
    two.onclick = function () {
        changeNode(one, two);
    }
}
function changeNodeYi() {
    var one = document.getElementById("yi");
    var two = document.getElementById("er");
    one.onclick = function () {
        changeNode(one, two);
    }
    two.onclick = function () {
        changeNode(one, two);
    }
}
function cloneANode(){
    var one = document.getElementsByClassName("clone")[0];
    one.style.backgroundColor="gray";
    one.onclick=function(){
         one.style.backgroundColor="red";
    };
    var newNode = one.cloneNode(true);
    newNode.setAttribute("alt","This is a clone node!");
    one.parentNode.insertBefore(newNode,one);
}


addLoadFunc(changeNodeOne);
addLoadFunc(changeNodeFirst);
addLoadFunc(changeNodeYi);
addLoadFunc(cloneANode);