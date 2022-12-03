import { useState, useRef, useEffect, ReactElement } from 'react';
import { Input, InputRef } from 'antd';
import { connectSearchBox } from 'react-instantsearch-dom';
import { useDebounce } from 'react-use';

interface SearchBoxProps {
  refine: (value: string) => void;
}
export const SearchBox = connectSearchBox(
  ({ refine }: SearchBoxProps): ReactElement => {
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
