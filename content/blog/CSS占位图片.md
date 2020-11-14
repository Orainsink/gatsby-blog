---
title: CSS占位图片
copyright: true
permalink: 1
top: 0
date: 2019-05-13 18:30:23
tags: ['前端', 'css']
categories: tech
password:
---

较大图片加载时,为了用户体验,在图片完全加载前需要一个占位的背景图片.

更高级一点的是类似微博知乎那种占位.

不过这里只写出一种较为简单的实现方式.

```css
img::after {
  content: '';
  background: url('xxxx.png');
}
```

通过伪类,设置 img 的背景为本地图片,至于位置或者大小,视情况自己填
