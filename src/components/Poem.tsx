import React, { useEffect, useState } from 'react';
import styles from '../styles/Poem.module.less';
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
  return (
    poem && (
      <article className={styles.wrap}>
        <div>{poem.content}</div>
        <div>《{poem.origin.title}》</div>
        <div>{poem.origin.author}</div>
      </article>
    )
  );
};

export default React.memo(Poem);
