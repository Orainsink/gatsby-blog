/**
 * 上下切换的 Trigger
 */
import * as React from 'react';
import styles from '../styles/Trigger.module.less'
const Trigger = () => {
  return (
    <div
			className={`trigger trigger_${isOpen ? "top" : "bottom"}`}
			onMouseEnter={}
			onMouseLeave={}
			onClick={}
		/>
  );
};

export default Trigger;
