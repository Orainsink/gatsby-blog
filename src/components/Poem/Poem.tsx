import { useEffect, ReactElement } from 'react';
import { load as poemLoader } from 'jinrishici';

import * as styles from './Poem.module.less';
import { useLocalStorage } from '../../hooks';

interface PoemData {
  content: string;
  origin: {
    title: string;
    dynasty: string;
    author: string;
  };
}

interface PoemResponse {
  data: PoemData;
}

export const Poem = (): ReactElement => {
  const [poem, setPoem] = useLocalStorage<null | PoemData>('poem', null);

  useEffect(() => {
    poemLoader((res: PoemResponse) => {
      setPoem(res.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <article className={styles.wrap}>
      <div>{poem?.content}</div>
      {poem?.origin.title ? <div>《{poem?.origin.title}》</div> : null}
      <div>{poem?.origin.author}</div>
    </article>
  );
};
