## CSS 布局
----
----
### Float 浮动
- 浮动技术允许元素浮动到另一个元素的左侧或者右侧。浮动定位的元素会"脱离文档流"，元素将不再占据页面空间。图片,文字,行内元素,行内块元素,会为浮动元素让出空间,并采用环绕的方式来排列.
- 其主要属性：left、right、none、inherit
    - left 将元素浮动到左侧
        * 左浮动，让元素停靠在父元素的左边，或者左侧已有浮动元素的边缘上
    - right 将元素浮动到右侧
        * 右浮动，让元素停靠在父元素的右边，或者右侧已有浮动元素的边缘上
    - none 默认值，不浮动
    - inherit 继承父元素的浮动属性
- 清除浮动
    - 直接设置父元素的高度
    - 设置父元素也浮动
    - overflow:hidden/auto
    - 在父元素中追加一个空的块级元素,并设置clear:both
    - 在父元素后添加伪类after
        `````````
        #text::after{
            content:"";
            display:block;
            clear:both;
        }
        `````````
----
### Position 位置/定位
- 其主要属性：static、relative、absolute、fixed
    - static 静态定位
    - relative 相对定位
        - 元素相对于它自己原来的位置,偏移某个距离
        - 相对定位元素,偏移完成后,原来位置还会被保留,不会被其他元素占据
    - absolute 绝对定位  
        - 绝对定位元素会脱离文档流
        - 绝对定位的元素会相对于离它最近的已定位的祖先元素来实现位置的初始化
        - 如果没有已定位的祖先元素,那么它的位置就相对于body实现初始化
        - 绝对定位的元素其他盒子和其他盒子内的文本都会无视它。      
        - 绝对定位元素会变成块级
        - margin可以正常使用,但是margin的左右auto值会失效
        - 将 left,right,bottom,top都设置为0时,margin:auto可以实现元素在已定位祖先元素内的绝对居中 
    - fixed 固定定位
        - 将元素内容固定在页面的某个位置处,会一直显示在用户的可视化区域内
        - 偏移定位以浏览器窗口为参考,当出现滚动条时,对象不会随着滚动
        - 固定定位元素也会脱离文档流,不占据空间
        - 固定定位元素会变成块级元素
----
### Flexbox 弹性布局
- 弹性布局容器
    - 属性:display:flex/inline-flex
    - 容器的属性
        - flex-direction:决定主轴以及主轴的排列方向
            - row:默认值,横轴为主轴,起点在左
            - row-reverse:横轴为主轴,起点在右,从右到左排列
            - column:纵轴为主轴,起点在上
            - column-reverse:纵轴为主轴,起点在下
        - flex-wrap:在一根轴上排列不下所有子项时,如何换行
            - nowrap:默认值,不换行,但是子项会缩小
            - wrap:换行
            - wrap-reverse:换行,第一行在最下方
        - flex-flow:flex-direction和flex-wrap的简写属性
            - flex-flow:direction wrap
        - justify-content:指定子项在主轴上的对齐方式
            - flex-start:起点对齐
            - flex-end:终点对齐
            - center:居中对齐
            - space-between:两端对齐,子项之间的间隔都相等
            - space-around:每个子项两侧的间隔都相等,子项之间的间隔比子项与边框的间隔都大一倍
        - align-items:定义子项在容器的当前行的交叉轴上的对齐方式
            - flex-start:交叉轴起点对齐
            - flex-end:交叉轴终点对齐
            - center:交叉轴中间对齐
            - baseline:在子项的第一行文字的基线对齐
            - stretch:默认值,如果子项未设置高度或为auto,将占满整个容器
        - align-content:当子项由多根主轴时,指定子项在交叉轴上的对齐方式以及子项的边距
            - flex-start:交叉轴起点对齐
            - flex-end:交叉轴终点对齐
            - center:交叉轴中间对齐
            - space-between:两端对齐,子项之间的间隔都相等
            - space-around:每个子项两侧的间隔都相等,子项之间的间隔比子项与边框的间隔都大一倍
            - stretch:默认值
    - 子项的属性
        - order:定义子项的排列顺序,值越小,越靠前,默认值为0
        - flex-grow:定义子项的放大比例,根据弹性盒子所设置的扩展因子作为比率来分配剩余空间
            - 默认值为0,如果没有显式定义该属性,则不会有分配剩余空间的权力
        - flex-shrink:定义子项的缩小比例,默认为1,取值为0,不缩小
        - flex-basis:定义子项在主轴上的空间大小
            - auto:默认值
            - length:自定义
        - flex:grow shrink basis 的简写
        - align-self:当前子项与其他子项不一样的交叉轴对齐方式
            - flex-start
            - flex-end
            - center
            - baseline
            - stretch
            - auto
----
### Grid 网格布局
