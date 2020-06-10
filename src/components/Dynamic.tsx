/**
 * 博客页面的加载页面
 */
import * as React from 'react';
import {
  Suspense,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  useState,
  useContext,
} from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Canvas, useLoader, useFrame, useThree } from 'react-three-fiber';
import styles from '../styles/Dynamic.module.less';
import random from '../utils/random';
import gsap from 'gsap';
import { yoyo } from '../utils/utils';
import Text from './Textpanel';
import { MainContext } from '../context/MainContext';
import classnames from 'classnames';
import { Scene } from 'three';

interface Props {}

let cameraShakeY = 0;
let mouseX = 0;
const url = 'https://foolishrobot.oss-cn-beijing.aliyuncs.com/rock.gltf';
const hfUrl =
  'https://free-api.heweather.net/s6/weather/now?&location=auto_ip&key=8b283eca0bbd4063b9184f872adc1360';

interface IProps {
  isScene: boolean;
  _handleClickMoon: () => void;
}

const Modal = (props: IProps) => {
  const { isScene, _handleClickMoon } = props;
  const gltf = useLoader(GLTFLoader, url);
  const { camera: defaultCamera, setDefaultCamera, scene } = useThree();
  const camera = useRef(null);
  const stripsGroup = useRef(null);
  const lightRef = useRef(null);
  const moonRef = useRef(null);
  const [words, setWords] = useState(null);
  const [active, setActive] = useState(false);

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
  //
  const moonTween = useMemo(() => {
    if (moonRef.current)
      return gsap.to(moonRef.current.scale, {
        duration: 0.5,
        x: 1.5,
        y: 1.5,
        z: 1.5,
        paused: true,
      });
  }, [moonRef.current]);
  const lightTween = useMemo(() => {
    if (lightRef.current)
      return gsap.to(lightRef.current, {
        duration: 0.5,
        intensity: 20,
        distance: 80,
        paused: true,
      });
  }, [lightRef.current]);

  // 绑定及卸载动画
  useEffect(() => {
    tween.resume();
    return () => {
      tween.kill();
    };
  }, []);
  useEffect(() => {
    if (active) {
      moonTween.play();
      lightTween.play();
    } else {
      if (moonTween) {
        moonTween.reverse();
        lightTween.reverse();
      }
    }

    return () => {
      if (moonTween) {
        moonTween.kill();
        lightTween.kill();
      }
    };
  }, [active]);

  // 渲染循环, 控制镜头偏移, 月亮偏移
  useFrame(({ gl, scene, camera }) => {
    // 隐藏时禁止所有动画
    if (!isScene) return;

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
  // 镜头随鼠标左右晃动
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
      />
      <mesh
        attach="mesh"
        onPointerOver={() => setActive(true)}
        onPointerOut={() => setActive(false)}
        onClick={() => {
          _handleClickMoon();
        }}
        ref={moonRef}
        position={[0, 20, -40]}
      >
        <meshBasicMaterial attach="material" color="#ffffff" />
        <sphereGeometry attach="geometry" args={[5, 20, 20]} />
      </mesh>
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
        // @ts-ignore
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

const Dynamic: React.FC<Props> = () => {
  const [state, dispatch] = useContext(MainContext);

  const _handleClickMoon = useCallback(() => {
    dispatch({ type: 'SCENE', payload: false });
  }, [dispatch]);

  return (
    <div
      className={classnames(
        styles.wrapper,
        !state.scene
          ? styles.disActive
          : state.trigger
          ? styles.trigger
          : styles.active
      )}
    >
      <Canvas>
        <Suspense fallback={null}>
          <Modal isScene={state.scene} _handleClickMoon={_handleClickMoon} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default React.memo(Dynamic);
