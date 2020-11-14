---
title: react-异步组件lazy or @loadable component
copyright: true
permalink: 1
top: 0
date: 2020-03-09 15:01:36
tags: ['前端', 'react']
categories: tech
password:
---

# 异步组件

首屏渲染速度一直是 SPA 页面性能优化的重点.

异步组件是相对于同步组件而言的, 将用户必要操作所使用的组件设为同步组件, 将体积较大但是使用频率较小的组件设为异步组件, 当调用时再借由`import`和 webpack 拉取相应 js 代码, 这样可以有效降低页面加载时间.

<!--more-->

# React 中使用异步组件

react 版本 16+ 之后`react-loadable`因为停止维护, 不支持 webpack4+及 Babel v7, 现已不建议使用.

可选方案为 react 16.6 新增方法`React.lazy`及流行的库`@loadable/component`

两者区别参考[Comparison with React.lazy](https://loadable-components.com/docs/loadable-vs-react-lazy/)

两者最大的区别是`React.lazy`不能进行服务器端渲染.

# `@loadable/component`

简洁明了,看文档就行, [文档](https://loadable-components.com/docs/getting-started/)

# React.lazy

react 官方文档: [文档](https://reactjs.org/docs/code-splitting.html#reactlazy)
