// ItemPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemList from '../component/ItemList';
import Pagination from '../component/Pagination';
import SearchBar from '../component/SearchBar';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const ItemPage = () => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null); // 선택된 카테고리 상태
  const navigate = useNavigate();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const keywordFromUrl = urlParams.get('keyword');

  const handleMoreInfo = (itemId) => {
    navigate(`/items/${itemId}`);
  };

  useEffect(() => {
    if (keywordFromUrl) {
      handleSearch(keywordFromUrl);
    }
  }, [keywordFromUrl]);

  useEffect(() => {

    const fetchItems = async () => {
      try {
        let endpoint = `${process.env.REACT_APP_BACK_URL}/api/v1/items`;
        const params = { page: currentPage, size: 20 };

        // 메인 카테고리가 선택되었을 때
        if (selectedCategory !== null) {
          params.mainCategoryId = selectedCategory;
        }

        const response = await axios.get(endpoint, { params });
        setItems(response.data.content);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, [currentPage, selectedCategory]);

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleSearch = async (searchKeyword) => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/items', {
        params: { keyword: searchKeyword, page: 0, size: 20 }
      });
      setItems(response.data.content);
      setTotalPages(response.data.totalPages);
      setKeyword(searchKeyword);
      setCurrentPage(0);
    } catch (error) {
      console.error('Error searching items:', error);
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setKeyword('');
    setCurrentPage(0);
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      {/* <CategoryBar onSelect={handleCategorySelect} /> */} {/* CategoryBar 컴포넌트 제거 */}
      <ItemList items={items} handleMoreInfo={handleMoreInfo} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevPage={handlePrevPage}
        onNextPage={handleNextPage}
      />
    </>
  );
};

export default ItemPage;
