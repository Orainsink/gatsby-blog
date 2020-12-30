import React, { useState } from 'react';
import classnames from 'classnames';
import styles from '../../../src/styles/ThemeBtn.module.less';

const DemoBtn = () => {
  const [checked, setChecked] = useState(false);
  return (
    <div className={classnames(styles.toggle, styles.daynight)}>
      <input
        type="checkbox"
        id="demo--daynight"
        className={styles.checkbox}
        onChange={(e) => setChecked(e.target.checked)}
        checked={checked}
      />
      <label className={styles.btn} htmlFor="demo--daynight">
        <span className={styles.feature}></span>
      </label>
    </div>
  );
};
export default React.memo(DemoBtn);
