---
title: 前端优化-雪碧图及base64
copyright: true
permalink: 2
top: 0
date: 2019-06-17 13:29:21
tags: ['性能']
categories: tech
password:
---

> 微信的开发工具真机调试功能限制包的大小不能超过 2MB, 为了减少包的体积同时优化用户体验, 对图片的优化相当重要。

## 图片压缩

鄙人的公司，UI 文件并不会直接给前端，而是由 UI 小姐姐切好再给我，虽然省了我的事，但是有时候自己想切点图还是挺麻烦的。

小姐姐一般发图都会通过 [tinypng](https://tinypng.com/) 压缩之后再给我，所以图片压缩这一步别人都帮我做好了。

<!--more-->

## 雪碧图

雪碧图就是将多个图标放在一张 png 图像上，利用 css 的 background-position 属性，达到裁剪图片的特定区域，然后生成背景的效果。

雪碧图并不能减少包的大小，但是可以极大地减少请求次数，同时图片不会出现一个一个加载的情况。

在线生成雪碧图的网站很多。之前用过这个 [CSS 图片精灵](https://www.fedrobots.com/)

## base64

将图片转为 base64 编码的字符串，浏览器可以不发送网络请求直接解析，这样就可以减少网络请求。但是 base64 转码会导致打包出来的图片比原大小大近一倍，base64 的代码本身也不太好看。在一些临时的页面内可以使用，或者非常小的图标可以使用，其他时候慎用。

在线转换工具 [图片转 base64](http://imgbase64.duoshitong.com/)

或者使用 webpack 的 url-loader，举个例子：

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
};
```

上面的这个配置就是把 8k 以下的 png|jpg|gif 通过 url-loader 进行 base64 编码，转换成一串 DataUrl

## 阿里 iconfont

尽可能的将图片换成 iconfont ，这样不但减少了包的大小，也方面对 icon 图标进行自定义操作

[iconfont](https://www.iconfont.cn/)

## webpack 图片压缩，雪碧图

这一块没怎么用，用到的时候再说。

> 参考资料： [william 的文章](https://segmentfault.com/a/1190000017481260)
