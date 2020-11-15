---
title: 微信小程序-sessionkey失效检测
copyright: true
permalink: 2
top: 0
date: 2019-07-24 22:03:24
tags: ['小程序']
categories: tech
password:
---

> 参考官方文档:
>
> 检查登录态是否过期。
>
> 通过 wx.login 接口获得的用户登录态拥有一定的时效性。用户越久未使用小程序，用户登录态越有可能失效。反之如果用户一直在使用小程序，则用户登录态一直保持有效。具体时效逻辑由微信维护，对开发者透明。开发者只需要调用 wx.checkSession 接口检测当前用户登录态是否有效。
>
> 登录态过期后开发者可以再调用 wx.login 获取新的用户登录态。调用成功说明当前 session_key 未过期，调用失败说明 session_key 已过期。更多使用方法详见 [小程序登录](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/login.html)。

## 为何要检测 sessionkey

<!--more-->

如上官方文档, 官方文档说明了三件事

1. sessionkey 会过期

2. 过期时间不固定

3. sessionkey 只有在重新登录的时候会刷新

存在一种情况: sessionkey 在登录的时候传给后端, 前端 session_key 已失效, 调用需要用到 session_key 的接口, 后端不知道已经过期, 操作失败

## 检测写法

```js
const app = getApp();
wx.checkSession({
  fail: () => {
    //fail 即为登录态失效, 在回调内写重新登录的逻辑
    //在公司的项目中,因为登录逻辑较多, 我直接选择全局eventBus重走登录逻辑
    app.event.emit('reLogin');
  },
});
```

_tip:_ checkSession 稍微有点耗时,使用时要注意用户体验.
