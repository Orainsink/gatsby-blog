---
title: 移动端优化-禁止qq微信浏览器下拉出现空白区域
copyright: true
permalink: 1
top: 0
date: 2019-12-02 21:33:38
tags: ["前端", "js"]
categories: js
password:
---

最近在完善自己的[简历网站](http://foolishrobot.xyz/react-webgl-resume/) , 本来做完了修改了一堆bug过后自我感觉良好, 在移动端chrome浏览器上测试也没什么问题, 可是分享给朋友看的时候就发现出问题了.

 ![20191221.png](https://github.com/Orainsink/images/blob/master/blog/20191221.png?raw=true) 

如图, 当页面往下拖动的时候出现了类似IOS橡皮筋效果的空白区域, 这个问题出现在tx家的浏览器上, 另外有个别浏览器, 比如夸克, 在往下拖动的时候会触发浏览器事件, 导致页面重新加载, 这对于我这个靠 touchmove 事件来控制webGL元素动作的网站会造成糟糕的用户体验.

查阅了相关资料, 发现这些浏览器,会在touchmove事件冒泡到最外层的时候,如果最外层已经到了顶部, 就会触发相应的动作, 比如橡皮筋效果或者刷新页面.

以下总结两种解决办法.

# 1.使用iScroll或者 BetterScroll  

第一步: 

在最外层body阻止原生事件

```js
document.body.addEventListener("touchmove", e=>e.preventDefault(), { passive: false });
```

第二步, 根据这两个插件的文档, 在需要滚动的节点, 实例化.

但是这两个插件我在用的时候发生了点问题, 因为我的元素高度在最开始实例化插件的时候是不确定的, 要在触发了waypoint钩子过后才有高度, 插件不能正常工作, 所以这个方法被我舍弃了.

# 2.动态地绑定或者移除touchmove事件监听器

如上第一步, 当我们监听了body的touchmove事件并阻止了原生事件, 然后整个页面的所有元素都无法滚动了, 在mvvm框架内我们可以在组件的生命周期内选择取消监听. 如下:

react hooks语法:

```js
function preventBodyScroll(e) {
	e.preventDefault();
}

function App() {
  const [canScroll,setCanScroll] = useState(false)

  useEffct(()=>{
		if(!canScroll){
      document.body.addEventListener("touchmove", preventBodyScroll, { passive: false });
    }else{
      document.body.removeEventListener("touchmove", preventBodyScroll, { passive: false });
    }
  },[canScroll])
  return(<></>)
}
```

`canScroll` 为` true` 的时候取消监听, 为`false` 的时候监听并阻止原生事件.

`preventBodyScroll`最好放在函数组件外, 放在组件内可能会取消监听失败. 因为两个`preventBodyScroll`对应的内存地址不一样. 

效果就和我上面的简历网站差不多.