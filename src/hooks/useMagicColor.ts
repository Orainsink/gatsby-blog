import { useEffect } from 'react';
/**
 * magic color hook, hasn't support color property yet....XD
 * @param node node ref
 * @notice 存在兼容性问题, 需要在元素的样式里写上默认的 background-color 做降级处理
 */
const colorNames = [
  '--magic-color-mag-0',
  '--magic-color-mag-1',
  '--magic-color-mag-2',
];
const colorArr = [
  'hsl(178deg, 12%, 9%)',
  'hsl(224deg, 12%, 35%)',
  'hsl(257deg, 12%, 77%)',
  'hsl(307deg, 12%, 77%)',
  'hsl(333deg, 12%, 35%)',
  'hsl(360deg, 12%, 9%)',
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
    let index = 0;
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
    const timer = setInterval(() => {
      node.style.setProperty(colorNames[0], `${colorArr[index]}`);
      node.style.setProperty(colorNames[1], `${colorArr[(index + 1) % 6]}`);
      node.style.setProperty(colorNames[2], `${colorArr[(index + 2) % 6]}`);

      index = (index + 1) % 6;
    }, 1000);

    if (!active) clearInterval(timer);

    return () => {
      clearInterval(timer);
    };
  }, [node, active]);
};
export default useMagicColor;
