import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from 'js-cookie';

const OrderSheet = () => {
	
    const location = useLocation();
    const orderData = location.state.orderData;
    const [orderDetails, setOrderDetails] = useState({
        customerName: "",
        customerAddress: "",
        customerPhoneNumber: "",
        orderItems: orderData.content || [],
        totalItemQuantity: orderData.content.length,
        totalItemPrice: orderData.totalPrice,
        shippingFee: orderData.shippingFee || 0,
        addOrderItemDtos: orderData.content,
    });
	

    const navigate = useNavigate();

    useEffect(() => {
        console.log(orderData);
        // const totalQuantity = orderDetails.addOrderItemDtos.reduce((total, item) => total + Number(item.itemQuantity), 0);
        // const totalPrice = orderDetails.addOrderItemDtos.reduce((total, item) => total + (Number(item.itemQuantity) * Number(item.itemPrice)), 0);

        // setOrderDetails(prevDetails => ({
        //     ...prevDetails,
        //     totalItemQuantity: totalQuantity,
        //     totalItemPrice: totalPrice
        // }));
    }, [orderDetails.addOrderItemDtos]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setOrderDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const accessToken = Cookies.get("accessToken");

        if (!accessToken) {
            navigate("/login");
            return;
        }
        try {
			orderDetails.totalItemPrice += orderDetails.shippingFee;
            const response = await axios.post(
                `${process.env.REACT_APP_BACK_URL}/api/v1/order`, orderDetails,{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					}
				}
            );
            console.log("Order added successfully:", response.data);
            const orderId = response.data.orderId;
            navigate(`/payment?orderId=${orderId}`, {
                state: { orderDetails },
            });
        } catch (error) {
            console.error("Failed to add order:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                }}
            >
                <input
                    name="customerName"
                    value={orderDetails.customerName}
                    onChange={handleInputChange}
                    placeholder="Customer Name"
                    required
                />
                <input
                    name="customerAddress"
                    value={orderDetails.customerAddress}
                    onChange={handleInputChange}
                    placeholder="Customer Address"
                    required
                />
                <input
                    name="customerPhoneNumber"
                    value={orderDetails.customerPhoneNumber}
                    onChange={handleInputChange}
                    placeholder="Customer Phone Number"
                    required
                />
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
                        {orderData.content.map((item) => (
                            <tr key={item.cartItemId}>
                                <td>
                                    <img
                                        src={item.itemImage}
                                        width={200}
                                        height={200}
                                        alt={item.itemName}
                                    />
                                </td>
                                <td>{item.itemName}</td>
								<td>{item.itemQuantity}</td>
								<td>{item.itemColor}</td>
								<td>{item.itemPrice}</td>
                                <td>{item.itemPrice * item.itemQuantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div>합계: {orderDetails.totalItemPrice}</div>
                <div>배송비: {orderDetails.shippingFee}</div>
            </div>
            <button type="submit">Submit Order</button>

            {/* {orderDetails.addOrderItemDtos.map((item, index) => (
                <div key={index}>
                    <input
                        name="cartItemId"
                        value={item.cartItemId}
                        onChange={(e) => handleItemChange(index, e)}
                        placeholder="Cart Item ID"
                        required
                    />
                    <input
                        name="itemQuantity"
                        type="number"
                        value={item.itemQuantity}
                        onChange={(e) => handleItemChange(index, e)}
                        placeholder="Item Quantity"
                        required
                    />
                    <input
                        name="itemPrice"
                        type="number"
                        value={item.itemPrice}
                        onChange={(e) => handleItemChange(index, e)}
                        placeholder="Item Price"
                        required
                    />
                </div>
            ))} */}
        </form>
    );
};

export default OrderSheet;
