import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useLoader } from 'react-three-fiber';
import { ResizeObserver } from '@juggle/resize-observer';
import { graphql, useStaticQuery } from 'gatsby';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DoubleSide, Matrix4, Geometry } from 'three';

interface Data {
  file: {
    publicURL: string;
  };
}
const Modal = React.memo(({ url }: { url: string }) => {
  const { nodes, materials } = useLoader(GLTFLoader, url) as any;
  const moogleRef = useRef<Geometry>();

  useEffect(() => {
    const geom = moogleRef.current;
    geom.computeBoundingBox();
    geom.center();
    geom.applyMatrix4(new Matrix4().makeTranslation(0, -30, -80));
    console.log(JSON.stringify(geom.boundingBox));
  }, []);

  return (
    <mesh>
      <bufferGeometry
        ref={moogleRef}
        attach="geometry"
        {...nodes.mesh_0.geometry}
      />
      <meshLambertMaterial
        attach="material"
        {...materials['']}
        color="0xffff00"
        flatShading
        side={DoubleSide}
      />
    </mesh>
  );
});
const Moogle = () => {
  const data: Data = useStaticQuery(graphql`
    {
      file(absolutePath: { regex: "/moogle_full.gltf/" }) {
        publicURL
      }
    }
  `);
  const url = data?.file.publicURL;

  return (
    <div style={{ width: '100%', height: '1000px' }}>
      <Canvas resize={{ polyfill: ResizeObserver }}>
        <pointLight
          attach="light"
          args={['#ffffff', 5, 60, 2]}
          position={[0, 20, -40]}
        />
        <Suspense fallback={null}>
          <Modal url={url} />
        </Suspense>
      </Canvas>
    </div>
  );
};
export default React.memo(Moogle);
