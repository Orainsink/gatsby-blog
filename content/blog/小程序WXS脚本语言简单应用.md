---
title: 小程序WXS脚本语言
copyright: true
permalink: 2
top: 0
date: 2019-09-23 15:10:59
tags: ['前端', '小程序']
categories: tech
password:
---

## 何为 WXS

[官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxs/)

## 为什么要用 WXS

- wxs 执行效率并不如直接的 js 代码
- wxs 有自己的语法,并不与 js 一致, 且不支持部分 ES6 语法(比如 let const)
- wxs 不能作为组件事件的回调, 不能使用其他 js 代码
- 文档简陋
- ....

看起来 wxs 好像一无是处, 但实际上不是.

<!--more-->

WXS 对性能的贡献：**与 WXML 是在同一个线程运行的，避免了跨线程通信的开销**。

但实际上跨线程通信的这点性能提升意义并不是很大. (一般来说我更希望用户直接换手机).

wxs 最大的用处是: **增强 wxml 标签的表达能力**

小程序的 UI 层和 service 层运行在不同 webview 下面，他们通过 postMessage 通讯, 通常来说我们是不能直接通过 js 来进行 DOM 操作的(通过某些特定的方法,比如 `wx.createSelectorQuery()`)

wxs 即为官方为小程序的框架设计表达不足的部分提供的解决方案.

## 一个简单的业务逻辑实现

```js
// 数据
const a = [1, 4, 3, 1, 2, 2];
const b = [
  null,
  { comment: [1, 2] },
  null,
  null,
  { comment: [2] },
  { comment: [] },
];
```

我想要实现一个列表渲染里的条件渲染, 列表`wx:for="{ {a} }"` `wx:for-item="item"` `wx:for-index="index"`, 条件为 `b[index].comment.includes(item)`,

但是小程序的条件渲染并不支持 Array 的 `includes()` 方法

用 wxs 实现如下:

wxml:

```html
<view class="container">
  <wxs module="example">
    var foo = function(key,cur) { if (cur !== null){ return
    cur.comment.indexOf(key) !== -1 } return false } module.exports.foo = foo;
  </wxs>
  <block wx:for="{{a}}" wx:for-item="item" wx:for-index="index">
    <view wx:if="{{example.foo(item,b[index])}}">True</view>
  </block>
</view>
```

## 评价

wxs 在我看来是个不伦不类的东西, 如果业务需要, 可以考虑使用, 但是过多使用无异于饮鸩止渴.

与其说是一个新的脚本语言, 不如说是应急做出来的补丁, 哪天小程序框架把相应的窟窿补上了, wxs 也就多余了.
