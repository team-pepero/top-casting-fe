import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const OrderCompletePage = () => {
    const [orderData, setOrderData] = useState(null);
    const location = useLocation();
	const navigate = useNavigate();

    useEffect(() => {
        // URL에서 쿼리 파라미터를 추출합니다.
        const queryParams = new URLSearchParams(location.search);
        const orderId = queryParams.get('orderId');
        const amount = queryParams.get('amount');
		const paymentKey = queryParams.get('paymentKey');

        if (orderId && amount && paymentKey) {
            // 서버로부터 주문 세부 정보를 가져옵니다.
            const fetchOrderData = async () => {
				const accessToken = Cookies.get("accessToken");

        if (!accessToken) {
            navigate("/login");
            return;
        }
				
                try {
                    const response = await axios.get(`${process.env.REACT_APP_BACK_URL}/api/v1/payment/toss/success`, {
						headers: {
							Authorization: `bearer ${accessToken}`,
						},
                        params: {
                            paymentKey: paymentKey, // 실제 paymentKey를 넣어야 합니다.
                            orderId: orderId,
                            amount: amount
                        }
                    });
                    setOrderData(response.data);
                } catch (error) {
                    console.error('Failed to fetch order details:', error);
                }
            };

            fetchOrderData();
        }
    }, [location.search]);

	


    if (!orderData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>주문 완료</h1>
            <p>주문 번호: {orderData.orderId}</p>
            <p>주문 가격: {orderData.price}</p>
            <p>고객 주소: {orderData.customerAddress}</p>
            {/* 기타 주문 완료 정보를 표시할 수 있습니다. */}
        </div>
    );
};

export default OrderCompletePage;