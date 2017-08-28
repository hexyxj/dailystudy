/* header */
(() => {
    ajax("get", "03-header.html").then((responseText) => {
        $("#header")[0].innerHTML = responseText;
        document.head.innerHTML += '<link rel="stylesheet" href="css/header.css">';
        return new Promise(resolve => resolve());
    }).then(() => {
        var kwInput = $("#txtSearch")[0];
        var shelper = $("#shelper")[0];
        kwInput.onkeyup = function () {
            var kw = this.value;
            console.log(kw);
            ajax("get", "data/03-header/search.php?kw=" + kw).then(data => {
                if (data.length > 0) {
                    var html="";
                    for(var obj of data){
                        html+=`<li title="${obj.title}">
                        <div class="search-item">${obj.title.slice(0,25)+"... ..."}</div>
                      </li>`
                    }
                    shelper.innerHTML=html;
                    shelper.style.display="block";
                } else {
                    shelper.style.display="none";
                }
                return new Promise(resolve=>resolve());
            }).then(()=>{
                shelper.onclick=function(e){
                    if(e.target.nodeName.toLowerCase()=="div"){
                        kwInput.value=e.target.parentNode.title;
                        shelper.style.display="none";
                    }
                }
            })
        }
    })
})();

/* banner */
(() => {
    var bannerImgs = $("[data-load=bannerImgs]")[0],
        bannerInds = $("[data-load=bannerInds]")[0],
        n = 0,
        LIWIDTH = 960,
        TRANS = 300,
        INTERVAL = 2000,
        timer = null;
    ajax("get", "data/01-index/banners.php").then(data => {
        var banners = [...data];
        banners.push(banners[0]);
        var strImgs = "";
        for (var img of banners) {
            strImgs += `<li>
            <a href="${img.href}">
              <img src="${img.img}">
            </a>
          </li>`
        }
        var strInds = "<li></li>".repeat(banners.length - 1);
        bannerImgs.innerHTML = strImgs;
        bannerImgs.style.width = 960 * banners.length + "px";
        bannerInds.innerHTML = strInds;
        bannerInds.children[0].className = "hover";
        return new Promise(resolve => resolve());
    }).then(() => {
        function moveOnce() {
            n++;
            var left = LIWIDTH * n;
            bannerImgs.style.left = -left + "px";
            bannerInds.children[n - 1].className = "";
            if (n == bannerImgs.children.length - 1) {
                bannerInds.children[0].className = "hover";
                setTimeout(() => {
                    bannerImgs.style.transition = "";
                    bannerImgs.style.left = 0;
                    n = 0;
                    setTimeout(() => {
                        bannerImgs.style.transition = "all ." + TRANS / 100 + "s linear";
                    }, 100);
                }, TRANS);
            } else 
                bannerInds.children[n].className = "hover";
            }
        timer = setInterval(moveOnce, INTERVAL + TRANS);
        return new Promise(resolve => resolve(moveOnce));
    }).then((moveOnce) => {
        bannerImgs.parentNode.onmouseover = function () {
            clearInterval(timer);
            timer = null;
        }
        bannerImgs.parentNode.onmouseout = function () {
            timer = setInterval(moveOnce, INTERVAL + TRANS);
        }
        for (let i = 0; i < bannerInds.children.length; i++) {
            bannerInds.children[i].onclick = function () {
                n = i;
                bannerImgs.style.left = -n * LIWIDTH + "px";
                bannerInds.find(".hover")[0].className = "";
                bannerInds.children[i].className = "hover";
            }
        }
        $("[data-move=left]")[0].onclick = function (e) {
            e.preventDefault();
            if (n > 0) {
                n--;
                bannerImgs.style.left = -n * LIWIDTH + "px";
                bannerInds.children[n + 1].className = "";
                bannerInds.children[n].className = "hover";
            } else {
                bannerImgs.style.transition = "";
                n = bannerImgs.children.length - 1;
                bannerImgs.style.left = -n * LIWIDTH + "px";
                setTimeout(() => {
                    bannerImgs.style.transition = "all ." + TRANS / 100 + "s linear";
                    n--;
                    bannerImgs.style.left = -n * LIWIDTH + "px";
                    bannerInds.children[0].className = "";
                    bannerInds.children[n].className = "hover";
                }, 100);
            }
        }
        $("[data-move=right]")[0].onclick = function (e) {
            e.preventDefault();
            n++;
            bannerImgs.style.left = -n * LIWIDTH + "px";
            if (n < bannerImgs.children.length - 1) {
                bannerInds.children[n - 1].className = "";
                bannerInds.children[n].className = "hover";
            } else {
                bannerInds.lastElementChild.className = "";
                bannerInds.firstElementChild.className = "hover";
                setTimeout(() => {
                    bannerImgs.style.transition = "";
                    bannerImgs.style.left = 0;
                    n = 0;
                    setTimeout(() => {
                        bannerImgs.style.transition = "all ." + TRANS / 100 + "s linear";
                    }, 100);
                }, TRANS);
            }
        }
    }).catch(err => console.log(err))
})();

/* floors */
(() => {
    ajax("get", "data/01-index/floors.php").then((responseText) => {
        $("#f1>.floor-content")[0].innerHTML = dealWithStr(responseText["recommendedItems"]);
        $("#f2>.floor-content")[0].innerHTML = dealWithStr(responseText["newArrivalItems"]);
        $("#f3>.floor-content")[0].innerHTML = dealWithStr(responseText["topSaleItems"]);

        function dealWithStr(str) {
            var itemsStr = "";
            for (var i = 0, l = str.length; i < l; i++) {
                var item = str[i];
                if (i < 2) {
                    itemsStr += `<div>
                    <img src="${item.pic}">
                    <div class="desc">
                      <p class="name">${item.title}</p>
                      <p class="details">${item.details}</p>
                      <p class="price">¥${item.price}</p>
                      <a href="${item.href}" class="view">查看详情</a>
                    </div>
                  </div>`;
                } else if (i == 2) {
                    itemsStr += `<div>
                    <img src="${item.pic}">
                    <div class="desc">
                      <p class="name">${item.title}</p>
                      <p class="price">¥${item.price}</p>
                      <a href="${item.href}" class="view">查看详情</a>
                    </div>
                  </div>`;
                } else {
                    itemsStr += `<div class="product">
                    <img src="${item.pic}">
                    <p class="name">${item.title}</p>
                    <p class="price">¥${item.price}</p>
                    <a href="${item.href}">查看详情</a>
                  </div>`;
                }
            }
            return itemsStr;
        }
        return new Promise(resolve => resolve())
    }).then(() => {
        var fTops = $(".floor>.floor-top");
        var text = ""
        for (var fTop of fTops) {
            text += `<li class="lift_item">
            <a href="javascript:;" class="lift_btn">
              <span class="lift_btn_txt">${fTop
                .lastChild
                .nodeValue
                .trim()
                .slice(0, 4)}</span>
            </a>
            </li>`;
        }
        var ulLift = $("#lift>.lift_list")[0];
        ulLift.innerHTML = text;
        ulLift.children[0].className = "lift_item_on";
        function getTotalTop(elem) {
            var total = elem.offsetTop;
            while (elem.offsetParent) {
                elem = elem.offsetParent;
                total += elem.offsetTop;
            }
            return total;
        }
        var floors = [...$(".floor")];
        for (var f of floors) {
            f.totalTop = getTotalTop(f);
        }

        var FHEIGHT = parseFloat(getComputedStyle(floors[0]).height) + 20;
        function checkOn() {
            var scrollTop = document.body.scrollTop;
            for (var i = 0, l = floors.length; i < l; i++) {
                if (scrollTop >= floors[i].totalTop - innerHeight / 2 && scrollTop < floors[i].totalTop + FHEIGHT - innerHeight / 2) {
                    ulLift.children[i].className = "lift_item lift_item_on";
                } else {
                    ulLift.children[i].className = "lift_item";
                }
            }
        }
        window.onscroll = function () {
            var top1 = getTotalTop(fTops[0]);
            if (top1 <= document.body.scrollTop + innerHeight / 2) {
                $(".elevator")[0].style.display = "block";
            } else {
                $(".elevator")[0].style.display = "";
            }
            checkOn();
        }
        for (let i = 0, l = ulLift.children.length; i < l; i++) {
            ulLift.children[i].onclick = function () {
                // var scrollTop=document.body.scrollTop; var DIST=floors[i].totalTop-scrollTop;
                // window.scrollBy(0,DIST);
                moveTo(i);
            }
        }
        var DIST = 0,
            DURA = 500,
            STEPS = 100,
            interval = DURA / STEPS,
            step = 0,
            moved = 0,
            timer = null;
        function moveTo(i) {
            if (timer) {
                clearInterval(timer);
            }
            DIST = floors[i].totalTop - document.body.scrollTop;
            step = DIST / STEPS;
            timer = setInterval(() => {
                window.scrollBy(0, step);
                moved++;
                if (moved == STEPS) {
                    clearInterval(timer);
                    timer = null;
                    moved = 0;
                    checkOn();
                }
            });
        }
    })
})();
