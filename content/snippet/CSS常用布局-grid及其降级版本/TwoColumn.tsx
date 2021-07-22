import React from 'react';

const styles = {
  parent: {
    margin: '10px 50px',
    height: '300px',
    display: 'grid',
    gridTemplateColumns: 'minmax(150px, 25%) 1fr',
    background: '#FADA67',
    borderRadius: '8px',
  },
};

const TwoColumn = () => {
  return (
    <div style={styles.parent}>
      <div style={{ background: '#D69351' }}></div>
      <div style={{ background: '#ED7666' }}></div>
    </div>
  );
};
export default React.memo(TwoColumn);
