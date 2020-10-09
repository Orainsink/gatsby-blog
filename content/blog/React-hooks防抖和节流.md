---
title: React-hooks防抖和节流
date: 2020-10-04 20:29:08
description:
tags: [react, 前端]
---

> lodash 的 debounce 和 throttle 函数是不能在函数组件内直接使用的, 我们需要自己写 hooks 版本的 debounce 和 throttle

## 常规 debounce

```js
function debounce(fn, delay = 200) {
  let timer = null;

  return function (...args) {
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
```

## 常规 throttle

```js
function throttle(fn, threshold) {
  let timer = null;

  return function (...args) {
    if (timer) return;
    timer = setTimeout(() => {
      timer = null;
    }, delay);
    fn.apply(this, args);
  };
}
```

## 为何节流和防抖会在 hooks 内失效

**hooks 防抖错误用例**:

```jsx
export default function () {
  const [counter, setCounter] = useState(0);

  const handleClick = useDebounce(function () {
    setCounter(counter + 1);
  }, 1000);

  return (
    <div style={{ padding: 30 }}>
      <Button onClick={handleClick}>click</Button>
      <div>{counter}</div>
    </div>
  );
}

// useDebounce
function useDebounce(fn, time) {
  return debounce(fn, time);
}
```

**用例的问题:**

react 函数组件会在 props 发生改变等情况下触发重新计算, 函数组件内的所有常量, 变量, 对象都会重新生成.

当函数组件重新计算的时候, 原先的`handleClick`和上一轮的`handleClick`储存的不再是同一个引用对象地址.

也就是说, 每次函数组件刷新, 该`handleClick`都将是全新的函数, 里面的`timer`将会被重置, `debounce`将会完全失效.

## 解决办法

解决`debounce`失效的关键就在于保持`timer`唯一且不会被意外清零.

同理, 解决`throttle`失效的关键就在于保持`timer`和`last`.

react hooks 中, 保持对象引用或者变量的最万能的办法, 就是用 **`useRef`**

需要澄清的是, 用`useState`也可以起到保存对象的作用, 但是, 从逻辑理解上`useState`最好是保存控制 UI 的状态, 而不是一些对象的引用, 身为强迫症, 我觉得用`useRef`好一些.

**一段依旧有问题的代码**

```jsx
function useDebounce(fn, delay) {
  const { current } = useRef({ fn, timer: null });
  // 将fn的引用储存到ref的current中
  useEffect(() => {
    current.fn = fn;
  }, [fn]);

  return function(...args) {
    if (current.timer) clearTimeout(current.timer);

    current.timer = setTimeout(() => {
      current.fn.call(this, ...args);
    }, delay);
}
```

上面这段代码看似解决了`timer`的缓存问题, 但是需要注意的是每次调用的函数组件刷新,

```jsx
const handleClick = useDebounce(function () {
  setCounter(counter + 1);
}, 1000);
```

这段代码都会再执行一次, 即便用了`useRef`, `timer`的值依旧是会重新生成, 所以还是有问题, 解决的办法是让`handleClick`被`useCallback`包裹, 并且传入依赖, 在依赖未改变的时候, 不重复执行`handleClick`

**正确的代码:**

debounce:

```jsx
function useDebounce(fn, delay, dep = []) {
  const { current } = useRef({ fn, timer: null });
  // 将fn的引用储存到ref的current中
  useEffect(
    function () {
      current.fn = fn;
    },
    [fn]
  );
  // useCallback缓存, 防止handleClick意外重新生成
  return useCallback(function (...args) {
    if (current.timer) clearTimeout(current.timer);

    current.timer = setTimeout(() => {
      current.fn.call(this, ...args);
    }, delay);
  }, dep);
}
```

同理,

throttle:

```jsx
function useThrottle(fn, threshold, dep = []) {
  const { current } = useRef({ fn, timer: null });

  useEffect(
    function () {
      current.fn = fn;
    },
    [fn]
  );

  return useCallback(function (...args) {
    if (!current.timer) {
      current.timer = setTimeout(() => {
        delete current.timer;
      }, delay);
      current.fn.apply(this, args);
    }
  }, dep);
}
```
