## Some Questions
### JavaScript
- 浏览器跨域
    - 浏览器的同源策略会导致跨域
        1. DOM同源策略:禁止对不同源页面DOM进行操作,这里主要的场景是iframe跨域的情况,不同域名的iframe是限制互相访问的
        2. XMLHttpRequest同源策略:禁止使用XHR对象向不同的服务器发起http请求
    > 协议,域名,端口有任何一个不同,都被当做是不同的域,它们之间的请求就是跨域操作

- 为什么有跨域限制
    - AJAX同源策略主要用来防止CSRF攻击.如果没有AJAX同源策略,相当危险,我们发起的每一次http请求都会带上请求地址对应的cookie,那么可以做如下攻击:
        1. 用户登录了自己的银行页面 mybank.com，mybank.com向用户的cookie中添加用户标识。
        2. 用户浏览了恶意页面 evil.com。执行了页面中的恶意AJAX请求代码。
        3. evil.com向mybank.com发起AJAX HTTP请求，请求会默认把mybank.com对应cookie也同时发送过去。
        4. 银行页面从发送的cookie中提取用户标识，验证用户无误，response中返回请求数据。此时数据就泄露了。
        5. 而且由于Ajax在后台执行，用户无法感知这一过程。
    - DOM同源策略也一样,如果iframe之间可以跨域访问,那么可以这样攻击:
        1. 做一个假网站.里面用iframe嵌套一个银行网站mybank.com
        2. 把iframe的撑满整个页面,这样用户进来除了域名,别的部分和银行网站没有任何差别.
        3. 这时如果用户输入账号密码.我们的主网站可以跨域访问到mybank.com的DOM节点,就可以拿到用户的输入了,那么久完成了一次攻击
    - 所以说有了跨域限制之后,我们才能更安全的上网.

- 跨域的解决方案
    1. 跨域资源共享
        - CORS是一个W3C标准,全称是"跨域资源共享"(Cross-origin resource sharing).
        - 大体流程:
            1. 对于客户端,我们还是正常使用xhr对象发送ajax请求.唯一需要注意的是,我们需要设置我们的xhr属性withCredentials=true,否则cookie是带不过去的,设置:xhr.withCredentials=true;
            2. 对于服务端,需要在response header中设置如下两个字段:Access-Control-Allow-Origin:youhost.com;Access-Control-Allow-Credentials:true;这样,我们就可以跨域请求接口了.
    
    2. jsonp实现跨域
        - 维基百科:JSONP(JSON with Padding)是资料格式JSON的一种使用模式,可以让网页从别的网域要资料.
        - 原理:script/img/iframe的src都不受同源策略的影响
        - 动态插入script标签,设置其src属性指向提供JSONP服务的URL地址,查询字符串加入callback指定回调函数,返回的JSON被包裹在回调函数中以字符串的形式被返回.
        - JSONP由两部分组成:回调函数和数据.回调函数是当响应到来时应该在页面中调用的函数,而数据就是传入回调函数中的JSON数据
        - JS文件载入成功后会执行我们在url参数中指定的函数,并且会把我们需要的json数据作为参数传入.所以jsonp是需要服务器端的页面进行相应的配合.
        `````````````````````````
        <!-- script -->
        <script type="text/javascript">
            function dosomething(jsondata){
                dealWith(jsondata);
            }
        </script>
        <script src="http://example.com/data.php?callback=dosomething"></script>
        <!-- php -->
        <?php
            $callback = $_GET['callback'];//得到回调函数名
            $data = array('a','b','c');//要返回的数据
            echo $callback.'('.json_encode($data).')';//输出
        ?>
        `````````````````````````
        - 优点:它不像XMLHttpRequest对象实现的Ajax请那样受到同源策略的限制;他的兼容性更好,在更加古老的浏览器中都可以运行,不需要XMLHttpRequest或者ActiveXObject的支持;并且在请求完毕后可以通过调用callback的方式传回结果;
        - 缺点:只支持GET,不支持POST,地址栏传参只能使用GET;它只支持跨域HTTP请求这种情况,不能解决不同域的两个页面之间如何进行JavaScript调用问题.
    
    3. 服务器代理
        - 浏览器有跨域限制,但是服务器不存在跨域问题,所以由服务器请求索要域的资源在返回给客户端.
    
    4. document.domain跨子域

    5. 使用window.name进行跨域

    6. location.hash跨域

    7. 使用postMessage实现页面间通信


- CORS 和 JSONP对比
    - CORS与JSONP相比,无疑更为先进/方便和可靠
        1. JSONP只能实现GET请求,而CORS支持所有类型类型的HTTP请求
        2. 使用CORS,开发者可以使用普通的XMLHttpRequest发起请求和获得数据,比起JSONP有更好的错误处理.
        3. JSONP主要被老的浏览器支持,他们往往不支持CORS,而绝大多数现代浏览器都已经支持了CORS.

- 判断一个对象是不是数组类型,有几种方法: 
    1. 判断原型对象: 
        - Object.getPrototypeOf(obj)==Array.prototype   
        - 判断obj是数组类型的子对象
        - 问题: __proto__是内部属性,本不应该被访问到
        - 解决: 用Object.getPrototypeOf(obj) 代替__proto__; 或者使用var bool=Array.prototype.isPrototypeOf(obj);
    2. 判断构造函数:
        - obj instanceof Array 
        - 判断obj是不是被构造函数Array创造出来的
        - instanceof 不仅判断直接父类型,而是查找整个原型链上的类型,只要符合就返回true！
    3. 判断对象的内部class属性
        - 每个对象内部,都有一个隐藏的class属性,记录该对象创建时的数据类型
        - class属性不会随继承关系的改变而改变
        - 问题1: class是内部属性
        - 解决: 只有最顶层的toString()才能输出对象的class属性值
        - [object class名]
        - 问题2: 内置类型的原型对象中几乎都重写了新的toString()
        - 解决: 用call强行调用: 
        - call: 让一个对象,调用一个本来无法调用到的函数
        - 何时: 只要希望调用一个本无法调用到的函数
        - 如何: 要调用的函数.call(对象)
        - Object.prototype.toString.call(obj)=="[object Array]"
        - 说明obj的内部属性class的值为"Array"
    4. Array.isArray(obj) //ES5

- new在创建一个对象时,经历了哪几步？
    1. 创建一个新的空对象;
    2. 设置新对象的__proto__继承构造函数的prototype对象;
    3. 调用构造函数,将构造函数中的this自动替换成当前的新对象,构造函数将规定的属性添加到新对象中,并将传入的参数值保存到新对象的新属性中
    4. 返回新对象的地址保存到变量中        

- API何时放在原型对象中,何时放在构造函数上——静态方法
    - 如果规定必须当前类型的子对象才能使用时,就放在原型对象中
    - 如果希望其他类型的子对象也能使用API时,就要放在构造函数上

- call vs apply
    - 相同:都是为了改变某个函数运行时的上下文而存在的,即临时替换函数中this为指定对象
    - 不同: 
      - call:传入借用函数的参数,必须单独传入,逗号分隔
      - apply:传入借用函数的参数,放在一个数组中整体传入;可自动打散数组类型参数
    
- bind
    - bind会创建一个新函数,称为绑定函数,当调用这个函数的时候,绑定函数会以创建它时传入bind()方法的第一个参数作为this,传入bind()方法的第二个及以后的参数加上绑定函数运行时本身的参数按照顺序作为原函数的参数来调用原函数;
    - bind与apply、call最大的区别就是:bind不会立即调用,其他两个会立即调用

- 数组去重复,且考虑百万数量级
    ``````````
    for(var i=0,arr=[];i<1000000;i++){
		arr[i]=parseInt(Math.random()*1000+9000)
	}
    /* 1.慢*/
    function repeat1(arr){
        var res=[];
        for(var i=0,l=arr.length;i < l;i++){
            if(res.indexOf(arr[i])==-1){
                res.push(arr[i]);
            }
        }
        return res;
    }
    /* 2.一般 */
    function repeat2(arr){
        var set=new Set(arr);
        return [...set];
    }
    /* 3.最快 */ 
    function repeat3(arr){
		var res=[];
		var hash={};
		for(var i=0,l=arr.length;i < l;i++){
			if(hash[arr[i]]===undefined){
				hash[arr[i]]=1;
				res.push(arr[i]);
			}
		}
		return res;
	}
    console.time("repeat1");//start
	repeat1(arr);
	console.timeEnd("repeat1");//end
	console.time("repeat2");//start
	repeat2(arr);
	console.timeEnd("repeat2");//end
	console.time("repeat3");//start
	repeat3(arr);
	console.timeEnd("repeat3");//end
    ``````````

- 定义一个函数,遍历指定父节点下所有子元素
    ``````````
    //方法1
    function getChildren1(parent) {
        console.log(parent.nodeName);
        var children = parent.children;
        for (var i = 0, l = children.length; i < l; i++) {
            arguments.callee(children[i]);
        }
    } //深度优先遍历
    getChildren1(document.body);
    //方法2
    function getChildren2(parent) {
        var iterator = document.createNodeIterator(parent, NodeFilter.SHOW_ELEMENT, null, false);
        var currNode = null;
        while ((currNode = iterator.nextNode()) != null) {
            console.log(currNode.nodeName);
        }
    }
    getChildren2(document.body);
    ```````````

- 按HTML vs 按选择器 查找
    1. 返回值:按HTML查找返回动态集合;按选择器查找返回非动态集合
    2. 首次查找效率:按HTML快,按选择器慢
    3. 易用性:条件复杂,按HTML繁琐,按选择器简洁
        - 如果一个条件就能找到想要的元素是就按HTML查找
        - 如果查找条件复杂时就用按选择器查找

- 一道js面试题
    `````````````
    function Foo() {
        getName = function() {
            alert(1);
        };
        return this;
    }
    Foo.getName = function() {
        alert(2);
    };
    Foo.prototype.getName = function() {
        alert(3);
    };
    var getName = function() {
        alert(4);
    };
    function getName() {
        alert(5);
    }

    //请写出以下输出结果：
    Foo.getName();//2
    getName();//4 
    Foo().getName();//1 
    getName();//4 error ->1 
    new Foo.getName();//2 
    new Foo().getName();//3 
    new new Foo().getName();//3 
    `````````````
    - 解析
        1. Foo.getName();//2 调用了Foo的静态方法
        2. getName();//4 声明提前
        3. Foo().getName();//1 调用Foo()函数,执行后全局变量getName被重新赋值,同时返回this,此this为window,接着调用window.getName() 
        4. getName();//1 第三问执行后,变量getName被重新赋值了
        5. new Foo.getName();//2 运算符优先级 成员访问. > new > 函数调用() =>new (Foo.getName)() 将getName当做构造函数执行
        6. new Foo().getName();//3 这里成员访问的优先级是最高的,因此先执行了 .getName,但是在进行左侧取值的时候, new Foo() 可以理解为两种运算：new 带参数（即 new Foo()）和函数调用（即 先 Foo() 取值之后再 new）,而 new 带参数的优先级是高于函数调用的,因此先执行了 new Foo(),或得 Foo 类的实例对象,再进行了成员访问 .getName.
        7. new new Foo().getName();//3 new ((new Foo()).getName)(); 先初始化Foo的实例化对象,然后将其原型上的getName函数作为构造函数再次new.

- 一道经典js闭包题
    ``````````````
    function fun(n,o) {
        console.log(o)
        return {
            fun:function(m){
            return fun(m,n);
            }
         };
    }
    var a = fun(0);  a.fun(1);  a.fun(2);  a.fun(3);//undefined,0,0,0
    var b = fun(0).fun(1).fun(2).fun(3);//undefined,0,1,2
    var c = fun(0).fun(1);  c.fun(2);  c.fun(3);//undefined,0,1,1
    //问:三行a,b,c的输出分别是什么？
    ``````````````
    - 解析
    1. 第一行a
        > var a = fun(0);  a.fun(1);  a.fun(2);  a.fun(3);
        - 可以得知,第一个fun(0)是在调用第一层fun函数.第二个fun(1)是在调用前一个fun的返回值的fun函数,所以：
        - 后面几个fun(1),fun(2),fun(3),函数都是在调用第二层fun函数.
        - 因此：
        - 在第一次调用fun(0)时,o为undefined;
        - 第二次调用fun(1)时m为1,此时fun闭包了外层函数的n,也就是第一次调用的n=0,即m=1,n=0,并在内部调用第一层fun函数fun(1,0),所以o为0;
        - 第三次调用fun(2)时m为2,但依然是调用a.fun,所以还是闭包了第一次调用时的n,所以内部调用第一层的fun(2,0);所以o为0
        - 第四次同理;
        - 即：最终答案为undefined,0,0,0
    2. 第二行b
        > var b = fun(0).fun(1).fun(2).fun(3);//undefined,?,?,?
        - 先从fun(0)开始看,肯定是调用的第一层fun函数;而他的返回值是一个对象,所以第二个fun(1)调用的是第二层fun函数,后面几个也是调用的第二层fun函数.
        - 因此：
        - 在第一次调用第一层fun(0)时,o为undefined;
        - 第二次调用 .fun(1)时m为1,此时fun闭包了外层函数的n,也就是第一次调用的n=0,即m=1,n=0,并在内部调用第一层fun函数fun(1,0),所以o为0;
        - 第三次调用 .fun(2)时m为2,此时当前的fun函数不是第一次执行的返回对象,而是第二次执行的返回对象.而在第二次执行第一层fun函数时时(1,0)所以n=1,o=0,返回时闭包了第二次的n,遂在第三次调用第三层fun函数时m=2,n=1,即调用第一层fun函数fun(2,1),所以o为1;
        - 第四次调用 .fun(3)时m为3,闭包了第三次调用的n,同理,最终调用第一层fun函数为fun(3,2);所以o为2;
        - 即最终答案：undefined,0,1,2
    3. 第三行c
        > var c = fun(0).fun(1);  c.fun(2);  c.fun(3);//undefined,?,?,?
        - 根据前面两个例子,可以得知：
        - fun(0)为执行第一层fun函数,.fun(1)执行的是fun(0)返回的第二层fun函数,这里语句结束,遂c存放的是fun(1)的返回值,而不是fun(0)的返回值,所以c中闭包的也是fun(1)第二次执行的n的值.c.fun(2)执行的是fun(1)返回的第二层fun函数,c.fun(3)执行的也是fun(1)返回的第二层fun函数.
        - 遂：
        - 在第一次调用第一层fun(0)时,o为undefined;
        - 第二次调用 .fun(1)时m为1,此时fun闭包了外层函数的n,也就是第一次调用的n=0,即m=1,n=0,并在内部调用第一层fun函数fun(1,0),所以o为0;
        - 第三次调用 .fun(2)时m为2,此时fun闭包的是第二次调用的n=1,即m=2,n=1,并在内部调用第一层fun函数fun(2,1);所以o为1;
        - 第四次.fun(3)时同理,但依然是调用的第二次的返回值,遂最终调用第一层fun函数fun(3,1),所以o还为1
        - 即最终答案：undefined,0,1,1

### HTML && CSS
- 水平垂直居中的方法
    - 父容器子容器不确定宽高的块级元素,做上下居中
    1. flex
    ``````````````
    <style>
        #wrap{
            display:flex;
            justify-content:center;
            align-items:center;
        }
    </style>
    ``````````````
    2. table
    ``````````````
    <style>
        .parent{
            text-align:center;//水平居中
            display:table-cell;
            vertical-align:middle;//垂直居中
        }
        .child{
            display:inline-block;
        }
    </style>
    ``````````````
    3. absolute+transform 水平垂直居中
    `````````````
    <div class="parent">
        <div class="child">Demo</div>
    </div>
    <style>
        .parent{
            position:relative;
        }
        .child{
            position:absolute;
            left:50%;
            top:50%;
            transform:translate(-50%,-50%);
        }
    </style>
    `````````````
    4. absolute+margin
    ``````````````
    <style>
        .parent{
            position:relative;
        }   
        .child{
            width: 100px;
            height: 100px;
            position: absolute;
            top: 50%;
            left: 50%;
            margin: -50px 0 0 -50px;
        }
    </style>
    ``````````````
    5. webkit-box 
    ```````````````
    <style>
        .parent{
            position:relative;
            display:-webkit-box;
            -webkit-box-align:center;
            -webkit-box-pack:center;
        }
        .child{
            -webkit-box-flex:0;
        }
    </style>
    ```````````````

- 实现左边定宽右边自适应效果
    1. flex
        - 父级元素:display:flex;
        - 右边子元素:flex:1
    2.浮动
        - 左边定宽,并且左浮动
        - 右边设置距离左边的宽度
    3. 绝对定位
        - 左边定宽,设置position:absolute;
        - 右边设置距离左边的宽度

- 三列布局,中间固定两边自适应宽度
    1. flex
    flex
    ``````````````````````
    <div id = "box">  
        <div id = "left"></div>  
        <div id = "center"></div>  
        <div id = "right"></div>  
    </div>  
    <style>
        #box{
            display:flex;
        }
        #left,#right{
            flex:1;
            height:100px;
        }
        #center{
            width:200px;
            height:100px;
        }
    </style>
    ``````````````````````
    2. calc
    `````````````````
    <div id="left"></div>
    <div id="center"></div>
    <div id="right"></div>
    <style>
        #center{
            display:inline-block;
            width:200px;
            height:100px;
        }
        #left,#right{
            display:inline-block;
            width:calc(50%-100px);
        }
    </style>
    `````````````````

- 三列布局,两边宽度固定,中间自适应
    1. 绝对定位
    ``````````````````
    //绝对定位法原理是将左右两边使用absolute定位,因为绝对定位使其脱离文档流,后面的center会自然流动到他们上面,然后使用margin属性,留出左右元素的宽度,既可以使中间元素自适应屏幕宽度.
    <div id = "left"></div>  
    <div id = "right"></div>  
    <div id = "center"></div> 
    <style>
        #left,#right{
            width: 200px;
            height: 200px; 
            position: absolute;
        }  
        #left{
            left:0px;
        }  
        #right{
            right: 0px;
        }  
        #center{
            margin:0 200px ;
            height: 200px; 
        } 
    </style> 
    //该法布局的好处,三个div顺序可以任意改变.不足是:因为绝对定位,所以如果页面上还有其他内容,top的值需要小心处理,最好能够对css样式进行一个初始化,如果不对样式进行初始化,则两边和中间的值会对不齐. 如果中间栏含有最小宽度限制,或是含有宽度的内部元素,当浏览器宽度小到一定程度,会发生层重叠的情况.
    ``````````````````
    2. 浮动
    ``````````````````
    //使用对左右使用分别使用float:left和float:right,float使左右两个元素脱离文档流,中间元素正常在正常文档流中,使用margin指定左右外边距对其进行一个定位.
    <div id = "left"></div>  
    <div id = "right"></div>  
    <div id = "center"></div>
    <style>
        #left,#right{ 
            width: 200px;
            height: 200px; 
        }  
        #left{
            float: left;
        }  
        #right{
            float: right;
        }  
        #center{
            margin: 0 200px;
            height: 200px; 
        }  
    </style> 
    // 该布局法的好处是受外界影响小,但是不足是:三个元素的顺序,center一定要放在最后,这是和绝对定位不一样的地方,center占据文档流位置,所以一定要放在最后,左右两个元素位置没有关系.当浏览器窗口很小的时候,右边元素会被击倒下一行.
    ``````````````````
    3. margin负值
    ``````````````
    //首先需要在center元素外部包含一个div,包含div需要设置float属性使其形成一个BFC:Block Formatting Context (块级格式化上下文),并设置宽度,并且这个宽度要和left块的margin负值进行配合
    <div id = "wrap">  
        <div id = "center"></div>  
    </div>  
    <div id = "left"></div>  
    <div id = "right"></div> 
    <style>
        #wrap{ 
            width: 100%;
            height: 100px; 
            float: left;
        }  
        #wrap #center{ 
            margin:0 200px; 
            height: 100px;
        }  
        #left,#right{ 
            float: left;
            width: 200px;
            height: 100px;
        }  
        #left{
            margin-left: -100%; 
        }  
        #right{
            margin-left: -200px;
        }  
    </style>
    //三栏相互关联,有一定的抗性.需要注意的是,布局中间部分一定要放在前面,左右顺序不限制.对于left块的margin负值一定要等于wrap的宽度.
    ``````````````
    4. flex
    ``````````````````````
    <div id = "box">  
        <div id = "left"></div>  
        <div id = "center"></div>  
        <div id = "right"></div>  
    </div>  
    <style>
        #box{
            display:flex;
        }
        #left,#right{
            width:200px;
            height:100px;
        }
        #center{
            flex:1;
            height:100px;
        }
    </style>
    ``````````````````````

### 计算机基础知识
- 进程和线程的关系与区别
    - 定义
        - 进程是具有一定独立功能的程序关于某个数据集合上的一次运行活动,进程是系统进行资源分配和调度的一个独立单位.
        - 线程是进程的一个实体,是cpu调度和分派任务的基本单位.它是比进程更小的能独立运行的基本单位.
    - 关系
        - 一个线程可以创建和撤销另一个线程;同一个进程的多个线程之间可以并发执行,相对进程而言,线程是一个更加接近于执行体的概念,可以与同进程中的其他线程共享数据,但拥有自己的栈空间,拥有独立的执行序列.
    - 区别
        - 进程和线程最主要的区别在于他们是不同的操作系统资源管理方式.进程有独立的地址空间,一个进程崩溃后,在保护模式下不会对其他进程产生影响,而线程知识一个进程中的不同执行路径.线程拥有自己的堆栈和局部变量,但线程之间没有单独的地址空间,一个线程死掉就等于整个进程死掉,所以多进程的程序要比多线程程序健壮,但在进程切换时,耗费资源较大,效率要差一些.但对于一些要求同时进行并且又要共享某些变量的并发操作,只能用线程,而不能用进程.
        - 一个程序至少有一个进程.一个进程至少有一个线程
        - 线程的划分尺度小于进程,是的多线程程序的并发性高
        - 进程在执行过程中拥有独立的内存单元,而多个线程共享内存,从而极大地提高了程序的运行效率
        - 每个独立的线程都有一个程序运行的入口,顺序执行序列和程序的出口.但是线程不能独立执行,必须依存在应用程序中,由应用程序提供多个线程执行控制
        - 从逻辑角度来看，多线程的意义在于一个应用程序中，有多个执行部分可以同时执行。但操作系统并没有将多个线程看做多个独立的应用，来实现进程的调度和管理以及资源分配。这就是进程和线程的重要区别。
    - 优缺点
        - 线程和进程在使用上各有优缺点:线程执行开销小,但不利于资源的管理和保护;而进程正好相反.

- 并发和并行
    > 如果某个系统支持两个或者多个动作同时存在,那么这个系统就是一个并发系统.如果某个系统同时支持两个或者多个动作同时执行,那么这个系统就是一个并行系统.并发系统和并行系统这两个定义之间的关键差异在于"存在"这个词.
    > 在并发程序中可以同时拥有两个或者多个线程.这意味着,如果程序在单核处理器上运行,那么这两个线程将交替的还如或者换出内存.这些线程是同时"存在"的----每个线程都初一执行过程中的某个状态.如果程序能够并行执行,那么久一定是运行在多核处理器上.此时,程序中的每个线程都将分配到一个独立的处理器核上,因此可以同时运行.
    > 我相信你已经能够得出结论——“并行”概念是“并发”概念的一个子集。也就是说，你可以编写一个拥有多个线程或者进程的并发程序，但如果没有多核处理器来执行这个程序，那么就不能以并行方式来运行代码。因此，凡是在求解单个问题时涉及多个执行流程的编程模式或者执行行为，都属于并发编程的范畴。
    > 摘自:《并发的艺术》 — 〔美〕布雷谢斯
    - 并发是两个队列交替使用一台咖啡机,并行是两个队列同时使用两台咖啡机.如果串行,就是一个队列使用一台咖啡机,后者必须等前者用完咖啡机离开后才能接着使用.
