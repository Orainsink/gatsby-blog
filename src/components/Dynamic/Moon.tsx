import { yoyo } from '../../utils/utils';
import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

interface IProps {
  onCloseScene: () => void;
}
/** three.js moon */
const Moon = (props: IProps) => {
  const { onCloseScene } = props;
  const [active, setActive] = useState(false);
  // const [tween, setTween] = useState(null);
  // const [moonTween, setMoonTween] = useState(null);
  // const [lightTween, setLightTween] = useState(null);
  let tween,
    moonTween,
    lightTween = null;
  const lightRef = useRef(null);
  const moonRef = useRef(null);

  useEffect(() => {
    tween = gsap.to(
      { x: -2, z: -45 },
      {
        duration: 2,
        x: 2,
        z: -35,
        paused: true,
        onUpdate: function () {
          lightRef.current.position.z = this._targets[0].z;
        },
        onComplete: yoyo,
        onReverseComplete: yoyo,
      }
    );
    lightTween = gsap.to(lightRef.current, {
      duration: 0.5,
      intensity: 30,
      distance: 80,
      paused: true,
    });
    moonTween = gsap.to(moonRef.current.scale, {
      duration: 0.5,
      x: 1.5,
      y: 1.5,
      z: 1.5,
      paused: true,
    });
  }, [tween, lightTween, moonTween]);
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
      ref={lightRef}
    >
      <mesh
        attach="mesh"
        onPointerOver={() => setActive(true)}
        onPointerOut={() => setActive(false)}
        onClick={onCloseScene}
        ref={moonRef}
      >
        <meshBasicMaterial attach="material" color="#ffffff" />
        <sphereGeometry attach="geometry" args={[5, 20, 20]} />
      </mesh>
    </pointLight>
  );
};

export default React.memo(Moon);
