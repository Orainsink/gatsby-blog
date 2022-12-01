---
title: Three.js入门4-点与线及图像表示
date: 2019-01-27 02:44:38
tags: ['three']
categories: tech
---

> 两点构成一条线段
>
> 三点构成一个三角形
>
> 无数个三角形构成复杂的几何体
>
> 这便是 3D 模型的构造原理
>
> 参考资料[dragon/threejs 教程](https://teakki.com/p/58a19327f0d40775548c6bd7),[webgl 中文网教程](http://www.hewebgl.com/article/getarticle/56)

## 一.点

在三维空间中的某一个点可以用一个坐标点来表示。一个坐标点由 x,y,z 三个分量构成。在 three.js 中，点可以在右手坐标系中表示(webGL 并非必须右手坐标系,只是习惯性约定用右手坐标系)

空间几何中，点可以用一个向量来表示，在 Three.js 中也是用一个向量来表示的，代码如下所示：

```js
THREE.Vector3 = function (x, y, z) {
  this.x = x || 0;
  this.y = y || 0;
  this.z = z || 0;
};
```

注: Vector3 的意思是 3 维矢量,three 中是封装的点的对象.three.js 中没有提供单独画点的函数，它必须被放到一个 THREE.Geometry 形状中，这个结构中包含一个数组 vertices，这个 vertices 就是存放无数的点（THREE.Vector3）的数组。

生成一个点:

```js
var point = new THREE.Vector3(x, y, z);
```

或者用`set`方法

```js
var point1 = new THREE.Vector3();
point1.set(4, 8, 9);
```

创建点可以使用 Points 类。

```js
function createPoints() {
  //创建一个Geometry，并添加点
  let geometry = new THREE.Geometry();
  geometry.vertices.push(new THREE.Vector3(0, 0, 0));
  geometry.vertices.push(new THREE.Vector3(15, 15, 0));
  geometry.vertices.push(new THREE.Vector3(-15, 2, 0));
  //使用PointsMaterial，记得加上size属性，用来设置点的大小
  let material = new THREE.PointsMaterial({ color: 0xff0000, size: 4 });
  let points = new THREE.Points(geometry, material);
  return points;
}
```

默认情况下，点是一个正方形，当然，也可以使用材质，改变点的形状，如下：

```js
function createShapePoints() {
  //创建一个圆形的材质，记得一定要加上texture.needsUpdate = true;
  let canvas = document.createElement('canvas');
  canvas.width = 100;
  canvas.height = 100;
  let context = canvas.getContext('2d');
  context.fillStyle = '#ffff00';
  context.arc(50, 50, 45, 0, 2 * Math.PI);
  context.fill();
  let texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;
  //创建点，是用PointsMaterial的map属性来设置材质
  let geometry = new THREE.Geometry();
  geometry.vertices.push(new THREE.Vector3(0, 0, 0));
  geometry.vertices.push(new THREE.Vector3(15, 15, 0));
  geometry.vertices.push(new THREE.Vector3(-15, 2, 0));
  let material = new THREE.PointsMaterial({
    color: 0xff0000,
    size: 4,
    map: texture,
  });
  let points = new THREE.Points(geometry, material);
  return points;
}
```

效果如图：

![img](/assets/11.png)

注意，既然点可以使用材质，那么点其实可以表示任何形状，从这个意义上讲，点也是一个平面。

## 二.线

```js
...
function initObject(){
    //默认模型
    var geometry = new THREE.Geometry();
    //基础线条材质+属性:开启顶点着色
    var material = new THREE.LineBasicMaterial( { vertexColors: true } );
    //实例化颜色,开启顶点着色过后,颜色会通过顶点着色器进行插值渲染
    var color1 = new THREE.Color( 0x444444 ), color2 = new THREE.Color( 0xFF0000 );
	//实例化两个点
    var p1 = new THREE.Vector3( -100, 0, 100 );
    var p2 = new THREE.Vector3(  100, 0, -100 );
   	//把点和颜色放到模型的数组里,值得注意的是顺序对生成的效果有影响
    geometry.vertices.push(p1);
    geometry.vertices.push(p2);
    geometry.colors.push( color1, color2 );
	//使用three.js的LineSegment类实例化线段
    var line = new THREE.Line( geometry, material);
    scene.add(line);
}
...
```

可以使用 Line 创建线：

```js
function createLine() {
  let geometry = new THREE.Geometry();
  geometry.vertices.push(new THREE.Vector3(15, 15, 0));
  geometry.vertices.push(new THREE.Vector3(-15, 2, 0));
  let material = new THREE.LineBasicMaterial({ color: 0xff0000 });
  //注意这里使用的是LineBasicMaterial
  let line = new THREE.Line(geometry, material);
  return line;
}
```

使用`LineSegments`创建虚线：

```js
function createDashedLine() {
  let geometry = new THREE.Geometry();
  geometry.vertices.push(new THREE.Vector3(15, 15, 0));
  geometry.vertices.push(new THREE.Vector3(-15, 2, 0));
  geometry.computeLineDistances(); //注意加上这句
  let material = new THREE.LineDashedMaterial({
    color: 0xff0000,
    dashSize: 3,
    gapSize: 2,
    lineWidth: 1,
  });
  let line = new THREE.LineSegments(geometry, material);
  return line;
}
```

其中，`LineDashedMaterial`的属性`dashSize`和`gapSize`分别制定线段的长度和间隔的长度。注意一开始不要设得太大，否则整条虚线就只有一个线段，那你看到的就是一条直线了。创建效果如图：

![img](/assets/12.png)

## 三.面

**`ShapeGeometry`**

要创建面可以使用`ShapeGeometry`。面的形状是可以任意的，threejs 用路径来画形状，并且提供了 shape 类来帮助我们创建形状。下面使用`ShapeGeometry`来创建一个圆弧：

```js
function createArc() {
  //通过Shape来创建圆弧这个形状，而Shape是通过定义路径来定义形状的
  let shape = new THREE.Shape();
  shape.absarc(0, 0, 40, (0 / 180) * Math.PI, (45 / 180) * Math.PI, false);
  //做为ShapeGeometry的参数
  let arcGeometry = new THREE.ShapeGeometry(shape);
  let arcMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
  let arc = new THREE.Line(arcGeometry, arcMaterial);
  return arc;
}
```

效果如下：

![img](/assets/10.png)

注意，图中红色的部分才是我们创建的，其它是辅助线。

当然，也可以创建一个扇形，如下：

```js
function createArc() {
  let shape = new THREE.Shape();
  shape.absarc(0, 0, 40, (0 / 180) * Math.PI, (45 / 180) * Math.PI, false);
  shape.lineTo(0, 0);
  //（1）做一条线到圆心
  let arcGeometry = new THREE.ShapeGeometry(shape);
  //（2）使用网格模型来表示
  arcMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  arc = new THREE.Mesh(arcGeometry, arcMaterial);
  return arc;
}
```

效果如下：![img](/assets/13.png)shape 类还有很多方法，可以创建各种形状，请参考其父类【[path 对象](http://threejs.outsidelook.cn/r89/source/docs/index.html?q=Shape#Reference/Extras.Core/Path)】

**`CircleGeometry`**

threejs 提供这个类用于创建 2 维的圆形或扇形。

```js
function createArc() {
  let geometry = new THREE.CircleGeometry(30, 10, 0, (45 / 180) * Math.PI);
  let material = new THREE.LineBasicMaterial({ color: 0xff0000 });
  let arc = new THREE.Line(geometry, material);
  return arc;
}
```

效果如下：

![img](/assets/01.png)

可以看到多了一条线，可以将 Geometry 的第一个点删掉即可：

```js
function createArc() {
  let geometry = new THREE.CircleGeometry(30, 80, 0, (360 / 180) * Math.PI);
  geometry.vertices.shift(); //添加这句
  let material = new THREE.LineBasicMaterial({ color: 0xff0000 });
  let arc = new THREE.Line(geometry, material);
  return arc;
}
```

**`PlaneGeometry`**

`PlaneGeometry`可以创建 2 维矩形：

```js
function createRect() {
  let geometry = new THREE.PlaneGeometry(10, 10);
  let material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  let rect = new THREE.Mesh(geometry, material);
  return rect;
}
```

效果如图：

![img](../assets/02.png)

总之，Geometry 是点集，各种 Geometry 只是为了更方便的创建各种形状的点集。

## 四.图像的表示初识

图像表示的部分如图:

![dianyutuxiang](/assets/dianyutuxiang.png)

我们下一章的目的就是初步了解每一部分的作用,原理以及技巧.

这个作者的解释比官方文档清晰,可供补充资料学习.

[dragon/threejs 教程](https://teakki.com/p/58a3ef1bf0d40775548c908f)

强烈建议先看完该教程的术语部分...
