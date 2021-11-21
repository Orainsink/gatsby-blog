import React, { useState } from 'react';
import { useSpring, a } from '@react-spring/three';
import { useCursor } from '@react-three/drei';

interface Props {
  onClose: () => void;
}
/** three.js moon */
const Moon = (props: Props) => {
  const { onClose } = props;
  const [active, setActive] = useState<boolean>(false);

  useCursor(active);

  const lightSpring = useSpring({
    intensity: active ? 10 : 8,
    distance: active ? 70 : 62,
    x: active ? -1 : 2,
    z: active ? -45 : -35,
  });

  const { scale } = useSpring({
    scale: active ? [1.5, 1.5, 1.5] : [1, 1, 1],
  });

  return (
    <a.pointLight
      color="#ffffff"
      decay={2}
      position={[0, 20, -40]}
      {...lightSpring}
    >
      <a.mesh
        onPointerOver={() => setActive(true)}
        onPointerOut={() => setActive(false)}
        onClick={onClose}
        scale={scale as any}
      >
        <meshBasicMaterial color="#ffffff" />
        <sphereGeometry args={[5, 20, 20]} />
      </a.mesh>
    </a.pointLight>
  );
};

export default React.memo(Moon);
