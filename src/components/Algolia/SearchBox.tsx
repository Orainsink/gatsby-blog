import { useState, useRef, useEffect, ReactElement } from 'react';
import { connectSearchBox } from 'react-instantsearch-dom';
import { Input } from 'antd';

import { useDebounce } from '../../hooks';
const { Search } = Input;

export default connectSearchBox(
  ({ refine }: { refine: (value: string) => void }): ReactElement => {
    const [val, setVal] = useState('');
    const searchRef = useRef(null) as any;

    useDebounce(
      () => {
        refine(val);
      },
      500,
      [val]
    );

    useEffect(() => {
      setTimeout(() => searchRef.current!.focus(), 300);
    }, []);

    return (
      <Search
        ref={searchRef}
        size="large"
        placeholder="Search"
        allowClear
        onChange={(e) => setVal(e.target.value)}
        value={val}
      />
    );
  }
);
