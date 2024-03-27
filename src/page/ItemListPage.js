import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemList from '../component/ItemList';
import Pagination from '../component/Pagination';
import SearchBar from '../component/SearchBar';
import { useNavigate } from 'react-router-dom';

const ItemListPage = () => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  const handleMoreInfo = (itemId) => {
    navigate(`/items/${itemId}`);
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        let endpoint = 'http://localhost:8080/api/v1/items';
        const params = { page: currentPage, size: 20 };

        // 메인 카테고리가 선택되었을 때
        if (selectedCategory !== null) {
          params.mainCategoryId = selectedCategory;
        }

        // 키워드 검색이 있을 경우
        if (keyword !== '') {
          params.keyword = keyword;
        }

        const response = await axios.get(endpoint, { params });
        setItems(response.data.content);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, [currentPage, selectedCategory, keyword]);

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

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
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
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default ItemListPage;


