import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Pagination from '../component/Pagination';
import SearchBar from '../component/SearchBar';
import { useLocation, useNavigate } from 'react-router-dom';

const ItemListPage = () => {
  const [items, setItems] = useState([]); // setItems 함수 정의 추가
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { items: initialItems } = location.state || { items: { content: [] } }; // 기본값 설정

  useEffect(() => {
    setItems(initialItems.content); // 초기 아이템 설정
    console.log(JSON.stringify(initialItems, null, 2));
  }, [initialItems]);

  const handleMoreInfo = (itemId) => {
    navigate(`/items/${itemId}`);
  };

  // 초기 렌더링을 체크하기 위한 ref
  const isInitialRender = useRef(true);

  useEffect(() => {
    // 초기 렌더링 시에는 아무것도 하지 않고 반환합니다.
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    const fetchItems = async () => {
      try {
        let endpoint = `${process.env.REACT_APP_BACK_URL}/api/v1/items`;
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
      <div className="mx-auto container py-2 font-poppins">
        <div className="flex flex-wrap justify-center gap-8 mx-auto py-8 font-poppins">
          {items.map((item, index) => (
            <div
              key={index}
              onClick={() => handleMoreInfo(item.itemId)}
              className="bg-white rounded-xl overflow-hidden shadow-md cursor-pointer relative"
              style={{ width: '300px' }}
            >
              <img
                alt={`Item ${index}`}
                src={item.imageUrl}
                className="w-full object-cover"
              />
              <div className="absolute top-0 left-0 w-full h-full bg-gray-300 opacity-10"></div> {/* 회색 오버레이 추가 */}
              <div className="absolute top-0 left-0 w-full h-full bg-gray-300 opacity-0 transition-opacity duration-300 hover:opacity-30"></div>
              <div className="p-6 z-10 relative">
                <div className="font-bold text-xl mb-2">{item.itemName}</div>
                <p className="text-gray-700 text-lg mb-4">₩{item.itemPrice}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

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
