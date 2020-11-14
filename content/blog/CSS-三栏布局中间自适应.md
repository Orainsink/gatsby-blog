---
title: CSS-三栏布局中间自适应
copyright: true
permalink: 1
top: 0
date: 2019-05-14 23:30:52
tags: ['前端', 'css', '布局']
categories: tech
password:
---

> 三栏布局中间自适应的实现,参考 [Kyxy 的博客](https://segmentfault.com/a/1190000008705541)

三栏布局最简单的是左右两栏，有多种实现方式，float 或者 flex 布局都可以，

关键在于中间自适应部分的实现方式。

其实实现也很简单，

```css
.middle {
  width: 100%;
  margin: 0 20px;
}
```

通过 margin 控制中间自适应 div 的宽度。
