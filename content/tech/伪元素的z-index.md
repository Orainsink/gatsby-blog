---
title: 伪元素的z-index
copyright: true
permalink: 1
top: 0
date: 2019-08-23 09:57:54
tags: ['前端', 'css']
categories: tech
password:
---

## 问题

鄙人想写一些 hover 或者其他效果的时候用了伪元素，但是发现对伪元素直接设置`z-index`并不生效例如：

```css
#element {
  position: relative;
  z-index: 1;
}

#element::after {
  z-index: 0;
  content: ' ';
  position: absolute;
  top: 0;
  left: 0;
  width: 100px;
  height: 100px;
  background: #000;
}
```

按道理来说由于伪元素的`z-index`比宿主元素低, 伪元素应该被宿主元素覆盖, 但是实际上的效果刚好相反.

<!--more-->

## 解决办法

伪元素被视为其相关元素的后代。

如果未在宿主元素上指定`z-index`(默认为 auto)，则宿主元素和伪元素将出现在同一堆叠上下文中。这时如果伪元素的`z-index`比宿主元素低, 就可以正确出现在宿主元素下方。

**当你在宿主元素上指定`z-index`时，该元素会为伪元素(实际上是它的所有后代)创建一个新的堆叠上下文，防止伪元素出现在它下面,即使你给它一个负`z-index`。**

简单总结就是：

**想让伪元素置于宿主元素下方，就不要给宿主元素设置 z-index(默认为 auto)**

## 层叠上下文关系一网打尽

[张鑫旭的文章](https://www.zhangxinxu.com/wordpress/2016/01/understand-css-stacking-context-order-z-index/)

有点长. 看完算是对 z-index 和层叠上下文更加了解了
