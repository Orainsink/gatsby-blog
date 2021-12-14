---
title: react-three-fiber实用代码案例
date: 2020-10-10 17:07:45
description: 翻译的官网的一些实用代码案例，后续会在自己的实践基础上进行添加和修改
tags: [react, three, 文档]
categories: tech
---

> 翻译的官网的一些实[用代码案例](https://github.com/pmndrs/react-three-fiber/blob/master/recipes.md)，后续会在自己的实践基础上进行添加和修改。

## 搭配 react-spring 使用

[react-spring](https://www.react-spring.io/) 对 react-three-fiber 的支持良好，开箱即用不需要额外插件:

```jsx
import { Canvas } from 'react-three-fiber';
import { a, useSpring } from '@react-spring/three';

function Box(props) {
  const [active, setActive] = useState(0);

  // 创建一个公共spring对象，后面我们往里面插值
  const { spring } = useSpring({
    spring: active,
    config: { mass: 5, tension: 400, friction: 50, precision: 0.0001 },
  });

  // 向公共spring对象插值
  const scale = spring.to([0, 1], [1, 5]);
  const rotation = spring.to([0, 1], [0, Math.PI]);
  const color = spring.to([0, 1], ['#6246ea', '#e45858']);

  return (
    // 用 react-spring 的 <a.x></a.x> 来给组件添加动画
    <a.mesh
      rotation-y={rotation}
      scale-x={scale}
      scale-z={scale}
      onClick={() => setActive(Number(!active))}
    >
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <a.meshStandardMaterial roughness={0.5} attach="material" color={color} />
    </a.mesh>
  );
}
```

[CodeSandbox](https://8ckyf.csb.app/)

## 处理副作用（劫持主渲染循环）

管理副作用通常会比较麻烦。把下面的组件放到一个`scene`中，`useEffect`就会在`size`发生变化的时候生效。

```jsx
import { extend, Canvas, useFrame, useThree } from 'react-three-fiber'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass'
extend({ EffectComposer, RenderPass, GlitchPass })

function Effects() {
  const { gl, scene, camera, size } = useThree()
  const composer = useRef()
  useEffect(() => void composer.current.setSize(size.width, size.height), [size])
  useFrame(() => composer.current.render(), 1)
  return (
    <effectComposer ref={composer} args={[gl]}>
      <renderPass attachArray="passes" args={[scene, camera]} />
      <glitchPass attachArray="passes" renderToScreen />
```

## 手动设置摄像机

```jsx
function Camera(props) {
  const ref = useRef()
  const { setDefaultCamera } = useThree()
  // 将相机传递给Threejs系统
  useEffect(() => void setDefaultCamera(ref.current), [])
  // 每一帧都更新相机
  useFrame(() => ref.current.updateMatrixWorld())
  return <perspectiveCamera ref={ref} {...props} />
}

<Canvas>
  <Camera position={[0, 0, 10]} />
```

## 平铺视图 (渲染多个 scene)

`useFrame`允许用钩子函数的方式拆分组件。这使得一个组件可以在另一个组件的内容上进行渲染。这些操作的顺序是由你给它的优先级决定的，高优先级意味着它先最先渲染。

```jsx
function Main() {
  const scene = useRef()
  const { camera } = useThree()
  useFrame(({ gl }) => void ((gl.autoClear = true), gl.render(scene.current, camera)), 100)
  return <scene ref={scene}>{/* ... */}</scene>
}

function HeadsUpDisplay() {
  const scene = useRef()
  const { camera } = useThree()
  useFrame(({ gl }) => void ((gl.autoClear = false), gl.clearDepth(), gl.render(scene.current, camera)), 10)
  return <scene ref={scene}>{/* ... */}</scene>
}

function App() {
  const camera = useRef()
  const { size, setDefaultCamera } = useThree()
  useEffect(() => void setDefaultCamera(camera.current), [])
  useFrame(() => camera.current.updateMatrixWorld())
  return (
    <>
      <perspectiveCamera
        ref={camera}
        aspect={size.width / size.height}
        radius={(size.width + size.height) / 4}
        onUpdate={self => self.updateProjectionMatrix()}
      />
      <Main />
      <HeadsUpDisplay />
```

## 管理命令式代码

将命令式代码用`useMemo`包裹，让你的代码更简洁，同时减少函数组件重计算时的计算量

```jsx
function Extrusion({ start = [0, 0], paths, ...props }) {
  const shape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(...start);
    paths.forEach((path) => shape.bezierCurveTo(...path));
    return shape;
  }, [start, paths]);

  return (
    <mesh>
      <extrudeGeometry attach="geometry" args={[shape, props]} />
      <meshPhongMaterial attach="material" />
    </mesh>
  );
}

<Extrusion
  start={[25, 25]}
  paths={[
    [25, 25, 20, 0, 0, 0],
    [30, 0, 30, 35, 30, 35],
    [30, 55, 10, 77, 25, 95],
  ]}
  bevelEnabled
  amount={8}
/>;
```

## ShaderMaterials（阴影）

```jsx
function CrossFade({ url1, url2, disp }) {
  const [texture1, texture2, dispTexture] = useLoader(THREE.TextureLoader, [url1, url2, disp])

  return (
    <mesh>
      <planeBufferGeometry attach="geometry" args={[1, 1]} />
      <shaderMaterial
        attach="material"
        args={[CrossFadeShader]}
        uniforms-texture-value={texture1}
        uniforms-texture2-value={texture2}
        uniforms-disp-value={dispTexture}
        uniforms-dispFactor-value={0.5} />
    </mesh>
  )
```

## Re-parenting（翻译成换父元素？）

react-three-fiber 支持[portals](https://zh-hans.reactjs.org/docs/portals.html). 你可以用这个功能，把试图的一部分传递到另一个容器里. 点击 [这里](https://codesandbox.io/s/three-fibre-useFrame-test-fojbq) 可以查看一个小 demo.

```jsx
import { createPortal } from 'react-three-fiber'

function Component() {
  // “target”目标可以是一个 three 对象，比如 group 等
  return createPortal(<mesh />, target)
```

## 仅在需要时渲染

默认情况下，它的渲染像一个 60fps 的电子游戏。当`invalidateFrameloop`为`true`时渲染会停止， 为`false`时接着之前停止的状态开始渲染。

```jsx
<Canvas invalidateFrameloop ... />
```

有时需要手动渲染单个帧，例如在处理异步内容时：

```jsx
const { invalidate } = useThree();
const texture = useMemo(() => loader.load(url, invalidate), [url]);
```

对于相机控制，这里有一个[sandbox 例子](https://codesandbox.io/s/r3f-invalidate-frameloop-fps-e0g9z)，关键代码如下：

```jsx
const Controls = () => {
  const { camera, gl, invalidate } = useThree();
  const ref = useRef();
  useFrame(() => ref.current.update());
  useEffect(() => void ref.current.addEventListener('change', invalidate), []);
  return <orbitControls ref={ref} args={[camera, gl.domElement]} />;
};
```

## 支持 VR

添加`vr`属性将启用 Three 的 vr 模式，并将渲染循环切换到`gl.setAnimationLoop`，详情参考[Three 官方文档](https://threejs.org/docs/index.html#manual/en/introduction/How-to-create-VR-content)。

```jsx
import * as VR from '!exports-loader?WEBVR!three/examples/vr/WebVR';
import { Canvas } from 'react-three-fiber';

<Canvas
  vr
  onCreated={({ gl }) => document.body.appendChild(VR.createButton(gl))}
/>;
```

## 减小包的大小

Threejs 的体积相当大，目前 tree-shaking 并不能产生你希望的结果。但您可以创建自己的导出文件并将其别名为“three”。这样你就可以把它的体积减小到到 80-50kb，或者更小，这取决于你需要哪些东西。参考：https://gisthub.com/drcmda/974f84240a329fa8a9ce04bbdaffc04d

## Usage with React Native

你可以通过 Expo's WebGL package ([expo-gl](https://docs.expo.io/versions/latest/sdk/gl-view/))，用 `react-three-fiber` 构建多端 apps（native 和 web）

> 💡 **Bootstrap**: `npx create-react-native-app -t with-react-three-fiber`

请务必用 IOS 和安卓实机进行测试，因为模拟器在运行图像繁重的应用程序时可能出现问题。

### 手动安装

```jsx
# Install the Expo CLI

npm i -g expo-cli

# Create a new project

expo init myapp
cd myapp

# Install packages

yarn add expo-gl expo-three three@latest react-three-fiber@beta

# Start the project

yarn start
```
