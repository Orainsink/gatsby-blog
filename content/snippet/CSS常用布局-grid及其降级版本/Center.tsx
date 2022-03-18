import { memo } from 'react';

const styles = {
  parent: {
    margin: '10px 50px',
    height: '300px',
    display: 'grid',
    placeItems: 'center',
    background: '#FADA67',
    borderRadius: '8px',
  },
  child: {
    height: '80px',
    width: '80px',
    borderRadius: '50%',
    background: '#D69351',
  },
};

const Center = () => {
  return (
    <div style={styles.parent}>
      <div style={styles.child}></div>
    </div>
  );
};

export default memo(Center);
