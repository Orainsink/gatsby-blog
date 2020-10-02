---
title: 自用react状态管理方案总结
date: 2020-9-12 1:48:56
description: react 有着庞大的生态圈, 有着包括 redux 和 mobx 在内的多种数据管理方案, 在不同体量的项目中选择合适的状态管理方案可以平衡开发效率和项目维护难度之间的矛盾.
tags: [react, 前端]
---

# 自用 react 状态管理方案总结

## [props && callback](https://zh-hans.reactjs.org/docs/components-and-props.html)

react 基本的父子通讯方式.

父组件通过 props 向子组件传递状态及回调函数, 子组件调用回调函数修改父组件中的状态.

单向数据流与单一数据源导致如果想跨组件通信, 必须通过 props 的回调函数一层一层来回传状态, 但在搭建一些全局组件的时候, 用单向数据流是一种折磨.

```jsx
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Parent = () => {
  const [value, setValue] = useState(0);

  return (
    <div>
      <Child
        val={value}
        onChange={() => {
          setValue(value + 1);
        }}
      />
    </div>
  );
};

const Child = (props) => {
  const { value, onChange } = props;

  return <div onClick={onchange}>{value}</div>;
};
```

## [react context](https://zh-hans.reactjs.org/docs/context.html#gatsby-focus-wrapper)

react 自带的上下文, 其设计目的是为了共享那些对于一个组件树而言是“全局”的数据,

使用 context, 我们可以避免通过中间元素传递 props, 而直接在整个组件树共享状态.

16.8 版本以后有 `useContext` 钩子可以使用

```jsx
import React, { useContext } from 'react';

const VisibleContext = React.createContext(null);

const App = () => {
  const [visible, setVisible] = useState(false);

  return (
    <VisibleContext.Provider value={{ visible, setVisible }}>
      <Child />
    </VisibleContext.Provider>
  );
};

const Child = () => {
  const { visible, setVisible } = useContext(VisibleContext);

  return (
    <div onClick={() => setVisible(!visible)}>
      {visible ? 'visible' : 'inVisible'}
    </div>
  );
};
```

**注意: **当组件上层最近的 `<VisibleContext.Provider>` 更新时，该 Hook 会触发重渲染，并使用最新传递给 `VisibleContext` provider 的 context `value` 值。即使祖先使用 [`React.memo`](https://zh-hans.reactjs.org/docs/react-api.html#reactmemo) 或 [`shouldComponentUpdate`](https://zh-hans.reactjs.org/docs/react-component.html#shouldcomponentupdate)，也会在组件本身使用 `useContext` 时重新渲染。

如果组件内部有很复杂的计算的话, 需要注意用 `useCallback`或者`useMemo`优化节点. 官方给出的推荐解决办法是将用到`useContext`的代码分离成一个独立的组件, 像这样:

```jsx
const Button = () => {
  let theme = useContext(ThemeContext);
  // The rest of your rendering logic
  return <ExpensiveTree className={theme} />;
};
```

其他解决办法: https://github.com/facebook/react/issues/15156

## [redux](https://react-redux.js.org/api/connect) / [mobx](https://cn.mobx.js.org/)

react context 是吸收了 redux 精华而新增的特性, 所以 redux 的使用方式除了部分代码写法不一样, 其基本思想和 context 一致.

在 react 16.8 版本之前, 写 redux 代码还是挺痛苦的, 需要写很多模板代码, 但是在 react-redux 正式发布 hooks api 过后, 通过`useDispatch`和`useSelector`写出来的代码非常的简便, 不输其他任何方案.

本人对 mobx 并不是十分了解, 只在一个较小的 demo 项目里使用过 mobx, 往后除非必要, 也不会去深究 mobx, 这里贴一篇对比 redux 和 mobx 的文章: https://juejin.im/post/6844903910537166862

## [unstated-next](https://github.com/jamiebuilds/unstated-next/blob/master/README-zh-cn.md)

unstated-next 是 react 的一个轻量状态管理库, 它仅使用了 React 的内置 API ,直接实现状态管理的功能.

unstated-next 的 api 更少, 体积更小, 且更容易和其他插件集成, 这也是我为什么不再需要去深究 mobx 和 redux 的原因, 因为没必要去看他们了.

container 文件

```jsx
import { createContainer } from 'unstated-next';

function useCustomHook() {
  let [value, setInput] = useState();
  let onChange = (e) => setValue(e.currentTarget.value);
  return { value, onChange };
}

let Container = createContainer(useCustomHook);
// Container === { Provider, useContainer }
```

在祖辈组件提供状态

```jsx
const App = () => {
  return (
    <Container.Provider>
      <ChildComponent />
    </Container.Provider>
  );
};
```

在子辈组件获取状态

```jsx
import { useContainer } from 'unstated-next';
//从Contain.js文件导入Container
import Container from './Container';

const Child = () => {
  const { value, onChange } = useContainer(Container);
  return <input value={value} onChange={onChange} />;
};
```

## [dva](https://dvajs.com/guide/getting-started.html) / [Rematch](https://rematch.gitbook.io/handbook/)

以上几种方案没有涉及到副作用的处理.

如果是在 redux 的项目里处理副作用, 我们通常会引入 redux-thunk 或者 redux-saga.

这两个中间件的作用是集中处理 redux 副作用问题.

dva 最牛逼的地方在于, 他通过 model 的概念把一个模块的模型管理起来, 每一个 model 文件管理一个模块的 state, reducer 和副作用 effects, 将 redux 和 redux-saga 结合起来了, 同时可以将体积庞大的状态, 根据功能或者 UI 级别划分分成不同的 model 文件, 这对于大型项目来说比分开管理 redux 和 redux-saga 好维护得多.

rematch 则是在 dva 的基础上更进一步添加了部分语法糖, 将 generate function 改为了 async 和 await, 其他方面在使用过程中都差不多

## 我应该选择什么方案?

以下带有个人的观点, 可能不成熟, 但是在多个大小型实践过程中比较顺手.

### 小型项目

一般的小程序, 或者页面较少的单页应用.

**需要单一数据来源方便管理以及保持代码简洁: redux**

虽然 redux 饱受诟病, 但是我觉得其实还行, 有 hooks api 过后, 如果只用 selector 和 dispatch, redux 的代码其实可以比直接用 context 更简洁. 我的博客就直接用的 redux 而没有选择 unstated-next, 至于 mobx, 我感觉 mobx 的用法很奇怪, 所以感官上就不太喜欢 mobx.

**追求性能, 小体积, 以及方便集成: unstated-next 或者直接用 react 自带的 context**

因为 unstated-next 完全是使用 react context 开发的, 所以包的大小非常小, 而直接使用 context 其实也没什么问题.

**管理异步请求: [SWR](https://swr.vercel.app/)**

swr 让你可以用比较简洁的代码发送请求, 而不需要对 request 做各种二次封装.

通过 swr, 你也可以更 方便的管理请求过程中各种状态所对应的 UI

e.g.

```jsx
import useSWR from 'swr';
function Profile() {
  const { data, error } = useSWR('/api/user', fetcher);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return <div>hello {data.name}!</div>;
}
```

### 大中型项目

国内的 react 大中型项目, 数据管理基本上是 dva 或者 umi 没跑了.

中型项目经历多次迭代过后如果不注意数据的管理, 数据的维护也会变成一个巨大的屎坑.

对于从后端获取到的数据, 我从使用的角度简单的分为三类

1. 全局数据. 可能会在页面的任何一个地方用到, 需要一直存在库里, 比如用户账号信息等.
2. 页面级 / 组件树的数据. 这种数据并不需要全局共享, 但是会在某个路由的页面下或者一个组件树下共享, 需要在切换路由或者祖级组件卸载的时候清空数据.
3. 单个或者层级较浅的组件数据. 这种不需要跨组件通信的就正常地使用`props`和`useState`就可以了.

**全局共享状态**

我选择把这些数据放在 dva 的 model 中, 方便多人协作维护.

**页面级/组件树的共享状态**

很早之前我将这部分数据也直接用 model 来管理, 后来随着项目越来越大, 项目的 model 文件已经超过了 100 个, 如果再这么放任下去, 恐怕会突破 200 个, 在 chrome 上打开 redux-dev 工具的时候, 工具经常直接卡死.

在 redux 中, 每次发起 action, 都会走一遍所有的 reducer, 时间复杂度是 O(n), 虽然对性能影响微乎其微, 但是看着 model 文件的入口那长到看不到边际的`export`导出, 总会让人没有修改和添加的欲望. 而且如果大家滥用 dva 的 model, 到后面想在一堆名字千奇百怪的文件里找到公共状态会变得相当困难, 很多页面级数据完全没必要甩到全局的 model 里.

最后我选择了 model 和 unstated-next 及 context 三者混用的模式.

1. model 来管理 app 的全局状态.

2. unstated-next 来管理单个页面的多个共享状态, 基本上是一个 container 文件, 一般在页面最高层的组件处, 用来存储多个控制 UI 展示和切换的状态.

3. context 用来单独共享一个状态, 可能会存在多个 context 文件, 我一般选择用来存储一些列表数据, 可能包含列表数据的格式化及大量注释和类型标注, 因为这部分数据提出来的目的可能只是为了数据的缓存, 所以不用 container 来保存.
4. 除了 model 中的 effects, 其他时候直接用 swr 向后端发送请求.
