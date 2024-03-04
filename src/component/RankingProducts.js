import React from 'react';
import { Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';

const products = [
  { id: 1, name: '상품 1', description: '설명 1', image: '/img/item1.jpeg', rank: 1 },
  { id: 2, name: '상품 2', description: '설명 2', image: '/img/item2.jpeg', rank: 2 },
  { id: 3, name: '상품 3', description: '설명 3', image: '/img/item3.jpeg', rank: 3 },
  { id: 4, name: '상품 4', description: '설명 4', image: '/img/item4.jpeg', rank: 4 },
  { id: 5, name: '상품 5', description: '설명 5', image: '/img/item5.jpeg', rank: 5 },
  // 추가 상품 데이터...
];

const RankingProducts = () => {
  return (
    <Grid container spacing={2}>
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={4} key={product.id}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image={product.image}
              alt={product.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {product.rank}. {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {product.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default RankingProducts;
