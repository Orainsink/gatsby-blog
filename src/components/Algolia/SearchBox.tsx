import React from 'react';
import { connectSearchBox } from 'react-instantsearch-dom';
import { Input } from 'antd';
const { Search } = Input;

export default connectSearchBox(({ refine, currentRefinement, onFocus }) => (
  <Search
    size="large"
    placeholder="Search"
    allowClear
    onChange={(e) => refine(e.target.value)}
    value={currentRefinement}
    onFocus={onFocus}
  />
));
