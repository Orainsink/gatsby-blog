---
title: 微信小程序-eventBus
copyright: true
permalink: 3
top: 0
date: 2019-07-24 22:26:22
tags: ["前端", "小程序"]
categories: 小程序
password:
---

> 状态较少的小程序一般用不到大型的状态管理工具,所以eventBus就行了

eventBus.js

<!--more-->

```js
 class EventBus {
    constructor() {
        this.EventCache = {};
    }

    on(type, self, handler) {
        let cache = this.EventCache[type] || (this.EventCache[type] = {});
        
        cache[self.__wxExparserNodeId__] = handler;
    }

    emit(type, ...param) {
        let cache = this.EventCache[type];

        if (!cache) return;

        for (let key in cache) cache[key] && cache[key].call(this, ...param);
    }

    off(type, self) {
        let cache = this.EventCache[type];

        for (let key in cache) key === self.__wxExparserNodeId__ && (delete this.EventCache[type][key]);
    }
}
module.exports = { EventBus }
```

使用时先在app.js实例化

```js
App({
	...
    event: new EventBus(),
	...
})
```

然后在其他文件使用

```js
// 获取app实例
const app = getApp();
// 注册监听,传this是为了绑定this对象
app.event.on('reLoad',this,(payload)=>{
    // do something
})
const payload = true
app.event.emit('reload', payload)
app.event.off("reload", this);
```

