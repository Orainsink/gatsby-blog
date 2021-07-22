import React from 'react';

const styles = {
  parent: {
    margin: '10px 50px',
    height: '300px',
    display: 'grid',
    gridTemplate: 'auto 1fr auto / auto 1fr auto',
    background: '#FADA67',
    borderRadius: '8px',
  },
};

const Center = () => {
  return (
    <div style={styles.parent}>
      <header
        style={{
          background: '#D69351',
          height: '40px',
          gridArea: '1 / 1 / 2 / 4',
        }}
      />
      <div
        style={{
          background: '#ED7666',
          gridArea: '2 / 1 / 3 / 2',
          width: '40px',
        }}
      />
      <main
        style={{
          background: '#D651C8',
          gridArea: '2 / 2 / 3 / 3',
        }}
      />
      <div
        style={{
          background: '#955FFA',
          gridArea: '2 / 3 / 3 / 4',
          width: '40px',
        }}
      />
      <footer
        style={{
          background: '#FADA67',
          height: '40px',
          gridArea: '3 / 1 / 4 / 4',
        }}
      />
    </div>
  );
};
export default React.memo(Center);
