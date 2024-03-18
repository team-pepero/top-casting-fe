import React from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material';

const ItemList = ({ items }) => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        전체 아이템
      </Typography>
      <Grid container spacing={3}>
        {items.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card style={{ width: '100%' }}>
              <CardMedia
                component="div"
                style={{ height: 0, paddingTop: '100%', backgroundSize: 'cover', backgroundImage: `url(${item.imageUrl})` }}
                alt={`Item ${index}`}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.itemName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.itemPrice}원
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">더보기</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ItemList;

