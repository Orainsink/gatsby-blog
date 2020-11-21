import React, { useState } from 'react';
import { connectSearchBox } from 'react-instantsearch-dom';
import { Input } from 'antd';
import useDebounce from '../../hooks/useDebounce';
const { Search } = Input;

export default connectSearchBox(({ refine, currentRefinement, onFocus }) => {
  const [val, setVal] = useState('');
  useDebounce(
    () => {
      refine(val);
    },
    500,
    [val]
  );

  return (
    <Search
      size="large"
      placeholder="Search"
      allowClear
      onChange={(e) => setVal(e.target.value)}
      value={val}
    />
  );
});
