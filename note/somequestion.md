## Some Questions
- 判断一个对象是不是数组类型,有几种方法: 
    1. 判断原型对象: 
            
        Object.getPrototypeOf(obj)==Array.prototype   
            
        判断obj是数组类型的子对象
            
        问题: __proto__是内部属性,本不应该被访问到
            
        解决: 用Object.getPrototypeOf(obj) 代替__proto__; 或者使用var bool=Array.prototype.isPrototypeOf(obj);
            
    2. 判断构造函数:
            
        obj instanceof Array 
        
        判断obj是不是被构造函数Array创造出来的
            
        instanceof 不仅判断直接父类型,而是查找整个原型链上的类型,只要符合就返回true！
    3. 判断对象的内部class属性
            
        每个对象内部,都有一个隐藏的class属性,记录该对象创建时的数据类型
            
        class属性不会随继承关系的改变而改变
            
        问题1: class是内部属性
            
        解决: 只有最顶层的toString()才能输出对象的class属性值
            
        [object class名]
            
        问题2: 内置类型的原型对象中几乎都重写了新的toString()
            
        解决: 用call强行调用: 
            
        call: 让一个对象,调用一个本来无法调用到的函数
            
        何时: 只要希望调用一个本无法调用到的函数
            
        如何: 要调用的函数.call(对象)
            
        Object.prototype.toString.call(obj)=="[object Array]"
            
        说明obj的内部属性class的值为"Array"
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

		
