// ItemPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemList from '../component/ItemList';
import Pagination from '../component/Pagination';
import SearchBar from '../component/SearchBar';
import CategoryBar from '../component/Categorybar'; // 파일 이름을 정확하게 맞춰줍니다.

const ItemPage = () => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null); // 선택된 카테고리 상태
  const API_ROOT = process.env.REACT_APP_API_ROOT;

  useEffect(() => {
    const fetchItems = async () => {
      try {
        let endpoint = `${API_ROOT}/api/v1/items`;
        const params = { page: currentPage, size: 20 };

        // 메인 카테고리가 선택되었을 때
        if (selectedCategory !== null) {
          params.maincategory = selectedCategory;
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

  const handleSearch = (searchKeyword) => {
    setKeyword(searchKeyword);
    setCurrentPage(0); // 검색 결과는 첫 페이지로 초기화
  };

  // CategoryBar에서 선택된 카테고리를 처리하는 함수
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setKeyword(''); // 선택된 카테고리와 함께 서브 카테고리 초기화
    setCurrentPage(0); // 선택된 카테고리로 페이지를 초기화
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <ItemList items={items} />
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
