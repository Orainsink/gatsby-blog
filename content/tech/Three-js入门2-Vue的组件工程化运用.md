---
title: Three.js 入门2-Vue的组件工程化运用
copyright: true
permalink: 7
top: 0
date: 2019-01-27 02:41:21
tags: ['three']
categories: tech
password:
---

## 一.Vue 项目构建

使用 Vue.cli 脚手架进行项目构建,详情参考 [Vue.cli](https://cli.vuejs.org/zh/guide/creating-a-project.html#vue-create) 官网文档.

## 二.安装 three.js

使用 npm 安装

```shell
npm i three
```

安装成功过后在 package.json 文件内的 dependencies 对象内能看到新增加了 three 的字段.

Vue.cli 是默认使用 Webpack 的,接下来我们就对 three.js 进行模块化引用.

## 三.模块化引用 three.js

你现在可以在你的源代码中引入模块，并继续像往常一样使用这个库。

```js
var THREE = require('three');

var scene = new THREE.Scene();
...
```

通常来说,在 Vue 项目中我们使用 ES6 的 import 语法来引入

```js
import * as THREE from 'three';

const scene = new THREE.Scene();
...
```

或者，如果你希望只导入 three.js 库中的特定部分，例如 Scene：

```js
import { Scene } from 'three';

const scene = new Scene();
...
```

官方文档的注意事项:目前，**无法用这种方式导入"examples/js"目录中的文件**。 这是因为一些文件依赖于 THREE 的全局命名空间污染。了解更多详情，请参阅[Transform `examples/js` to support modules #9562](https://github.com/mrdoob/three.js/issues/9562)。

## 四.组件模板

一个简单的 Vue 组件模板

three.vue

```html
<template>
  <div class="container" id="container"></div>
</template>

<script>
  import * as THREE from 'three';
  //stats性能监控的书签,去掉注释即可使用
  //javascript:(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='//mrdoob.github.io/stats.js/build/stats.min.js';document.head.appendChild(script);})()
  export default {
    name: 'three',
    data() {
      return {
        //三大组件
        renderer: null,
        camera: null,
        scene: null,
        //光线和几何体
        light: null,
        mesh: null,
        //长宽参数
        width: 0,
        height: 0,
      };
    },
    methods: {
      //初始化渲染器
      initThree: function () {
        let container = document.getElementById('container');
        this.width = container.clientWidth;
        this.height = container.clientHeight;
        this.renderer = new THREE.WebGLRenderer({
          //抗锯齿,占用资源
          antialias: true,
        });
        this.renderer.setSize(this.width, this.height);
        this.renderer.setClearColor(0x001f10, 1.0);
        container.appendChild(this.renderer.domElement);
      },
      //初始化相机-透视投影相机
      initCamera: function () {
        this.camera = new THREE.PerspectiveCamera(
          70,
          this.width / this.height,
          0.01,
          10
        );
        //相机的位置,偏移量及朝向,非必须,默认为全0
        this.camera.position.z = 1;
      },
      //初始化场景
      initScene: function () {
        this.scene = new THREE.Scene();
      },
      //初始化光线
      initLight: function () {
        this.light = new THREE.DirectionalLight(0xff0000, 1.0, 0);
        this.light.position.set(100, 100, 200);
        this.scene.add(this.light);
      },
      //初始化几何体对象
      initObject: function () {
        let geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
        let material = new THREE.MeshNormalMaterial();

        this.mesh = new THREE.Mesh(geometry, material);
        this.scene.add(this.mesh);
      },
      //渲染循环
      animate: function () {
        requestAnimationFrame(this.animate);
        //do something
        this.mesh.rotation.x += 0.01;
        this.mesh.rotation.y += 0.01;
        //渲染
        this.renderer.render(this.scene, this.camera);
      },
      //入口
      threeStart: function () {
        this.initThree();
        this.initCamera();
        this.initScene();
        this.initLight();
        this.initObject();
        this.animate();
      },
    },
    created() {
      this.$nextTick(() => {
        this.threeStart();
      });
    },
  };
</script>

<style scoped>
  .container {
    width: 600px;
    height: 600px;
    box-sizing: border-box;
    border: none;
    cursor: pointer;
    background-color: #eeeeee;
  }
</style>
```
