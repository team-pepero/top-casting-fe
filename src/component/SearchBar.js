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
    <div className="border-b-2 border-gray-200 pb-2 flex justify-center items-center md:mt-0 mt-10 md:w-auto w-full">
      <input 
        type="text" 
        value={keyword} 
        onChange={handleInputChange} 
        placeholder="검색어를 입력하세요" 
        aria-label="Search"
        className="dark:bg-transparent dark:text-gray-400 dark:placeholder-gray-400 lg:w-96 md:w-72 w-full focus:outline-none placeholder-gray-600 text-base font-normal text-gray-600 leading-4" 
      />
      <button 
        onClick={handleSearch} 
        className="ml-2 btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transition duration-200 ease-in-out"
      >
        검색
      </button>
    </div>
  );
};

export default SearchBar;
