import * as React from 'react';
import {
  Suspense,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  useState,
} from 'react';
import ReactDOM from 'react-dom';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import {
  Canvas,
  useLoader,
  useResource,
  useFrame,
  useThree,
} from 'react-three-fiber';
import styles from '../styles/Dynamic.module.less';
import random from '../utils/random';
import gsap from 'gsap';
import { yoyo } from '../utils/utils';
import { ImageFormat } from '../../graphql-types';

interface Props {}

let cameraShakeY = 0;
let mouseX = 0;

const Modal = () => {
  const url = 'https://foolishrobot.oss-cn-beijing.aliyuncs.com/rock.gltf';
  const gltf = useLoader(GLTFLoader, url);
  const { camera: defaultCamera, setDefaultCamera, scene } = useThree();
  const camera = useRef(null);
  const stripsGroup = useRef(null);
  const lightRef = useRef(null);

  // 初始化相机,暂时关闭迷雾
  useEffect(() => {
    setDefaultCamera(camera.current);
    scene.fog = new THREE.FogExp2('#0a0a0a', 0.0025);
    return () => {
      setDefaultCamera(defaultCamera);
    };
  }, []);

  // 生成场景方块, 因为不知道merge怎么用react-three-fiber写,所以这里直接控制three
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

  // 月亮上下移动的动画实例
  const tween = useMemo(
    () =>
      gsap.to(
        { x: -2, z: -45 },
        {
          duration: 2,
          x: 2,
          z: -35,
          paused: true,
          onUpdate: function () {
            if (lightRef.current)
              lightRef.current.position.z = this._targets[0].z;
          },
          onComplete: yoyo,
          onReverseComplete: yoyo,
        }
      ),
    [yoyo, lightRef.current]
  );

  // 绑定及卸载动画
  useEffect(() => {
    tween.resume();
    return () => {
      tween.kill();
    };
  }, []);

  // 渲染循环, 控制镜头偏移, 月亮偏移
  useFrame(({ gl, scene, camera }) => {
    camera.position.y += Math.cos(cameraShakeY) / 50;
    camera.position.x += (mouseX * 5 - camera.position.x) * 0.03;
    cameraShakeY += 0.02;

    gl.render(scene, camera);
  }, 1);

  // 用于遍历的工具数组
  const arr = useCallback(
    (length) => [...new Array(length).join(',').split(',')],
    []
  );

  const handlePointerMove = (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
  };

  return (
    <group onPointerMove={handlePointerMove}>
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
      <pointLight
        attach="light"
        args={['#ffffff', 15, 70, 2]}
        position={[0, 20, -40]}
        ref={lightRef}
      >
        <mesh attach="mesh" position={[0, 0, 0]}>
          <meshBasicMaterial attach="material" color="#ffffff" />
          <sphereGeometry attach="geometry" args={[5, 20, 20]} />
        </mesh>
      </pointLight>
      {/* stars */}
      <group ref={stripsGroup}>
        <points>
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
        <bufferGeometry attach="geometry" {...gltf.__$[1].geometry} />
        <meshLambertMaterial
          attach="material"
          {...gltf.__$[1].material}
          flatShading
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};

const Dynamic: React.FC<Props> = () => {
  return (
    <div className={styles.wrapper}>
      <Canvas>
        <Suspense fallback={null}>
          <Modal />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default React.memo(Dynamic);
