---
title: CSS函数, var和attr
date: 2020-07-21 7:54:10
description:
tags: [css, 前端]
categories: tech
---

> CSS 全称层叠样式表, 在最基本的使用时它只是一个样式表的标记语言, 根本算不上编程, 所以后来者为了增强 CSS 而开发了 Less 和 Scss. 但随着 CSS 的不断变革, CSS 也增加了许多内置函数, 有部分函数相当实用, 这篇文章就稍微记录一下这些 CSS 函数的特性和常见使用方法.

## var()

css 的变量，因为`@`和`$`分别被 less 和 sass 提前据为己有, 所以 css 变量只能使用 `--`作为前缀.

### css 变量可以随时修改

你可能会想, 既然已经有了 less 和 scss , 为什么还要多此一举使用 css 变量. css 变量相较于 less 和 sass 变量有一个最大的优势 -- css 变量可以随时修改.

近两年谷歌, 苹果强推 APP 和 浏览器网页的暗黑模式, 大部分网页的换肤功能或者暗黑模式都是基于 css 变量实现的.

现在大多数流行的浏览器新版本都已经支持了 `prefers-color-scheme` 媒体查询来检测系统当前的外观是浅色还是深色模式

```css
@media (prefers-color-scheme: dark) {
  :root {
    --primary-color: #ff7800;
  }
}
```

如上, 在监测到浏览器是深色模式的时候, 通过 css 变量修改主色, 修改后的主色会直接应用到页面所有用到主色的地方.

除了通过浏览器提供的查询来修改主题, 我们也可以直接用 js 来修改 css 变量.

```js
// 设置变量
document.body.style.setProperty('--primary', '#7F583F');
// 读取变量
document.body.style.getPropertyValue('--primary').trim();
// '#7F583F'
// 删除变量
document.body.style.removeProperty('--primary');
```

除了改变主题外, 用 `var()` 再搭配上 `redial-gradient()`或者`linear-gradient()`可以实现流动的色彩渐变, 非常炫酷.

```css
--magic-rainbow-color-yppo-0: hsl(230deg, 100%, 45%);
--magic-rainbow-color-yppo-1: hsl(240deg, 100%, 45%);
--magic-rainbow-color-yppo-2: hsl(260deg, 100%, 55%);
transition: --magic-rainbow-color-yppo-0 1625ms linear 0s, --magic-rainbow-color-yppo-1
    1625ms linear 0s, --magic-rainbow-color-yppo-2 1625ms linear 0s;
background: radial-gradient(
  circle at top left,
  var(--magic-rainbow-color-yppo-2),
  var(--magic-rainbow-color-yppo-1),
  var(--magic-rainbow-color-yppo-0)
);
--magic-rainbow-color-snap-0: hsl(240deg, 100%, 45%);
--magic-rainbow-color-snap-1: hsl(260deg, 100%, 55%);
--magic-rainbow-color-snap-2: hsl(325deg, 100%, 48%);
```

通过 js 修改几个 css 变量, 可以实现颜色的动态变化.

### 其他

css 变量和 less , scss 等预处理在高级功能方面并无二致, 但是操作比其他处理器更加繁琐, 而且不支持样式名变量, 所以如果要用高级语法, 或者对浏览器兼容性要求很高, 还是用预处理器比较好. css 变量也可以和其他样式预处理器混用, 所以全都要也无妨.

参考资料:

阮一峰的基础教程 [阮一峰: CSS 变量教程](https://www.ruanyifeng.com/blog/2017/05/css-variables.html)

知乎的非常详细的介绍 [跟我一起全面了解一下 CSS 变量](https://zhuanlan.zhihu.com/p/65082165)

gatsby 实现完美暗黑模式的教程[The Quest for the Perfect Dark Mode](https://joshwcomeau.com/gatsby/dark-mode/)

虽然暗黑主题很酷, 但是如果一开始设计网站的时候就没考虑这事儿, 后期再来加这个功能的话, 工作量还是有点大. 😓😓😓 所以我放弃了.

## Attr()

这个函数的使用频率很低, 而且兼容性堪忧, 贴一段 MDN 的注释.

> **注意:** `attr()` 理论上能用于所有的 CSS 属性但目前支持的仅有伪元素的 [`content`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/content) 属性，其他的属性和高级特性目前是实验性的
>
> 如果发现浏览器兼容表里 attr()的高级用法依旧没有良好的支持的话，本文大部分内容都是纸上谈兵

示例:

```css
p:before {
  content: attr(data-foo) ' ';
}
```

```html
<p data-foo="hello">world</p>
```

`Attr()`最大的优势大概就是可以比较方便的修改伪元素的 content 属性, 目前的 MVVM 框架直接修改伪元素的样式比较麻烦, 只能通过修改 class 来修改伪元素样式, 如果 `attr()`能普及, 我们可以直接像修改行内样式一样, 修改伪元素样式.
