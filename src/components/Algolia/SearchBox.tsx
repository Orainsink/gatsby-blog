import { useState, useRef, useEffect, ReactElement } from 'react';
import { connectSearchBox } from 'react-instantsearch-dom';
import { Input, InputRef } from 'antd';

import { useDebounce } from '../../hooks';

export const SearchBox = connectSearchBox(
  ({ refine }: { refine: (value: string) => void }): ReactElement => {
    const [val, setVal] = useState('');
    const searchRef = useRef<InputRef>(null);

    useDebounce(
      () => {
        refine(val);
      },
      300,
      [val]
    );

    useEffect(() => {
      setTimeout(() => searchRef.current!.focus(), 300);
    }, []);

    return (
      <Input
        ref={searchRef}
        size="large"
        placeholder="Search"
        allowClear
        onChange={(e) => setVal(e.target.value)}
      />
    );
  }
);
