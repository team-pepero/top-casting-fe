import React, { useState, useContext } from "react";
import { Container, TextField, Typography, Stack } from "@mui/material";
import apiInstance from "../../service/HttpService";
import { LoginContext } from "../../contexts/LoginContextProvider";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import SocialLoginButton from "../../component/SocialLoginButton";
import { Button } from "react-daisyui";

function Login() {
  const navigate = useNavigate();

  const { loginCheck } = useContext(LoginContext);

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

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
    <Container component="main" maxWidth="xs">
      <p className="lg:text-4xl text-3xl font-black leading-9 text-gray-800 dark:text-white mb-3 mt-3">LogIn</p>
      <form onSubmit={handleSubmit} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="ID"
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
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={credentials.password}
          onChange={handleChange}
        />

        <Stack spacing={2} sx={{ width: "100%" }}>
        <Button
              className="text-base leading-none w-full bg-gray-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white dark:hover:bg-gray-700"
              type="submit"
              variant="contained"
            >
              LogIn
            </Button>
        </Stack>
      </form>
      <SocialLoginButton
            frontUrl= {process.env.REACT_APP_FRONT_URL}
            backUrl= {process.env.REACT_APP_BACK_URL}
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
    </Container>
  );
}

export default Login;
