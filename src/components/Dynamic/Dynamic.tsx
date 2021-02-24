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
  PerspectiveCamera,
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Canvas, useLoader, useFrame, useThree } from 'react-three-fiber';
import { arr, random } from '../../utils/utils';
import { useStaticQuery, graphql } from 'gatsby';
import Text from './TextComponent';
import Moon from './Moon';
import { useBackgroundColor } from '../../hooks';
import { iRootState } from '../../redux/store';
import isClient from '../../utils/isClient';
import { ResizeObserver } from '@juggle/resize-observer';

let cameraShakeY = 0;
let mouseX = 0;
let mouseY = 0;
const hfUrl =
  'https://free-api.heweather.net/s6/weather/now?&location=auto_ip&key=' +
  process.env.GATSBY_HEWEATHER_KEY;
const fiveHundredStars = arr(500).map(
  () => new Vector3(random(-50, 50), random(-100, 100), random(-50, 100))
);

interface ModalProps {
  isScene: boolean;
  url: string;
  onCloseScene: () => void;
}
interface Data {
  file: {
    publicURL: string;
  };
}

/**Modal for Dynamic component */
const Modal = React.memo((props: ModalProps) => {
  const { isScene, onCloseScene, url } = props;
  const { nodes, materials } = useLoader(GLTFLoader, url);
  const { camera: defaultCamera, setDefaultCamera, scene } = useThree();
  const camera = useRef<PerspectiveCamera>(null);
  const stripsGroup = useRef<Mesh>(null);
  const [words, setWords] = useState<string[]>(null);

  useBackgroundColor();

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
  const fetchWeather = useCallback(async () => {
    try {
      const promise = await fetch(hfUrl, {
        headers: {
          'content-type': 'application/json',
        },
        method: 'GET',
      });
      const res = await promise.json();

      const data = res.HeWeather6[0];
      const words = [
        data.basic.location, //city
        data.now.tmp + '℃ ' + data.now.cond_txt, // temperature
      ];
      setWords(words);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    fetchWeather();
    // eslint-disable-next-line
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
  const _handlePointerMove = (e: React.PointerEvent) => {
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
      {/* moon light */}
      <Moon onCloseScene={onCloseScene} />

      {/* stars */}
      <group ref={stripsGroup}>
        <points attach="points">
          <pointsMaterial attach="material" color="#ffffff" size={0.5} />
          <geometry attach="geometry" vertices={fiveHundredStars} />
        </points>
      </group>
      {/* floor */}
      <mesh position={[-70, -20, -30]} rotation={[0.3, 0, 0]}>
        {/* @ts-ignore */}
        <bufferGeometry attach="geometry" {...nodes.mesh_0.geometry} />
        <meshLambertMaterial
          attach="material"
          {...materials['']}
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
const Dynamic = () => {
  const { scene } = useSelector((state: iRootState) => state);
  const dispatch = useDispatch();

  const _handleScene = useCallback(() => {
    dispatch({ type: 'SCENE', payload: false });
  }, [dispatch]);

  const data: Data = useStaticQuery(graphql`
    {
      file(absolutePath: { regex: "/rock.gltf/" }) {
        publicURL
      }
    }
  `);
  const url = data?.file.publicURL;

  if (!isClient) return null;

  return (
    <Canvas resize={{ polyfill: ResizeObserver }}>
      <Suspense fallback={null}>
        <Modal isScene={scene} onCloseScene={_handleScene} url={url} />
      </Suspense>
    </Canvas>
  );
};

export default React.memo(Dynamic);
