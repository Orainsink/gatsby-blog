import React, { useLayoutEffect, useRef } from 'react';
import { arr, random } from '../../utils/utils';
import {
  BufferGeometry,
  PlaneGeometry,
  MeshLambertMaterial,
  Mesh,
  BufferAttribute,
} from 'three';

const fiveHundredStars: number[] = [];
arr(500).forEach(() => {
  fiveHundredStars.push(random(-50, 50));
  fiveHundredStars.push(random(-100, 100));
  fiveHundredStars.push(random(-50, 100));
});
const vertices = new BufferAttribute(new Float32Array(fiveHundredStars), 3);

const Stars = () => {
  const stripsGroup = useRef<Mesh>(null);

  useLayoutEffect(() => {
    const stripsGeometry = new BufferGeometry();
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
      stripsGeometry.merge(stripMesh.geometry /* stripMesh.matrix */);
    }
    const totalMesh = new Mesh(stripsGeometry, stripMaterial);

    stripsGroup.current.add(totalMesh);
  }, []);

  return (
    <group ref={stripsGroup}>
      <points attach="points">
        <pointsMaterial color="#ffffff" size={0.5} />
        <bufferGeometry
          attributes={{
            position: vertices,
          }}
        />
      </points>
    </group>
  );
};
export default React.memo(Stars);
