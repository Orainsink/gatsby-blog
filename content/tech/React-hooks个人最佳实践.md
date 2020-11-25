---
title: React-hooks个人最佳实践
date: 2020-10-04 18:09:54
description: 《React Hooks 最佳实践》的整理, 和一些自己的看法
tags: [react, 规范]
categories: tech
---

> 参考知乎的一篇总结文章: [精读《React Hooks 最佳实践》](https://zhuanlan.zhihu.com/p/81752821), 但是有部分的建议我有所修改

## 环境要求

- 开启 ESLint 插件：[eslint-plugin-react-hooks](https://link.zhihu.com/?target=https%3A//www.npmjs.com/package/eslint-plugin-react-hooks)

## 组件定义

```tsx
interface Props {
  title: string;
}
const App = (props: Props) => {
  const { title = '' } = props;

  return <div>{title}</div>;
};
export default React.memo(APP);
```

1. Function Component 采用 const + 箭头函数方式定义

2. 默认所有组件通过`React.memo`处理过后再导出, 优化渲染性能.

   我不认同原文使用`useMemo`替代`React.memo`的写法, 个人理解`useMemo`更侧重于在组件内部记忆一些变量, 而不是用来监听`props`以阻止组件渲染, 而且`useMemo`需要再写一遍依赖, 用高阶函数`React.memo`比较符合我个人的逻辑, 而且更加简洁, 组件归组件, 变量归变量.

3. 函数组件入参固定为`props`, 在函数体内再通过解构获得参数

   react 官方不推荐使用 `React.FC`, 因为这样会在传入的`props`内默认加上`props.children`, 除此以外, 多写这两个单词本身也是很烦的一件事.

   为了保持组件声明部分的简洁, 一般不再括号内直接用结构, 而是在函数体类解构获得参数.

   ```tsx
   //使用
   const App = (props: Props) => { ... }
   //而不是
   const App: React.FC<Props> = (props) => { ... }
   //或者
   const App = ({ title }: Props) => { ... }
   ```

4. 在通过解构获取参数的时候, 通过默认形参来设置组件的默认参数.

   官方的推荐解构的默认参数来取代 `defaultProps`，和通过`defaultProps`创建的默认值相比, 默认的 object 参数会在每次计算的时候重新创建, 但这对性能基本没影响, 所以还是用默认参数更好.

## 引入和导出

```tsx
//引入react
import react, { useState } from 'React';
// 导出组件
export default React.memo(App);
// 导出hook
const hook = () => {
  const [value, setValue] = useState();
  return [value, setValue];
};
export default hook;
```

1. 用解构的方式引入钩子函数, 这样做的目的是简洁, 减少代码量, 同时保持代码风格统一(和 redux 的`useDispatch`,`useSelector`风格保持一致).
2. 用`export default`默认导出组件及封装的钩子, 目的是保持代码风格统一, 以及防止变量名冲突
3. 导出的钩子函数如果有多个返回值, 将返回值以数组的方式而不是对象的方式返回. 目的是防止在组件内部和组件的变量发生冲突, 保持代码风格一致.

## 局部状态

局部状态有三种，根据常用程度依次排列： `useState` `useRef` `useReducer` 。

### useState

```tsx
const [hide, setHide] = useState(false);
const [name, setName] = useState('BI');
```

状态函数名要表意，尽量聚集在一起申明，方便查阅。

### useRef

```tsx
const dom = useRef(null);
```

`useRef` 尽量少用，大量 Mutable 的数据会影响代码的可维护性。

但对于不需重复初始化的对象推荐使用 `useRef` 存储，比如 `new G2()` 。

### useReducer

局部状态不推荐使用 `useReducer` ，会导致函数内部状态过于复杂，难以阅读。 `useReducer` 建议在多组件间通信时，结合 `useContext` 一起使用。

## 常数

常量推荐放到函数外层避免性能问题, 或者用`useMemo`包裹

## 函数

对于计算量较大的函数, 使用`useCallback`包裹.

如果该函数出现在`useMemo`或者`useCallback`的依赖里, 则该函数也必须用`useCallback`包裹

所以无脑一点, 所有的组件内函数, 都用`useCallback`包裹. ( `useCallback`依赖监听会有性能消耗, 但是这点消耗和带来的开发效率的提升比起来可以忽略 )

```tsx
const [hide, setHide] = useState(false);

const handleClick = useCallback(() => {
  setHide((isHide) => !isHide);
}, []);
```

`useCallback` 第二个参数必须写，[eslint-plugin-react-hooks](https://link.zhihu.com/?target=https%3A//www.npmjs.com/package/eslint-plugin-react-hooks) 插件会自动填写依赖项。

## useContext

当组件上层最近的 `<MyContext.Provider>` 更新时，该 Hook 会触发重渲染，并使用最新传递给 `MyContext` provider 的 context `value` 值。即使祖先使用 `React.memo` ，也会在组件本身使用 `useContext` 时重新渲染。

即调用了 `useContext` 的组件总会在 context 值变化时重新渲染。如果重渲染组件的开销较大我们可以选择

1. 将消费`context`的部分拆分成一个单独的组件

   ```jsx
   const Button = () => {
     let theme = useContext(ThemeContext);
     // The rest of your rendering logic
     return <ExpensiveTree className={theme} />;
   };
   ```

   这么做的好处是`context`指挥引起独立出来的该组件重新渲染, 缺点是需要将代码分离出来, 在某些项目里可能比较困难.

2. 将消费`context`的组件内部, 用`useCallback`, `useMemo`优化内部, 减少重新计算的计算量

   ```tsx
   const Button = () => {
     let appContextValue = useContext(AppContext);
     let theme = appContextValue.theme; // Your "selector"

     return useMemo(() => {
       // The rest of your rendering logic
       return <ExpensiveTree className={theme} />;
     }, [theme]);
   };
   ```

## 合理运用节流防抖

我会在[下一篇文章](/React-hooks防抖和节流/)总结 hooks 的防抖和节流
