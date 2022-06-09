import { memo, useEffect, useState, ReactElement } from 'react';
import { Texture, DoubleSide } from 'three';

interface Props {
  words: string[] | null;
  position?: [number, number, number];
  rotation?: [number, number, number];
}

const params = {
  size: 50,
  font: 'Futura, Trebuchet MS, Arial, sans-serif',
  style: 'Bold',
  lineSpacing: 40,
  color: '#C7C7C7',
};

/** three.js text component */
const Text = ({ words, position, rotation }: Props): ReactElement | null => {
  const [size, setSize] = useState<[number, number]>([0, 0]);
  const [map, setMap] = useState<Texture>();

  useEffect(() => {
    if (!words) return;

    let canvas = document.createElement('canvas');
    let context: CanvasRenderingContext2D = canvas.getContext('2d')!;
    let font = `${params.style} ${params.size}px ${params.font}`;
    context.font = font;

    // max width
    let width;
    let maxWidth = 0;
    // measure text width
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
    setSize([width / 20 + 1, height / 20 + 1]);
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
    let texture = new Texture(canvas);
    texture.needsUpdate = true;

    setMap(texture);
  }, [words]);
  if (!map) return null;
  return (
    <group name="text" position={position} rotation={rotation}>
      <mesh>
        <planeGeometry args={[size[0], size[1]]} />
        <meshBasicMaterial
          transparent
          depthTest
          opacity={1}
          side={DoubleSide}
          depthWrite={false}
          map={map}
        />
      </mesh>
    </group>
  );
};

export default memo(Text);
