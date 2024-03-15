import React from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material';
import { useLocation } from 'react-router-dom';


const ItemListPage = () => {
    const location = useLocation();

    const { items } = location.state || { items: { content: [] } }; // 기본값 설정

    console.log(`ItemListPage items.content: `, JSON.stringify(items.content));

    

    return (
        <Grid container spacing={4}>
            {items.content.map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item.itemId}>
                    <Card>
                        <CardMedia
                            component="img"
                            height="140"
                            image={item.imageUrl}
                            alt={item.itemName}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {item.itemName}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                가격: {item.itemPrice}원
                            </Typography>
                            {/* 추가 정보 표시 가능 */}
                        </CardContent>
                        <CardActions>
                            <Button size="small">더보기</Button>
                            {/* 필요한 액션 추가 */}
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
      );
};

export default ItemListPage;