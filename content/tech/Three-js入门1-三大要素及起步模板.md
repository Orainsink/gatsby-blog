---
title: Three.js入门 1-三大要素及起步模板
copyright: true
permalink: 6
top: 0
date: 2019-01-27 02:39:22
tags: ['three']
categories: tech
password:
---

### 前言:

粗略地扫完了《webGl 编程指南》这本 webGL 入门书过后,发现直接操纵 webGL 提供的 API 有点复杂,于是开始学习成熟的 webGl 封装库.我们的学习路径按照入门->做出东西->深入研究,进行学习.Three.js 诞生到现在已经比较成熟,功能强大,而且更新频率快,作为入门的库来说再合适不过了.

<!--more-->

Three.js 的学习资料来源不多,大部分学习资料来自于[webGL 中文网](http://www.hewebgl.com/)(网站从 2012 年办到 2019 年了,webgl 还是没有火,个人感觉即便是 5G 时代这个技术也不会在互联网领域内火,一方面是是 webGl 的性能虽然已经提升了很多但相对本地应用来说还是比较羸弱,另一方面 2d canvas 已经能做出炫酷的页面了,3d 最多只能当个玩具,只是某些方向比如互联网医疗,在线教育和大数据 ppt 展示等可能有需求而已.学习 webGl 纯粹是兴趣驱动.)

webGl 相关代码用框架的模块化编程的话,结构会更清晰,但是学习过程中考虑效率问题直接按教程来就行了.做项目的时候自行变通.

这一系列的文章仅作为个人笔记,即只记录自己觉得重要的部分,过于基础的概念及 html+css 和 js 就略过了,

学习资料:

[dragon/threejs 教程](https://teakki.com/p/58a2a21af0d40775548c7e68)

[webGL 中文网教程](http://www.hewebgl.com/)

[three.js 官方文档](https://threejs.org/docs/index.html#manual/zh/introduction/Creating-a-scene).

另外,webGl 中文网的教程中,three.js 的版本是 R78,如今官方最新版本已经是 R100 了,从 R95 版本开始支持 WebGL 2.0 环境,有一些东西已经变了,学习的过程中要兼顾官方文档,深入的学习需要去看 OpenGL ES3.0 的教材.

> 三大要素即为场景,相机和渲染器这三个对象,为 Three.js 的最基本组成部分,有了这三大要素,才能通过摄像机渲染出场景,然后往场景里面添加几何体,光线等

### 一.场景 scene

场景是所有物体的容器。

在 Three.js 中场景就只有一种，用`THREE.Scene`来表示

##### 构建场景：

```js
var scene = new THREE.Scene();
```

### 二.相机 camera

在 Threejs 中相机的表示是`THREE.Camera`，它是相机的抽象基类，其子类有两种相机，分别是正投影相机(正交投影相机)`THREE.OrthographicCamera`和透视投影相机`THREE.PerspectiveCamera`。

##### 1.构建正交投影相机`THREE.OrthographicCamera`:

```js
var camera = new THREE.OrthographicCamera(
  width / -2,
  width / 2,
  height / 2,
  height / -2,
  1,
  1000
);
scene.add(camera);
```

构造器解释:

```js
OrthographicCamera( left : Number, right : Number, top : Number, bottom : Number, near : Number, far : Number )
left — 摄像机视锥体左侧面。
right — 摄像机视锥体右侧面。
top — 摄像机视锥体上侧面。
bottom — 摄像机视锥体下侧面。
near — 摄像机视锥体近端面。
far — 摄像机视锥体远端面。
```

//视椎体的解释可以看[wiki 百科-视体](https://zh.wikipedia.org/wiki/%E8%A7%86%E4%BD%93)

- 在这种投影模式下，无论物体距离相机距离远或者近，在最终渲染的图片中物体的大小都保持不变。 这对于渲染 2D 场景或者 UI 元素是非常有用的。
- 构造器的 6 个参数,构造了一个完整的矩形,一般来说以浏览器窗口的宽度和高度作为视景体的高度和宽度，相机正好在窗口的中心点上。这也是我们一般的设置方法，基本上为了方便，我们不会设置其他的值.

![img](http://www.hewebgl.com/attached/image/20130530/20130530145859_920.jpg)

##### 2.构建透视投影相机`THREE.PerspectiveCamera`

```js
var camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
scene.add(camera);
```

构造器解释:

```js
PerspectiveCamera( fov : Number, aspect : Number, near : Number, far : Number )
fov — 摄像机视锥体垂直视野角度,一般来说人眼的视角约120°,视角超过180°则物体小到无法观察
aspect — 摄像机视锥体长宽比
near — 摄像机视锥体近端面
far — 摄像机视锥体远端面
```

这一投影模式被用来模拟人眼所看到的景象，它是 3D 场景的渲染中使用得最普遍的投影模式.

![img](http://www.hewebgl.com/attached/image/20130530/20130530151418_279.jpg)

##### 3.相机的位置属性属性:up,position,lookAt

up 为相机的正上方,与 lookAt 正交

position 是相机的坐标

lookAt 是相机看向的矢量方向,和 up 正交,up 和 lookAt 两个属性可以确定相机在 position 位置上的方向

三个属性可以完全确定相机在坐标系的位置.

### 三.渲染器 renderer

渲染器决定了渲染的结果应该画在页面的什么元素上面，并且以怎样的方式来绘制。

##### 构建`webGLRenderer`渲染器

```js
//实例化webGLRenderer渲染器对象
var renderer = new THREE.WebGLRenderer();
//设置尺寸属性
renderer.setSize(window.innerWidth, window.innerHeight);
//添加到body元素
document.body.appendChild(renderer.domElement);
```

渲染器解释:

**`WebGLRenderer`:**通常来说我们使用`WebGLRenderer`渲染器，但 Three.js 同时提供了其他几种渲染器，当用户所使用的浏览器过于老旧，或者由于其他原因不支持 WebGL 时，可以使用这几种渲染器进行降级。

**`setSize()`**:除了创建一个渲染器的实例之外，我们还需要在我们的应用程序里设置一个渲染器的大小尺寸。比如说，我们可以使用所需要的渲染区域的宽高，来让渲染器渲染出的场景填充满我们的应用程序。因此，我们可以将渲染器宽高设置为浏览器窗口宽高。对于性能比较敏感的应用程序来说，你可以给 setSize 传入一个较小的值，例如`window.innerWidth/2`和`window.innerHeight/2`，这将使得应用程序在渲染时，以一半的长宽尺寸渲染场景。

如果你希望保持你的应用程序的尺寸，但是以较低的分辨率来渲染，你可以在调用 setSize 时，给 updateStyle（第三个参数）传入 false。例如，假设你的`<canvas>`标签现在已经具有了 100%的宽和高，调用`setSize(window.innerWidth/2, window.innerHeight/2, false)`将使得你的应用程序以一半的分辨率来进行渲染。

**以上为必需的三大组件.**

### 四.添加物体到场景中

```js
//立方体-即three.js提供的模型骨架,这里用的是立方体(cube)
var geometry = new THREE.CubeGeometry(1, 1, 1);
//材质-模型上覆盖的材质,后面会在材料上添加纹理
var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
//网格-通过模型和材料生成Mesh(基于三角形的多边形网格的物体)物体类
var cube = new THREE.Mesh(geometry, material);
//将物体添加到场景
scene.add(cube);
```

要创建一个**立方体**，我们需要一个 BoxGeometry（立方体）对象. 这个对象包含了一个立方体中所有的顶点（vertices）和面 faces。未来我们将在这方面进行更多的探索。

接下来，对于这个立方体，我们需要给它一个**材质**，来让它有颜色。Three.js 自带了几种材质，但在这里我们使用的是`MeshBasicMaterial`。所有的材质是都一个将会被应用于立方体的属性对象。在这里为了简单起见,我们只设置一个`color`属性，值为`0x00ff00`，也就是绿色。这里所做的事情，就相当于是在 CSS 或者 Photoshop 中使用十六进制(hex colors)的颜色格式来设置颜色。

第三步，我们需要一个 Mesh（**网格**）。 网格是包含有一个几何体以及应用在在此几何体上的材质的对象，我们可以直接将网格对象放入到我们的场景中，并让它在场景中自由移动。

默认情况下，当我们调用`scene.add()`的时候，物体将会被添加到坐标为(0,0,0)的位置。但这可能会使得摄像机的位置和立方体相互重叠（也就是摄像机位于立方体中）。为了防止这种情况的发生，我们只需要将摄像机稍微向外移动一些即可。

### 五.渲染

```js
function animate() {
  //每秒60次触发回调
  requestAnimationFrame(animate);
  //...
  //do something
  //...
  //渲染器重新渲染
  renderer.render(scene, camera);
}
animate();
```

//[requestAnimationFrame()](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame)的解释参考 MDN

### 六.简单的 html 起步框架

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Three框架</title>
    <script src="js/Three.js"></script>
    <style type="text/css">
      div#canvas-frame {
        border: none;
        cursor: pointer;
        width: 100%;
        height: 600px;
        background-color: #eeeeee;
      }
    </style>
    <script>
      //渲染器
      var renderer;
      function initThree() {
        width = document.getElementById('canvas-frame').clientWidth;
        height = document.getElementById('canvas-frame').clientHeight;
        renderer = new THREE.WebGLRenderer({
          antialias: true,
        });
        renderer.setSize(width, height);
        document
          .getElementById('canvas-frame')
          .appendChild(renderer.domElement);
        renderer.setClearColor(0xffffff, 1.0);
      }
      //相机
      var camera;
      function initCamera() {
        camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
        camera.position.x = 0;
        camera.position.y = 1000;
        camera.position.z = 0;
        camera.up.x = 0;
        camera.up.y = 0;
        camera.up.z = 1;
        camera.lookAt({
          x: 0,
          y: 0,
          z: 0,
        });
      }
      //场景
      var scene;
      function initScene() {
        scene = new THREE.Scene();
      }
      //光线
      var light;
      function initLight() {
        light = new THREE.DirectionalLight(0xff0000, 1.0, 0);
        light.position.set(100, 100, 200);
        scene.add(light);
      }
      //几何体
      var cube;
      function initObject() {
        var geometry = new THREE.Geometry();
        var material = new THREE.LineBasicMaterial({
          vertexColors: THREE.VertexColors,
        });
        var color1 = new THREE.Color(0x444444),
          color2 = new THREE.Color(0xff0000);

        // 线的材质可以由2点的颜色决定
        var p1 = new THREE.Vector3(-100, 0, 100);
        var p2 = new THREE.Vector3(100, 0, -100);
        geometry.vertices.push(p1);
        geometry.vertices.push(p2);
        geometry.colors.push(color1, color2);

        var line = new THREE.LineSegments(geometry, material);
        scene.add(line);
      }
      //渲染循环
      function animate() {
        requestAnimationFrame(animate);
        //...
        //do something
        //...
        renderer.render(scene, camera);
      }
      //控制器
      function threeStart() {
        initThree();
        initCamera();
        initScene();
        initLight();
        initObject();
        animate();
      }
    </script>
  </head>

  <body onload="threeStart();">
    <div id="canvas-frame"></div>
  </body>
</html>
```
