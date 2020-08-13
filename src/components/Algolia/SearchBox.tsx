import React from 'react';
import { connectSearchBox } from 'react-instantsearch-dom';
import { Input } from 'antd';
const { Search } = Input;

export default connectSearchBox(
  ({ refine, currentRefinement, className, onFocus }) => (
    <Search
      placeholder="Search"
      onChange={(e) => refine(e.target.value)}
      value={currentRefinement}
      onFocus={onFocus}
    />
  )
);
