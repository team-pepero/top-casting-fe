import React, { useState, useContext } from "react";
import { Container, TextField, Typography, Stack } from "@mui/material";
import { Button } from "react-daisyui";
import apiInstance from "../service/HttpService";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import SocialLoginButton from "../component/SocialLoginButton";
import { LoginContext } from "../contexts/LoginContextProvider";

const LoginModal = ({ onClose }) => {
  const navigate = useNavigate();

  const { loginCheck } = useContext(LoginContext);

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleNavigation = (path) => {
    onClose(); // 모달 닫기
    navigate(path); // 네비게이션 실행
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 회원가입 로직 처리
    await apiInstance
      .post("/api/v1/auth/login", credentials)
      .then((response) => {
        const authorizationHeader = response.headers.authorization;
        const newAccessToken = authorizationHeader.replace("Bearer ", "");
        Cookies.set("accessToken", newAccessToken);
        apiInstance.defaults.headers.common.authorization = `Bearer ${newAccessToken}`;

        loginCheck();
        alert("로그인 성공");
        navigate("/");
      })
      .catch((error) => {
        alert("로그인 실패");
      });
  };

  return (
    <div className="bg-white shadow rounded  w-full p-10 ">
    <p className="lg:text-4xl text-3xl font-black leading-9 text-gray-800 dark:text-white mb-3 mt-3">Login</p>
    <div onClick={() => handleNavigation("/join")}>
  <p
    tabIndex="0"
    className="focus:outline-none text-sm mt-4 font-medium leading-none text-gray-500"
  >
    계정이 없으신가요?{" "}
    <span
  className="text-blue-500 hover:text-gray-500 focus:text-gray-500 focus:outline-none focus:underline hover:underline text-sm font-medium leading-none cursor-pointer"
>
  회원가입
</span>
  </p>
</div>

      <form onSubmit={handleSubmit} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="아이디"
          name="username"
          autoComplete="username"
          autoFocus
          value={credentials.username}
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="비밀번호"
          type="password"
          id="password"
          autoComplete="current-password"
          value={credentials.password}
          onChange={handleChange}
        />

            <Button
              className="text-base leading-none w-full mt-5 bg-gray-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white dark:hover:bg-gray-700"
              type="submit"
              variant="contained"
            >
              LogIn
            </Button>
      </form>

      

      <div className="w-full flex items-center justify-between py-5">
        <hr className="w-full bg-gray-400" />
        <p className="text-base font-medium leading-4 px-2.5 text-gray-400">
          OR
        </p>
        <hr className="w-full bg-gray-400" />
      </div>

      <SocialLoginButton
        frontUrl={process.env.REACT_APP_FRONT_URL}
        backUrl={process.env.REACT_APP_BACK_URL}
        domain="google"
      />
      <SocialLoginButton
        frontUrl={process.env.REACT_APP_FRONT_URL}
        backUrl={process.env.REACT_APP_BACK_URL}
        domain="naver"
      />
      <SocialLoginButton
        frontUrl={process.env.REACT_APP_FRONT_URL}
        backUrl={process.env.REACT_APP_BACK_URL}
        domain="kakao"
      />

      
    </div>
  );
};

export default LoginModal;
