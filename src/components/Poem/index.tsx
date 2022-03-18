import { memo, useEffect } from 'react';
import { load as poemLoader } from 'jinrishici';

import * as styles from './index.module.less';
import { useLocalStorage } from '../../hooks';

interface Poem {
  content: string;
  origin: {
    title: string;
    dynasty: string;
    author: string;
  };
}

const PoemComponent = () => {
  const [poem, setPoem] = useLocalStorage<null | Poem>('poem', null);

  useEffect(() => {
    poemLoader((res) => {
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

export default memo(PoemComponent);
