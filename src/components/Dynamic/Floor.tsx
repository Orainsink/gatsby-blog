import React from 'react';
import { DoubleSide } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from 'react-three-fiber';

const Floor = ({ url }: { url: string }) => {
  const { nodes, materials } = useLoader(GLTFLoader, url) as any;

  return (
    <mesh position={[-70, -20, -30]} rotation={[0.3, 0, 0]}>
      <bufferGeometry {...nodes.mesh_0.geometry} />
      <meshLambertMaterial {...materials['']} flatShading side={DoubleSide} />
    </mesh>
  );
};
export default React.memo(Floor);
