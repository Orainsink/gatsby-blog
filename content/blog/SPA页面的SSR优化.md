---
title: Vue的SSR优化
copyright: true
permalink: 1
top: 0
date: 2019-05-06 12:41:07
tags: ["前端", "SSR"]
categories: 前端
password:
---

## SSR是什么

通常来说由于 SPA 页面的高效性和良好的交互体验, 目前小体量的 web 页面都采用 SPA 页面模型构建, 但是 SPA 有一个最大的问题就是不便于 SEO , 为了解决这个问题 , 我们需要对页面进行 SSR 优化。

<!--more-->

`SSR`（ `Server-Side Rendering`）即服务器端渲染。

在普通的SPA中，一般是将框架及网站页面代码发送到浏览器，然后在浏览器中生成和操作DOM（这里也是第一次访问SPA网站在同等带宽及网络延迟下比传统的在后端生成HTML发送到浏览器要更慢的主要原因），但其实也可以将SPA应用打包到服务器上，在服务器上渲染出HTML，发送到浏览器，这样的HTML页面还不具备交互能力，所以还需要与SPA框架配合，在浏览器上“混合”成可交互的应用程序。所以，只要能合理地运用SSR技术，不仅能一定程度上解决首屏慢的问题，还能获得更好的SEO。

概括来说就是牺牲一定服务器资源，获得更好的SEO和浏览器页面首屏加载速度。

## Vue官网的解决方案

[Vue SSR 使用指南](https://ssr.vuejs.org/zh/)

## NUXT

NUXT 是一套基于Vue的SSR框架

[NUXT官网](https://zh.nuxtjs.org/)

NUXT和Vue cli相比不管是router还是store变化都挺大，要用的时候再学。

## 改造Vue cli3以适应SSR

相关脚手架：

[ediaos的git仓库](https://github.com/EDiaos/vue-cli3-ssr-project)

相关博客：

[lentoo的博客-掘金](https://juejin.im/post/5b98e5875188255c8320f88a)

[博客附带的代码](https://github.com/lentoo/vue-cli-ssr-example)

