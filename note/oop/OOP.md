## OOP
- 什么是面向对象:程序中都是用对象结构描述现实中的一个具体事物;
- 什么是对象:程序中专门描述现实中一个具体事物的属性和功能的程序结构
- 为什么:现实中,任何数据必须属于某个具体事物才有意义
- 何时:只要描述一个事物,都要将事物的属性和功能集中定义在一个对象中
- 如何:面向对象三大特点
    - 封装
    - 继承
    - 多态
- 封装
    - 什么是:创建一个对象,存储一个事物的属性和功能;
        - 事物的属性会成为对象的属性;
        - 事物的功能会成为对象的方法;
        - 属性和方法统称为成员;
    - 为什么:便于大量维护数据
    - 何时:只要使用面向对象，都要先创建对象，再按需调用对象的方法执行操作
    - 如何:3种
        1. 对象直接量:
            ``````````
            var obj={
                属性名:属性值,
                ...  :  ... ,
                方法名: function(){
                    ... this.属性名...
                }
            }
            //ES6新写法
            var obj={
                属性名:属性值,
                ...  :  ... ,
                方法名(){
                    ... this.属性名...
                 }
            }
            ``````````
            > 对象自己的方法，访问自己的属性，如果不加this，仅会在作用域链中找，不会在对象中找;
            > 因此对象自己的方法要访问自己的属性,须用this.属性名;
            > this:在函数执行时,自动创建的一个关键词;它专门指向正在调用当前函数的当前对象;
        2. 用new:2步
            - 先创建一个空对象 
                ``````````
                var obj=new Object();//new可省略,()也可以省略,但不能同时省略   
                ``````````
            - 向空对象中添加新成员
                ```````````
                obj.属性名=值;
                obj.方法名=function(){
                    ... this.属性名 ...
                }
                //JS中的对象,可以随时通过强行赋值的方式,添加新成员
                //如果在创建对象时,暂时不知道对象成员时可以使用这种方法创建对象
                //访问不存在的成员->undefined
                ```````````
            > ECMA-262 把对象定义为:"无序属性的集合，其属性可以包含基本值、对象或者函数。"严格来讲,这就相当于说对象是一组没有特定顺序的值。对象的每个属性或方法都有一个名字,而每个名字都映射到一个值。正因为这样,我们可以把 ECMAScript 的对象想象成散列表:无非就是一组名值对,其中值可以是数据或函数。
            ##### 创建对象使用对象直接量和new的缺点:反复创建多个相同结构的对象时，会造成大量重复的代码
        3. 构造函数
            ```````````
            //定义构造函数
            function Person(name, age, job){
                this.name = name;
                this.age = age;
                this.job = job;
                this.sayName = function(){
                    alert(this.name);
                };
            }
            //创建实例
            var dong = new Person("东东", 29, "FE");
            var xu = new Person("旭旭", 27, "FE"); 
            ```````````
            > 要创建 Person 的新实例,必须使用 new 操作符.以这种方式调用构造函数实际上会经历以下 4 个步骤:
            
            > (1) 创建一个新的空对象
            
            > (2) 设置新的子对象的__proto__继承构造函数的prototype对象
            
            > (3) 调用构造函数,将构造函数中的this自动替换为当前新对象,构造函数将规定的属性添加到新对象中,并将传入的参数值保存在新对象的新属性中
            
            > (4) 返回新对象的地址保存到变量中
            ##### 构造函数的优点:重用结构定义;
            ##### 构造函数的缺点:浪费内存,每个方法都要在实例上重新创建;

- 继承
    - 什么是:父对象的成员,子对象无需创建即可直接使用;
    - 为什么:代码重用,节约内存;
    - 何时:所有子对象都拥有相同的属性值和方法定义时
    - 如何:js中所有继承,都是继承原型对象
        - 什么是原型对象:集中存储所有子对象共有成员的父对象
        - 为什么:实现继承
        - 何时:只要实现继承,都要继承原型对象
        - 如何:
            1. 创建:在创建构造函数的时候,就会根据一组特定的规则为该函数创建一个prototype属性，这个属性指向函数的原型对象。
            2. 继承:用New创建新的子对象时,会自动设置新对象继承构造函数的原型对象
            3. 添加共有成员: 构造函数.prototype.成员=值;
        ``````````
        //定义构造函数
        function Person(name, age, job){
            this.name = name;
            this.age = age;
            this.job = job;
        }
        Person.prototype.sayName=function(){
            alert(this.name);
        };
        Person.pototype.country="Chinese";
        //创建实例
        var dong = new Person("东东", 29, "FE");
        var xu = new Person("旭旭", 27, "FE"); 
        ``````````
    - 自有属性和共有属性
        - 自有属性:直接保存在对象本地的属性
        - 共有属性:保存在原型对象中,所有子对象共有的属性
        - 读取:两者完全一样
        - 修改:
            - 自有属性:只能用子对象改:子对象.自有属性名=值
            - 共有属性:只能用原型对象修改:构造函数.prototype.共有属性名=值;

- 原型链(prototype chain)
    - 什么是:由多级父对象,逐级继承,形成的链式结构
    - 为什么:为了更高级的重用
    - 如何:
        - 所有对象都有__proto__属性;
        - 原型对象的__proto__指向更上级的父对象
        - 所有对象最终都继承自Object.prototype——顶级父对象;
- 内置对象的原型链
    - 每种内置类型都有对应的构造函数和原型对象,也最终都继承自Object.prototype
    - 其中,内置对象的构造函数负责创建该类型的子对象;内置类型的原型对象负责保存该类型所有子对象共有的API

- 多态
    - 什么是:同一个函数在不同情况下表现出不同的状态
        - 重写:如果子对象觉得父对象的成员不好用,可在本地定义同名成员,覆盖父对象中继承来的成员
        - 为什么重写:体现子对象和父对象的差异
        - 何时使用重写:只要子对象觉得父对象的成员不好用,就可以重写

- 自定义继承
    - 何时：只要觉得默认的父对象不好用时，可换父对象
    - 如何：3种
        1. 仅修改两个对象间的继承关系:
            - 获得子对象的父对象
                - var father=Object.getPrototypeOf(child);
            - 设置子对象继承指定父对象
                - child.__proto__=father;
                - 问题:__proto__是内部属性
                - 解决：Object.setPrototypeOf(child,father);
        2. 修改构造函数原型对象，来修改所有子对象的父对象
            - 构造函数.prototype=father
            - 时机:必须紧跟在构造函数定义之后,开始创建子对象之前
        3. 两种类型间的继承
            - 何时:如果发现多个类型拥有部分相同的属性结构和方法定义,都要抽象父类型
            - 如何:2步
                1. 定义抽象父类型
                    - 相同的属性结构定义在父类型的构造函数中
                    - 相同的方法定义在父类型的原型对象中
                2. 让子类型继承父类型
                    - 在子类型构造函数中借用父类型构造
                        - extends
                            - 让父类型构造函数帮助添加相同部分的属性定义
                            - 子类型构造函数仅负责添加独有的属性定义即可
                        - 错误:
                            - 直接调用父类型构造函数
                            - this->window:父类型中的属性都泄露到全局
                        - 正确
                            - 父类型构造.call(this, 参数1,参数2,...)
                            - 简写:父类型构造.apply(this, arguments);
                    - 让子类型原型对象继承父类型原型对象
                        - inherits
                        - Object.setPrototypeOf(子类型构造.prototype, 父类型构造.prototype);
                `````````````````
                //创建抽象父类构造函数
                function Flyer(fname,speed){
                    this.fname=fname;
                    this.speed.speed;
                }
                //设置抽象父类原型对象
                Flyer.prototype.fly=function(){
                    console.log("fly");
                };
                //创建子类构造函数
                function Plane(fname,speed,score){
                    //在子类中调用父类的构造函数
                    Flayer.call(this,fname,speed);
                    this.score=score;
                }
                //设置子类原型对象
                Plane.prototype.getScore=function(){
                    console.log("Palne getScore");
                };
                //让子类原型对象继承父类原型对象
                Object.setPrototypeOf(Plane.prototype,Flyer.prototype);
                function Bee(fname,speed,award){
                   Flayer.call(this,fname,speed);
                    this.award=award; 
                }
                Bee.prototype.getAward()=function(){
                    console.log("Bee getAward");
                };
                Object.setPrototypeOf(Bee.prototype,Flyer.prototype);
                `````````````````


        4. Object.create
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