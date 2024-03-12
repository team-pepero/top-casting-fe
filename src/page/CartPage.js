import React, { useContext, useState } from "react";
import {
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  TextField,
} from "@mui/material";
import { useCart } from "../cart/CartContex";

const CartPage = () => {
  const { cartItems, setCartItems } = useCart();

  const handleQuantityChange = (id, newQuantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const parsePrice = (priceString) => {
    // '원' 문자와 ','를 제거하고 숫자로 변환
    return parseInt(priceString.replace(/원|,/g, ""), 10);
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + parsePrice(item.price) * item.quantity,
      0
    );
  };

  return (
    <Grid container spacing={2} direction="column" style={{ padding: "20px" }}>
      <Typography variant="h4">장바구니</Typography>
      {cartItems.map((item) => (
        <Grid item key={item.id}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h5">{item.name}</Typography>
              <Typography variant="body1">가격: {item.price}</Typography>
              <TextField
                label="수량"
                type="number"
                value={item.quantity}
                onChange={(e) =>
                  handleQuantityChange(item.id, parseInt(e.target.value))
                }
                InputLabelProps={{
                  shrink: true,
                }}
                margin="normal"
              />
            </CardContent>
            <CardActions>
              <Button onClick={() => handleRemoveItem(item.id)}>제거</Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
      <Typography variant="h6">총 가격: {getTotalPrice()}원</Typography>
      <Button variant="contained" color="primary" style={{ marginTop: "20px" }}>
        결제하기
      </Button>
    </Grid>
  );
};

export default CartPage;
