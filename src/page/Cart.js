import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from '../contexts/LoginContextProvider';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function Cart() {
  const { isLogin, loginCheck } = useContext(LoginContext);
  const navigate = useNavigate();
  const [cart, setCart] = useState({
    cartItems: [],
    shippingFee: 0,
    freeShippingCond: 0,
  });
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    if (!isLogin) {
      loginCheck();
    }
  }, [isLogin]);

  const fetchData = async () => {
    const accessToken = Cookies.get("accessToken");

    if (!accessToken) {
      navigate('/login');
      return;
    }

    try {
      const response = await axios.get("http://localhost:8080/api/v1/carts", {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      setCart(response.data);
      setSelectedItems(response.data.cartItems.map(item => item.cartItemId)); // Set all items as selected initially
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const updateQuantity = async (id, quantity) => {
    const accessToken = Cookies.get("accessToken");

    try {
      await axios.post(`http://localhost:8080/api/v1/carts/${id}`, { itemQuantity: quantity }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      fetchData();
    } catch (error) {
      console.error("Error updating quantity: ", error);
    }
  };

  const deleteItem = async (id) => {
    const accessToken = Cookies.get("accessToken");

    try {
      await axios.delete(`http://localhost:8080/api/v1/carts/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      fetchData();
    } catch (error) {
      console.error("Error deleting item: ", error);
    }
  };

  const handleCheckboxChange = (event, cartItemId) => {
    if (event.target.checked) {
      setSelectedItems([...selectedItems, cartItemId]);
    } else {
      setSelectedItems(selectedItems.filter(id => id !== cartItemId));
    }
  };

  const handleOrder = () => {
    const orderContent = cart.cartItems.filter(item => selectedItems.includes(item.cartItemId)).map(item => ({ cartItemId: item.cartItemId, itemQuantity: item.itemQuantity }));
    const orderData = {
      content: orderContent,
      totalPrice: calculateTotal(),
      shippingFee: calculateShippingFee()
    };
    navigate('/ordersheet', { state: { orderData } });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const calculateTotal = () => {
    let total = 0;
    cart.cartItems.forEach(item => {
      if (selectedItems.includes(item.cartItemId)) {
        total += item.itemPrice * item.itemQuantity;
      }
    });
    return total;
  };

  const calculateShippingFee = () => {
    const total = calculateTotal();
    return total >= cart.freeShippingCond ? 0 : cart.shippingFee;
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
      <table>
        <thead>
          <tr>
            <th>선택</th>
            <th>상품 이미지</th>
            <th>상품 이름</th>
            <th>옵션</th>
            <th>상품 가격</th>
            <th>수량</th>
            <th>총 가격</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {cart.cartItems.map((item) => (
            <tr key={item.cartItemId}>
              <td>
                <input type="checkbox" checked={selectedItems.includes(item.cartItemId)} onChange={(event) => handleCheckboxChange(event, item.cartItemId)} />
              </td>
              <td>
                <img src={item.itemImage} width={200} height={200} alt={item.itemName} />
              </td>
              <td>{item.itemName}</td>
              <td>{item.itemColor}</td>
              <td>{item.itemPrice}</td>
              <td>
                {item.itemQuantity}
                <button onClick={() => updateQuantity(item.cartItemId, item.itemQuantity + 1)}>▲</button>
                <button onClick={() => updateQuantity(item.cartItemId, item.itemQuantity - 1)}>▼</button>
              </td>
              <td>
                {item.itemPrice * item.itemQuantity}
              </td>
              <td>
                <button onClick={() => deleteItem(item.cartItemId)}>삭제</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>합계: {calculateTotal()}</div>
      <div>배송비: {calculateShippingFee()}</div>
      <button onClick={handleOrder}>주문하기</button>
    </div>
  );
}

export default Cart;
