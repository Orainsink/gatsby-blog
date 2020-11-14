---
title: 使用react-three-fiber的性能注意要点
date: 2020-10-10 12:10:57
description: 你需要时刻记得three-fiber只是一个封装threejs的语法糖库,他并没有改变threejs的本质,threejs对象不是DOM,react的虚拟DOM对threejs来说没有用,错误的更新和生成threejs对象可能会造成严重的性能问题
tags: [react, 前端, three]
categories: tech
---

> 本文是[官方文档](https://github.com/pmndrs/react-three-fiber/blob/master/pitfalls.md)的翻译, 该文档总结了部分 three-fiber 使用过程中的注意要点, 旨在帮助使用者避免因为错误的写法而造成的性能问题。
>
> three-fiber 只是一个封装 threejs 的语法糖库，他并没有改变 threejs 的本质，threejs 对象不是 DOM 对象，react 的虚拟 DOM 对 threejs 来说没有用，错误的更新和生成 threejs 对象可能会造成严重的性能问题
>
> 因为网上关于 three-fiber 的文章数量实在有限，我本人在查一些外网资料的时候也会发现有一些教程的写法都存在着理解错误，有性能问题，所以翻译一下官方的总结，加深自己的理解。

# WebGL 性能缺陷 ☠️

## 建议和技巧

这是我能找到的最好的总结: https://discoverthreejs.com/tips-and-tricks

在 Threejs 中最重要的一点是：**创建对象的性能代价可能极其昂贵**，所以在你`mount/unmount`组件之前请三思！

加入到场景中的每个材质都必须编译，创建的每个几何体都将被处理。如果可以的话，你最好在全局或者本地范围内共享或者缓存材质和几何图形

```jsx
const geom = useMemo(() => new BoxBufferGeometry(), [])
const mat = useMemo(() => new MeshBasicMaterial(), [])
return items.map(i => <mesh geometry={geom} material={mat} ...
```

Try to use [instancing](https://codesandbox.io/s/r3f-instanced-colors-8fo01) as much as you can when you need to display many objects of a similar type!

当你需要显示许多相似类型的 Threes 对象时，尽量使用[实例](https://codesandbox.io/s/r3f-instanced-colors-8fo01)！

# React 性能缺陷 ☠️

## ❌ 永远，永远，不要，setState 动画！

```jsx
const [x, setX] = useState(0);
useFrame(() => setX((x) => x + 0.01));
// 或者，同样糟糕地 ...
// useEffect(() => void setInterval(() => setX(x => x + 0.01), 30), [])
return <mesh position-x={x} />;
```

根据 React 的 diffing 机制，这段代码会强制整个组件（包括他的子组件）每秒重新构建 60 次。

### ✅ 相反，使用 `ref` 和 `mutate`（直接改变对象）！这不会造成问题，并且这才是你真正该选择的方式

```jsx
const ref = useRef();
useFrame(() => (ref.current.position.x += 0.01));
return <mesh ref={ref} />;
```

## ❌ 永远不要在导致组件重复渲染的动画库里使用 three-fiber

> Never let React anywhere near animated updates! 这句话不知道怎么翻译，不过大概意思是上面那句话。
>
> 一些声明式的动画库，会导致组件重渲染多次，这对虚拟 DOM 来说没问题，但是对 Threejs 来说是灾难。

相反，使用不依赖于 React 的动画库（GSAP，react-spring，lerg 或者 animejs）！避免像 react-motion 那样以 60fps 的速度重新渲染组件！

### ✅ 使用 [lerp](https://github.com/mattdesl/lerp) + useFrame:

```jsx
import lerp from 'lerp'

function Signal({ active }) {
  const ref = useRef()
  useFrame(() => ref.current.position.x = lerp(ref.current.position.x, active ? 100 : 0, 0.1))
  return <mesh ref={ref} />
```

### ✅ 使用 [react-spring](https://github.com/react-spring/react-spring), 在 react 之外设置动画:

```jsx
import { a, useSpring } from 'react-spring/three'

function Signal({ active }) {
  const { x } = useSpring({ x: active ? 100 : 0 })
  return <a.mesh position-x={x} />
```

### ✅ 使用 [GSAP](https://greensock.com/gsap/) :

```jsx
// TODO
```

## ❌ 永远不要把频繁变化的响应式数据绑定到 Three 组件上！

用状态管理器和`selector`来管理状态是没什么问题的，但是注意不要引发组件频繁更新。

以下是错误案例：

```jsx
import { useSelector } from 'react-redux';

// 假设 store 中的 x 以60fps的速度更新
const x = useSelector((state) => state.x);
return <mesh position-x={x} />;
```

### ✅ 直接修改对象的属性，或者使用 [zustand](https://github.com/react-spring/zustand):

```jsx
useFrame(() => (ref.current.position.x = api.getState().x));
return <mesh ref={ref} />;
```

### ✅ 或者，以[不触发`re-render`的方式](https://github.com/react-spring/zustand#transient-updates-for-often-occuring-state-changes)订阅状态：

```jsx
const ref = useRef();
useEffect(
  () =>
    api.subscribe(
      (x) => (ref.current.position.x = x),
      (state) => state.x
    ),
  []
);
return <mesh ref={ref} />;
```

## ❌ 不要随意地`mount`/`unmount`！

在 Threejs 中，大多数情况下我们不需要卸载或者重新绑定，请参阅 discover three 中的[“disposing of things”](https://discoverthreejs.com/tips-and-tricks/)部分。这么做的原因是每次重新绑定，3D 对象和物体材料等需要重新编译，对性能影响很大。

### ✅ 使用并发模式:

切换 React 到[`@experimental`模式](https://zh-hans.reactjs.org/docs/concurrent-mode-adoption.html)，并且给`Canvas`标签添加`concurrent`属性。然后 React 将推迟消耗较大的操作。您不需要做其他任何事情，但是如果你想看看效果，你可以通过使用[实验性的调度程序](https://github.com/drcmda/scheduler-test)，看看将一些操作的优先级降低是否会对前端效果产生影响

```jsx
<Canvas concurrent />
```
