import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  CardActions,
} from "@mui/material";
import ProductData from "../data/ProductData";
import { useCart } from "../cart/CartContex";

// 상품 정보를 불러오는 비동기 함수
const fetchProduct = async (itemId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: itemId,
        name: "상품 이름 " + itemId,
        description: "상품 설명 " + itemId,
        price: "10000원",
        imageUrl: "https://via.placeholder.com/300",
      });
    }, 1000); // 1초 후 상품 데이터를 반환합니다 (시뮬레이션)
  });
};

const ItemPage = ({ product }) => {
  const { addToCart } = useCart();
  const { itemId } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const productData = await fetchProduct(itemId);
        setItem(productData); // 상품 정보를 item 상태로 설정
      } catch (error) {
        console.error("상품 정보를 불러오는 데 실패했습니다.", error);
        // 여기서 에러 핸들링 로직을 구현할 수 있습니다.
      }
    };

    loadProduct();
  }, [itemId]); // itemId가 변경될 때마다 loadProduct 함수를 다시 실행합니다.

  // 상품 정보 로딩 중 UI
  if (!item) {
    return <div>상품 정보를 불러오는 중...</div>;
  }

  // 상품 정보 로딩 완료 후 UI
  return (
    <Grid
      container
      spacing={4}
      justifyContent="center"
      style={{ padding: "20px" }}
    >
      <Grid item xs={12} sm={8} md={6}>
        <Card>
          <CardMedia
            component="img"
            height="300"
            image={item.imageUrl}
            alt={item.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h4" component="h2">
              {item.name}
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              {item.description}
            </Typography>
            <Typography variant="h5">가격: {item.price}</Typography>
          </CardContent>
          <CardActions>
            <Button
              onClick={() => addToCart(item)}
              size="large"
              color="primary"
            >
              장바구니에 추가
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ItemPage;
