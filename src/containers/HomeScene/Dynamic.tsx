import { memo, useEffect, useCallback, useState, ReactElement } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { FogExp2, PerspectiveCamera, Vector3 } from 'three';
import { useStaticQuery, graphql } from 'gatsby';
import gsap from 'gsap';
import { useRecoilState } from 'recoil';

import { Text } from './TextComponent';
import { Moon } from './Moon';
import { isClient } from '../../utils/isClient';
import { Stars } from './Stars';
import { Floor } from './Floor';
import { DeepRequiredAndNonNullable } from '../../../typings/custom';
import { sceneAtom } from '../../store/atom';

/**
 * some default values
 */
const HF_URL =
  'https://devapi.qweather.com/v7/weather/now?location=101270101&key=' +
  process.env.GATSBY_HEWEATHER_KEY;
let cameraShakeY = 0;
const cameraProps = {
  fov: 40,
  aspect: 1,
  near: 1,
  far: 4000,
  position: new Vector3(0, 0, 40),
};
/**
 * shake camera
 */
const CameraTween = memo(({ isScene }: { isScene: boolean }) => {
  const scene = useThree(({ scene }) => scene);
  const camera = useThree(({ camera }) => camera) as PerspectiveCamera;

  // set default camera, and scene fog
  useEffect(() => {
    scene.fog = new FogExp2('#0a0a0a', 0.0025);
    // camera slide in
    const tween = gsap.to(
      { fov: 40 },
      {
        duration: 2,
        fov: 60,
        ease: 'power4.out',
        onUpdate: function () {
          camera.fov = this.targets()[0].fov;
          camera.updateProjectionMatrix();
        },
      }
    );
    return () => {
      tween.kill();
    };
    // eslint-disable-next-line
  }, []);

  // animation frame: camera shake
  useFrame(({ scene, gl, camera, mouse }) => {
    // Stop all animations when scene is hidden
    if (!isScene) return;

    camera.position.y +=
      Math.cos(cameraShakeY) / 50 - (mouse.y * 5 + camera.position.y) * 0.03;
    camera.position.x += (mouse.x * 5 - camera.position.x) * 0.03;
    cameraShakeY += 0.02;
    camera.updateProjectionMatrix();

    gl.render(scene, camera);
  }, 1);

  return null;
});

/** webGl wrapper  */
const Dynamic = (): ReactElement | null => {
  const data = useStaticQuery<
    DeepRequiredAndNonNullable<Queries.getRockFileQuery>
  >(graphql`
    query getRockFile {
      file(absolutePath: { regex: "/rock.gltf/" }) {
        publicURL
      }
    }
  `);
  const url = data.file.publicURL;
  const [scene, setScene] = useRecoilState(sceneAtom);
  const [words, setWords] = useState<string[] | null>(null);

  const handleScene = useCallback(() => {
    setScene(false);
  }, [setScene]);

  /**
   * fetch weather data by IP
   * 天气API
   * https://dev.heweather.com/docs/api/overview
   */
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const promise = await fetch(HF_URL, {
          headers: {
            'content-type': 'application/json',
          },
          method: 'GET',
        });
        const data = await promise.json();

        if (data.now) {
          const words: string[] = [
            '成都',
            data.now.temp + '℃ ' + data.now.text,
          ];

          setWords(words);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchWeather();
  }, []);

  if (!isClient) return null;

  return (
    <Canvas camera={cameraProps}>
      <group>
        <CameraTween isScene={scene} />
        {/* moon && light */}
        <Moon onClose={handleScene} />
        {/* Floor */}
        <Floor url={url} />
        <Stars />
        {/* text */}
        {words && <Text words={words} position={[0, -5, 0]} />}
        <Text words={['少熬夜,多运动']} position={[0, -18, -20]} />
        <Text words={["Orainsink's Blog"]} position={[0, 22, -10]} />
      </group>
    </Canvas>
  );
};

export default memo(Dynamic);
