import React, { useEffect, useState } from 'react';
import apiInstance, { HttpPost } from '../service/HttpService';
import Cookies from 'js-cookie';
import { HttpGet } from '../service/HttpService';
import { useNavigate, useLocation } from 'react-router-dom';


export const LoginContext = React.createContext();


const LoginContextProvider = ({ children }) => {

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        loginCheck();
      }, [location.pathname]); //라우트 변경시마다 실행

    // 로그인 여부
    const [isLogin, setLogin] = useState(false);

    // 유저 정보 
    const [userInfo, setUserInfo] = useState({});

    // 권한 정보
    const [roles, setRoles] = useState({ isUser: false, isAdmin: false })

    // 로그인 셋팅
    const loginSetting = (userData, accessToken) => {

        const no = userData.id;
        const userId = userData.username;
        const authList = userData.authorities;
        const roleList = [];
        authList.forEach((auth) => {
            roleList.push(auth);
        })

        // 로그인 여부 : true
        setLogin(true);

        // 유저정보 셋팅
        const updateUserInfo = { no, userId, roleList };
        setUserInfo(updateUserInfo);


        // 권한 정보 셋팅
        const updatedRoles = { isUser: false, isAdmin: false };

        roleList.forEach((role) => {
            if (role == 'ROLE_USER') updatedRoles.isUser = true;
            if (role == 'ROLE_ADMIN') updatedRoles.isAdmin = true;
        });
        setRoles(updatedRoles);
    }

    //로그아웃 셋팅
    const logoutSetting = () => {

        //axios 헤더 초기화
        delete apiInstance.defaults.headers.common.authorization;

        //쿠키 초기화
        Cookies.remove("accessToken");
        Cookies.remove("RefreshToken");

        //로그인 여부 : false
        setLogin(false);

        //유저 정보 초기화
        setUserInfo(null);

        //권한 정보 초기화
        setRoles(null);

    }

    const logout = async() => {

        const check = window.confirm(`로그아웃 하시겠습니까?`);

        if(check){
            await HttpPost('http://localhost:8080/api/v1/auth/logout')
            .then(() => {
                logoutSetting();
            })
        }
    }

    // 쿠키에 jwt가 있는지 확인
    // jwt로 사용자 정보 요청
    const loginCheck = async () => {
        const accessToken = Cookies.get("accessToken");
        if(accessToken){
            apiInstance.defaults.headers.common.authorization = `Bearer ${accessToken}`;
        }
        
        await HttpGet('http://localhost:8080/api/v1/auth/info')
            .then((response) => {
                loginSetting(response, accessToken);

                if(response.authorities == "ROLE_SOCIALUSER"){
                    navigate("/socialLogin/additionalInfo");
                }
            })
            .catch((error) => {
                console.log(error);
                return;
            })
    }

    return (
        <LoginContext.Provider value={{ isLogin, userInfo, roles, logout, loginSetting, loginCheck }}>
            {children}
        </LoginContext.Provider>
    );
};

export default LoginContextProvider;
