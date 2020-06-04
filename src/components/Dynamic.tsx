import * as React from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useLoader } from 'react-three-fiber';
import styles from '../styles/Dynamic.module.less';
// import yoyo from '../utils/yoyoUtil';
import rock from '../../content/assets/rock.json';

interface Props {}
const Dynamic: React.FC<Props> = () => {
  React.useEffect(() => {
    THREE.Cache.enabled = true;
  }, []);
  const rockGeo = useLoader(THREE.ObjectLoader, rock);

  return (
    <div className={styles.wrapper}>
      <Canvas>
        <group>
          <pointLight position={[10, 10, 10]} />
          <mesh position={[0, 11, -40]}>
            <meshBasicMaterial attach="material" color="#0a0a0a" fog={false} />
            <sphereGeometry attach="geometry" args={[0, 11, -40]} />
          </mesh>
          <mesh geometry={rockGeo} position={[-70, 0, -30]}>
            <meshLambertMaterial
              attach="material"
              color="#0a0a0a"
              side={THREE.DoubleSide}
              flatShading
            />
          </mesh>
        </group>
      </Canvas>
    </div>
  );
};

export default React.memo(Dynamic);
