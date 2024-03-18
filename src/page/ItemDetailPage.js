import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Grid,
  Card,
  CardMedia,
  Typography,
  Box,
  Stack,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import { HttpGet } from "../service/HttpService";
import { HttpPost } from "../service/HttpService";

const ItemDetailPage = () => {
  const { itemId } = useParams(); // URL에서 itemId 추출
  const [itemDetail, setItemDetail] = useState(null);
  const [quantity, setQuantity] = useState(1); // 수량 상태 관리
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    const fetchItemDetail = async () => {
      try {
        // 여기서 `itemId`를 사용해 API 호출
        const data = await HttpGet(
          `http://localhost:8080/api/v1/items/${itemId}`
        );
        setItemDetail(data);
      } catch (error) {
        console.error("Error fetching item details:", error);
      }
    };

    fetchItemDetail();
  }, [itemId]); // 의존성 배열에서도 `itemId` 사용

  const handleAddToCart = async () => {
    const itemToAdd = {
      optionId: selectedColor, // ID of the selected color option
      itemQuantity: quantity, // Quantity of the item to add
    };

    try {
      const response = await HttpPost(
        "http://localhost:8080/api/v1/carts",
        itemToAdd
      );

      console.log("Response from adding item to cart:", response);
    } catch (error) {
      console.error("Failed to add item to cart:", error);
    }
  };

  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
    console.log(`handleColorChange : ${event.target.value}`);
  };

  const handleQuantityChange = (event) => {
    setQuantity(Math.max(1, event.target.value)); // 수량은 최소 1 이상
  };

  if (!itemDetail) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ flexGrow: 1, p: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              image={itemDetail.itemImageUrl}
              alt={itemDetail.itemName}
              sx={{ height: "100%", width: "100%", objectFit: "cover" }}
            />
            {/* 상세 이미지 추가 */}
            <CardMedia
              component="img"
              image={itemDetail.itemDetailedImageUrl}
              alt="Detailed view"
              sx={{ height: "100%", width: "100%", objectFit: "cover", mt: 2 }}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography gutterBottom variant="h4" component="div">
            {itemDetail.itemName}
          </Typography>
          <Typography gutterBottom variant="h5" color="text.secondary">
            {itemDetail.itemPrice}
          </Typography>
          <Typography variant="body2">
            Main Category ID: {itemDetail.mainCategoryId}
          </Typography>
          <Typography variant="body2">
            Sub Category ID: {itemDetail.subCategoryId}
          </Typography>
          <Box>
            <Typography variant="body1" gutterBottom>
              Colors Available:
            </Typography>
          </Box>
          <Stack direction="row" spacing={2} alignItems="center">
            <Select
              labelId="color-select-label"
              id="color-select"
              value={selectedColor}
              label="Color"
              onChange={handleColorChange}
            >
              {itemDetail.itemColors.map((color) => (
                <MenuItem key={color.optionId} value={color.optionId}>
                  {`${color.colorName} - Stock: ${color.stock}`}
                </MenuItem>
              ))}
            </Select>
            <TextField
              label="Quantity"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              value={quantity}
              onChange={handleQuantityChange}
              sx={{ mt: 2, width: "100px" }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddToCart}
              sx={{ mt: 2 }}
            >
              Add to Cart
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ItemDetailPage;
