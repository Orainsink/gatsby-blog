---
title: 结合React-Hooks和GreenSock制作动画
copyright: true
permalink: 2
top: 0
date: 2019-11-13 18:57:07
tags: [js, react]
categories: tech
password:
---

![animations-react-hooks-greensock.jpeg](https://github.com/Orainsink/images/blob/master/blog/animations-react-hooks-greensock.jpeg?raw=true)

> 翻译自 LogRocket- [Paul Ryan](https://blog.logrocket.com/author/paulryan/) 原文地址: https://blog.logrocket.com/animations-react-hooks-greensock/
>
> 供个人学习, 侵删
>
> 部分图片或者 codeSandbox 需要科学上网

<!--more-->

深入学习 web 动画的旅途, 可能是美妙的, 也可能是令人烦躁的. 本篇文章的目的就是让学习动画的过程变得美好, 同时用 React Hooks 来加强学习体验.

## 我需要提前知道的东西

这篇文章不是 Javascript 和 React 的入门教程, 我会解释每一个我们用到的概念, 但是你应该提前对这些概念有相应的认识. 你可以在这里学习 [React 的基础教程](https://reactjs.org/docs/getting-started.html)

## 我们想要做出的效果

我喜欢用示例来举一反三, 向你灌输大量的概念和文档对你的学习完全没有帮助, 而且老实说, 这种学习的过程, 对你我都很枯燥. 因此, 我们将要通过制作两个难度循序渐进的动画来达到学习目的.

第一个动画是一个简单的 loader , 和 google 的一样.

![Finished Animated Loader](https://github.com/Orainsink/images/blob/master/blog/finished-animated-loader.gif?raw=true)

第二个动画,我们要把 LogRocket 的图标变得更炫酷

![LogRocket Logo](https://github.com/Orainsink/images/blob/master/blog/logrocket-logo.png?raw=true)

## 起步

起步很简单: 我已经构建了一个包含 GreenSock 和 React 模块的起步框架, 在这里 [CodeSandbox](https://codesandbox.io/s/greensock-set-up-6pn1m) , 你只需要 fork 该项目,然后编辑即可.

## Google-style loader

现在我们可以着手打造我们的 `Loader` 组件. 如果你能跟着教程一步一步完成,这当然很不错, 不过我也会在最后放上完整项目的 CodeSandbox 链接.

首先我们需要的是图像. 下面是我写好的 svg 图像, 只用了基本的 svg 图形, 带了少量的属性.

```jsx
<svg viewBox="0 0 150 33.2" width="180" height="150">
  <circle ref={circle} cx="16.1" cy="16.6" r="16.1" fill="#527abd" />
  <circle ref={circle} cx="55.2" cy="16.6" r="16.1" fill="#de4431" />
  <circle ref={circle} cx="94.3" cy="16.6" r="16.1" fill="#f4b61a" />
  <circle ref={circle} cx="133.4" cy="16.6" r="16.1" fill="#009e52" />
</svg>
```

接着, 在我的起步源码中, 构建一个 `Loader`组件, 这是奇迹将要发生的地方.

在这个`Loader` 组件中, 渲染写好的图形

```jsx
// src/loader.jsx
import React from 'react';
const Loader = () => {
  return (
    <svg viewBox="0 0 150 33.2" width="180" height="150">
      <circle cx="16.1" cy="16.6" r="16.1" fill="#527abd" />
      <circle cx="55.2" cy="16.6" r="16.1" fill="#de4431" />
      <circle cx="94.3" cy="16.6" r="16.1" fill="#f4b61a" />
      <circle cx="133.4" cy="16.6" r="16.1" fill="#009e52" />
    </svg>
  );
};
export default Loader;
```

你可以看到效果:

![Static Loader SVG](https://github.com/Orainsink/images/blob/master/blog/static-loader.png?raw=true)

Fantastic! 我们已经有了需要的图形, 现在我们要让它动起来.

设置动画时, 首先我们要获得目标元素的 dom 实例. 我们可以用 React Hooks 的 `useRef` 钩子来达到目的. `useRef` 返回一个带有`current`属性的引用类型对象, 它就是我们写动画所要修改的目标.

在我们的组件中, 我们需要操作 4 个元素, 所以我们需要创建 4 个这样的 ref :

```js
const blue = useRef(null);
const red = useRef(null);
const yellow = useRef(null);
const green = useRef(null);
```

接下来我们吧这些 refs 添加到写好的 SVG:

```jsx
<svg viewBox="0 0 150 33.2" width="180" height="150">
  <circle ref={blue} cx="16.1" cy="16.6" r="16.1" fill="#527abd" />
  <circle ref={red} cx="55.2" cy="16.6" r="16.1" fill="#de4431" />
  <circle ref={yellow} cx="94.3" cy="16.6" r="16.1" fill="#f4b61a" />
  <circle ref={green} cx="133.4" cy="16.6" r="16.1" fill="#009e52" />
</svg>
```

我们的组件现在变成下面这个样子:

```jsx
// src/loader.jsx
import React, { useRef } from 'react';

const Loader = () => {
  const blue = useRef(null);
  const red = useRef(null);
  const yellow = useRef(null);
  const green = useRef(null);

  return (
    <svg viewBox="0 0 150 33.2" width="180" height="150">
      <circle ref={blue} cx="16.1" cy="16.6" r="16.1" fill="#527abd" />
      <circle ref={red} cx="55.2" cy="16.6" r="16.1" fill="#de4431" />
      <circle ref={yellow} cx="94.3" cy="16.6" r="16.1" fill="#f4b61a" />
      <circle ref={green} cx="133.4" cy="16.6" r="16.1" fill="#009e52" />
    </svg>
  );
};

export default Loader;
```

一切就绪以后, 我们可以开始使用 GreenSock 了.

首先我们 import `TweenMax`

```js
import { TweenMax } from 'gsap';
```

TweenMax 是一个能帮组我们完成动画的强大而全面的 GreenSock 模块. 他封装了很多实用的动画方法, 接下来我们要学着使用其中的一部分.

_GreenSock 也提供了 TweenLite 模块, 它功能较少, 但是体积更小_

我们想让动画在组件挂载的时候执行. 在传统的类组件中, 我们会使用`componentDidMount`生命周期函数, 但是对 Hooks 来说我们使用`useEffect`钩子就行了, 它可以达到和生命周期函数一样的效果. 如果你想深入学习 React Hooks ,你应该去看 Dan Abramov 的这篇[文章](https://overreacted.io/a-complete-guide-to-useeffect/)

当我们的组件挂载完成后, 我们将使用 TweenMax 的`fromTo`方法, 来让这些球动起来. `fromTo`方法接受 4 个参数, 如下:

```js
fromTo(element(s), duration, start, end);
```

接下来我们专心让 `blue` 球上下移动. 为了达到这个效果, 我们要在动画中控制 `y` 属性.

代码如下:

```js
TweenMax.fromTo(blue.current, 5, { y: 18 }, { y: -18 });
```

动画的目标是 `blue.current` , 持续时间 `5s`, 初始状态 `y`位置为`18`, 结束时 `y`位置是`-18`, 效果如下:

![Blue Circle Animation](https://github.com/Orainsink/images/blob/master/blog/blue-circle-animation.gif?raw=true)

好的, 我们已经前进了一小步, 但是它依然存在一些问题--它实在是太慢了, 我们还需要让动画无限循环. 我们将 `yoyo` 和 `repeat`这两个属性添加到 `to`对象:

```js
TweenMax.fromTo(
  blue.current,
  0.5,
  { y: 18 },
  { y: -18, yoyo: true, repeat: -1 }
);
```

`yoyo` 的意思是我们的动画将在开始和结束位置之间`yoyo` (想象一下悠悠球). 将`repeat`设置成`-1`将会使动画无限循环. 再把动画持续时间设为半秒, 这样会更快.

现在你看到的效果如下:

![Blue Circle Animation](https://github.com/Orainsink/images/blob/master/blog/blue-circle-bouncing.gif?raw=true)

如图, 接下来我们需要让黄色的球和蓝色的球有一样的效果. 我们将一组元素(`blue`和`yellow`)传递给`formTo`方法.

```js
TweenMax.fromTo(
  [blue.current, yellow.current],
  0.5,
  { y: 18 },
  { y: -18, yoyo: true, repeat: -1 }
);
```

现在动画是这样的:

![Blue And Yellow Circles Bouncing](https://github.com/Orainsink/images/blob/master/blog/blue-yellow-circles-bouncing.gif?raw=true)

大功告成! 我想你现在可以看到 GreenSock 有多牛逼了. 为了完成我们的动画, 我们只需要给红色和绿色的添加相反的动画就行了, 就像下面:

```js
TweenMax.fromTo(
  [red.current, green.current],
  0.5,
  { y: -18 },
  { y: 18, repeat: -1, yoyo: true }
);
```

这段代码和我们之前的代码几乎一模一样, 除了我们将`y:-18`和 `y:18`换了位置.

我们最终的动画已经完成, 如下:

![Finished Animated Loader](https://github.com/Orainsink/images/blob/master/blog/finished-animated-loader-1573632851589.gif?raw=true)

完整代码如下:

<iframe
     src="https://codesandbox.io/embed/google-style-loader-f9uqk?fontsize=14"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="Google Style  Loader"
     allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
   ></iframe>

## LogRocket 网站的图标动画

搞定了上一个, 让我们开始下一个!

我已经写好了一个 LogRocket icon 的`svg` 图标, 但是它很大, 所以我把它放到了 CodeSandbox 的起步框架里, 你可以 [点击这里](https://codesandbox.io/s/starter-logrocket-animation-8z29j) 查看.

最后的效果如下:

![LogRocket Logo Animation Complete](https://github.com/Orainsink/images/blob/master/blog/logrocket-animation-complete.gif?raw=true)

如上图所示, 这比我们的第一个动画多了一些效果, 让我们开始吧!

第一步, 我们先实现从底部移动到顶部的火箭. 我们有一个`id`为`rocket`的`g`元素. 这是我们动画的目标元素. 在前面, 我们使用 TweenMax 来完成这项工作, 但是现在我们要使用`TimelineMax`, 因为我们希望每个元素按照时间轴依次执行动画, 而不是一次执行全部动画.

我们像这样引入`TimelineMax`:

```js
import { TimelineMax } from 'gsap';
```

我们首先需要实例化一个`TimelineMax`类来创建一个`Timeline`,:

```js
const tl = new TimelineMax();
```

和`TweenMax`一样, 我们的实例(`tl`)也有一个`fromTo`方法, 我们这样使用它:

```js
tl.fromTo('#rocket', 2, { y: 50 }, { y: 0 });
```

这与我们第一个动画非常相似, 除了在这里我们不实用`ref`, 只是传递`id`, 两种方式都可以(译者: 个人觉得还是用 ref 好一点, 直接用 id 相当于绕过了 react, 不知道会不会有问题).

现在我们的火箭有了从底部升上来的动画效果, 就像这样:

![Rocket Animation](https://github.com/Orainsink/images/blob/master/blog/rocket-animation.gif?raw=true)

下一步是画我们的字母. 我们所有的字母 `path`路径 都被一个带有`id="letters"`的 `g`标签包裹. 要达到画出字母的这种动画效果, 我们需要使用两个属性, 即 `stroke-dasharray`和`stroke-dashoffset`.这个 svg 效果的实现相当复杂, 如果你想详细了解, 我建议看[这里](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dashoffset).(svg 入门我推荐看大漠先生的[这篇文章](https://www.w3cplus.com/svg/svg-animation-guide.html))

对于我们想要的效果, 宽度为 100 的 svg , 我们将 dash 的宽度(`stroke-dasharray`)设为 100, dash 偏移(`stroke-dashoffset`)设为 100, letters 就刚好消失不见.(实现原理可以参考上面的两篇文章)

在我们的`styles.css`文件中, 在`path`上设置这两个属性, 如下所示:

```css
svg #letters path {
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
}
```

另外, 要让该操作生效, `path`(包括从继承了父级路径 `stroke`的`path`)必须设置`stroke`.

现在你可以看到如下效果:

![LogRocket Wordmark With Stroke Removed](https://github.com/Orainsink/images/blob/master/blog/logrocket-wordmark-stroke-removed.png?raw=true)

这看起来我们原来的图像一样, 但是字母没那么厚--这是因为我们去掉了 `stroke`, 但是它仍然有 `fill`(填充). 下一步是将 `fill-opacity`设为 `0`.

```css
svg #letters path {
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
  fill-opacity: 0;
}
```

修改过后, 我们的字母就看不见了.

为了把它们显示出来, 我们只需要通过补帧动画将`srtokeDashoffset`慢慢变成`0`.用 `tl`实例, 还有`to`方法实现如下:

```js
tl.to('#letters path', 3, {
  strokeDashoffset: 0,
});
```

现在你可以看到, 我们使用`#letters`选择器然后把该组的每个`path`设为了动画的目标元素. 然后, 我们的字母现在应该像这样地画了出来:

![Animated LogRocket Logo With Letter Paths Drawn](https://github.com/Orainsink/images/blob/master/blog/logrocket-logo-path-draw.gif?raw=true)

最后一步是让填充的透明度`fill-opacity`通过帧动画慢慢变成`1`.

我们再次用`tl`实例和`to`方法.

```js
tl.to('#letters path', 3, { 'fill-opacity': 1 });
```

就这样, 我们的火箭动画完成了. 还不错, eh?

![LogRocket Logo Animation Complete](https://github.com/Orainsink/images/blob/master/blog/logrocket-animation-complete-1573636875902.gif?raw=true)

你可以通过这个例子看到`TimelineMax`的力量. 通常, 如果要按顺序运行动画, 你必须设置 delays, 但是 `TimelineMax` 会帮我们处理掉这个问题.

完整的 CodeSandbox 项目如下:

<iframe
     src="https://codesandbox.io/embed/complete-logrocket-animation-92e71?fontsize=14"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="complete logrocket animation"
     allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
   ></iframe>

## 总结

结束了, 伙计们. 这是一篇主要介绍 GreenSock 而不是 React Hooks 的文章, 但是我希望你能够学到两者的使用方式. GreenSock 的员工们在他们的库里做了大量的努力, 所以我们用他们的工具时, 也要努力做出更好的动画.
