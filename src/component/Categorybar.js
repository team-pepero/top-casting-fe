import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const categories = [
  "전체",
  "하드베이트",
  "소프트베이트",
  "메탈지그&스푼",
  "스커트베이트",
  "각종 장비",
  "각종 채비",
  "고객센터",
];

const CategoryBar = ({ setActiveCategory }) => {
  // 'Main'컴포넌트가 현재 활성화된 카테고리를 알 수 있도록 CategoryBar 내부의 activeCategory 상태 관리는 제거합니다.

  return (
    <AppBar position="static" color="default">
      <Toolbar>
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => setActiveCategory(category)}
            sx={{
              marginRight: 2,
              // Button 스타일링은 필요에 따라 조정합니다.
            }}
          >
            {category}
          </Button>
        ))}
      </Toolbar>
    </AppBar>
  );
};

export default CategoryBar;
