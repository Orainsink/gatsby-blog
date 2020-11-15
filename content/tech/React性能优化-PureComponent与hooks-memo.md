---
title: React性能优化-PureComponent与hooks_memo
copyright: true
permalink: 1
top: 0
date: 2019-09-29 17:10:09
tags: ['react']
categories: tech
password:
---

# React 性能优化-PureComponent 与 React.useMemo,Reacat.useCallback

## PureComponent

PureComponent 即纯组件, 用法类似 Component , 作用是减少不必要的 render 以达到优化性能的目的.

其原理是当组件更新时，如果组件的 props 和 state 都没发生改变，render 方法就不会触发，省去 Virtual DOM 的生成和比对过程。具体就是 React 自动帮我们做了一层浅比较：

<!--more-->

```js
if (this._compositeType === CompositeTypes.PureClass) {
  shouldUpdate =
    !shallowEqual(prevProps, nextProps) || !shallowEqual(inst.state, nextState);
}
```

`shallowEqual` 会比较 `Object.keys(state | props)` 的长度是否一致，每一个 key 是否两者都有，并且是否是一个引用，也就是只比较了第一层的值，深层的嵌套数据是对比不出来的，使用过程中需要避免在嵌套数据中放入会改变的状态数据。

详细使用教程， 参考文档 [React 官方文档](https://zh-hans.reactjs.org/docs/react-api.html#reactpurecomponent)

```js
class Greeting extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

我们在实际工作中，对于简单组件，能使用 PureComponent 的时候就尽量使用 PureComponent, 但因为可能引发深层数据更新但不触发 Render 的情况, 所以使用的时候需要注意.

## React.useMemo

`React.memo` 为高阶组件, 她和 PureComponent 非常相似，但它只适用于函数组件。

```js
const MyComponent = React.memo(function MyComponent(props) {
  /* 使用 props 渲染 */
});
```

如果你的函数组件在给定相同 props 的情况下渲染相同的结果，那么你可以通过将其包装在 `React.memo` 中调用，以此通过记忆组件渲染结果的方式来提高组件的性能表现。这意味着在这种情况下，React 将跳过渲染组件的操作并直接复用最近一次渲染的结果。

`React.memo` 仅检查 props 变更。如果函数组件被 `React.memo` 包裹，且其实现中拥有`useState`或 `useContext` 的 Hook，当 context 发生变化时，它仍会重新渲染。

默认情况下其只会对复杂对象做浅层对比，如果你想要控制对比过程，那么请将自定义的比较函数通过第二个参数传入来实现

## React.useCallback

```js
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

返回一个 [memoized](https://en.wikipedia.org/wiki/Memoization) 回调函数。

把内联回调函数及依赖项数组作为参数传入 `useCallback`，它将返回该回调函数的 memoized 版本，该回调函数仅在某个依赖项改变时才会更新。当你把回调函数传递给经过优化的并使用引用相等性去避免非必要渲染（例如 `shouldComponentUpdate`）的子组件时，它将非常有用。

`useCallback(fn, deps)` 相当于 `useMemo(() => fn, deps)`

注意, 依赖项数组不会作为参数传给回调函数, 且如果回调函数引用到会变化的 state, 那最好是配合 reducer 使用, 不然不能达到性能优化的目的.
