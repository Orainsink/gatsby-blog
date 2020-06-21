/**
 * 博客页面的加载页面
 */
import React, {
  Suspense,
  useEffect,
  useRef,
  useCallback,
  useState,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Canvas, useLoader, useFrame, useThree } from 'react-three-fiber';
import styles from '../styles/Dynamic.module.less';
import random from '../utils/random';
import Text from './Textpanel';
import classnames from 'classnames';
import Moon from './Moon';

interface Props {}

let cameraShakeY = 0;
let mouseX = 0;
let mouseY = 0;
const url = 'https://foolishrobot.oss-cn-beijing.aliyuncs.com/rock.gltf';
const hfUrl =
  'https://free-api.heweather.net/s6/weather/now?&location=auto_ip&key=8b283eca0bbd4063b9184f872adc1360';

interface IProps {
  isScene: boolean;
  _handleScene: () => void;
}
/**模型 */
const Modal = (props: IProps) => {
  const { isScene, _handleScene } = props;
  const gltf = useLoader(GLTFLoader, url);
  const { camera: defaultCamera, setDefaultCamera, scene } = useThree();
  const camera = useRef(null);
  const stripsGroup = useRef(null);

  const [words, setWords] = useState(null);

  // 初始化相机
  useEffect(() => {
    setDefaultCamera(camera.current);
    scene.fog = new THREE.FogExp2('#0a0a0a', 0.0025);

    return () => {
      setDefaultCamera(defaultCamera);
    };
  }, []);

  // 根据IP获取当地天气信息
  useEffect(() => {
    fetch(hfUrl, {
      headers: {
        'content-type': 'application/json',
      },
      method: 'GET',
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        const data = res.HeWeather6[0];
        const words = [
          data.basic.location, //城市名
          data.now.tmp + '℃' + ' ' + data.now.cond_txt, // 温度
        ];
        setWords(words);
      });
  }, []);

  // 生成场景方块, 因为不知道merge()怎么用react-three-fiber写,所以这里直接控制three
  useEffect(() => {
    const stripsGeometry = new THREE.Geometry();
    const stripGeometry = new THREE.PlaneGeometry(5, 2);
    const stripMaterial = new THREE.MeshLambertMaterial({ color: '#666666' });
    for (let i = 0; i < 20; i++) {
      const stripMesh = new THREE.Mesh(stripGeometry, stripMaterial);
      stripMesh.position.set(
        random(-50, 50),
        random(-100, 100),
        random(-50, 0)
      );
      stripMesh.scale.set(random(0.5, 1), random(0.1, 1), 1);
      stripMesh.updateMatrix();
      stripsGeometry.merge(stripMesh.geometry, stripMesh.matrix);
    }
    const totalMesh = new THREE.Mesh(stripsGeometry, stripMaterial);

    stripsGroup.current.add(totalMesh);
  }, []);

  // 渲染循环, 控制镜头偏移, 月亮偏移
  useFrame(({ gl, scene, camera }) => {
    // 隐藏时禁止所有动画
    if (!isScene) return;

    camera.position.y +=
      Math.cos(cameraShakeY) / 50 - (mouseY * 5 + camera.position.y) * 0.03;
    camera.position.x += (mouseX * 5 - camera.position.x) * 0.03;
    cameraShakeY += 0.02;

    gl.render(scene, camera);
  }, 1);

  // 用于遍历的工具数组
  const arr = useCallback(
    (length) => [...new Array(length).join(',').split(',')],
    []
  );
  // 镜头随鼠标左右晃动
  const _handlePointerMove = useCallback(
    (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    },
    [window.innerWidth, window.innerHeight]
  );

  const _handleWheel = useCallback((e) => {
    if (e.deltaY > 0) {
      _handleScene();
    }
  }, []);

  return (
    <group onPointerMove={_handlePointerMove} onWheel={_handleWheel}>
      <perspectiveCamera
        attach="camera"
        args={[60, 1, 1, 4000]}
        position={[0, 0, 40]}
        ref={camera}
      />
      <directionalLight
        attach="light"
        args={['#ffffff', 0.5]}
        position={[0.2, 1, 0.5]}
      />
      {/* moon light */}
      <Moon _handleScene={_handleScene} isScene={isScene} />

      {/* stars */}
      <group ref={stripsGroup}>
        <points attach="points">
          <pointsMaterial attach="material" color="#ffffff" size={0.5} />
          <geometry
            attach="geometry"
            vertices={arr(500).map(
              () =>
                new THREE.Vector3(
                  random(-50, 50),
                  random(-100, 100),
                  random(-50, 100)
                )
            )}
          />
        </points>
      </group>
      {/* floor */}
      <mesh position={[-70, -20, -30]} rotation={[0.3, 0, 0]}>
        {/* @ts-ignore */}
        <bufferGeometry attach="geometry" {...gltf.__$[1].geometry} />
        <meshLambertMaterial
          attach="material"
          // @ts-ignore
          {...gltf.__$[1].material}
          flatShading
          side={THREE.DoubleSide}
        />
      </mesh>
      {words ? <Text words={words} position={[0, -5, 0]} /> : null}
      <Text words={['少熬夜,多运动']} position={[0, -18, -20]} />
    </group>
  );
};
/**首页webGl动画 */
const Dynamic: React.FC<Props> = () => {
  const { scene, trigger } = useSelector((state) => state);
  const dispatch = useDispatch();

  const _handleScene = useCallback(() => {
    dispatch({ type: 'SCENE', payload: false });
  }, [dispatch]);

  return (
    <div
      className={classnames(
        styles.wrapper,
        !scene ? styles.disActive : trigger ? styles.trigger : styles.active
      )}
    >
      <Canvas>
        <Suspense fallback={null}>
          <Modal isScene={scene} _handleScene={_handleScene} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default React.memo(Dynamic);
