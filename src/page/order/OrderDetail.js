import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const OrderDetail = () => {
    const [orderDetail, setOrderDetail] = useState(null);
    const { orderId } = useParams();
    const [orderStatus, setOrderStatus] = useState('');
    const API_ROOT = process.env.REACT_APP_API_ROOT;
    const navigate = useNavigate();
    useEffect(() => {
        fetchOrderDetail(orderId);
    }, [orderId]);

    const fetchOrderDetail = async (orderId) => {

        const accessToken = Cookies.get("accessToken");
        if (!accessToken) {
            navigate("/login");
            return;
        }

        try {
            const response = await axios.get(`${API_ROOT}/api/v1/order/${orderId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            }
            );
            setOrderDetail(response.data);
        } catch (error) {
            console.error('주문 상세 정보를 가져오는 데 실패했습니다:', error);
        }
    };

    const handleStatusChange = (event) => {
        setOrderStatus(event.target.value);
    };

    const handleSubmit = async () => {

        const accessToken = Cookies.get("accessToken");

        if (!accessToken) {
            navigate("/login");
            return;
        }

        try {
            const response = await axios.patch(`${API_ROOT}/api/v1/orders/${orderId}/refund`, {
                orderStatus: orderStatus,
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            });
            console.log(response.data);
            alert('상태 업데이트 성공!');
        } catch (error) {
            console.error('상태 업데이트 실패:', error);
            alert('상태 업데이트 실패!');
        }
    };


    if (!orderDetail) {
        return <div>로딩 중...</div>;
    }

    return (
        <div>
            <h1>주문 상세 정보</h1>
            <p>주문 ID: {orderDetail.orderId}</p>
            <p>고객 이름: {orderDetail.customerName}</p>
            <p>고객 전화번호: {orderDetail.customerPhoneNumber}</p>
            <p>고객 주소: {orderDetail.customerAddress}</p>
            <p>주문 상태: {orderDetail.orderStatus}</p>
            <p>주문 생성 날짜: {orderDetail.orderCreatedDate}</p>
            <p>총 상품 수량: {orderDetail.totalItemQuantity}</p>
            <p>총 가격: {orderDetail.totalItemPrice}</p>
            <h2>주문 상품 목록</h2>
            <ul>
                {orderDetail.findOrderItemDtos.map(item => (
                    <li key={item.itemName}>
                        <img src={item.itemImagePath} alt={item.itemName} style={{ width: '100px', height: '100px' }} />
                        <p>상품 이름: {item.itemName}</p>
                        <p>상품 옵션: {item.itemOption}</p>
                        <p>수량: {item.itemQuantity}</p>
                        <p>가격: {item.totalPrice}</p>
                    </li>
                ))}
            </ul>
            <select value={orderStatus} onChange={handleStatusChange}>
                <option value="">상태를 선택하세요</option>
                <option value="ORDER_REFUND_REQUESTED">환불 요청됨</option>
                <option value="ORDER_EXCHANGE_REQUESTED">교환 요청됨</option>
            </select>
            <button onClick={handleSubmit}>환불 요청</button>
        </div>
    );
};

export default OrderDetail;