import React, { useState } from "react";
import CategoryBar from "../../component/Categorybar"; // 가정한 카테고리 바 컴포넌트의 경로

// 카테고리별로 표시할 컴포넌트 혹은 JSX를 미리 정의
const CategoryContent = {
  전체: <div>전체 상품을 보여줍니다.</div>,

  하드베이트: <div>하드베이트 상품입니다.</div>,

  소프트베이트: <div>소프트베이트 상품입니다.</div>,

  "메탈지그&스푼": <div>소프트베이트 상품입니다.</div>,

  스커트베이트: <div>소프트베이트 상품입니다.</div>,

  "각종 장비": <div>소프트베이트 상품입니다.</div>,

  "각종 채비": <div>소프트베이트 상품입니다.</div>,

  고객센터: <div>고객센터 정보입니다.</div>,
};

const CategoryPage = () => {
  const [activeCategory, setActiveCategory] = useState("전체");

  return (
    <div>
      <CategoryBar
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      {CategoryContent[activeCategory]}
    </div>
  );
};
