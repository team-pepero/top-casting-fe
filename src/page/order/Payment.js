import React from 'react';
import {useEffect } from 'react'
import { useLocation } from 'react-router-dom';

function PaymentPage(props) {
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const totalItemPrice = location.state.orderDetails;
	const orderId = queryParams.get('orderId');

	useEffect(() => {
		// 클라이언트 키
		const clientKey = 'test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq';
		

		// Toss Payments SDK 로드
		const loadTossPayments = (clientKey) => {
		  const script = document.createElement('script');
		  script.src = 'https://js.tosspayments.com/v1';
		  script.onload = () => {
			if (window.TossPayments) {
			  const tossPayments = window.TossPayments(clientKey);
			  setupPayment(tossPayments);
			}
		  };
		  document.body.appendChild(script);
		};
	
		// 결제 요청 로직
		const setupPayment = (tossPayments) => {
		  tossPayments
			.requestPayment('카드', {
			  amount: totalItemPrice.totalItemPrice,
			//   orderId: 'k9MUK4ZiEoKnhXxUbWPnZ',
			//   orderId: 'k9MUK',
			  orderId: orderId,
			  orderName: '테스트 결제',
			  customerName: '김토스',
			  successUrl: `${process.env.REACT_APP_FRONT_URL}/orderComplete`,
              failUrl: `${process.env.REACT_APP_FRONT_URL}/api/v1/payment/toss/fail`
			})
			.catch(function (error) {
			  if (error.code === 'USER_CANCEL') {
				// 사용자가 결제창을 닫았을 때의 처리
			  } else if (error.code === 'INVALID_CARD_COMPANY') {
				// 유효하지 않은 카드 회사 코드에 대한 처리
			  }
			  // 기타 에러 처리
			});
			console.log("tossPayments : ", tossPayments);
		};
	

		// SDK 로드 함수 호출
		loadTossPayments(clientKey);
	  }, []);

	return <button onClick={() => window.location.reload()}>결제하기</button>;
	
}

export default PaymentPage;