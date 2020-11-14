---
title: ES6异步编程-async和await
copyright: true
permalink: 4
top: 0
date: 2019-02-16 00:57:36
tags: ['前端', 'js']
categories: tech
password:
---

> **异步编程的最高境界，就是根本不用关心它是不是异步**
> 我离异步编程的最高境界差了十万八千里，但是我确实不想关心它是不是异步了。
> 异步编程的坑数不胜数，如果觉得没坑，可以简单看一下这十个问题：[Promise 必知必会（十道题）](https://zhuanlan.zhihu.com/p/30797777)
> async 函数就是隧道尽头的亮光，很多人认为它是异步操作的终极解决方案。
> 以下文章参考资料：[阮一峰的博客](http://www.ruanyifeng.com/blog/2015/05/async.html)，[LucasHC 的博客](https://www.jianshu.com/p/3059a2d0f3da)

<!--more-->

## async 函数的用法

async 函数返回一个 Promise 对象，可以使用 then 方法添加回调函数。

当函数执行的时候，**一旦遇到 await 就会先返回，等到触发的异步操作完成，再接着执行函数体内后面的语句**。

下面是一个例子：

Promise 异步获取数据

```js
const makeRequest = () =
    getJSON()
        .then(data = {
            console.log(data)
            return "done"
        })

makeRequest()
```

async/await 写法

```js
const makeRequest = async () = {
    console.log(await getJSON())
    return "done"
}

makeRequest()
```

再用一个例子深化理解

下面的例子，指定多少毫秒后输出一个值。

```js
function timeout(ms) {
  return new Promise((resolve) = {
    setTimeout(resolve, ms);
  });
}

async function asyncPrint(value, ms) {
  await timeout(ms);
  console.log(value)
}

asyncPrint('hello world', 50);
```

上面代码指定 50 毫秒以后，输出"hello world"。

函数前面的 async 关键字，表明该函数内部有异步操作。调用该函数时，会立即返回一个 Promise 对象。

## async 函数的好处

那么，同样是处理异步操作，Async/await 究竟好在哪里呢？
LucasHC 原博主总结出以下 6 点。

### 简约而干净 Concise and clean

我们看一下上面两处代码的代码量，就可以直观地看出使用 Async/await 对于代码量的节省是很明显的。对比 Promise，我们不需要书写.then，不需要新建一个匿名函数处理响应，也不需要再把数据赋值给一个我们其实并不需要的变量。同样，我们避免了耦合的出现。这些看似很小的优势其实是很直观的，在下面的代码示例中，将会更加放大。

### 错误处理 Error handling

Async/await 使得处理同步＋异步错误成为了现实。我们同样使用 try/catch 结构，但是在 promises 的情况下，try/catch 难以处理在 JSON.parse 过程中的问题，原因是这个错误发生在 Promise 内部。想要处理这种情况下的错误，我们只能再嵌套一层 try/catch，就像这样：

```js
const makeRequest = () = {
    try {
    getJSON()
        .then(result = {
            // this parse may fail
            const data = JSON.parse(result)
            console.log(data)
        })
        // uncomment this block to handle asynchronous errors
        // .catch((err) = {
        //   console.log(err)
        // })
        }
    catch (err) {
        console.log(err)
    }
}
```

但是，如果用 async/await 处理，一切变得简单，解析中的错误也能轻而易举的解决：

```js
 const makeRequest = async () = {
      try {
          // this parse may fail
          const data = JSON.parse(await getJSON())
          console.log(data)
      }
      catch (err) {
          console.log(err)
      }
   }
```

### 条件判别 Conditionals

想象一下这样的业务需求：我们需要先拉取数据，然后根据得到的数据判断是否输出此数据，或者根据数据内容拉取更多的信息。如下：

```js
const makeRequest = () = {
    return getJSON()
        .then(data = {
            if (data.needsAnotherRequest) {
                return makeAnotherRequest(data)
                        .then(moreData = {
                            console.log(moreData)
                            return moreData
                        })
            }
            else {
                console.log(data)
                return data
            }
        })
}
```

这样的代码会让我们看的头疼。这这么多层（6 层）嵌套过程中，非常容易“丢失自我”。
使用 async/await，我们就可以轻而易举的写出可读性更高的代码：

```js
const makeRequest = async () = {
    const data = await getJSON()
    if (data.needsAnotherRequest) {
        const moreData = await makeAnotherRequest(data);
        console.log(moreData)
        return moreData
    }
    else {
        console.log(data)
        return data
    }
}
```

### 中间值 Intermediate values

一个经常出现的场景是，我们先调起 promise1，然后根据返回值，调用 promise2，之后再根据这两个 Promises 得值，调取 promise3。使用 Promise，我们不难实现：

```js
const makeRequest = () = {
    return promise1()
        .then(value1 = {
            // do something
            return promise2(value1)
                .then(value2 = {
                    // do something
                    return promise3(value1, value2)
                })
        })
}
```

如果你难以忍受这样的代码，我们可以优化我们的 Promise，方案是使用 Promise.all 来避免很深的嵌套。
就像这样：

```js
const makeRequest = () = {
    return promise1()
        .then(value1 = {
            // do something
            return Promise.all([value1, promise2(value1)])
        })
        .then(([value1, value2]) = {
            // do something
            return promise3(value1, value2)
        })
}
```

Promise.all 这个方法牺牲了语义性，但是得到了更好的可读性。
但是其实，把 value1 & value2 一起放到一个数组中，是很“蛋疼”的，某种意义上也是多余的。

同样的场景，使用 async/await 会非常简单：

```js
const makeRequest = async () = {
    const value1 = await promise1()
    const value2 = await promise2(value1)
    return promise3(value1, value2)
}
```

### 错误堆栈信息 Error stacks

想象一下我们链式调用了很多 promises，一级接一级。紧接着，这条 promises 链中某处出错，如下：

```js
const makeRequest = () = {
    return callAPromise()
        .then(() = callAPromise())
        .then(() = callAPromise())
        .then(() = callAPromise())
        .then(() = callAPromise())
        .then(() = {
            throw new Error("oops");
        })
}

makeRequest()
    .catch(err = {
        console.log(err);
        // output
        // Error: oops at callAPromise.then.then.then.then.then (index.js:8:13)
    })
```

此链条的错误堆栈信息并没用线索指示错误到底出现在哪里。更糟糕的事，他还会误导开发者：错误信息中唯一出现的函数名称其实根本就是无辜的。
我们再看一下 async/await 的展现：

```js
const makeRequest = async () = {
    await callAPromise()
    await callAPromise()
    await callAPromise()
    await callAPromise()
    await callAPromise()
    throw new Error("oops");
}

makeRequest()
    .catch(err = {
        console.log(err);
        // output
        // Error: oops at makeRequest (index.js:7:9)
    })
```

也许这样的对比，对于在本地开发阶段区别不是很大。但是想象一下在服务器端，线上代码的错误日志情况下，将会变得非常有意义。你一定会觉得上面这样的错误信息，比“错误出自一个 then 的 then 的 then。。。”有用的多。

### 调试 Debugging

最后一点，但是也是很重要的一点，使用 async/await 来 debug 会变得非常简单。
在一个返回表达式的箭头函数中，我们不能设置断点，这就会造成下面的局面：

```js
const makeRequest = () = {
    return callAPromise()
        .then(()=callAPromise())
        .then(()=callAPromise())
        .then(()=callAPromise())
        .then(()=callAPromise())
}
```

我们无法在每一行设置断点。但是使用 async/await 时：

```js
const makeRequest = async () = {
    await callAPromise()
    await callAPromise()
    await callAPromise()
    await callAPromise()
}
```

## async 函数的注意事项

阮大神总结了一些使用 async 过程中会遇到的坑,如下:

await 命令后面的 Promise 对象，运行结果可能是 rejected，所以最好把 await 命令放在 try...catch 代码块中。

```javascript
async function myFunction() {
  try {
    await somethingThatReturnsAPromise();
  } catch (err) {
    console.log(err);
  }
}

// 另一种写法

async function myFunction() {
  await somethingThatReturnsAPromise().catch(function (err) {
    console.log(err);
  });
}
```

await 命令只能用在 async 函数之中，如果用在普通函数，就会报错。

```javascript
 async function dbFuc(db) {
   let docs = [{}, {}, {}];

   // 报错
   docs.forEach(function (doc) {
     await db.post(doc);
   });
 }
```

上面代码会报错，因为 await 用在普通函数之中了。但是，如果将 forEach 方法的参数改成 async 函数，也有问题。

```javascript
async function dbFuc(db) {
  let docs = [{}, {}, {}];

  // 可能得到错误结果
  docs.forEach(async function (doc) {
    await db.post(doc);
  });
}
```

上面代码可能不会正常工作，原因是这时三个 db.post 操作将是并发执行，也就是同时执行，而不是继发执行。正确的写法是采用 for 循环。

```javascript
async function dbFuc(db) {
  let docs = [{}, {}, {}];

  for (let doc of docs) {
    await db.post(doc);
  }
}
```

如果确实希望多个请求并发执行，可以使用 Promise.all 方法。

```javascript
async function dbFuc(db) {
  let docs = [{}, {}, {}];
  let promises = docs.map((doc = db.post(doc)));

  let results = await Promise.all(promises);
  console.log(results);
}

// 或者使用下面的写法

async function dbFuc(db) {
  let docs = [{}, {}, {}];
  let promises = docs.map((doc = db.post(doc)));

  let results = [];
  for (let promise of promises) {
    results.push(await promise);
  }
  console.log(results);
}
```
