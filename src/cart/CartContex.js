// CartContext.js 업데이트 예시
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const fetchData = async () => {
    const accessToken = Cookies.get("accessToken");
    if (!accessToken) {
      console.log("Access Token is missing");
      return;
    }

    try {
      const response = await axios.get("http://your-api-endpoint/carts", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setCartItems(response.data.cartItems); // Assuming response.data.cartItems is the array of cart items
    } catch (error) {
      console.error("Error fetching cart data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Add other cart related functions here

  return (
    <CartContext.Provider
      value={{ cartItems, setCartItems /* add other functions here */ }}
    >
      {children}
    </CartContext.Provider>
  );
};
