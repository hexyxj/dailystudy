window.onload = function () {
    init();
};
function init() {
    var slider = document.getElementById("slider");
    var lf_btn = document.getElementById("left-btn");
    var rt_btn = document.getElementById("right-btn");
    var slider_img = document.getElementById("slider-image");
    lf_btn.onclick = function () {
        var slider_c = slider_img.getElementsByClassName("slider-c");
        var nextsibling = slider_c.nextSibling || slider_img.getElementsByClassName("img")[0];
        console.log(slider_c.nextSibling);
    };
    rt_btn.onclick = function () {};
}
/**
    * 移动元素
    * @param {*目标元素} elem
    * @param {*目的地坐标} final_x
    * @param {*目的地坐标} final_y
    * @param {*移动时间间隔} interval
    */
function moveElement(elem, final_x, final_y, interval) {}