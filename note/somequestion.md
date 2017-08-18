## Some Questions
- 判断一个对象是不是数组类型，有几种方法: 
    1. 判断原型对象: 
            
        Object.getPrototypeOf(obj)==Array.prototype   
            
        判断obj是数组类型的子对象
            
        问题: __proto__是内部属性，本不应该被访问到
            
        解决: 用Object.getPrototypeOf(obj) 代替__proto__; 或者使用var bool=Array.prototype.isPrototypeOf(obj);
            
    2. 判断构造函数:
            
        obj instanceof Array 
        
        判断obj是不是被构造函数Array创造出来的
            
        instanceof 不仅判断直接父类型，而是查找整个原型链上的类型，只要符合就返回true！
    3. 判断对象的内部class属性
            
        每个对象内部，都有一个隐藏的class属性，记录该对象创建时的数据类型
            
        class属性不会随继承关系的改变而改变
            
        问题1: class是内部属性
            
        解决: 只有最顶层的toString()才能输出对象的class属性值
            
        [object class名]
            
        问题2: 内置类型的原型对象中几乎都重写了新的toString()
            
        解决: 用call强行调用: 
            
        call: 让一个对象，调用一个本来无法调用到的函数
            
        何时: 只要希望调用一个本无法调用到的函数
            
        如何: 要调用的函数.call(对象)
            
        Object.prototype.toString.call(obj)=="[object Array]"
            
        说明obj的内部属性class的值为"Array"
    4. Array.isArray(obj) //ES5

- new在创建一个对象时，经历了哪几步？
    1. 创建一个新的空对象;
    2. 设置新对象的__proto__继承构造函数的prototype对象;
    3. 调用构造函数，将构造函数中的this自动替换成当前的新对象，构造函数将规定的属性添加到新对象中，并将传入的参数值保存到新对象的新属性中
    4. 返回新对象的地址保存到变量中        

- API何时放在原型对象中，何时放在构造函数上——静态方法
    - 如果规定必须当前类型的子对象才能使用时，就放在原型对象中
    - 如果希望其他类型的子对象也能使用API时，就要放在构造函数上

- call vs apply
    - 相同:都是强行借用一个本来无法调用的函数，并临时替换函数中this为指定对象
    - 不同: 
      - call:传入借用函数的参数,必须单独传入,逗号分隔
      - apply:传入借用函数的参数,放在一个数组中整体传入;可自动打散数组类型参数
