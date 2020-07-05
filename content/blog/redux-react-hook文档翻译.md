---
title: redux-react-hook文档翻译
copyright: true
permalink: 1
top: 0
date: 2019-11-13 18:50:50
tags: ["前端", "react"]
categories: react
password:
---

> React hook for accessing mapped state and dispatch from a Redux store.

npm地址: https://www.npmjs.com/package/redux-react-hook

<!--more-->

## 安装

```shell
# Yarn
yarn add redux-react-hook

# NPM
npm install --save redux-react-hook
```

## 快速开始

```js
//
// app入口
//
import {StoreContext} from 'redux-react-hook';

ReactDOM.render(
  <StoreContext.Provider value={store}>
    <App />
  </StoreContext.Provider>,
  document.getElementById('root'),
);
//
// 独立组件
//
import {useDispatch, useMappedState} from 'redux-react-hook';

export function DeleteButton({index}) {
  // 声明并缓存 mapState 函数
  const mapState = useCallback(
    state => ({
      canDelete: state.todos[index].canDelete,
      name: state.todos[index].name,
    }),
    [index],
  );

  // 从 store 中订阅及获取数据
  const {canDelete, name} = useMappedState(mapState);

  // 构造 actions
  const dispatch = useDispatch();
  const deleteTodo = useCallback(
    () =>
      dispatch({
        type: 'delete todo',
        index,
      }),
    [index],
  );

  return (
    <button disabled={!canDelete} onClick={deleteTodo}>
      Delete {name}
    </button>
  );
}
```

## Usage

**注意**: React hooks 需要 `16.8.0` 或更高版本的`react` 和 `react-dom` .

### `StoreContext`

在你使用 hook 之前, 你必须通过添加` StoreContext.Provider `来提供你的Redux store:

```js
import {createStore} from 'redux';
import {StoreContext} from 'redux-react-hook';
import reducer from './reducer';

const store = createStore(reducer);

ReactDOM.render(
  <StoreContext.Provider value={store}>
    <App />
  </StoreContext.Provider>,
  document.getElementById('root'),
);
```

你也可以用 `StoreContext` 来直接获取 store中的数据, 这对于一些只需要获取更多状态的事件处理非常有用

```js
import {useContext} from 'react';
import {StoreContext} from 'redux-react-hook';

function Component() {
  const store = useContext(StoreContext);
  const onClick = useCallback(() => {
    const value = selectExpensiveValue(store.getState());
    alert('Value: ' + value);
  });
  return <div onClick={onClick} />;
}
```

### `useMappedState(mapState)`

对你的 store state 运行下方的 `mapState` 方法, 就像 `mapStateToProps`一样.

```js
const state = useMappedState(mapState);
```

在 `mapState` 方法中, 你可以使用 props 或者其他组件的 state. 该状态必须用`useCallback`缓存起来, 因为你每次传入一个新的 mapState 函数, `useMappedState`都将无限递归.

```js
import {useMappedState} from 'redux-react-hook';

function TodoItem({index}) {
  // Note that we pass the index as a dependency parameter -- this causes
  // useCallback to return the same function every time unless index changes.
  const mapState = useCallback(state => state.todos[index], [index]);
  const todo = useMappedState(mapState);

  return <li>{todo}</li>;
}
```

如果你在`useCallback`的第二个参数是 `[]`, React 将在每次重新渲染的时候执行相同的回调函数.你也可以在函数外声明`mapState`, 但是 React 官方团队并不推荐这么多, 因为 hook 的中心思想就是让你可以把所有东西都放在函数组件内.

**注意:** 每次调用`useMapperState`都将订阅 store. store 内的 state 更新过后, 组件才会重新渲染一次, 多次调用`useMapperState`(比如将其封装在自定义 hook 内)并不会造成很大的性能影响. 如果你的检测工具反映性能受到了影响, 你可以切换回返回对象的调用方式 .

### `useDispatch()`

返回 dispatch 方法

```js
import {useDispatch} from 'redux-react-hook';

function DeleteButton({index}) {
  const dispatch = useDispatch();
  const deleteTodo = useCallback(() => dispatch({type: 'delete todo', index}), [
    index,
  ]);

  return <button onClick={deleteTodo}>x</button>;
}
```

### `create()`

使用 `new StoreContext` 创建Redux React Hooks 实例. 以上函数只是实例默认的导出. 你也可以创建你自己的实例, 如果: 

1. 你想要的更好的类型安全性, 而不必为每个consumer都添加注释. 创建你自己的实例可以确保所有订阅的消费者的类型都相同. 更多信心详见示例.
2. 你有多个Redux stores(这并不常见)

```js
// MyStoreHooks.js

import {create} from 'redux-react-hook';

export const {StoreContext, useDispatch, useMappedState} = create();
// MyStoreHooks.ts

import {create} from 'redux-react-hook';

// Example in TypeScript where you have defined IState and Action
export const {StoreContext, useDispatch, useMappedState} = create<
  IState,
  Action,
  Store<IState, Action>
>();
```

## 示例

你可以再浏览器查看 `redux-react-hook` 示例 [Codesandbox example](https://codesandbox.io/s/github/ianobermiller/redux-react-hook-example).

或者你可以在本地运行示例:

```shell
# In one terminal, run `yarn start` in the root to rebuild the library itself
cd ./redux-react-example
yarn start

# In another terminal, run `yarn start` in the `example` folder
cd example
yarn start
```

