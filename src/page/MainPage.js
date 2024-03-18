import React from "react";
import RankingProducts from "../component/RankingProducts";
import ImageSlider from "../component/ImageSlider";
import CategoryBar from "../component/Categorybar";
import { Typography, Box } from "@mui/material";

function MainPage() {
  const images = [
    "/img/test.jpeg",
    "/img/test.jpeg",
    "/img/test.jpeg",
    // 이미지 URL을 여기에 추가하세요.
  ];

  return (
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
          style={{ textAlign: "center", fontWeight: "bold", color: "#1976d2" }}
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
          style={{ textAlign: "center", fontWeight: "bold", color: "#1976d2" }}
        >
          신 상품
        </Typography>
      </Box>
      <RankingProducts></RankingProducts>
    </>
  );
}

export default MainPage;
