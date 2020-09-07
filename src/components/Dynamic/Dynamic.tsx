import React, {
  Suspense,
  useEffect,
  useRef,
  useCallback,
  useState,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  FogExp2,
  Vector3,
  DoubleSide,
  Geometry,
  PlaneGeometry,
  MeshLambertMaterial,
  Mesh,
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Canvas, useLoader, useFrame, useThree } from 'react-three-fiber';
import styles from '../../styles/Dynamic.module.less';
import classnames from 'classnames';
import { ReactComponent as ArrowSvg } from '../../assets/img/arrow.svg';
import ReactScrollWheelHandler from 'react-scroll-wheel-handler';
import { arr, random } from '../../utils/utils';
import loadable from '@loadable/component';
const Text = loadable(() => import('./TextComponent'));
const Moon = loadable(() => import('./Moon'));

let cameraShakeY = 0;
let mouseX = 0;
let mouseY = 0;
const url = 'https://foolishrobot.oss-cn-beijing.aliyuncs.com/rock.gltf';
const hfUrl =
  'https://free-api.heweather.net/s6/weather/now?&location=auto_ip&key=' +
  process.env.GATSBY_HEWEATHER_KEY;

interface IModal {
  isScene: boolean;
  onCloseScene: () => void;
}

/**Modal for Dynamic component */
const Modal = React.memo((props: IModal) => {
  const { isScene, onCloseScene } = props;
  const gltf = useLoader(GLTFLoader, url);
  const { camera: defaultCamera, setDefaultCamera, scene } = useThree();
  const camera = useRef(null);
  const stripsGroup = useRef(null);
  const [words, setWords] = useState(null);

  // set default camera, and scene fog
  useEffect(() => {
    setDefaultCamera(camera.current);
    scene.fog = new FogExp2('#0a0a0a', 0.0025);

    return () => {
      setDefaultCamera(defaultCamera);
    };
    // eslint-disable-next-line
  }, []);

  /**
   * fetch weather data by IP
   * 天气API
   * https://dev.heweather.com/docs/api/overview
   */
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
          data.basic.location, //city
          data.now.tmp + '℃ ' + data.now.cond_txt, // temperature
        ];
        setWords(words);
      });
  }, []);

  useEffect(() => {
    const stripsGeometry = new Geometry();
    const stripGeometry = new PlaneGeometry(5, 2);
    const stripMaterial = new MeshLambertMaterial({ color: '#666666' });
    for (let i = 0; i < 20; i++) {
      const stripMesh = new Mesh(stripGeometry, stripMaterial);
      stripMesh.position.set(
        random(-50, 50),
        random(-100, 100),
        random(-50, 0)
      );
      stripMesh.scale.set(random(0.5, 1), random(0.1, 1), 1);
      stripMesh.updateMatrix();
      stripsGeometry.merge(stripMesh.geometry, stripMesh.matrix);
    }
    const totalMesh = new Mesh(stripsGeometry, stripMaterial);

    stripsGroup.current.add(totalMesh);
  }, []);

  // animation frame
  useFrame(({ gl, scene, camera }) => {
    // Stop all animations when scene is hidden
    if (!isScene) return;

    camera.position.y +=
      Math.cos(cameraShakeY) / 50 - (mouseY * 5 + camera.position.y) * 0.03;
    camera.position.x += (mouseX * 5 - camera.position.x) * 0.03;
    cameraShakeY += 0.02;

    gl.render(scene, camera);
  }, 1);

  // shake camera
  const _handlePointerMove = (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = (e.clientY / window.innerHeight) * 2 - 1;
  };

  return (
    <group onPointerMove={_handlePointerMove}>
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
      <Moon onCloseScene={onCloseScene} />

      {/* stars */}
      <group ref={stripsGroup}>
        <points attach="points">
          <pointsMaterial attach="material" color="#ffffff" size={0.5} />
          <geometry
            attach="geometry"
            vertices={arr(500).map(
              () =>
                new Vector3(
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
          side={DoubleSide}
        />
      </mesh>
      {words ? <Text words={words} position={[0, -5, 0]} /> : null}
      <Text words={['少熬夜,多运动']} position={[0, -18, -20]} />
      <Text words={["Orainsink's Blog"]} position={[0, 22, -10]} />
    </group>
  );
});
/** webGl wrapper  */
const Dynamic: React.FC = () => {
  const { scene, trigger } = useSelector((state) => state);
  const dispatch = useDispatch();

  const _handleScene = useCallback(() => {
    dispatch({ type: 'SCENE', payload: false });
  }, [dispatch]);

  useEffect(() => {
    setInterval(() => {
      document.body.style.background = '#efefef';
    }, 500);
  }, []);

  return (
    <>
      <ReactScrollWheelHandler downHandler={_handleScene}>
        <div
          className={classnames(
            styles.wrapper,
            !scene ? styles.disActive : trigger ? styles.trigger : styles.active
          )}
        >
          <Canvas>
            <Suspense fallback={null}>
              <Modal isScene={scene} onCloseScene={_handleScene} />
            </Suspense>
          </Canvas>
          <ArrowSvg className={styles.arrow} onClick={_handleScene} />
        </div>
      </ReactScrollWheelHandler>
    </>
  );
};

export default React.memo(Dynamic);
