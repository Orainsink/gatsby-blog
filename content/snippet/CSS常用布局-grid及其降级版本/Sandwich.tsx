import React from 'react';

const styles = {
  parent: {
    margin: '10px 50px',
    height: '300px',
    display: 'grid',
    gridTemplateRows: 'auto 1fr auto',
    background: '#FADA67',
    borderRadius: '8px',
  },
};

const Sandwich = () => {
  return (
    <div style={styles.parent}>
      <header style={{ background: '#D69351', height: '40px' }}></header>
      <main style={{ background: '#ED7666' }}></main>
      <footer style={{ background: '#D651C8', height: '40px' }}></footer>
    </div>
  );
};
export default React.memo(Sandwich);
