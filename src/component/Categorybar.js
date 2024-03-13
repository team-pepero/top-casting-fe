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

const CategoryBar = () => {
  const [activeCategory, setActiveCategory] = useState("전체");

  return (
    <AppBar position="static" color="default">
      <Toolbar>
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => setActiveCategory(category)}
            sx={{
              marginRight: 2,
              color: activeCategory === category ? "primary.main" : "inherit",
              fontWeight: activeCategory === category ? "bold" : "normal",
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
