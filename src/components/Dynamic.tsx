import * as React from 'react';
import { Canvas, useFrame } from 'react-three-fiber';
import styles from '../styles/Dynamic.module.less';

interface Props {}
const Dynamic: React.FC<Props> = () => {
  return (
    <Canvas className={styles.wrapper}>
      <pointLight position={[10, 10, 10]} />
      <mesh>
        <sphereBufferGeometry attach="geometry" />
        <meshStandardMaterial attach="material" color="hotpink" />
      </mesh>
    </Canvas>
  );
};

export default React.memo(Dynamic);
