import { yoyo } from '../../utils/utils';
import React, { useEffect, useState, useCallback, useRef } from 'react';
import gsap from 'gsap';

interface Props {
  onCloseScene: () => void;
}
/** three.js moon */
const Moon = (props: Props) => {
  const { onCloseScene } = props;
  const [active, setActive] = useState<boolean>(false);
  const tweenRef = useRef<GSAPTween>(null);
  const moonRef = useRef<GSAPTween>(null);
  const lightRef = useRef<GSAPTween>(null);

  const lightRefCallback = useCallback((node) => {
    if (node !== null) {
      tweenRef.current = gsap.to(
        { x: -2, z: -45 },
        {
          duration: 2,
          x: 2,
          z: -35,
          paused: true,
          onUpdate: function () {
            node.position.z = this._targets[0].z;
          },
          onComplete: yoyo,
          onReverseComplete: yoyo,
        }
      );

      lightRef.current = gsap.to(node, {
        duration: 0.5,
        intensity: 10,
        distance: 70,
        paused: true,
      });
    }
  }, []);

  const moonRefCallback = useCallback((node) => {
    if (node !== null) {
      moonRef.current = gsap.to(node.scale, {
        duration: 0.5,
        x: 1.5,
        y: 1.5,
        z: 1.5,
        paused: true,
      });
    }
  }, []);

  /**
   * start or stop animations
   */
  useEffect(() => {
    tweenRef.current?.resume();
    return () => {
      tweenRef.current?.kill();
    };
  }, []);
  useEffect(() => {
    if (active) {
      moonRef.current?.play();
      lightRef.current?.play();
    } else {
      moonRef.current?.reverse();
      lightRef.current?.reverse();
    }
  }, [active]);

  useEffect(() => {
    return () => {
      moonRef.current?.kill();
      lightRef.current?.kill();
    };
  }, []);

  return (
    <pointLight
      args={['#ffffff', 8, 62, 2]}
      position={[0, 20, -40]}
      ref={lightRefCallback}
    >
      <mesh
        onPointerOver={() => setActive(true)}
        onPointerOut={() => setActive(false)}
        onClick={onCloseScene}
        ref={moonRefCallback}
      >
        <meshBasicMaterial color="#ffffff" />
        <sphereGeometry args={[5, 20, 20]} />
      </mesh>
    </pointLight>
  );
};

export default React.memo(Moon);
