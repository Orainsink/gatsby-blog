import React, { useMemo } from 'react';
import { arr, random } from '../../utils/utils';
import { Vector3 } from 'three';

const Stars = () => {
  const blocks = useMemo(
    () =>
      arr(20).map(() => (
        <mesh
          position={
            new Vector3(random(-50, 50), random(-100, 100), random(-50, 0))
          }
          scale={new Vector3(random(0.5, 1), random(0.1, 1), 1)}
        >
          <planeGeometry args={[5, 2]}></planeGeometry>
          <meshLambertMaterial color="#666666"></meshLambertMaterial>
        </mesh>
      )),
    []
  );

  const fiveHundredStars = useMemo<[ArrayLike<number>, number]>(() => {
    let tmpArr = [];
    arr(500).forEach(() => {
      tmpArr.push(random(-50, 50));
      tmpArr.push(random(-100, 100));
      tmpArr.push(random(-50, 100));
    });
    return [new Float32Array(tmpArr), 3];
  }, []);

  return (
    <group>
      {blocks}
      <points attach="points">
        <pointsMaterial color="#ffffff" size={0.5} />
        <bufferGeometry>
          <bufferAttribute
            attachObject={['attributes', 'position']}
            args={fiveHundredStars}
          />
        </bufferGeometry>
      </points>
    </group>
  );
};
export default React.memo(Stars);
