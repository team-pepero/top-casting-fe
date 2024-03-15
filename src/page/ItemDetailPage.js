import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Grid,
  Card,
  CardMedia,
  Typography,
  Box,
  Chip,
  Stack,
} from "@mui/material";
import { HttpGet } from "../service/HttpService";

const ItemDetailPage = () => {
  const { itemId } = useParams(); // URL에서 itemId 추출
  const [itemDetail, setItemDetail] = useState(null);

  useEffect(() => {
    const fetchItemDetail = async () => {
      try {
        // 여기서 `itemId`를 사용해 API 호출
        const data = await HttpGet(`/api/v1/items/${itemId}`);
        setItemDetail(data);
      } catch (error) {
        console.error("Error fetching item details:", error);
      }
    };

    fetchItemDetail();
  }, [itemId]); // 의존성 배열에서도 `itemId` 사용

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
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography gutterBottom variant="h4" component="div">
            {itemDetail.itemName}
          </Typography>
          <Typography gutterBottom variant="h5" color="text.secondary">
            {itemDetail.itemPrice}
          </Typography>
          <Box>
            <Typography variant="body1" gutterBottom>
              Colors Available:
            </Typography>
            <Stack direction="row" spacing={1}>
              {itemDetail.itemColors.map((color) => (
                <Chip
                  key={color.optionId}
                  label={`${color.colorName} - Stock: ${color.stock}`}
                  variant="outlined"
                />
              ))}
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ItemDetailPage;
