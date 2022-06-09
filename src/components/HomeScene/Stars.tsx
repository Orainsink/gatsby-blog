import { memo, ReactElement } from 'react';
import { Vector3 } from 'three';

import { arr, random } from '../../utils/utils';

const blocks: ReactElement[] = arr(20).map((_, i) => (
  <mesh
    key={i}
    position={new Vector3(random(-50, 50), random(-100, 100), random(-50, 0))}
    scale={new Vector3(random(0.5, 1), random(0.1, 1), 1)}
  >
    <planeGeometry args={[5, 2]}></planeGeometry>
    <meshLambertMaterial color="#666666"></meshLambertMaterial>
  </mesh>
));

const fiveHundredStars = ((): [ArrayLike<number>, number] => {
  let tmpArr: number[] = [];
  arr(500).forEach(() => {
    tmpArr.push(random(-50, 50));
    tmpArr.push(random(-100, 100));
    tmpArr.push(random(-50, 100));
  });
  return [new Float32Array(tmpArr), 3];
})();

const Stars = (): ReactElement => (
  <group>
    {blocks}
    <points>
      <pointsMaterial color="#ffffff" size={0.5} />
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={fiveHundredStars} />
      </bufferGeometry>
    </points>
  </group>
);
export default memo(Stars);
