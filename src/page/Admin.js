import React, { useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { LoginContext } from "../contexts/LoginContextProvider";

function Admin() {
    const { roles } = useContext(LoginContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (roles == null || !roles.isAdmin) {
            alert('관리자만 접근 가능합니다.');
            navigate('/');
        }
    }, [roles]);

    return (
        <div>
            <h1>관리자 페이지</h1>
            <button onClick={() => navigate('/addItem')}>상품등록</button>
            <button onClick={() => alert('모든 주문 조회')}>모든 주문 조회</button>
            <button onClick={() => alert('환불 요청 목록')}>환불 요청 목록</button>
        </div>
    );
};

export default Admin;


