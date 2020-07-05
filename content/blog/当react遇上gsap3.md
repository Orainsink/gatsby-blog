---
title: 当react遇上gsap3
copyright: true
permalink: 1
top: 0
date: 2019-12-06 15:03:30
tags: ["前端", "react"]
categories:
password:
---

# 译者前言

前些日子我翻译了一篇介绍如何[在 react hooks 中使用 gsap2.0](https://foolishrobot.xyz/2019/11/13/2/) 的文章,  今天我写的的这篇是翻译自 gsap 官网刊载的[在react中使用gsap2.0](https://greensock.com/react)的文章, **但是我会用react hooks和gsap3.0语法重新描述**. 供自己使用查阅.

gsap3.0相比gsap2.0简化了依赖包的结构，优化性能, 简化API, `tweenmax`,`timeline`等模块现在被整合到一个`gsap`, 大大减轻了学习的负担, 同时简化了plugin.

就我个人使用而言, 3.0的 `stagger`可以直接用在`to`和`fromTo`方法内非常的方便, `timeline`的`defaultValue`可以节省很多代码.  但如果需要用老版本plugin的话, 还是切换回2.0版本比较好,3.0不支持部分老版本plugin. 3.0获取实例的`target`属性也比2.0麻烦.

> 参考资料:   [Getting Started: React and GSAP Animations](https://greensock.com/react) 

# 起步: React 和 GSAP3.0 动画

## 前言

本指南默认你对 gsap 和 React 以及其全家桶已经有了基本的了解。

GSAP已逐渐成为在web上创建丰富动画和UI的事实上的标准。而React是当下最流行的前端UI框架，它允许开发人员以模块化、声明性和可重用的方式编写应用程序。开发者不可避免地要同时使用这两种技术，所以必须要学会如何将这两者正确地结合起来。

我们的重点是使用GSAP，因此不会深入研究React的结构。让我们将从简单开始，逐渐深入。

## GSAP的工作原理

GSAP 通过不间断地更新对象的属性来制作动画效果。例如以下的 DOM 元素，我们用GSAP更新它的内联样式属性：

```js
const myElement = document.getElementById("my-element");
gsap.to(myElement, {duration: 1, width: 100, backgroundColor: "red"});
```

你可以发现在使用`gsap.to`方法前我们必须获取到渲染在`document`的真实 DOM 节点。

## React的工作原理

解释React的工作原理很明显不是这篇文章的目的，但是我们可以关注一下React是如何从JSX中获取代码然后渲染成 DOM 的。

```jsx
<div className="my-class">
  Some content here
</div>
```

在使用React时， 我们通常不会给元素设置 `id` 属性，因为我们用声明式的方法获取到方法，实例，属性和状态。我们可以直接通过改变组件（或者全局）状态来改变DOM的表现，因此我们没必要操纵真实 DOM。

React团队为开发人员提供了访问DOM节点的方法， 并且随着React的成熟，API也会发生变化。此时（***译者翻译的时间**：2019年12月6日），最新版本React（16.8 above）支持用`useRef`钩子， 或者ref属性回调获取真实DOM。在本指南中， 我们将主要使用回调引用来创建对DOM节点的引用，然后使用GSAP的方法来操纵DOM元素，用GSAP来直接控制大量元素的属性， 比通过React state 来控制效率和性能高得多。

***译者注：**gsap的第一个参数`[target[s]]`，支持传入回调接受的ref，useRef的current，或者直接传入id和class，gsap会调用`document.getxxxxxxxxx`原生方法直接获取DOM元素。

## 制作我们的第一个动画

我们将使用`ref`来访问DOM节点，并且在`useEffect`副作用钩子内创建第一个动画。`useEffect`可以保证我们执行动画的时候节点已经被添加到了DOM树内，且我们已经获取到了`ref`。

```jsx
import { useRef, useEffect } from "react"

function Component() {
  // reference to the DOM node
  const myElement = useRef(null)
  // reference to the animation
  let myTween = null
  
	useEffect(()=>{
    // use the node ref to create the animation
    myTween = gsap.to(myElement.current, {duration: 1, x: 100, y: 100});
    ,[myTween])

  return <div ref={myElement} />;
}
```

不难吧？让我们回顾一下代码， 这样我们就可以了解到底发生了什么。

首先， 我们创建了一个React函数组件，声明`myElement`和`myTween`两个变量， 初始值都是null，在组件DOM挂载完毕后，通过`useRef`钩子将`myElement`指向ref对象。如果在目标节点添加进DOM树前就尝试将`myElement`传递给GSAP动画的话会报错， 因为这时候实际上并没有这个节点（***译者：**传入null的话会报错， 而如果传入的是class的名字，得到会的是一个warning）。

在`useEffect`钩子内的回调函数执行的时候， DOM节点已经添加到DOM树中，此时`myElement`d的值不再是`null`而是DOM节点的引用，我们终于可以在回调函数内使用了。

```jsx
	useEffect(()=>{
    // use the node ref to create the animation
    gsap.to(myElement.current, {duration: 1, x: 100, y: 100});
    ,[])
```

将`gsap tween`作为引用对象存储在组件中的好处是我们可以在组件的其他地方对引用对象执行`gsap`的一些其他方法来完全控制动画，比如`play()`,`pause()`,`reverse()`,`restart()`,`seek()`, 改变动画速度的方法（ `timeScale()`）等。同样， 这样做可以让我们在函数组件的其他地方通过`timeLine`创建更复杂的动画。

```jsx

const myElement = useRef(null);
let tl = gsap.timeLine({paused: true, defaults: {duration: 0.5}});

useEffect(()=>{
    tl
    .to(myElement.current, {x: 100})
    .to(myElement.current, {y: 100, rotation: 180})
    .play();
  return ()=>{
    tl.kill()
  }
},[tl])
```

如上，我们在函数组件中声明了一个初始状态为`pause`的`timeLine`时间轴，然后在副作用钩子内添加时间轴动画。时间轴动画的初始状态是暂停的，在我们添加完所有动画以后再让它执行，我们也可以让它一直保持暂停， 在需要的时候再在函数组件的其他地方控制它执行。下面是演示用例：

**简单的动画demo**

<iframe
     src="https://codesandbox.io/embed/greensock-set-up-6os9n?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="Greensock Set Up"
     allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
   ></iframe>

## 对一组元素设置动画

使用React的一个好处是允许我们用`Array.map()`方法添加一组元素，这减少了我们HTML的代码数量，同时也可以帮助我们为所有列表元素创建动画。

举个例子，你可以用交错显示的方式在屏幕上设置一组元素动画，如下：

```jsx
let tl = gsap.timeLine({paused: true, default: {duration: 0.5, stagger: 0.1}});
let myElements = [];

useEffect(()=>{
  tl.to(myElements, {y: 0, autoAlpha: 1});
},[tl])

return (
	<div>
    <ul>
      {elementsArray.map((element, index) => <li
        key={element.id}
        ref={li => myElements[index] = li}
      >
        {element.name}
      </li>)}
    </ul>
  </div>;
)
```

这看起来有点复杂，但是我们和之前获取DOM节点的方式一样，都是用的`ref`回调，唯一的区别是， 我们没有对每个元素使用单个引用，而是将每个元素添加到`myElements`数组中。

在`useEffect`钩子内，我们使用`to`方法，传入`stagger`参数，实现间隔交错的动画(`gsap`3.0相比2.0移除了`stagger`相关的方法，而将它变成了其他方法的可选参数)

**多元素demo**

<iframe
     src="https://codesandbox.io/embed/greensock-set-up-slcj1?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="gsap.timeLine&amp;react"
     allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
   ></iframe>

## 创建一个复杂动画序列

我们并不总是使用一个数组中的所有元素生成时间轴动画，有时我们需要使用不同的元素来创建复杂的动画。就如同一下示例一样，我们先在构造函数中为每个元素存为引用对象，再在`useEffect`中创建时间轴动画: 

**时间轴序列demo**

<iframe
     src="https://codesandbox.io/embed/gsaptimelinereact-slcj1?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="reacct_Timeline_Sequence_Demo"
     allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
   ></iframe>

以上示例中，我们将一系列方法组合使用。

我们将大部分将要用到的元素用声明的单个的变量引用。然后用`array.map()`从数组中添加一组元素，对于这个数组我们可以用数组的`map()`方法在回调里创建动画，但我们没必要这么做，gsap有个方便的`stagger`属性，动画方法的第一个参数如果是一个数组或者样式名称，可以在属性内使用`stagger: 0.1`这样就会生成一个交错执行的动画序列。

## 根据state控制过渡动画

我们可以根据组件的状态来控制动画执行的时间和方式。

使用`useEffect`钩子函数，在钩子函数的第二个参数传入依赖的状态，这样当依赖的状态发生改变的时候，就会执行该副作用钩子。根据状态控制动画并不难：

```jsx
const myTween = gsap.to(xxx,{xxx})

useEffect(()=>{
  myTween.play
},[play])
```

需要注意的是，在`useEffect`中用到的依赖最好是写进第二个参数内，因为钩子函数很难监听这些依赖的变化，有可能产生bug，但是我们的动画声明过后不会进行变动，所以不放进去也无所谓（eslint会报warning，觉得难看可以加进第二个参数），具体的解释，[详见React官方FAQ](https://zh-hans.reactjs.org/docs/hooks-faq.html#performance-optimizations)

**demo太简单我就省了**

## 使用React Transition Group控制过渡动画

## 根据路由执行动画

## FAQ

