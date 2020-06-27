import React, { useEffect, useState } from 'react';
import styles from '../styles/Poem.module.less';
import { Skeleton } from 'antd';
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

/**诗歌 */
const Poem: React.FC = () => {
  const [poem, setPoem] = useState<null | IPoem>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    jinrishici.load((res) => {
      setPoem(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <Skeleton loading={loading} active paragraph={{ rows: 2 }} title>
      <article className={styles.wrap}>
        <div>{poem?.content}</div>
        <div>《{poem?.origin.title}》</div>
        <div>{poem?.origin.author}</div>
      </article>
    </Skeleton>
  );
};

export default React.memo(Poem);
