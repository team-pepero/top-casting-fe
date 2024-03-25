import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
    const API_ROOT = process.env.REACT_APP_API_ROOT;

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        const accessToken = Cookies.get("accessToken");

        if (!accessToken) {
            navigate('/login');
            return;
        }
        try {
            const response = await axios.get(`${API_ROOT}/api/v1/orders/refund`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            console.log(response)// '/orders'는 백엔드 엔드포인트에 맞게 수정하세요.
            setOrders(response.data);
        } catch (error) {
            console.error("주문 정보를 가져오는 데 실패했습니다:", error);
        }
    };

    const handleOrderClick = (uuid) => {
        navigate(`/requestRefundList/${uuid}`);
    };

    return (
        <div>
            <h1>주문 목록</h1>
            <ul>
                {orders.map((order) => (
                    <li key={order.orderId} onClick={() => handleOrderClick(order.orderId)}>
                        <h2>
                            {order.customerName} ({order.orderStatus})
                        </h2>
                        <p>주문 날짜: {order.orderCreatedDate}</p>
                        <p>
                            총 수량: {order.totalItemQuantity} / 총 가격:{" "}
                            {order.totalItemPrice}
                        </p>
                        <div>
                            <h3>주문 상품</h3>
                            <ul>
                                {order.findOrderItemDtos.map((item) => (
                                    <li key={item.itemName}>
                                        <img
                                            src={item.itemImagePath}
                                            alt={item.itemName}
                                            style={{
                                                width: "100px",
                                                height: "100px",
                                            }}
                                        />
                                        <p>
                                            {item.itemName} - {item.itemOption}
                                        </p>
                                        <p>
                                            수량: {item.itemQuantity} / 가격:{" "}
                                            {item.totalPrice}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrderList;
