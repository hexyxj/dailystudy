## 作用域与作用域链
### 作用域
- 什么是:一个变量的可用范围——用途;  一个存储变量的对象——本质;
- 为什么:避免不同范围的变量间互相干扰;
- 包括:2种
    1. 全局作用域:不属于任何函数的,外部的范围;
        - window,保存全局变量
        - 全局变量:反复使用，随处可用;
    2. 函数作用域：函数内的范围
        - AO(活动对象),保存局部变量
        - 局部变量:仅函数内可用,不可反复使用;
- 函数的声明周期
    1. 开始执行程序前
        - 创建执行环境栈(ECS):保存正在调用的函数记录;
        - 首先自动调用浏览器主程序main();
        - 主程序创建全局作用域对象window
    2. 定义函数时
        - 在window中用函数名创建全局变量
        - window外创建函数对象,保存函数定义
        - 函数对象的scope属性,指向函数创建时的作用域
        - 函数名变量引用函数对象
    3. 调用函数时
        - 向ECS中压入本次函数调用的执行环境元素
        - 创建本次函数调用时使用的函数作用域对象(AO)
        - 在AO中创建所有局部变量
            * 形参变量
            * 函数内用var声明的变量
        - 设置AO的parent属性引用函数的scope属性指向的父级作用域对象
        - 函数的执行环境引用AO
        - 变量的使用顺序
            * 先在AO中找局部变量
            * AO中没有才去父级作用域中找
    4. 函数调用后
        - 函数调用的记录从ECS中出栈
            * AO释放
            * AO中的局部变量一同被释放
            * 所以局部变量仅在函数调用时可用,而且不可重用
### 作用域链
- 由多级作用域逐级引用,形成的链式结构
- 保存着所有的变量
- 控制着变量的使用顺序:先局部,后全局