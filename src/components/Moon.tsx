import { yoyo } from '../utils/utils';
import React, { useEffect, useRef, useMemo, useState } from 'react';
import gsap from 'gsap';

interface IProps {
  onCloseScene: () => void;
  isScene: boolean;
}
/** three月亮 */
const Moon = (props: IProps) => {
  const { onCloseScene, isScene } = props;
  const [active, setActive] = useState(false);
  const lightRef = useRef(null);
  const moonRef = useRef(null);

  useEffect(() => {}, [isScene]);

  /**
   * 动画实例
   */
  const tween = useMemo(
    () =>
      gsap.to(
        { x: -2, z: -45 },
        {
          duration: 2,
          x: 2,
          z: -35,
          paused: true,
          onUpdate: function () {
            if (lightRef.current)
              lightRef.current.position.z = this._targets[0].z;
          },
          onComplete: yoyo,
          onReverseComplete: yoyo,
        }
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [yoyo, lightRef.current]
  );
  const moonTween = useMemo(() => {
    if (moonRef.current)
      return gsap.to(moonRef.current.scale, {
        duration: 0.5,
        x: 1.5,
        y: 1.5,
        z: 1.5,
        paused: true,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moonRef.current]);
  const lightTween = useMemo(() => {
    if (lightRef.current)
      return gsap.to(lightRef.current, {
        duration: 0.5,
        intensity: 30,
        distance: 80,
        paused: true,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightRef.current]);

  // 绑定及卸载动画
  useEffect(() => {
    tween.resume();
    return () => {
      tween.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (active) {
      moonTween.play();
      lightTween.play();
    } else {
      if (moonTween) {
        moonTween.reverse();
        lightTween.reverse();
      }
    }

    return () => {
      if (moonTween) {
        moonTween.kill();
        lightTween.kill();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

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
