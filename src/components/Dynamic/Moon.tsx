import { yoyo } from '../../utils/utils';
import React, { useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';

interface IMoon {
  onCloseScene: () => void;
}
/** three.js moon */
const Moon = (props: IMoon) => {
  const { onCloseScene } = props;
  const [active, setActive] = useState(false);
  const [tween, setTween] = useState(null);
  const [moonTween, setMoonTween] = useState(null);
  const [lightTween, setLightTween] = useState(null);

  const lightRefCallback = useCallback((node) => {
    if (node !== null) {
      setTween(
        gsap.to(
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
        )
      );
      setLightTween(
        gsap.to(node, {
          duration: 0.5,
          intensity: 30,
          distance: 80,
          paused: true,
        })
      );
    }
  }, []);

  const moonRefCallback = useCallback((node) => {
    if (node !== null) {
      setMoonTween(
        gsap.to(node.scale, {
          duration: 0.5,
          x: 1.5,
          y: 1.5,
          z: 1.5,
          paused: true,
        })
      );
    }
  }, []);

  /**
   * start or stop animations
   */
  useEffect(() => {
    tween?.resume();
    return () => {
      tween?.kill();
    };
  }, [tween]);
  useEffect(() => {
    if (active) {
      moonTween?.play();
      lightTween?.play();
    } else {
      if (moonTween) {
        moonTween?.reverse();
        lightTween?.reverse();
      }
    }
    return () => {
      if (moonTween) {
        moonTween?.kill();
        lightTween?.kill();
      }
    };
  }, [active, moonTween, lightTween]);

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
