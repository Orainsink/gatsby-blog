import React, { useEffect, useState } from 'react';
// import jinrishici from 'jinrishici';
const jinrishici = require('jinrishici');

interface IPoem {
  content: string;
  origin: {
    title: string;
    dynasty: string;
    author: string;
    [key: string]: any;
  };
  [key: string]: any;
}

const Poem: React.FC = () => {
  const [poem, setPoem] = useState<null | IPoem>(null);

  useEffect(() => {
    jinrishici.load((res) => {
      setPoem(res.data);
    });
  }, []);
  console.log(poem);
  return poem && <article></article>;
};

export default React.memo(Poem);
