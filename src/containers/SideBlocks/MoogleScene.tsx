import { memo, Suspense, useEffect, useRef } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { ResizeObserver } from '@juggle/resize-observer';
import { graphql, useStaticQuery } from 'gatsby';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import {
  Mesh,
  Box3,
  Vector3,
  Fog,
  Points,
  AdditiveBlending,
  BufferGeometry,
} from 'three';
import gsap from 'gsap';
import { useGLTF } from '@react-three/drei';
import styled from 'styled-components';

import { useMedia, useIsDark } from '../../hooks';
import { DeepRequiredAndNonNullable } from '../../../typings/custom';
import { BaseCol } from './SideBlocks.styles';
import { isDevelopment } from '../../../scripts/env';

const CanvasContainer = styled(BaseCol)`
  padding: 0;
  canvas {
    &:focus,
    &:focus-within {
      outline: none;
    }
  }
`;

interface Props {
  url: string;
  isDark: boolean;
}

const CUSTOM_SCALE = 8;
const Modal = memo(({ url, isDark }: Props) => {
  const { nodes } = useGLTF(url) as any;

  const moogleRef = useRef<Mesh>();
  const geomRef = useRef<BufferGeometry>();
  const pointsRef = useRef<Points>();
  const controls = useRef<OrbitControls>();
  const { camera, gl, scene } = useThree();

  // 初始化模型大小和位置
  useEffect(() => {
    scene.fog = new Fog(0x05050c, 10, 60);
    const obj = moogleRef.current!;

    // scale
    const box3 = new Box3();
    box3.expandByObject(obj);
    const v3 = new Vector3();
    box3.getSize(v3);
    const scale = CUSTOM_SCALE / Math.max(v3.x, v3.y, v3.z);
    obj.scale.set(scale, scale, scale);

    // 重新计算包围盒，重新计算包围盒，不能使用原来的包围盒必须重新声明一个包围盒
    var newBox3 = new Box3();
    newBox3.expandByObject(obj);
    // 计算一个层级模型对应包围盒的几何体中心
    var center = new Vector3();
    newBox3.getCenter(center);
    // 重新设置模型的位置，使模型居中
    obj.position.x = obj.position.x - center.x + 0.94;
    obj.position.y = obj.position.y - center.y + 2;
    obj.position.z = obj.position.z - center.z;
    // 翻转模型
    obj.rotation.x = -Math.PI / 2;
    // eslint-disable-next-line
  }, []);

  // 莫古莫古动画
  useEffect(() => {
    if (!nodes) return;
    const geometry = nodes.mesh_0.geometry as BufferGeometry;
    const positions = geometry.attributes.position;
    // @ts-ignore 深拷贝存储莫古利模型数据
    const curArr = Object.assign({}, positions.array);
    // @ts-ignore 位置乱序
    positions.array.sort(() => Math.random() - 0.5);
    // 添加乱序过后的粒子geometry到mesh对象
    geomRef.current = geometry;

    // @ts-ignore 开启位置数据更新
    curArr.onUpdate = () => {
      if (!geomRef.current) return;
      geomRef.current.attributes.position.needsUpdate = true;
    };
    // @ts-ignore 渐变动画
    const tween = gsap.to(positions.array, {
      duration: 4,
      ease: 'power4.out',
      ...curArr,
    });
    return () => {
      tween.kill();
    };
  }, [nodes]);

  // 实例化视角控制器, 需要useFrame更新
  useEffect(() => {
    controls.current = new OrbitControls(camera, gl.domElement);
    // eslint-disable-next-line
  }, []);
  useFrame(() => {
    controls.current?.update();
  });

  return (
    <mesh ref={moogleRef as any}>
      <points ref={pointsRef as any}>
        <bufferGeometry {...nodes.mesh_0.geometry} ref={geomRef} />
        <pointsMaterial
          color={isDark ? '#efefef' : '#0f0f0f'}
          size={0.1}
          transparent
          blending={AdditiveBlending}
        />
      </points>
    </mesh>
  );
});

const Moogle = () => {
  const data = useStaticQuery<
    DeepRequiredAndNonNullable<Queries.getMoogleFileQuery>
  >(graphql`
    query getMoogleFile {
      file(absolutePath: { regex: "/moogle.gltf/" }) {
        publicURL
      }
    }
  `);
  const url = data.file.publicURL;
  const isDesktop = useMedia('isDesktop');
  const isDark = useIsDark();

  return (
    <CanvasContainer flex={isDesktop ? '0 0 300px' : '1 1 300px'}>
      <Canvas resize={{ polyfill: ResizeObserver }}>
        <ambientLight
          attach="light"
          args={['#ffffff']}
          position={[0, 20, -40]}
        />
        {isDevelopment && <gridHelper />}
        <Suspense fallback={null}>
          <Modal url={url} isDark={isDark} />
        </Suspense>
      </Canvas>
    </CanvasContainer>
  );
};
export const MoogleScene = memo(Moogle);
