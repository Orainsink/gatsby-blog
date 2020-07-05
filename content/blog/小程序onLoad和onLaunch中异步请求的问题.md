---
title: 小程序onLoad和onLaunch中异步请求的问题
copyright: true
permalink: 2
top: 0
date: 2019-08-23 10:32:45
tags: ["前端", "小程序"]
categories: 小程序
password:
---

## 问题

生命周期函数`onLaunch`是先于页面生命周期`onLoad`执行的, 但是需要注意的一点是**`onLaunch`和`onLoad`的执行顺序并不能保证这两个钩子内的请求返回顺序**, 比如以下操作: 

1. 在`app.onLaunch()`中发送`login`登录请求
2. 通过微信开发者平台设置编译模式, 直接打开某个页面
3. 在页面的`onLoad`钩子内发送`getData`请求

结果会报错`GET https://xxxxxx 401 (Unauthorized)`

查看网络请求, `login`在返回结果前已经发出去了`getData`的包, 导致`getData`的请求并没有携带sessionId, 请求失败.

<!--more-->

## 解决办法

解决办法很多, 参考了网上很多解决办法, 但是由于项目已经比较成规格, 需要改造的页面并不多, 改造起来太麻烦, 所以选择了比较简单方便的改造方法.

app.js

```js
APP({
	...,
    hasLogin: false, // 全局登录状态
	login() {
		utils.setStorage("sid", ""); //清空sessionId
		wx.login({
			success: codeInfo => {
				if (codeInfo.code) {
                    const params = ???
                    // 封装过的登录请求
					api.login(params, this).then(resp => {
							if (!resp) return;
                        	/*添加的代码 start*/
							/*防止onLoad执行在onLaunch之前*/
							if (this.loginCallback){
							    const sid = utils.getStorage("sid") //在封装的登录请求里通过request header 获取sid并储存在storage内
								this.loginCallback(sid);
							}
							/* end */
                        	this.hasLogin = true;
						})
						...
				}
			},
		});
	},
	...
})
```

utils.js

```js
const utils = {
    ...,
    loginCB(cb,app) {
        // 已登录则直接回调
        if (app.hasLogin) {
            cb()
        } else {
            app.loginCallback = sid => {
                // 判断有storage内有sid则回调
                if (sid !== "") {
                    cb()
                }
            };
        }
    },
    ...
}
module.exports = {...utils}
```

index.js

```js
const app = getApp();
const utils = require("/utils/utils");

Page({
    onLoad(option) {
        // 从工具函数内使用
		utils.loginCB(this.getData, app);
	},
	getData() {
		/*do something*/
		})
	},
})
```





参考文章:

[追逐时光的博客_CSDN](https://www.cnblogs.com/Can-daydayup/p/10614399.html)

[mipaifu328的博客_简书](https://www.jianshu.com/p/aaf65625fc9d)