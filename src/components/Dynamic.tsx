import * as React from 'react';
import { Suspense, useEffect, useRef, useMemo, useCallback } from 'react';
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
import random from '../utils/randomUtil';
import { FogExp2 } from 'three';

interface Props {}

const Modal = () => {
  const url = 'https://foolishrobot.oss-cn-beijing.aliyuncs.com/rock.gltf';
  const gltf = useLoader(GLTFLoader, url);
  console.log(gltf);
  const { camera: defaultCamera, setDefaultCamera, scene } = useThree();
  const camera = useRef(null);

  useEffect(() => {
    scene.fog = new THREE.FogExp2('#0a0a0a', 0.01);
    setDefaultCamera(camera.current);
    return () => {
      setDefaultCamera(defaultCamera);
    };
  }, []);

  const arr = useCallback(
    (length) => [...new Array(length).join(',').split(',')],
    []
  );
  return (
    <group>
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
      <pointLight
        attach="light"
        args={['#ffffff', 4, 0, 0]}
        position={[0, 20, -40]}
      ></pointLight>
      {/* stars */}
      <group>
        <points>
          <pointsMaterial color="#ffffff" />
          <geometry
            vertices={arr(1000).map(
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
      {/* lines */}
      <group>
        {arr(20).map(() => (
          <line
            position={[random(-20, 20), random(-100, 100), random(-50, 50)]}
          >
            <lineBasicMaterial />
            <geometry
              vertices={[
                new THREE.Vector3(0, 0.2, 0),
                new THREE.Vector3(0, 0, 0),
              ]}
            />
          </line>
        ))}
      </group>
      {/* floor */}
      <primitive
        attach="mesh"
        object={gltf.scene}
        position={[-70, 0, -30]}
        rotation={[0.3, 0, 0]}
      />
      {/* moon */}
      <mesh attach="mesh" position={[0, 20, -40]}>
        <meshBasicMaterial attach="material" color="#ffffff" />
        <sphereGeometry attach="geometry" args={[5, 20, 20]} />
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
