---
title: Three.js入门7-模型及模型的加载
copyright: true
permalink: 1
top: 0
date: 2019-03-09 22:52:05
tags: ["前端", "three"]
categories: webGL
password:
---

## 3D模型基础知识

3D模型由顶点(vertex)构成,顶点之间通过组成无数三角形,构成复杂的立体模型.

如果要生成复杂的3D模型,智商正常的人应该都不会去选择用webGL自带的api输入点的坐标造图形,存入缓冲区渲染.

正确的做法是:用 3DMAX/maya 生成3D模型,通过 Three.js 的模型加载器加载模型.

<!--more-->

未完待续