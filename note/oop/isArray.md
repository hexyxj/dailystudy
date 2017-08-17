- 判断一个对象是不是数组类型，有几种方法: 
    1. 判断原型对象: 
            
        Object.getPrototypeOf(obj)==Array.prototype   
            
        判断obj是数组类型的子对象
            
        问题: __proto__是内部属性，本不应该被访问到
            
        解决: 用Object.getPrototypeOf(obj) 代替__proto__
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
    4. Array.isArray(obj)
