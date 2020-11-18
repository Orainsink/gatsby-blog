import React, { useEffect, useState } from 'react';
import { Skeleton } from 'antd';
import styles from '../styles/Poem.module.less';
const jinrishici = require('jinrishici');

interface Poem {
  content: string;
  origin: {
    title: string;
    dynasty: string;
    author: string;
    [key: string]: any;
  };
  [key: string]: any;
}

const Poem = () => {
  const [poem, setPoem] = useState<null | Poem>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    jinrishici.load((res) => {
      setPoem(res.data);
      setLoading(false);
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

export default React.memo(Poem);
