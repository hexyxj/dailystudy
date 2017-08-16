## JavaScript Objects
### String
- 大小写转换 
    - str.toLowerCase();
    - str.toUpperCase();
- 获取指定索引处的字符
    - str.charAt(index);
- 选取子字符串
    - str.substring(starti,endi);
        - 参数不支持负数,含头不含尾;
    - str.substr(starti,n);
        - n为子串长度
- 获取子串
    - str.slice(start[,end]);
    - 含头不含尾
    - 省略参数可以复制一个新的字符串;
- 查找关键词位置
    - str.indexOf(searchValue[, fromIndex]);
    - str.lastIndexOf(searchValue[, fromIndex]);
    - 返回值：指定值的第一次出现的索引; 如果没有找到 -1。
- 匹配
    - str.match(value/regexp);
    - 返回值：包含所有匹配项的数组(正则表达式后需要加g);没有匹配项,则为null
- 查找
    - str.search(value/regexp);
    - 返回值：如果匹配成功,则返回正则表达式在字符串中首次匹配项的索引。否则,返回 -1。
- 替换子字符串
    - str.replace(regexp|substr, newSubstr|function)
    - 回调函数
        str.replace(/RegExp/ig,function(keyword){
            return keyword,动态返回不同的替换值;
        });
    - 删除 
        str.replace(/RegExp/ig,"");
        - 删除字符串首尾空字符
        - str.replace(/(^\s+)* | (\s+$)*/g,"");
- 分隔字符串
    - str.split(separater,[count]);
    - separator 可以是一个字符串或正则表达式;
    
### RegExp
- 验证
    - regexpObj.test(str)
    - 检测str中是否包含符合regexpObj规则的子串,若有则返回true,否则返回false;
    - 要检测整个字符串是否符合正则表达式,需要/^regExp$/;
- 查找
    - regexpObj.exec(str); 
    - exec() 方法在一个指定字符串中执行一个搜索匹配。返回一个结果数组或 null。
    - 如果匹配成功,exec() 方法返回一个数组,并更新正则表达式对象的属性。返回的数组将完全匹配成功的文本作为第一项,将正则括号里匹配成功的作为数组填充到后面。
    - 如果匹配失败,exec() 方法返回 null。

### Math
- 取整  
    - 向上取整：
        - Math.ceil(num);
    - 向下取整：
        - Math.floor(num); 
        - parseInt();
    - 四舍五入：
        - Math.round(num); 
        - num.toFixed(d),返回值是字符串;
- 乘方
    - Math.pow(底数,幂);
- 最大值、最小值
    - Math.max();
    - Math.min();
       - 数组 Math.max.apply(null,arr);
- 随机数
    - Math.random();
    - 区间：[0,1) 
    - 在任意min~max之间取一个随机整数的公式：parseInt(Math.random()*(max-min+1)+min);
### Date
- 获得当前系统时间
    - var now=new Date();
    - 只能获得客户端当前操作系统的时间
- 保存自定义时间
    - var date=new Date("yyyy/MM/dd hh:mm:ss");
- 复制一个日期对象
    - var date2=new Date(date1);
    - 日期计算都是直接修改原日期对象,计算后,原日期无法保留。当需要同时保留计算前后的时间时,需要复制副本,然后在计算。
- 将毫秒数转化为当地时间
    - var date=new Date(ms);
- API
    - 8个单位
        - FullYear:年      Month:月     Date:日      Day:星期几
        - Hours:小时       Minutes:分   Seconds:秒   Milliseconds:毫秒
    - 每个单位都有get方法和set方法;
        - 如：getFullYear();setFullYear();
        - 特例：day没有set方法;
    - 取值范围
        - Month:0-11;     Date:1-31;      Day:0-6;        Hours:0-23;
        - Minutes:0-59;   Seconds:0-59;   Milliseconds:0-999;
- 时间格式化
    - date.toString();转为当地时间的完整格式
    - date.toLocaleString();转为当地时间的简化版本
    - date.toLocaleDateString();转为当地时间的简化版本,只保留日期部分
    - date.toLocaleTimeString();转为当地时间简化版本,只保留时间部分
    - date.toGMTString();转为GMT标准时间
### Error
- 什么是错误
    - 代表程序执行过程中导致程序无法正常执行的原因。
- 错误处理
    - 什么是：即使程序发生错误,也保证不异常退出的机制
    - 为什么：任何程序只要发生错误,就会立即中断退出
    - 何时：只要希望程序即使出错,也不会中断退出
    - 如何：
    `````````````
        try{
            //可能出错的代码
        }catch(err){
            //只有出错才执行的错误处理代码
            //比如: 错误提示,记录日志,保存进度/数据
        }finally{
            //无论是否出错都必须执行的代码
            //释放资源
        }
    ````````````` 
- Error错误对象
    - 什么是：在发生错误是自动创建的封装错误信息的对象;
    - name 错误类型
        - SyntaxError:语法错误
        - referenceError:引用错误,要用的变量/对象,没找到;
        - TypeError:类型错误
            - 当传入函数的操作数或参数的类型并非操作符或函数所预期的类型时,将抛出一个TypeError类型错误;
        - RangeError:参数超出范围
            - 试图传递一个number参数给一个范围内不包含该number的函数时则会引发RangeError;
            - 当传递一个不合法的length值作为Array构造器的参数创建数组,或者传递错误值到数值计算方法,会出现RangeError;
        - EvalError;
        - URIError;
    - message 错误提示信息;
    - String(err) 错误类型：错误提示信息;
### Function
- 声明函数
    - 声明：function 函数名(参数1,参数2...){...}
    - 直接量：var 函数名=function(参数1,参数2...){...};
        - 函数是引用类型的对象;
        - function 是创建一个新函数的意思;
        - 函数名其实就是一个引用函数对象的简单变量; 
    - new: var 函数名=Function("参数1","参数2",...,"函数体");
        - Function中的参数以及函数体需要用引号引起来;
- 重载(overload)
    - 什么是:相同函数名不同参数列表的多个函数,在调用时,可根据传入参数的不同,自动选择对应函数执行;
    - 为什么:减少函数的个数,减轻调用者的负担;
    - 何时:只要一项任务,根据不同的参数,有不同实现逻辑时;
    - 问题:JS语法默认不支持重载;
        - 原因:JS中不允许多个同名函数同事存在;
    - 解决:用arguments对象
        - 函数中,自动创建的
        - 自动接收所有传入函数的参数值的
        - 类数组对象(object like array)
            - 具备下标,length,可以用for遍历;
            - 与数组类型不同,不能使用数组的API;
        - 当函数的参数个数不确定时,都可用arguments接收所有参数。
        - 今后函数还需要接收参数吗？
            - 参数的作用：提醒调用者,如何正确使用函数;一般自定义的参数名,都是见名知意,且都非常简单;所以,函数都要优先使用参数变量接收参数。
- 匿名函数
    - 什么是:创建函数时,不指定函数名的函数;
    - 为什么:节约内存,划分临时作用域;
    - 何时:2种
        - 如果一个函数,只使用一次时;
        - 如果避免使用全局变量,划分临时作用域时;
    - 如何:2种
        - 回调:将一个函数,交给另一个函数去调用;
        - 自调:创建函数后,立刻调用自己;
            - 为什么:全局变量容易被污染,且维护成本高;
            - 何时:使用自执行匿名函数来创建命名空间,这样不仅可以防止全局污染,而且有利于程序的模块化。
        