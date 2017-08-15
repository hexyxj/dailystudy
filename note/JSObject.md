##JavaScript Objects
### String
- 大小写转换 
    
    str.toLowerCase();
    str.toUpperCase();
- 获取指定索引处的字符

    str.charAt(index);
- 选取子字符串
    
    str.substring(starti,endi);
        - 参数不支持负数，含头不含尾;
    str.substr(starti,n);
        - n为子串长度
- 获取子串
    
    str.slice(start[,end]);
    - 含头不含尾
    - 省略参数可以复制一个新的字符串;
- 查找关键词位置
    
    str.indexOf(searchValue[, fromIndex]);
    str.lastIndexOf(searchValue[, fromIndex]);
    - 返回值：指定值的第一次出现的索引; 如果没有找到 -1。
- 匹配
    
    str.match(value/regexp);
    返回值：包含所有匹配项的数组(正则表达式后需要加g);没有匹配项，则为null
- 查找
    
    str.search(value/regexp);
    返回值：如果匹配成功，则返回正则表达式在字符串中首次匹配项的索引。否则，返回 -1。
- 替换子字符串
    
    str.replace(regexp|substr, newSubstr|function)
    - 回调函数
        str.replace(/RegExp/ig,function(keyword){
            return keyword,动态返回不同的替换值;
        });
    - 删除 
        str.replace(/RegExp/ig,"");
        - 删除字符串首尾空字符
        - str.replace(/(^\s+)* | (\s+$)*/g,"");
- 分隔字符串
    
    str.split(separater,[count]);
    - separator 可以是一个字符串或正则表达式;
    
### RegExp
- 验证
    
    regexpObj.test(str)
    检测str中是否包含符合regexpObj规则的子串,若有则返回true,否则返回false;
    要检测整个字符串是否符合正则表达式，需要/^regExp$/;
- 查找
    
    regexpObj.exec(str);
    exec() 方法在一个指定字符串中执行一个搜索匹配。返回一个结果数组或 null。
    如果匹配成功，exec() 方法返回一个数组，并更新正则表达式对象的属性。返回的数组将完全匹配成功的文本作为第一项，将正则括号里匹配成功的作为数组填充到后面。
    如果匹配失败，exec() 方法返回 null。

### Math
- 取整
  
    向上取整：
        Math.ceil(num);
    向下取整：
        Math.floor(num); 
        parseInt();
    四舍五入：
        Math.round(num); 
        num.toFixed(d),返回值是字符串;
- 乘方

    Math.pow(底数，幂);
- 最大值、最小值
    
    Math.max();
    Math.min();
       > 数组 Math.max.apply(null,arr);
- 随机数
    Math.random();
    区间：[0,1) 
    在任意min~max之间取一个随机整数的公式：parseInt(Math.random()*(max-min+1)+min);

###Date
- 获得当前系统时间

    var now=new Date();
    - 只能获得客户端当前操作系统的时间
- 保存自定义时间
    
    var date=new Date("yyyy/MM/dd hh:mm:ss");
- 复制一个日期对象

    var date2=new Date(date1);
    日期计算都是直接修改原日期对象，计算后，原日期无法保留。当需要同时保留计算前后的时间时，需要复制副本，然后在计算。

- 将毫秒数转化为当地时间

    var date=new Date(ms);