import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemList from '../component/ItemList';
import Pagination from '../component/Pagination';
import SearchBar from '../component/SearchBar';

const ItemPage = () => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/items', {
          params: {
            keyword: keyword,
            page: currentPage,
            size: 2,
          },
        });
        setItems(response.data.content);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, [currentPage, keyword]);

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleSearch = (searchKeyword) => {
    setKeyword(searchKeyword);
    setCurrentPage(0); // 검색 결과는 첫 페이지로 초기화
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <ItemList items={items} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevPage={handlePrevPage}
        onNextPage={handleNextPage}
      />
    </div>
  );
};

export default ItemPage;
