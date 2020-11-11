import { yoyo } from '../../utils/utils';
import React, { useEffect, useState, useCallback, useRef } from 'react';
import gsap from 'gsap';

interface Props {
  onCloseScene: () => void;
}
/** three.js moon */
const Moon = (props: Props) => {
  const { onCloseScene } = props;
  const [active, setActive] = useState(false);
  const tweenRef = useRef(null);
  const moonRef = useRef(null);
  const lightRef = useRef(null);

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
        intensity: 30,
        distance: 80,
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
    // FIXME: I dont know why this clean function was called every time when 'active' changed
    // return () => {
    //   moonRef.current?.kill();
    //   lightRef.current?.kill();
    // };
  }, [active]);

  return (
    <pointLight
      attach="light"
      args={['#ffffff', 20, 70, 2]}
      position={[0, 20, -40]}
      ref={lightRefCallback}
    >
      <mesh
        attach="mesh"
        onPointerOver={() => setActive(true)}
        onPointerOut={() => setActive(false)}
        onClick={onCloseScene}
        ref={moonRefCallback}
      >
        <meshBasicMaterial attach="material" color="#ffffff" />
        <sphereGeometry attach="geometry" args={[5, 20, 20]} />
      </mesh>
    </pointLight>
  );
};

export default React.memo(Moon);
