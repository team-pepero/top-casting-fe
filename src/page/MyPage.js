import axios from 'axios';
import React, { useContext } from "react";
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from "../contexts/LoginContextProvider";


function MemberDetails() {
    const [memberDetails, setMemberDetails] = useState(null);
    const navigate = useNavigate();

    const { userInfo } = useContext(LoginContext);


    useEffect(() => {
        const fetchMemberDetails = async () => {

            const accessToken = Cookies.get('accessToken');
            if (!accessToken) {
                navigate('/login');
                return;
            }

            try {
                // 서버로부터 데이터를 가져옵니다.
                console.log("Bearer : ", accessToken)
                const response = await axios.get(`http://localhost:8080/api/v1/members/${userInfo.no}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                console.log("response: ", response);
                // 응답 데이터를 상태에 저장합니다.
                setMemberDetails(response.data);
            } catch (error) {
                // 오류 처리
                console.error("데이터를 가져오는 데 실패했습니다:", error);
            }
        };

        fetchMemberDetails();
    }, [userInfo]);

    if (!memberDetails) {
        return <div>로딩</div>
    }

    return (
        <div>
            <h1>회원 정보</h1>
            <p>사용자명: {memberDetails.username}</p>
            <p>닉네임: {memberDetails.nickname}</p>
            <p>이름: {memberDetails.name}</p>
            <p>이메일: {memberDetails.email}</p>
            <p>생년월일: {memberDetails.birthDate}</p>
            <p>전화번호: {memberDetails.phoneNumber}</p>
            <p>주소: {memberDetails.address1} {memberDetails.address2}</p>
            <p>우편번호: {memberDetails.zipcode}</p>
        </div>
    );

}

export default MemberDetails;