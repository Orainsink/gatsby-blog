---
title: 用现代MVVM框架开发Shopify主题
copyright: true
permalink: 1
top: 0
date: 2020-05-17 12:20:23
tags: ['shopify']
categories: tech
password:
---

> 失业过后进行过短暂的 shopify 开发, 虽然自己不会再写 Liquid 了, 但是这一段时间的收获还是需要记录下来.

# Liquid 模板语言的缺点

开发 shopify 主题的时候, 通常我们是直接使用 shopify 的 liquid 模板语言加上 jQuery 进行开发, 这在处理一些比较简单的业务场景的时候还得心应手, 但是在面对一些复杂场景, 比如自定义的侧边购物车, 或者是像我开发过程中遇到的, 商品属性较多, 表单较复杂的场景, 用 jQuery 就会导致代码拓展和维护困难.

复杂交互场景下, 如果能使用 mvvm 框架的话, 页面的性能也会有相应的提升, 还可以直接使用 element-ui 或者 antD. 相应的, 因为我们只在网页的部分地方使用框架, 所以对商品网页的 SEO 影响并不大. 使用框架的缺点是维护比较困难, 增加了额外的下载开销, 酌情取舍.

<!--more-->

# 如何使用

首先, 不管是 Vue 还是 React 都不能直接从 shopify 后台获取数据, 获取数据的方式有两个:

## 1. 曲线救国, 通过 Liquid 文件内的内嵌 script 标签

举个简单的例子, 代码为 Vue:

Liquid 文件

```js
<script
	id="data"
	type="application/json"
>
	{\{ product | json }\}
</script>
```

Vue:

```js
var data = JSON.parse(document.getElementById('data').innnerHtml);

new Vue({
  extends: MyComponent,
  propsData: data,
});
```

React 的话基本同理, 只是写法不同. 之所以选择 Vue, 无非是因为 Vue 也是模板语法, 和 liquid 搭配起来不会很突兀.

## 2. 通过 Shopify 提供的部分 Ajax 接口, 进行局部 View 更新

完全用 liquid 和 jquery 开发的一大问题, 就是 View 的局部更新, 我们大部分时间只能用 `$.html()`这种落后的方式来局部更新视图, 代码很繁杂, 且高度定制的情况下维护很困难.

好在 Shopify 还提供了部分 [Ajax 接口](https://shopify.dev/docs/themes/ajax-api/getting-started)

通过这些接口, 我们能在 Vue 代码内和后台进行部分交互, 完成一些特定的功能.

## 3. 嵌入 Vue

.....就直接引入 Vue 的 js 文件, 在需要引入 Vue 的地方, 放置一个 具有 id 的元素, 然后把 Vue 实例挂载到该元素上就行了.

参考资料:

[Developing Shopify Themes with the Storefront API and Vue.js](https://www.bounteous.com/insights/2019/09/06/developing-shopify-themes-storefront-api-and-vuejs/)
