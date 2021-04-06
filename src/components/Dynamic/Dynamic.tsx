import React, { Suspense, useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Canvas, useFrame, useThree } from 'react-three-fiber';
import { FogExp2, PerspectiveCamera, Vector3 } from 'three';
import Text from './TextComponent';
import Moon from './Moon';
import { useBackgroundColor } from '../../hooks';
import { iRootState } from '../../redux/store';
import isClient from '../../utils/isClient';
import Stars from './Stars';
import Floor from './Floor';
import gsap from 'gsap';
import { useStaticQuery, graphql } from 'gatsby';

interface Data {
  file: {
    publicURL: string;
  };
}
const hfUrl =
  'https://free-api.heweather.net/s6/weather/now?&location=auto_ip&key=' +
  process.env.GATSBY_HEWEATHER_KEY;
let cameraShakeY = 0;
const position = new Vector3(0, 0, 40);

const CameraTween = React.memo(({ isScene }: { isScene: boolean }) => {
  const camera = useThree(({ camera }) => camera) as PerspectiveCamera;
  const scene = useThree(({ scene }) => scene);
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
    return () => tween.kill();
  }, [scene, camera]);

  // animation frame: camera shake
  useFrame(({ scene, gl, camera, mouse }) => {
    // Stop all animations when scene is hidden
    if (!isScene) return;
    camera.position.y +=
      Math.cos(cameraShakeY) / 50 - (mouse.y * 5 + camera.position.y) * 0.03;
    camera.position.x += (mouse.x * 5 - camera.position.x) * 0.03;
    cameraShakeY += 0.02;

    gl.render(scene, camera);
  }, 1);

  return null;
});

/** webGl wrapper  */
const Dynamic = () => {
  const data: Data = useStaticQuery(graphql`
    {
      file(absolutePath: { regex: "/rock.gltf/" }) {
        publicURL
      }
    }
  `);
  const url = data?.file.publicURL;
  const { scene } = useSelector((state: iRootState) => state);
  const dispatch = useDispatch();
  const [words, setWords] = useState<string[]>(null);

  useBackgroundColor();

  const handleScene = useCallback(() => {
    dispatch({ type: 'SCENE', payload: false });
  }, [dispatch]);

  /**
   * fetch weather data by IP
   * 天气API
   * https://dev.heweather.com/docs/api/overview
   */
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const promise = await fetch(hfUrl, {
          headers: {
            'content-type': 'application/json',
          },
          method: 'GET',
        });
        const res = await promise.json();

        const data = res.HeWeather6[0];
        const words: string[] = [
          data.basic.location, //city
          data.now.tmp + '℃ ' + data.now.cond_txt, // temperature
        ];
        setWords(words);
      } catch (err) {
        console.log(err);
      }
    };
    fetchWeather();
    // eslint-disable-next-line
  }, []);

  if (!isClient) return null;

  return (
    <Canvas
      camera={{
        fov: 40,
        aspect: 1,
        near: 1,
        far: 4000,
        position: position,
      }}
    >
      <group>
        <CameraTween isScene={scene} />
        {/* moon && light */}
        <Moon onCloseScene={handleScene} />
        {/* Floor */}
        <Suspense fallback={null}>
          <Floor url={url} />
          <Stars />
        </Suspense>
        {/* text */}
        {words && <Text words={words} position={[0, -5, 0]} />}
        <Text words={['少熬夜,多运动']} position={[0, -18, -20]} />
        <Text words={["Orainsink's Blog"]} position={[0, 22, -10]} />
      </group>
    </Canvas>
  );
};

export default React.memo(Dynamic);
