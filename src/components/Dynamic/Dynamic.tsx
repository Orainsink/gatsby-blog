import React, {
  Suspense,
  useEffect,
  useCallback,
  useState,
  useRef,
  useLayoutEffect,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Canvas, useFrame, useThree } from 'react-three-fiber';
import { FogExp2, PerspectiveCamera } from 'three';
import Text from './TextComponent';
import Moon from './Moon';
import { useBackgroundColor } from '../../hooks';
import { iRootState } from '../../redux/store';
import isClient from '../../utils/isClient';
import { ResizeObserver } from '@juggle/resize-observer';
import Stars from './Stars';
import Floor from './Floor';
import gsap from 'gsap';
import { useStaticQuery, graphql } from 'gatsby';
import { ThreeEvent } from 'react-three-fiber/dist/declarations/src/core/events';
interface Data {
  file: {
    publicURL: string;
  };
}
const hfUrl =
  'https://free-api.heweather.net/s6/weather/now?&location=auto_ip&key=' +
  process.env.GATSBY_HEWEATHER_KEY;
let cameraShakeY = 0;
let mouseX = 0;
let mouseY = 0;

// shake camera
const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
  mouseX = (e.clientX / window.innerWidth) * 2 - 1;
  mouseY = (e.clientY / window.innerHeight) * 2 - 1;
};

const Camera = React.memo(({ isScene }: { isScene: boolean }) => {
  const camera = useRef<PerspectiveCamera>(null);
  const set = useThree(({ set }) => set);
  const scene = useThree(({ scene }) => scene);
  // set default camera, and scene fog
  useLayoutEffect(() => {
    set(() => ({ camera: camera.current }));
    scene.fog = new FogExp2('#0a0a0a', 0.0025);
    // camera slide in
    gsap.to(
      { fov: 40 },
      {
        duration: 2,
        fov: 60,
        ease: 'power4.out',
        onUpdate: function () {
          camera.current.fov = this.targets()[0].fov;
          camera.current.updateProjectionMatrix();
        },
      }
    );
    // eslint-disable-next-line
  }, []);

  // animation frame: camera shake
  useFrame(({ scene, gl, camera }) => {
    // Stop all animations when scene is hidden
    if (!isScene) return;
    camera.position.y +=
      Math.cos(cameraShakeY) / 50 - (mouseY * 5 + camera.position.y) * 0.03;
    camera.position.x += (mouseX * 5 - camera.position.x) * 0.03;
    cameraShakeY += 0.02;

    gl.render(scene, camera);
  }, 1);

  return (
    <perspectiveCamera
      attach="camera"
      args={[40, 1, 1, 4000]}
      position={[0, 0, 40]}
      ref={camera}
    />
  );
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
    <Canvas /* resize={{ polyfill: ResizeObserver }} */>
      <group onPointerMove={handlePointerMove}>
        <Camera isScene={scene} />
        {/* moon && light */}
        <Moon onCloseScene={handleScene} />
        {/* Floor */}
        <Suspense fallback={null}>
          <Floor url={url} />
          {/* <Stars /> */}
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
