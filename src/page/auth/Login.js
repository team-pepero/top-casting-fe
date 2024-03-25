import React, { useState, useContext } from "react";
import { Container, TextField, Button, Typography, Stack } from "@mui/material";
import apiInstance from "../../service/HttpService";
import { LoginContext } from "../../contexts/LoginContextProvider";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import SocialLoginButton from "../../component/SocialLoginButton";

function Login() {
  const navigate = useNavigate();
  const API_ROOT = process.env.REACT_APP_API_ROOT;
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
      .post(`${API_ROOT}/api/v1/auth/login`, credentials)
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
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
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
          <Button type="submit" fullWidth variant="contained" color="primary">
            Sign In
          </Button>

          <SocialLoginButton
            frontUrl="http://localhost:3000"
            backUrl="${API_ROOT}"
            domain="google"
          />
          <SocialLoginButton
            frontUrl="http://localhost:3000"
            backUrl="${API_ROOT}"
            domain="naver"
          />
          <SocialLoginButton
            frontUrl="http://localhost:3000"
            backUrl="${API_ROOT}"
            domain="kakao"
          />
        </Stack>
      </form>
    </Container>
  );
}

export default Login;
