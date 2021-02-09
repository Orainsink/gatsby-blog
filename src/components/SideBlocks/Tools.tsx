import React from 'react';
import { Col } from 'antd';
import classnames from 'classnames';
import styles from '../../styles/SideBar.module.less';
import tools from '../../assets/js/tools';
import Icon from '@ant-design/icons';
import useColFlex from './useColFlex';
import { useSpring, animated } from 'react-spring';

const calc = (x: number, y: number) => [
  -(y - window?.innerHeight / 2) / 20,
  (x - window?.innerWidth / 2) / 20,
  1.1,
];
const trans: any = (x: number, y: number, s: number) =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

interface ToolItemProp {
  data: {
    name: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    url: string;
  };
}

const ToolItem = React.memo(({ data }: ToolItemProp) => {
  const [props, setProps] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 5, tension: 550, friction: 40 },
  }));

  return (
    <animated.a
      href={data.url}
      onMouseMove={({ clientX: x, clientY: y }) =>
        setProps({ xys: calc(x, y) })
      }
      onMouseLeave={() => setProps({ xys: [0, 0, 1] })}
      style={{ transform: props.xys.interpolate(trans) }}
      target="_blank"
      rel="noreferrer"
      title={data.url}
      key={data.name}
      className={styles.toolLink}
    >
      <span className={styles.tool}>
        <div className={styles.iconBox}>
          <Icon component={data.icon} className={styles.toolIcon}></Icon>
        </div>
        <span className={styles.toolName}>{data.name}</span>
      </span>
    </animated.a>
  );
});

/* Tools url */
const Tools = () => {
  const colFlex = useColFlex();

  return (
    <Col flex={colFlex} className={classnames(styles.col, styles.toolsWrapper)}>
      <div className={styles.title}>Tools</div>
      {tools.map((tool) => (
        <ToolItem data={tool} key={tool.name} />
      ))}
    </Col>
  );
};
export default React.memo(Tools);
