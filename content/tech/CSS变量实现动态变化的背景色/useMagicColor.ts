import { useEffect } from 'react';

const colorNames = [
  '--magic-color-demo-0',
  '--magic-color-demo-1',
  '--magic-color-demo-2',
];
const colorArr = [
  'hsl(0deg, 77%, 40%)',
  'hsl(45deg, 77%, 40%)',
  'hsl(90deg, 77%, 40%)',
  'hsl(145deg, 77%, 40%)',
  'hsl(200deg, 77%, 40%)',
  'hsl(235deg, 77%, 40%)',
];

const useMagicColor = (node: any, active: boolean = true) => {
  useEffect(() => {
    if (window.CSS && window.CSS.hasOwnProperty('registerProperty')) {
      colorNames.forEach((name, index) => {
        try {
          // @ts-ignore
          window.CSS.registerProperty({
            name,
            syntax: '<color>',
            inherits: false,
            initialValue: colorArr[index],
          });
        } catch (err) {
          console.log(err);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (!node) return;
    if (!window.CSS || !window.CSS.hasOwnProperty('registerProperty')) return;
    let index = 1;
    node.style.setProperty(
      'transition',
      `${colorNames[0]} 1625ms linear 0s,
    ${colorNames[1]} 1625ms linear 0s, ${colorNames[2]} 1625ms linear 0s`
    );
    node.style.setProperty(
      'background',
      `radial-gradient(
      circle at top left,
      var(${colorNames[2]}),
      var(${colorNames[1]}),
      var(${colorNames[0]})
    )`
    );

    const changeColor = () => {
      node.style.setProperty(colorNames[0], `${colorArr[index]}`);
      node.style.setProperty(colorNames[1], `${colorArr[(index + 1) % 6]}`);
      node.style.setProperty(colorNames[2], `${colorArr[(index + 2) % 6]}`);

      index = (index + 1) % 6;
      return changeColor;
    };

    const timer = setInterval(changeColor, 1000);

    if (!active) clearInterval(timer);

    return () => {
      clearInterval(timer);
    };
  }, [node, active]);
};
export default useMagicColor;
