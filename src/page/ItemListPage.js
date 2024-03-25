import React from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const ItemListPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { items } = location.state || { items: { content: [] } }; // 기본값 설정
    const API_ROOT = process.env.REACT_APP_API_ROOT;

    const handleMoreInfo = (itemId) => {
        navigate(`/items/${itemId}`);
    };

    return (
        <Grid container spacing={3}>
            {items.content.map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item.itemId}>
                    <Card style={{ width: '100%' }}>
                        <CardMedia
                            component="div"
                            style={{ height: 0, paddingTop: '100%', backgroundSize: 'cover', backgroundImage: `url(${item.imageUrl})` }}
                            alt={item.itemName}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {item.itemName}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                가격: {item.itemPrice}원
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" onClick={() => handleMoreInfo(item.itemId)}>더보기</Button>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default ItemListPage;
