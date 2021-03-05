import React from 'react';
import { DoubleSide } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from 'react-three-fiber';

const Floor = ({ url }: { url: string }) => {
  const { nodes, materials } = useLoader(GLTFLoader, url);

  return (
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
  );
};
export default React.memo(Floor);
