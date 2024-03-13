import React from 'react';

const ItemList = ({ items }) => {
  return (
    <div>
      <h1>전체 아이템</h1>
      <ul>
        {items.map((item, index) => (
          <li key={item.id}>
            <div>
              <img src={item.imageUrl} alt={`Item ${index}`} />
              <p>{item.itemName}</p>
              <p>{item.itemPrice}원</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
