import React from 'react';
import { useNavigate } from 'react-router-dom';

const ItemList = ({ items }) => {
  const navigate = useNavigate();

  const handleMoreInfo = (itemId) => {
    navigate(`/items/${itemId}`);
  };

  if (!items || items.length === 0) {
    return <div className="text-center">아이템이 없습니다.</div>;
  }

  return (
    <div className="mx-auto container py-8 font-poppins">
      <h4 className="text-center text-2xl font-bold mb-8">전체 아이템</h4>
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
  );
};

export default ItemList;




