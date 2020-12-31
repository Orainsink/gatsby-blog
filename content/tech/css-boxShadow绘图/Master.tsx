import React from 'react';
import styles from './Master.module.less';
import classnames from 'classnames';

enum TypeEnum {
  dom = 1,
  stars = 2,
  anime = 3,
}
interface Props {
  type: TypeEnum;
}
const Master = ({ type }: Props) => {
  return (
    <div
      className={classnames(styles.box, {
        [styles.stars]: type === TypeEnum.stars,
        [styles.anime]: type === TypeEnum.anime,
      })}
    ></div>
  );
};
export default React.memo(Master);
