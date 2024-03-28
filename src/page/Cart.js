import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from '../contexts/LoginContextProvider';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../index.css'

function Cart() {
  const { isLogin, loginCheck } = useContext(LoginContext);
  const navigate = useNavigate();
  const API_ROOT = process.env.REACT_APP_API_ROOT;
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

      const response = await axios.get(`${process.env.REACT_APP_BACK_URL}/api/v1/carts`, {
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

    // 수량이 0보다 작아지지 않도록 검사
    if (quantity <= 0) {
      console.log("수량은 0 이하일 수 없습니다.");
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_BACK_URL}/api/v1/carts/${id}`, { itemQuantity: quantity }, {
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
      await axios.delete(`${process.env.REACT_APP_BACK_URL}/api/v1/carts/${id}`, {
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
    console.log("selectedItems", selectedItems)
    if (event.target.checked) {
      setSelectedItems([...selectedItems, cartItemId]);
    } else {
      setSelectedItems(selectedItems.filter(id => id !== cartItemId));
    }
  };

  const handleOrder = () => {
    const orderContent = cart.cartItems.filter(item => selectedItems.includes(item.cartItemId))
      .map(item => ({
        cartItemId: item.cartItemId,
        itemImage: item.itemImage,
        itemQuantity: item.itemQuantity,
        itemName: item.itemName,
        itemColor: item.itemColor,
        itemPrice: item.itemPrice
      }));

    console.log("test", orderContent);
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

    <>
      <div class="w-full h-full bg-black dark:bg-gray-900 bg-opacity-90 top-0 overflow-y-auto overflow-x-hidden fixed sticky-0" id="chec-div">

        <div class="w-full absolute z-10 right-0 h-full overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700" id="checkout">
          <div class="flex items-end lg:flex-row flex-col justify-end" id="cart">
            <div class="lg:w-1/2 md:w-8/12 w-full lg:px-8 lg:py-14 md:px-6 px-4 md:py-8 py-4 bg-white dark:bg-gray-800 overflow-y-auto overflow-x-hidden lg:h-screen h-auto" id="scroll">
              <div class="flex items-center text-gray-500 hover:text-gray-600 dark:text-white cursor-pointer" onClick={() => navigate(-1)}>
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="16" height="16" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <polyline points="15 6 9 12 15 18" />
                </svg>
                <p class="text-sm pl-2 leading-none dark:hover:text-gray-200">Back</p>
              </div>
              <p class="lg:text-4xl text-3xl font-black leading-10 text-gray-800 dark:text-white pt-3">장바구니</p>
              {cart.cartItems.map((item) => (
                <div key={item.cartItemId} class="md:flex items-center py-8 md:py-10 lg:py-8 border-t border-gray-50">
                  <input placeholder="checkbox" type="checkbox" checked={selectedItems.includes(item.cartItemId)} onChange={(event) => handleCheckboxChange(event, item.cartItemId)} class="focus:opacity-100 checkbox cursor-pointer" />
                  <div class="md:w-4/12 2xl:w-1/4 w-full">
                    <img src={item.itemImage} alt={item.itemName} class="h-full object-center object-cover md:block hidden" />
                    <img src={item.itemImage} alt={item.itemName} class="md:hidden w-full h-full object-center object-cover" />
                  </div>
                  <div class="md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-center">
                    <div class="flex items-center">
                      <div class="flex flex-col justify-center w-full">
                        <div class="flex items-center justify-between w-full pt-1">
                          <p class="text-base font-black leading-none text-gray-800 dark:text-white">{item.itemName}</p>
                          <div class="flex items-center justify-center">
                            <button id="decrement-btn" onClick={() => updateQuantity(item.cartItemId, item.itemQuantity - 1)}
                              class="flex justify-center items-center w-6 h-6 rounded-full text-white focus:outline-none bg-gray-400 hover:bg-gray-500">
                              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                              </svg>
                            </button>
                            <span id="counter" class="text-xl font-bold mx-4">{item.itemQuantity}</span>
                            <button id="increment-btn" onClick={() => updateQuantity(item.cartItemId, item.itemQuantity + 1)}
                              class="flex justify-center items-center w-6 h-6 rounded-full text-white focus:outline-none bg-indigo-500 hover:bg-indigo-600">
                              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v12M6 12h12"></path>
                              </svg>
                            </button>
                          </div>
                        </div>
                        <p class="text-xs leading-3 text-gray-600 dark:text-white pt-2">옵션: {item.itemColor}</p>
                        <div class="flex items-center justify-between pt-5">
                          <div class="flex itemms-center">
                            <p class="text-xs leading-3 underline text-gray-800 dark:text-white cursor-pointer">Add to favorites</p>
                            <button onClick={() => deleteItem(item.cartItemId)} class="text-xs leading-3 underline text-red-500 pl-5 cursor-pointer">Remove</button>
                          </div>
                          <p class="text-base font-black leading-none text-gray-800 dark:text-white">{item.itemPrice}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              ))}


            </div>
            <div class="lg:w-96 md:w-8/12 w-full bg-gray-100 dark:bg-gray-900 h-full">
              <div class="flex flex-col lg:h-screen h-auto lg:px-8 md:px-7 px-4 lg:py-20 md:py-10 py-6 justify-between overflow-y-auto">
                <div>
                  <p class="lg:text-4xl text-3xl font-black leading-9 text-gray-800 dark:text-white">Summary</p>
                  <div class="flex items-center justify-between pt-16">
                    <p class="text-base leading-none text-gray-800 dark:text-white">Subtotal</p>
                    <p class="text-base leading-none text-gray-800 dark:text-white">{calculateTotal()}</p>
                  </div>
                  <div class="flex items-center justify-between pt-5">
                    <p class="text-base leading-none text-gray-800 dark:text-white">Shipping</p>
                    <p class="text-base leading-none text-gray-800 dark:text-white">{calculateShippingFee()}</p>
                  </div>
                </div>
                <div>
                  <div class="flex items-center pb-6 justify-between lg:pt-5 pt-20">
                    <p class="text-2xl leading-normal text-gray-800 dark:text-white">Total</p>
                    <p class="text-2xl font-bold leading-normal text-right text-gray-800 dark:text-white">{calculateTotal() + calculateShippingFee()}</p>
                  </div>
                  <button onClick={handleOrder} class="text-base leading-none w-full py-5 bg-gray-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white dark:hover:bg-gray-700">주문하기</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    </>

  );
}

export default Cart;
