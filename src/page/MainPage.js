import React from "react";
import RankingProducts from "../component/RankingProducts";
import ImageSlider from "../component/ImageSlider";
import CategoryBar from "../component/Categorybar";
import { Typography, Box } from "@mui/material";
import { useState } from "react";
import ProductListPage from "./ProductListPage";

function MainPage() {
  const [activeCategory, setActiveCategory] = useState("전체");

  // 카테고리에 따른 상품 데이터 (예시 데이터)
  const categoryProducts = {
    하드베이트: [
      {
        id: 1,
        name: "하드베이트 상품 1",
        description: "하드베이트 상품 1에 대한 설명입니다.",
        price: "10,000원",
        imageUrl: "/images/hardbait1.jpg", // 실제 이미지 경로로 변경해야 합니다.
      },
      {
        id: 2,
        name: "하드베이트 상품 2",
        description: "하드베이트 상품 2에 대한 설명입니다.",
        price: "12,000원",
        imageUrl: "/images/hardbait2.jpg",
      },
      // 추가 하드베이트 상품 데이터...
    ], // 하드베이트 카테고리의 상품 데이터 배열
    소프트베이트: [
      {
        id: 1,
        name: "소프트베이트 상품 1",
        description: "소프트베이트 상품 1에 대한 설명입니다.",
        price: "8,000원",
        imageUrl: "/images/softbait1.jpg",
      },
      {
        id: 2,
        name: "소프트베이트 상품 2",
        description: "소프트베이트 상품 2에 대한 설명입니다.",
        price: "9,500원",
        imageUrl: "/images/softbait2.jpg",
      },
    ], // 소프트베이트 카테고리의 상품 데이터 배열
    // 기타 카테고리별 상품 데이터...
  };

  const images = [
    "/img/test.jpeg",
    "/img/test.jpeg",
    "/img/test.jpeg",
    // 이미지 URL을 여기에 추가하세요.
  ];

  return (
    <>
      <div>
        <CategoryBar setActiveCategory={setActiveCategory} />
        {/* '전체' 카테고리가 선택되었을 때만 슬라이더와 랭킹 상품 표시 */}
        {activeCategory === "전체" && (
          <>
            <ImageSlider images={images}></ImageSlider>
            <Box
              sx={{
                backgroundColor: "#e3f2fd",
                padding: "20px",
                marginTop: "20px",
                marginBottom: "20px",
                borderRadius: "5px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "#1976d2",
                }}
              >
                랭킹 상품
              </Typography>
            </Box>
            <RankingProducts></RankingProducts>
            <Box
              sx={{
                backgroundColor: "#e3f2fd",
                padding: "20px",
                marginTop: "20px",
                marginBottom: "20px",
                borderRadius: "5px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "#1976d2",
                }}
              >
                신 상품
              </Typography>
            </Box>
          </>
        )}
        {/* 선택된 카테고리에 해당하는 상품 목록 표시 */}
        {activeCategory in categoryProducts && (
          <ProductListPage products={categoryProducts[activeCategory]} />
        )}
      </div>
    </>
  );
}

export default MainPage;
