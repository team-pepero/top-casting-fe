import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

const OrderDetail = () => {
    const [orderDetail, setOrderDetail] = useState(null);
    const { orderId } = useParams();
	const location = useLocation();
	const navigate = useNavigate();

    useEffect(() => {
        fetchOrderDetail(orderId);
    }, [orderId]);

    const fetchOrderDetail = async (orderId) => {
		const accessToken = Cookies.get("accessToken");

    if (!accessToken) {
      navigate('/login');
      return;
    }
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/admin/order/${orderId}`, {
				headers: {
				  Authorization: `Bearer ${accessToken}`
				}
			  });
			console.log("response", response);
            setOrderDetail(response.data);
        } catch (error) {
            console.error('주문 상세 정보를 가져오는 데 실패했습니다:', error);
        }
    };

	// 환불 을 처리하는 함수입니다.
    const handleRefund = async () => {
		const accessToken = Cookies.get("accessToken");

    if (!accessToken) {
      navigate('/login');
      return;
    }
        try {
			const paymentKey = orderDetail.paymentKey;
            const response = await axios.delete(`http://localhost:8080/api/v1/admin/refund?paymentKey=${paymentKey}&cancelReason=hello`, {
                orderId: orderDetail.orderId // 환불 요청 시 주문 ID를 본문에 포함시킵니다.
            }, {
				headers: {
				  Authorization: `Bearer ${accessToken}`
				}
			  });
			console.log("Response:", response);
            // 환불 성공 시 로직
            alert('환불 요청이 완료되었습니다.');
        } catch (error) {
            // 환불 실패 시 로직
            console.error('Failed to process refund:', error);
            alert('환불 요청에 실패했습니다.');
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
			<button onClick={handleRefund}>환불</button>
        </div>
    );
};

export default OrderDetail;