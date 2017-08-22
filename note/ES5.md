### ES5
- 严格模式
    - 什么是:比普通JS运行机制更严格的模式
    - 为什么:JS中存在很多广受诟病的缺陷
        - 允许给未声明的变量赋值
        - 静默失败
    - 何时:新项目，都要启用严格模式;旧项目，逐个模块向严格模式迁移
    - 如何:
        - 在当前代码段顶部添加"use strict"
        - 在两个范围启用严格模式
            - 在全局启用严格模式:在全局顶部添加"use strict"
                - 新项目
            - 在函数内启用严格模式:只在函数内顶部添加"use strict"
                - 旧项目,向严格模式迁移
    - 要求:
        - 禁止给未声明的变量赋值
        - 静默失败升级为错误
        - arguments, arguments.callee不推荐使用
        - 匿名自调函数中的this不在自动指向window,而是undefined

- 保护对象
    - 为什么:传统JS中,对象的属性值和结构,可随意更改,毫无自保能力
    - 何时:几乎所有的对象,都要被严格规定保护
    - 命名属性
        - 数据属性:直接存储属性值的属性
            - 对象的属性也是一个小的对象
            - 对象的属性都包含四大特性
                `````````
                {
                    value:属性值,
                    writable:true/false,//控制是否可修改属性
                    enumerable:true/false,//控制是否可用for in 遍历到该属性
                    configurable:true/false//控制:1.是否可删除该属性;2.控制是否可修改前两个特性
                    //configurable一旦改为false，不可逆
                }
                `````````
            - 获取属性的四大特性
                ````````````
                var attrs=Object.getOwnPropertyDescriptor(obj,"属性名");
                ````````````
            - 修改四大特性
                `````````````
                //修改一个属性的四大特性
                Object.defineProperty( obj, "属性名", {
                    特性名 : 值,
                    ... : ...
                })
                //同时修改多个属性的四大特性
                Object.defineProperties( obj, {
                    属性名1: {
                        特性名 : 值,
                        ... : ...
                    },
                    属性名2: { 四大特性 }
                })
                `````````````
            - 强调
                - 修改writable或enumerable时，最好同时定义configurable为false，禁止反向修改
                - 要修改的属性不存在，会自动添加该属性
        - 访问器属性:不实际存储数据，专门提供对其它数据/变量的保护
            - 数据属性只能对自己提供基本的保护,无法使用自定义逻辑保护自己
            - 只要用自定义是属性保护数据属性时,就只能用访问器属性
            - 如何使用:2步
                - 首先定义一个隐藏的实际存储数据的数据属性
                - 然后定义访问器属性保护数据属性
                ``````````
                "use strict";
                (function () {
                    function Emp(id, ename, salary, age) {
                        //this->new
                        this.id = id;
                        this.ename = ename;
                        this.salary = salary;
                        Object.defineProperties(this, {
                            //用.添加的新属性,特性的默认值为true
                            id: {
                                writable: false,
                                configurable: false
                            },
                            ename: {
                                configurable: false
                            },
                            salary: {
                                enumerable: false,
                                configurable: false
                            },
                            //defineProperty/defineProperties添加的新属性,特性的默认值为false
                            _age: {
                                value: null,
                                writable: true,
                                enumerable: false,//隐藏
                                configurable: false
                            },
                            age: {//访问器属性
                                get() {
                                    return this._age;
                                },
                                set(val) {
                                    if (val <= 65 && val >= 18) {
                                        this._age = val;
                                    } else {
                                        throw new RangeError("The age must between 18 and 65!");
                                    }
                                },
                                enumerable: true
                            }
                        });
                        this.age = age;
                    }
                })();
                ``````````
    - 内部属性
        - 内部属性: 不能用.访问到的属性
        - __proto__
            - Object.getPrototypeOf(obj)
            - Object.setPrototypeOf(child,father)
        - class
            - Object.prototype.toString.call(obj)
        - extensible:true
            - var bool=Object.isExtensible(obj)
            - Object.preventExtensions(obj)
    - 防篡改
        - 防扩展:禁止为对象强行添加属性
            `````````
            //判断是否已禁止扩展
            Object.isExtensible(obj);
            //设置防扩展
            Object.preventExtensions(obj);
            //原理:对象都有一个内部属性:extensible,默认true,preventExtensions其实是将extensible改为false
            `````````
        - 密封:在防扩展同时,禁止删除所有属性
            ````````
            //判断是否已密封
            Object.isSealed(obj);
            //密封对象
            Object.seal(obj);
            //原理:将所有属性的configurable特性都改为false
            ````````
        - 冻结:在密封同时，禁止修改所有属性的值
            - 何时:如果一个对象,连属性值都不允许随便修改,就要冻结
            ````````
            //判断是否被冻结
            Object.isFrozen(obj);
            //冻结对象
            Object.freeze(obj);
            //原理:将每个属性的writable:false
            ````````
- Object.create
    - 三件事:基于现有父对象,创建一个子对象,在扩展新属性
    - 何时:如果只有父对象,没有构造函数,也想创建子对象
    - 如何:
        ````````
        var child=Object.create(father,{
            //可扩展child的自有属性
            //defineProperties
            属性名:{
                特性名 : 值
                ... : ...
            }
        });
        /*Object.create = function(p) {
            //create方法不存在时
            function f(){}
            f.prototype = p;
            return new f();
        }*/
        ````````
- call/apply/bind
    - 何时: 只要函数中的this不是想要的，就可用call/apply/bind替换
    - call和apply:立刻调用函数执行,同时临时替换函数中的this
        - 何时:如果立刻执行，且临时替换this
        - 如何:
            - fun.call(obj, 参数值列表)
                - 调用fun
                - 替换fun中的this为obj
                - 将参数值列表传递给fun
            - fun.apply(obj, 参数值数组)
            - apply vs call
                - apply要求传入fun的参数必须放在数组中整体传入
                - apply可自动将数组打散为单个参数值分别传入
    - bind
        - 基于一个现有函数，创建一个新函数，并永久绑定this和部分参数
        - 何时:只要替换回调函数中的this时
        - 如何:
            - var newFun=fun.bind(obj, 参数值列表 )
            - 创建一个和fun功能完全一样的新函数
            - 永久绑定新函数中的this为obj
            - 永久绑定新函数中的部分参数为参数值列表中的值
        - 强调: 被bind创建的函数中的this和绑定的变量，任何情况下不能再被call替换
- 数组API
    - every:若数组中每个元素都满足测试函数,则返回true,否则返回false
        - 语法:
        ````````
        //arr.every(callback[, thisArg]);
        //callback:回调函数
        //thisArg:可选,执行回调函数时使用的this值
        var bool=function(element,index,array){
            return 判断条件;
        }
        ````````
    - some:若数组中至少有一个元素满足测试函数,返回true,否则返回false
        - 语法:同every
    - foreach:为数组中每个元素执行一次回调函数
        - 语法:
        `````````
        //arr.foreach(callback[, thisArg]);
        //callback:回调函数
        //thisArg:可选,执行回调函数时使用的this值,若不提供该参数,或者赋值为null或者undefined,则this指向全局对象
        //直接修改原数组
        `````````
    - map:返回一个由回调函数的返回值组成的新数组
        - 语法:
        `````````````
        //arr.map(callback[, thisArg]);
        //callback:回调函数
        //thisArg:可选,执行回调函数时使用的this值,若不提供该参数,或者赋值为null或者undefined,则this指向全局对象
        //不修改原数组，返回新数组
        `````````````
    - filter:将所有在过滤函数中返回true的数组元素放进一个新的数组中并返回
        - 语法:
        ``````````
        var new_arr=arr.filter(callback[,thisArg])
        //callback:回调函数,返回true保留该元素,false则不保留
        //thisArg:可选,执行回调函数时使用的this值
        ``````````
    - reduce:从左到右为每个数组元素执行一次回调函数,并把上次回调函数的返回值放在一个暂存器中传给下次回调函数,并返回最后一次回调函数的返回值
        - 语法:
        ```````````
        arr.reduce(callback[,initialValue]);
        //callback:回调函数,包含4个参数
        //1.accumulator:上一次调用回调返回的值,或是提供的初始值(initialValue);
        //2.currentValue:数组中正在处理的元素;
        //3.currentIndex:数据中正在处理的元素索引,如果没有提供initialValue,默认从0开始;
        //4.array:调用reduce的数组
        //initialValue:作为第一次调用callback的第一个参数
        ```````````