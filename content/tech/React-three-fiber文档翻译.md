---
title: React-three-fiber API文档翻译
date: 2020-10-09 11:42:54
description: react-three-fiber的api文档翻译
tags: [react, three]
categories: tech
---

# react-three-fiber

原项目 github 主页: https://github.com/pmndrs/react-three-fiber

简短介绍: react-three-fiber 是一个用于在 web 和 RN app 中构建 threejs 元素的[渲染器](https://zh-hans.reactjs.org/docs/codebase-overview.html#renderers)

项目完整介绍及相关生态详见项目主页。本文只是 API 的翻译。

版本: v5.0.0

时间: 2020-9-23

# Canvas

`Canvas`对象是 Threejs 的入口。其内部渲染的是 Threejs 元素，_而不是 DOM 元素_！下面是一个简短的 hello-world，您可以尝试一下：

```jsx
import ReactDOM from 'react-dom';
import React from 'react';
import { Canvas } from 'react-three-fiber';

ReactDOM.render(
  <Canvas>
    <pointLight position={[10, 10, 10]} />
    <mesh>
      <sphereBufferGeometry />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  </Canvas>,
  document.getElementById('root')
);
```

`canvas`画布将自动拉伸到到其父容器的 100%。请确保你的画布有足够的空间来显示内容！

```jsx
<Canvas
  children                      // Either a function child (which receives state) or regular children
  gl                            // Props that go into the default webGL-renderer
  camera                        // Props that go into the default camera
  raycaster                     // Props that go into the default raycaster
  shadowMap                     // Props that go into gl.shadowMap, can also be set true for PCFsoft
  colorManagement = true        // Auto sRGBEncoding encoding for all colors and textures + ACESFilmic
  vr = false                    // Switches renderer to VR mode, then uses gl.setAnimationLoop
  webgl1 = false                // Forces THREE to WebGL1, instead of WebGL2 (default)
  concurrent = false            // Enables React concurrent mode
  resize = undefined            // Resize config, see react-use-measure's options
  orthographic = false          // Creates an orthographic camera if true
  noEvents = false              // Switch off raytracing and event support
  pixelRatio = undefined        // Default: 1. Use window.devicePixelRatio, or automatic: [min, max]
  invalidateFrameloop = false   // When true it only renders on changes, when false it's a game loop
  updateDefaultCamera = true    // Adjusts default camera on size changes
  onCreated                     // Callback when vdom is ready (you can block first render via promise)
  onPointerMissed />            // Response for pointer clicks that have missed a target
```

你也可以在`Canvas`标签上添加一些可选的 ReactElement 属性(例如`className`和`style`), 他们将被添加到自动生成的 div 容器上。

## Canvas 组件属性默认值

`Canvas`将会生成一个具有以下默认属性的半透明 webGl-renderer：

- 抗锯齿: antialias = true
- 透明度: alpha = true
- webGL 环境配置: powerPreference = "high-performance"
- alpha 设置: setClearAlpha(0)

- 透视相机（_[perspective camera](https://threejs.org/docs/index.html#api/zh/cameras/PerspectiveCamera)_） : `fov: 75, near: 0.1, far: 1000, z: 5, lookAt: [0,0,0]`

  如果`Canvas.orthographic`为`true`, 则默认的是一个正交相机([_orthographic camera_](https://threejs.org/docs/index.html#api/zh/cameras/OrthographicCamera)) : `near: 0.1, far: 1000, z: 5, lookAt: [0,0,0]`

- 如果`Canvas.shadowMap`为`true`, 则有默认的阴影效果(_shadowMap_): `type: PCFSoftShadowMap`

- 场景*scene*(所有的 JSX 都将渲染在里面) 和一个默认的光线投射([_raycaster_](https://threejs.org/docs/index.html#api/zh/core/Raycaster))
- 自适应容器(通过[react-use-measure](https://github.com/pmndrs/react-use-measure)实现): `scroll: true, debounce: { scroll: 50, resize: 0 }`

以上参数是`Canvas`的默认属性, 通常来说你并不需要去修改他们。

# 对象和属性

你可以使用 Threejs 提供的所有对象和属性，当你遇到问题的时候请查阅[Threejs 文档](https://threejs.org/docs/index.html#manual/zh/introduction/Creating-a-scene)

你可以像下面这种方式传递参数和对象：

```jsx
<mesh
  visible
  userData={{ hello: 'world' }}
  position={new THREE.Vector3(1, 2, 3)}
  rotation={new THREE.Euler(Math.PI / 2, 0, 0)}
  geometry={new THREE.SphereGeometry(1, 16, 16)}
  material={
    new THREE.MeshBasicMaterial({
      color: new THREE.Color('hotpink'),
      transparent: true,
    })
  }
/>
```

上面这种方式的问题在于，所有的属性和对象都会在组件渲染的时候重新生成，为了防止这个问题，你应该声明式地定义这些对象和属性：

```jsx
<mesh
  visible
  userData={{ hello: 'world' }}
  position={[1, 2, 3]}
  rotation={[Math.PI / 2, 0, 0]}
>
  <sphereGeometry args={[1, 16, 16]} />
  <meshStandardMaterial color="hotpink" transparent />
</mesh>
```

## 快捷设置(set)

在 Threejs 中，所有带有`.set()`方法的属性都可以用在标签上直接传值的方法来代替`.set()`函数。例如[THREE.Color.set](https://threejs.org/docs/index.html#api/zh/math/Color.set)可以接受颜色字符串，像这样：`color={new THREE.Color('hotpink')}`，但是通过快捷设置，你可以这样写：`color="hotpink"`。有一些`set`方法可以传多个值，例如[THREE.Vector3](https://threejs.org/docs/index.html#api/zh/math/Vector3.set)，这里我们需要传一个数组`position={[100, 0, 0]}`

## 非三维物体的属性

**V5 新增功能**：所有以“Material”结尾的元素都将自动传入`attach="material"`，所有以“Geometry”结尾的元素都将自动传入`attach="geometry"`。你不用在每一个标签上都写这两个东西了，当然你想手动覆盖也没什么问题。

使用 attach 属性可以将对象通过[`Object.attach()`](https://threejs.org/docs/index.html#api/zh/core/Object3D.attach)绑定到其父对象上，并在组件卸载后取消绑定。也可以将非三维物体([_Object3D_](https://threejs.org/docs/index.html#api/zh/core/Object3D))的一些基本对象（几何体、材质等）放入渲染树中，使它们可被 react 管理和响应。除了对象自带的一些属性，你也可以通过`arg`属性传入构造参数数组，需要注意的是，**如果参数发生变化，该对象和其子对象都会重新构造！**

你也可以直接嵌套基本对象：

```jsx
<mesh>
  <meshBasicMaterial attach="material">
    <texture attach="map" image={img} onUpdate={self => img && (self.needsUpdate = true)} />
```

有时候，`attach`是不够用的。例如，以下示例将`effects`效果附加到父对象`effectComposer`的名为`passes`的数组里。请注意`attachArray`的用法：

```jsx
<effectComposer>
  <renderPass attachArray="passes" scene={scene} camera={camera} />
  <glitchPass attachArray="passes" renderToScreen />
```

您还可以使用`attachObject={[target，name]}`将对象绑定到其父对象的某个属性上，同样，在组件卸载的时候绑定会被取消。下面将添加一个`buffer-attribute`的属性到`parent.attributes.position`。

```jsx
<bufferGeometry attach="geometry">
  <bufferAttribute attachObject={['attributes', 'position']} count={v.length / 3} array={v} itemSize={3} />
```

## 嵌套属性

如果你想访问嵌套属性（例如：`mesh.rotation.x`），只需要使用破折号`-`连接：

```jsx
<mesh
  rotation-x={1}
  material-uniforms-resolution-value={[1 / size.width, 1 / size.height]}
/>
```

## 把已存在的对象放入 scene 中

你可以通过`<primitive />`标签将基本对象放进场景中，并且你依旧可以对`<primitive />`添加属性或者绑定`attach`。

但是千万不要把同一个对象多次添加，这在 Threejs 里面是不被允许的。

```jsx
const mesh = useMemo(() => new THREE.Mesh(), []);
return <primitive object={mesh} position={[0, 0, 0]} />;
```

## 声明式地使用第三方对象

`extend`函数扩展了 three-fiber 的 JSX 元素。

将拓展组件通过`import`引入过后，用首字母小写的驼峰标签来使用扩展组件。

```jsx
import { extend } from 'react-three-fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'
extend({ OrbitControls, TransformControls })

// ...
return (
  <>
    <orbitControls />
    <transformControls />
```

# 自动清理

在 Threejs 中我们需要[手动释放内存资源](https://threejs.org/docs/#manual/zh/introduction/How-to-dispose-of-objects)，但是在 three-fiber 中我们可以借用 React 的生命周期来进行资源回收。three-fiber 将通过调用`object.dispose()`在组件卸载的时候回收所有 Threejs 对象

如果你想手动管理资源（全局或者储存在缓存中），你可以通过在 meshes, materials 等标签上添加`dispose={null}`将自动清理禁用，你也可以直接在最外层组件添加这个属性以全局禁用。

```jsx
const globalGeometry = new THREE.BoxBufferGeometry()
const globalMaterial = new THREE.MeshBasicMaterial()

function Mesh() {
  return (
    <group dispose={null}>
      <mesh geometry={globalGeometry} material={globalMaterial} />
```

# Events

对于一些实现了光线投射 `raycast` 方法的 Threejs 对象（网格、线条等），我们可以通过绑定事件的方式来和他们进行交互。three-fiber 支持鼠标移动，点击和滚动事件。three-fiber 支持的事件包括了浏览器事件和 Threejs 事件（对象，点，距离等）。如果你对 three-fiber 的事件不放心，你可以自己添加[polyfill](https://github.com/jquery/PEP)

此外，还有一个特殊的`onUpdate`事件，每次对象的 props 发生改变的时候都会触发，方便处理`self => (self.verticesNeedUpdate = true)`这样地事情。

另外，`Canvas`组件可以绑定`onPointerMissed`事件，当鼠标在 canvas 内点击， 但是并没有点击到任何 mesh 的时候即会触发。

```jsx
<mesh
  onClick={(e) => console.log('click')}
  onContextMenu={(e) => console.log('context menu')}
  onDoubleClick={(e) => console.log('double click')}
  onWheel={(e) => console.log('wheel spins')}
  onPointerUp={(e) => console.log('up')}
  onPointerDown={(e) => console.log('down')}
  onPointerOver={(e) => console.log('over')}
  onPointerOut={(e) => console.log('out')}
  onPointerEnter={(e) => console.log('enter')}
  onPointerLeave={(e) => console.log('leave')}
  onPointerMove={(e) => console.log('move')}
  onUpdate={(self) => console.log('props have been updated')}
/>
```

## Event data

```jsx
({
  ...DomEvent                   // All the original event data
  ...ThreeEvent                 // All of Three's intersection data
  intersections: Intersect[]    // All intersections
  object: Object3D              // The object that was actually hit
  eventObject: Object3D         // The object that registered the event
  unprojectedPoint: Vector3     // Camera-unprojected point
  ray: Ray                      // The ray that was used to strike the object
  camera: Camera                // The camera that was used in the raycaster
  sourceEvent: DomEvent         // A reference to the host event
  delta: number                 // Initial-click delta
}) => ...
```

## 捕获和冒泡

```jsx
  onPointerDown={e => {
    // 类似于DOM的阻止事件冒泡，根据距离相机的距离，阻止事件冒泡
    e.stopPropagation()
    // 根据pointerId，进行事件捕获
    e.target.setPointerCapture(e.pointerId)
  }}
  onPointerUp={e => {
    e.stopPropagation()
    // 释放事件捕获
    e.target.releasePointerCapture(e.pointerId)
  }}
```

# Hooks

Hooks 只能在被`<Canvas></Canvas>`包裹的组件的内部使用，因为他们依赖于`Canvas`提供给子组件的`context`, 所以以下代码不会生效：

```jsx
function App() {
  const { size } = useThree() // 会报错
  return (
    <Canvas>
      <mesh>
```

正确的使用方式:

```jsx
function SomeComponent() {
  const { size } = useThree()
  return <mesh />
}

function App() {
  return (
    <Canvas>
      <SomeComponent />
```

## useThree

```jsx
useThree(): SharedCanvasContext
```

这个钩子让你可以获取到内部保存的所有基本对象，例如渲染器，场景和摄像机。他还提供了当前 canvas 的视口桌标和画布大小。

这个钩子是响应式的，当你修改任何默认值的的时候，钩子会重新触发。例如当你改变了浏览器窗口的大小，钩子触发，返回新的浏览器大小。

```jsx
import { useThree } from 'react-three-fiber'

const {
  gl,                           // WebGL renderer
  scene,                        // Default scene
  camera,                       // Default camera
  raycaster,                    // Default raycaster
  size,                         // Bounds of the view (which stretches 100% and auto-adjusts)
  aspect,                       // Aspect ratio (size.width / size.height)
  mouse,                        // Current, centered, normalized 2D mouse coordinates
  raycaster,                    // Internal raycaster instance
  clock,                        // THREE.Clock (useful for useFrame deltas)
  invalidate,
  intersect,
  setDefaultCamera,
  viewport,
  forceResize,
} = useThree()

// Reactive viewport bounds, will updated on resize
const { width, height, factor, distance } = viewport
// Viewport can also calculate precise bounds on demand!
const { width, height, factor, distance } = viewport(camera?: THREE.Camera, target?: THREE.Vector3)
// Flags the canvas as "dirty" and forces a single frame
// Use this to inform your canvas of changes when it is set to "invalidateFrameloop"
invalidate()
// Exchanges the default camera
setDefaultCamera(camera)
// Trigger an intersect/raycast as well as event handlers that may respond
intersect(optionalEvent?: PointerEvent)
// Force size/viewport recalculation
forceResize()
```

## useFrame

```jsx
useFrame((callback: (state, delta) => void), (renderPriority: number = 0));
```

这个钩子的第一个参数传入一个回调函数，该回调函数会在 webGl 渲染的每一帧进行调用。用于处理副作用和控制更新等。回调函数接受`state`（和 `useThree`一样）和一个 `delta`（时间增量）。

第二个参数是可选的`renderPriority`(渲染优先级)。渲染优先级非零时会关闭自动渲染，然后根据优先级自己控制渲染。如果有多个具有渲染优先级的帧，他们会按照优先级降序依次执行，类似于 web 的 `z-index`。帧也是可以被 react 控制的，three-fiber 会在组件卸载的时候将他们自动移除。

控制更新：

```jsx
import { useFrame } from 'react-three-fiber';

const controls = useRef();
useFrame((state) => controls.current.update());
return <orbitControls ref={controls} />;
```

控制渲染循环：

```jsx
useFrame(({ gl, scene, camera }) => gl.render(scene, camera), 1);
```

## useResource

```jsx
useResource((optionalRef = undefined));
```

通过 React 的`useRef`对一些可复用的声明式资源进行引用，然后就可以在其他对象中分享或者复用该资源。

```jsx
import { useResource } from 'react-three-fiber'

const material = useResource()
return (
  <meshBasicMaterial ref={material} />
  <mesh material={material.current} />
  <mesh material={material.current} />
  <mesh material={material.current} />
)
```

## useUpdate

```jsx
useUpdate(callback, dependencies, (optionalRef = undefined));
```

当需要强制更新对象的时候：

```jsx
import { useUpdate } from 'react-three-fiber';

const ref = useUpdate(
  (geometry) => {
    geometry.addAttribute('position', getVertices(x, y, z));
    geometry.attributes.position.needsUpdate = true;
  },
  [x, y, z] // 监听的参数发生变化的时候强制执行回调函数。
);
return <bufferGeometry ref={ref} />;
```

## useLoader

```jsx
useLoader(loader, url: string | string[], extensions?, xhr?)
```

这个钩子让你在使用 Threejs 的 loader 时更容易处理回调和错误信息

```jsx
import React, { Suspense } from 'react';
import { useLoader } from 'react-three-fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function Asset({ url }) {
  const gltf = useLoader(GLTFLoader, url);
  return <primitive object={gltf.scene} />;
}

<Suspense fallback={<Cube />}>
  <Asset url="/spaceship.gltf" />
</Suspense>;
```

你可以给你想使用的 loader 添加回调：

```jsx
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

useLoader(GLTFLoader, url, (loader) => {
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('/draco-gltf/');
  loader.setDRACOLoader(dracoLoader);
});
```

他还可以异步并行发出多个请求：

```jsx
const [bumpMap, specMap, normalMap] = useLoader(TextureLoader, [
  url1,
  url2,
  url2,
]);
```

# 额外的功能

```jsx
import {
  addEffect, // Adds a global render callback which is called each frame
  addAfterEffect, // Adds a global after-render callback which is called each frame
  addTail, // Adds a global callback which is called when rendering stops
  invalidate, // Forces view global invalidation
  extend, // Extends the native-object catalogue
  createPortal, // Creates a portal (it's a React feature for re-parenting)
  render, // Internal: Renders three jsx into a scene
  unmountComponentAtNode, // Internal: Unmounts root scene
  applyProps, // Internal: Sets element properties
  forceResize, // Internal: Force size/viewport recalculation of all canvases
} from 'react-three-fiber';
```

# Gotchas

## 使用来自外部`provider`提供的上下文

目前 React context[不能在两个渲染器之间方便地使用](https://github.com/react-spring/react-three-fiber/issues/43)，这是 React 的问题。如果 react-dom 提供了`Provider`，您将无法在`<Canvas>`中使用它。如果你不想用状态管理库（如 Redux），那么[zustand](https://github.com/react-spring/zustand)可能是最好的解决方案，否则您可以通过转发您想获取的上下文对象来解决它：

```jsx
function App() {
  const value = useContext(context)
  return (
    <Canvas>
      <context.Provider value={value}>
        {/* children can now read state from context */}
```
