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
    <div class="mx-8 container py-8">
      <div class="mt-4 flex md:justify-between md:items-start md:flex-row flex-col justify-start items-start">
        <div class="">
          <p class="font-normal dark:text-gray-400 text-base leading-6 text-gray-600 lg:w-8/12 md:w-9/12"></p>
        </div>
        <div class="border-b-2 border-gray-200 pb-2 flex justify-center items-center md:mt-0 mt-10 md:w-auto w-full">
          <input
            type="text"
            value={keyword}
            onChange={handleInputChange}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleSearch();
              }
            }}
            placeholder="Search"
            aria-label="Search"
            class="dark:bg-transparent dark:text-gray-400 dark:placeholder-gray-400 lg:w-96 md:w-72 w-full focus:outline-none placeholder-gray-600 text-base font-normal text-gray-600 leading-4" />
          <svg
            onClick={handleSearch}
            class="cursor-pointer text-gray-600 dark:text-gray-400" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.66667 11.3333C9.244 11.3333 11.3333 9.244 11.3333 6.66667C11.3333 4.08934 9.244 2 6.66667 2C4.08934 2 2 4.08934 2 6.66667C2 9.244 4.08934 11.3333 6.66667 11.3333Z" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M14 14L10 10" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
      </div>
    </div>

  );
};

export default SearchBar;
