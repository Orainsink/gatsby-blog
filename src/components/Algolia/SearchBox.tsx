import React from 'react';
import { connectSearchBox } from 'react-instantsearch-dom';
import { Input } from 'antd';
const { Search } = Input;
import styles from '../../styles/Algolia.module.less';

export default connectSearchBox(({ refine, currentRefinement, onFocus }) => (
  <Search
    placeholder="Search"
    onChange={(e) => refine(e.target.value)}
    value={currentRefinement}
    onFocus={onFocus}
  />
));
