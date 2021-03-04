import React, { useEffect, useState } from 'react';
import * as styles from './index.module.less';
const jinrishici = require('jinrishici');

interface Poem {
  content: string;
  origin: {
    title: string;
    dynasty: string;
    author: string;
  };
}

const PoemComponent = () => {
  const [poem, setPoem] = useState<null | Poem>(null);

  useEffect(() => {
    jinrishici.load((res) => {
      setPoem(res.data);
    });
  }, []);

  return (
    <article className={styles.wrap}>
      <div>{poem?.content}</div>
      {poem?.origin.title ? <div>《{poem?.origin.title}》</div> : null}
      <div>{poem?.origin.author}</div>
    </article>
  );
};

export default React.memo(PoemComponent);
