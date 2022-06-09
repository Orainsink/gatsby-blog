import { memo, ReactElement } from 'react';
import { DoubleSide } from 'three';
import { useGLTF } from '@react-three/drei';

interface Props {
  url: string;
}
const Floor = ({ url }: Props): ReactElement => {
  const { nodes } = useGLTF(url) as any;

  return (
    <mesh position={[-70, -20, -30]} rotation={[0.3, 0, 0]}>
      <bufferGeometry {...nodes.mesh_0.geometry} />
      <meshLambertMaterial
        {...nodes.mesh_0.material}
        flatShading
        side={DoubleSide}
      />
    </mesh>
  );
};
export default memo(Floor);
