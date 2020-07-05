---
title: Three.js入门3-插件stats和dat.GUI
copyright: true
permalink: 8
top: 0
date: 2019-01-27 02:42:55
tags: ["前端", "three"]
categories: webGL
password:
---

> 翻译自官方文档

### 一.JavaScript 性能监测器 [stats.js](https://github.com/mrdoob/stats.js/) 

这个插件提供了一个简单的信息窗口,来帮助你监测代码的性能

- **FPS** 上一秒渲染的帧数.数值越大越好.
- **MS** 渲染每帧画面所需要的毫秒(ms)数. 数值越小越好.
- **MB** 占用内存数(MB). (Chrome运行时需开启精确内存信息获取,通过【运行】窗口打开 `chrome --enable-precise-memory-info`)
- **CUSTOM** 用户自定义面板.

<!--more-->

#### 截图

![fps.png](https://raw.githubusercontent.com/mrdoob/stats.js/master/files/fps.png) ![ms.png](https://raw.githubusercontent.com/mrdoob/stats.js/master/files/ms.png) ![mb.png](https://raw.githubusercontent.com/mrdoob/stats.js/master/files/mb.png) ![custom.png](https://raw.githubusercontent.com/mrdoob/stats.js/master/files/custom.png)

#### 使用

```js
var stats = new Stats();
stats.showPanel(1); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);

function animate() {
	stats.begin();
    //...
	//监测数据的代码
    //...
	stats.end();
	requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
```

#### 书签小工具

你可以把以下书签代码放在页面的任何地方使用(嵌入页面代码,放到书签栏,或者直接在控制台里面输入都 可以使用)

```js
javascript:(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='//mrdoob.github.io/stats.js/build/stats.min.js';document.head.appendChild(script);})()
```

### 二.可视化调参插件 [dat.GUI](https://workshop.chromeexperiments.com/examples/gui/)

> 演示在官网,文章无截图,仅作翻译

##### 1.基本用法

通过少量代码,你就可以使用dat.GUI来进行可视化调参

```js
<script type="text/javascript" src="dat.gui.js"></script>
<script type="text/javascript">
    
var FizzyText = function() {
  this.message = 'dat.gui';//显示的文字
  this.speed = 0.8;//速度
  this.displayOutline = false;//文字描边
  this.explode = function() { ... };//动作
  // 其他 ...
};

window.onload = function() {
  var text = new FizzyText();
    //创建GUI并传递属性
  var gui = new dat.GUI();
  gui.add(text, 'message');
  gui.add(text, 'speed', -5, 5);
  gui.add(text, 'displayOutline');
  gui.add(text, 'explode');
};
    
</script>
```

- GUI的属性是公用的,即是通过`this.prop =value `生成的
- data.GUI根据属性的初始值确定控制器的类型(根据传入的属性确定是控制速度还是描边等)
- 按H键显示/隐藏所有GUI控制面板

##### 2.限制输入界面效果

你可以限制输入的数字范围.如果设置的是一个闭区间的数字范围,控制面板就会生成可拖动的滑块,方便使用

```js
gui.add(text, 'noiseStrength').step(5); // 步长
gui.add(text, 'growthSpeed', -5, 5); // 最大值和最小值,可单独限制
gui.add(text, 'maxSize').min(0).step(0.25); // 同时设置最小值和步长
```

你也可以设置下拉框,来选择数字和字符串

```js
// 从字符串里选择message的值
gui.add(text, 'message', [ 'pizza', 'chrome', 'hooray' ] );

// 从值为数字的属性里面选择speed的值
gui.add(text, 'speed', { Stopped: 0, Slow: 0.1, Fast: 5 } );
```

##### 3.收纳界面效果

你可以设置控制面板为收纳文件夹样式,来对属性进行分类.

```js
var gui = new dat.GUI();

var f1 = gui.addFolder('Flow Field');
f1.add(text, 'speed');
f1.add(text, 'noiseStrength');

var f2 = gui.addFolder('Letters');
f2.add(text, 'growthSpeed');
f2.add(text, 'maxSize');
f2.add(text, 'message');

f2.open();
```

##### 4.颜色控制器

dat.GUI支持多种颜色模式.以下代码展示四种颜色模式的使用方法.

```js
var FizzyText = function() {
  this.color0 = "#ffae23"; // HEX颜色模式(16进制颜色码)
  this.color1 = [ 0, 128, 255 ]; // RGB颜色模式
  this.color2 = [ 0, 128, 255, 0.3 ]; // 带透明度的RGB
  this.color3 = { h: 350, s: 0.9, v: 0.3 }; // HSV颜色模式
  // 定义渲染逻辑...
};

window.onload = function() {
  var text = new FizzyText();
  var gui = new dat.GUI();

  gui.addColor(text, 'color0');
  gui.addColor(text, 'color1');
  gui.addColor(text, 'color2');
  gui.addColor(text, 'color3');
};
```

dat.GUI将以其初始值定义的格式修改颜色。

##### 5.保存菜单(使用localStorage)

通过对添加进GUI的对象调用`gui.remember()`方法,在控制器界面生成保存菜单

```js
var fizzyText = new FizzyText();
var gui = new dat.GUI();

gui.remember(fizzyText);

// 添加控制器 ...
```

点击"Save"按钮将你设置的属性值保存在本地localStorage内,或者通过以下设置,将属性值通过JSON格式传到代码的其他地方

```js
var fizzyText = new FizzyText();
var gui = new dat.GUI({ load: JSON });

gui.remember(fizzyText);

// 添加控制器 ...
```

##### 6.预设

保存菜单还允许你将所有设置保存为预设.

单击"Save"按钮来修改当前预设,

单击"New"新建预设,

单击"Revert"将轻触当前预设中所有未保存的更改.

使用保存菜单的下拉列表在预设之间切换,

你可以按如下方式指定默认的预设:

```js
var gui = new dat.GUI({
  load: JSON,
    //设置预设
  preset: 'Flow'
});
```

关于localStorage的提醒：建议将预设保存在代码里。因为localStorage会在清除浏览数据的时候被清除。

##### 7.事件

你可以绑定事件监听,监听每个控制器上的事件.

```js
var controller = gui.add(fizzyText, 'maxSize', 0, 10);

controller.onChange(function(value) {
  // 绑定change事件(拖动,按键等触发)
});

controller.onFinishChange(function(value) {
  // 绑定finishChange事件(控制区失去焦点时触发)
  alert("The new value is " + value);
});
```

##### 8.自定义控制器摆放

默认情况下,dat.GUI控制面板会创建在固定的位置,并且自动append到dat.GUI创建的DOM元素内.

你可以通过将autoPlace参数设置为false来更改次行为.

```js
var gui = new dat.GUI({ autoPlace: false });

var customContainer = document.getElementById('my-gui-container');
customContainer.appendChild(gui.domElement);
```

##### 9.控制面板自动更新属性数据

如果您希望控制器对GUI外部所做的更改做出反应，请使用listen方法。

```js
var fizzyText = new FizzyText();
var gui = new dat.GUI();

gui.add(fizzyText, 'noiseStrength', 0, 100).listen();

var update = function() {
  requestAnimationFrame(update);
  fizzyText.noiseStrength = Math.random();
};

update();
```

在控制器上调用`listen()`方法会监听每一帧的变化,如果数据量很大的话,监听会导致代码效率变慢,谨慎使用.

##### 10.控制面板手动更新属性数据

如果你想在自定义的循环中更新控制器,请使用`updataDisplay()`方法

```js
var fizzyText = new FizzyText();
var gui = new dat.GUI();

gui.add(fizzyText, 'noiseStrength', 0, 100);

var update = function() {

  requestAnimationFrame(update);
  fizzyText.noiseStrength = Math.cos(Date.getTime());

  // 更新控制器数据
  for (var i in gui.__controllers) {
    gui.__controllers[i].updateDisplay();
  }

};

update();
```

##### 11.其他参考博客

[Three.js - dat.GUI库的使用详解](http://www.hangge.com/blog/cache/detail_1785.html)

