---
title: JS新特性-各种符号
date: 2020-11-04 20:31:14
description: 让没看过ES新特性的人, 压根读不懂你的代码
tags: [js]
categories: tech
---

## ?? 空值合并运算符

双问号的出现是为了补足`||`的缺点。

`||` 通过短路运算只能判断`falsy`值，但是业务代码中经常我们需要把 `''`, `0`, `NaN`这三个值和`undefined`及`null`区分开。

天不生我双问号：

```typescript
// 后端给的字段
let count = 0 as null | number;
// 前端判断count存在，如果不存在显示默认值
// 直接用 || 会漏掉0
let text1 = count || '-'; // '-'
// 需要用 typeof 或者其他任何方式判断， 麻烦
let text2 = typeof count === 'number' ? count : '-'; // 0
```

前端万古如长夜：

```typescript
// ?? 只会拦下 null 和 undefined
let text3 = count ?? '-'; // 0
```

# ?. 安全链式调用

一个菜鸡前端，每天要处理大量的`error: can't call method on an undefined value`这种报错，尤其是使用 hooks 的时候。工具对象尚未实例化就调用他的函数，或者后端数据还没拿到，就想去拿数据（`null`）里的值。如果每个调用的地方都去做一下空值判断当然也不是不可以。但有了`?.`之后就 dark 不必。

`?.`会判断问号前的对象如果为`null`或`undefined`就直接返回`undefined`，结束链式调用。

```js
let data = null;
console.log(data?.value); // null
```

你还可以和`??`配合

```js
let data = null;
console.log(data?.value ?? '-');
```

## ??= 逻辑空赋值运算符

双问号赋值符号版。

```ts
let x: null | number
// 仅当 x 为 null 或 undefined 时，x = 1
x ??= 1
```

## ! 强制链式调用（TS）

强制链式调用在工作中的使用频率也很高，很多时候类型覆盖会有遗漏， 但是补全类型又太麻烦，就用强制链式调用来避免一些不必要的报错。

`!`确定符号前的地段必定存在：

```ts
// 这里 Error对象定义的stack是可选参数，如果这样写的话编译器会提示
// 出错 TS2532: Object is possibly 'undefined'.
new Error().stack.split('\n');

// 我们确信这个字段100%出现，那么就可以添加！，强调这个字段一定存在
new Error().stack!.split('\n');
```

## \_ 数字分隔符

```js
let x = 1000000;
let y = 1_000_000;
x === y; // true
```
