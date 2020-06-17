import React from 'react';

/**Footer */
const Footer: React.SFC = () => {
  return (
    <footer>
      © {new Date().getFullYear()}, Built with
      {` `}
      <a href="https://www.gatsbyjs.org">Gatsby</a>
    </footer>
  );
};

export default Footer;
