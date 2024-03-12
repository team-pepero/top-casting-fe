import React from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useCart } from "../cart/CartContex";

const ProductListPage = ({ products }) => {
  const { addToCart } = useCart();

  return (
    <Grid container spacing={4} style={{ padding: "20px" }}>
      {products.map((product) => (
        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image={product.imageUrl}
              alt={product.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {product.description}
              </Typography>
              <Typography variant="h6">{product.price}</Typography>
            </CardContent>
            <CardActions>
              <Button size="small" component={Link} to={`/item/${product.id}`}>
                더 보기
              </Button>
              <Button size="small" onClick={() => addToCart(product)}>
                장바구니에 추가
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductListPage;
