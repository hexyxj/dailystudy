## ES6
- 块级作用域
    - 声明一个仅在当前块中有效的变量   
    - 问题1:变量提升,打乱了程序的执行顺序
    - 解决:用let代替var
        - 原理:let通过禁止在当前作用域提前使用未声明的变量,来避免声明提前
        - 强调:
            - 在 ECMAScript 2015 中,let 绑定不受变量提升的约束,这意味着let声明不会被提升到当前执行上下文的顶部;
            - 在块中的变量初始化之前,引用它将会导致 ReferenceError(而使用 var 声明变量则恰恰相反,该变量的值是undefined);
            - 这个变量处于从块开始到 let 初始化处理的"暂存死区"之中;
    - 问题2:js没有块级作用域,块内的变量即使不执行,也会影响块外的变量
        - 块级作用域:程序中一对{}之间,称为代码块
    - 解决:
        - 规定:let声明的变量仅在当前块内有效
        - 原理:自动在块作用域位置创建匿名函数
- 箭头函数
- 参数增强
    - Default 默认值
        - ES6中,允许为函数的参数列表末尾的几个参数变量,预先定义默认值
        `````````
        function add(a,b=2){
            return a+b;
        }
        var sum=add(1);//3
        var sum1=add(1,3);//4
        `````````
    - REST 剩余参数
        - 为了代替arguments类数组对象来接收不确定个数的参数值,新增了剩余参数rest的特性
        ```````
        function add(sum,...arr){
            return arr.reduce((a,b)=>a+b,sum);
        }
        add(0,1,2,3,4,5);
        //注:要将任意参数放到函数的最后，不能放在中间位置;不能用于对象字面量setter中
        //arguments转换成数组,转换比较慢
        //var arr = Array.prototype.slice.call(arguments);
        //var arr=[].slice.call(arguments)//<--较快
        ```````
    - SPREAD 散播
        - ES6中,为了代替apply,实现更灵活的打散数组类型参数的目的,提供了散播(spread)的新特性
        ````````
        var arr=[1,2,3,4,5,6];
        function add(sum,a,b,c,d,e,f){
            return sum+a+b+c+d+e+f;
        }
        console.log(add(0,...arr));
        ````````
- 模板字符串
- 解构:简化复杂对象的打散和批量赋值
    - 数组解构:等号左右两边都是数组格式,解构时按照数组下标匹配每个变量和对应位置的值
    - 对象解构:按对象属性名,匹配每个变量的对应属性的值
    - 参数解构:定义函数的参数列表时,也可用解构语法,可代替apply打散数组或对象中的成员值为单个值,再分别传入
- class
    - 简化:面向对象:封装,继承,多态
    - 如何
        - 封装
            1. 用"class 类型名{}"包裹原来的构造函数和原型对象方法
            2. 修改构造函数的"function 函数名"为"constructor"
            3. 原型对象方法: 
                - 可省略开头的"类型.prototype"
                - 可省略方法名后的"=function"
            4. 添加访问器属性: 
                ```````````
                //在构造函数的平级
                get 访问器属性名(){    
                    return this.受保护的其他属性 
                }
                set 访问器属性名(val){   
                    if(条件)      
                        this.受保护的属性=val   
                    else      
                        报错 
                }
                `````````````
        - 继承
            1. 不用再设置Object.setPrototypeOf
            2. 在"class 类型名"后添加" extends 父类型"
            3. 在构造函数中借用父类型构造函数
                - 不用call/apply，不用加this
                - super(属性值列表)

- 集合对象
    - 为了将遍历和查找的职能从普通对象中剥离出来,提高查找效率,ES6中添加了新的集合类型
    - Set:元素值中不允许重复的集合,专门用于按元素值,直接判断集合中是否存在指定元素
        ````````````
        var nums=new Set("helloworld");
        //new Set(凡是可以遍历的类型)
        console.log(nums);
        //Set{'h','e','l','o','w','r','d'}
        //判断是否包含指定字母
        nums.has("o");
        //true
        ````````````
    - Set集合的方法
        - set.size 获取集合中元素的个数
        - set.has(value) 判断集合中是否包含指定元素
        - set.add(value)添加元素,如果已存在,则无效
        - set.delete(value)删除元素
        - set.clear()清空集合
    - Map:键值对的集合,专门用于键值对查找元素
    - Map集合的方法
        - map.size获得map中键值对的个数
        - map.has(key)查询一个key是否存在
        - map.get(key)获取指定键对应的值
        - map.set(key,value)添加一个新的键值对,如果key已经存在,则不会重复添加
        - map.delete(key)删除指定key对应的键值对
        - map.keys()获取map中所有的key集合
        - map.values()获取map中所有的value集合
- for of
    - 简化:遍历索引数组/类数组对象/集合
    - 问题: 
        1. 只能读取元素值，不能修改元素值:按值传递
        2. 只能连续遍历所有
    - 如何:
        ``````````
        for(var val of arr){
            val//当前元素值 
        }
        ```````````
- Symbol
    - ES6中,为了获得一个不与对象中现有任何属性冲突的唯一属性,定义了Symbol类型
    - Symbol,第六大原始类型
    - Symbol的值必须通过Symbol函数获得
    - Symbol的值作为属性名时,不能用.访问.只能用[]访问
- Promise
    - 什么是:解决"callback hell"回调地狱
    - promises机制可以让连续回调函数调用,看起来更像是连续调用,而不是嵌套
    - 如何:
        1. 在前一个函数内return new Promise(callback)
        2. 在调用前一个函数时,用.then(callback)
        ```````````
        function conn() {
            console.log("链接数据库...");
            return new Promise((resolve, reject) => {
                // .then提供resolve; .catch提供reject
                setTimeout(function () {
                    var err = Math.random() < 0.3 ? true : false;
                    if (!err) {
                        resolve(); //query()
                    } else {
                        reject("连接出错!");
                    }
                }, 1000);
            });
        }

        function query() {
            console.log("查询数据...");
            return new Promise((resolve, reject) => {
                // .then提供resolve; .catch提供reject
                setTimeout(function () {
                    var err = Math.random() < 0.3 ? true : false;
                    if (!err) {
                        resolve();//response
                    } else {
                        reject("查询出错");
                    }
                }, 1000);
            });
        }

        function response() {
            console.log("返回响应...");
            return new Promise((resolve, reject) => {
                // .then提供resolve; .catch提供reject
                setTimeout(()=>{
                    var err = Math.random() < 0.3 ? true : false;
                    if (!err) {
                        resolve();//console.log("查询结束");
                    } else {
                        reject("响应出错");
                    }
                }, 1000);
            });
        }
        // callback hell
        // conn(() =>
        //     query(() =>
        //         response(() => console.log("查询结束!"))
        //     )
        // );
        conn() //Promise
            .then(() => query()) //Promise
            .then(() => response()) //Promise
            .then(() => console.log("查询结束"))
            .catch((err) => console.log(err));
        ```````````
