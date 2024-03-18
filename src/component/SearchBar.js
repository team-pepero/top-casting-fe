import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = ({ onSearch }) => {
  const [keyword, setKeyword] = useState('');

  const handleInputChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleSearch = () => {
    onSearch(keyword);
  };

  return (
    <div>
      <input type="text" value={keyword} onChange={handleInputChange} />
      <button onClick={handleSearch}>검색</button>
    </div>
  );
};

export default SearchBar;
