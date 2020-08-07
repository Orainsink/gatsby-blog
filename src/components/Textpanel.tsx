import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface IProps {
  words: string[] | null;
  position?: [number, number, number];
  rotation?: [number, number, number];
}
/** three.js text component */
const Text = (props: IProps) => {
  const { words, position, rotation } = props;
  const textRef = useRef(null);

  // TODO: need refactor
  useEffect(() => {
    const params = {
      size: 50,
      font: 'Futura, Trebuchet MS, Arial, sans-serif',
      style: 'Bold',
      lineSpacing: 40,
      color: '#C7C7C7',
    };

    let canvas = document.createElement('canvas');
    let context = canvas.getContext('2d');
    let font = `${params.style} ${params.size}px ${params.font}`;
    context.font = font;

    // max width
    let width;

    let maxWidth = 0;
    words.forEach((word) => {
      let tempWidth = context.measureText(word).width;
      if (tempWidth > maxWidth) {
        maxWidth = tempWidth;
      }
    });
    width = maxWidth;

    // get the line height and the total height
    let lineHeight = params.size + params.lineSpacing;
    let height = lineHeight * words.length;

    // security margin
    canvas.width = width + 20;
    canvas.height = height + 20;

    // set the font once more to update the context
    context.font = font;
    context.fillStyle = params.color;
    context.textAlign = 'center';
    context.textBaseline = 'top';

    // draw text
    words.forEach((word, index) => {
      let left = canvas.width / 2;
      context.fillText(word, left, lineHeight * index);
    });

    let texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;

    let material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      depthWrite: false,
      depthTest: true,
      side: THREE.DoubleSide,
      opacity: 1,
    });

    let geometry = new THREE.PlaneGeometry(
      canvas.width / 20,
      canvas.height / 20
    );

    let mesh = new THREE.Mesh(geometry, material);
    textRef.current.add(mesh);
  }, [words]);

  return (
    <group
      name="text"
      ref={textRef}
      position={position}
      rotation={rotation}
    ></group>
  );
};

export default React.memo(Text);
