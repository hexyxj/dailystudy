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
        ````````