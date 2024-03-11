import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Grid, imageListClasses } from '@mui/material';
import { HttpPost } from '../service/HttpService';
import DaumPostcode from 'react-daum-postcode';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordCheck: '',
    name: '',
    nickname: '',
    email: '',
    birthDate: '',
    address1: '',
    address2: '',
    zipcode: '',
    phoneNumber: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [isOpen, setIsOpen] = useState(false);

  const handleComplete = (data) => {
    console.log(data);
    setFormData({
      ...formData,
      address1: data.address,
      zipcode: data.zonecode,
    });
    console.log(formData);
    setIsOpen(false); // 모달 닫기
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);


  const handleSubmit = (e) => {
    e.preventDefault();
    // 회원가입 로직 처리
    console.log(formData);
    HttpPost('http://localhost:8080/api/v1/auth/join', formData)
    .then( (response) => {
      alert("회원가입 성공")
      navigate("/login");
    }).catch((error) => {
      console.log("================== join error =================");
      console.log(error);
      if(typeof error.response.data === 'string'){
        alert(error.response.data);
      }
    }); 
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5" marginBottom="20px">
        Sign up
      </Typography>
      {isOpen && (
              <div style={{
                display: 'flex',
                flexDirection: 'column', // 내용을 세로로 정렬합니다.
                position: 'fixed', // 또는 'absolute', 페이지 스크롤 여부에 따라 선택
                top: '50%',
                left: '50%',
                zIndex: 300,
                width: '50vw', // 화면 가로 크기의 50%
                height: '60vh', // 화면 세로 크기의 50%
                border: '2px solid #333', // 더 진한 테두리
                backgroundColor: 'rgba(255, 255, 255, 0.9)', // 불투명한 배경
                transform: 'translate(-50%, -50%)', // 정 중앙 정렬을 위한 조정
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px', // 내부 여백 추가
                boxSizing: 'border-box', // 패딩이 크기에 포함되도록 설정
              }}>
                <DaumPostcode onComplete={handleComplete} />
                <button onClick={closeModal}>닫기</button>
              </div>
            )}
      <form onSubmit={handleSubmit} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              autoComplete="username"
              name="username"
              variant="outlined"
              required
              fullWidth
              id="username"
              label="아이디"
              autoFocus
              value={formData.username}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="passwordCheck"
              label="Confirm Password"
              type="password"
              id="passwordCheck"
              autoComplete="new-password"
              value={formData.passwordCheck}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="name"
              variant="outlined"
              required
              fullWidth
              id="name"
              label="Name"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="nickname"
              variant="outlined"
              required
              fullWidth
              id="nickname"
              label="Nickname"
              autoComplete="nickname"
              value={formData.nickname}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="birthDate"
              label="Birth Date"
              type="date"
              id="birthDate"
              autoComplete="bday"
              InputLabelProps={{ shrink: true }}
              value={formData.birthDate}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="address1"
              variant="outlined"
              required
              fullWidth
              id="address1"
              label="Address"
              value={formData.address1}
              onClick={openModal}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="address2"
              variant="outlined"
              required
              fullWidth
              id="address2"
              label="상세 주소"
              value={formData.address2}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="phoneNumber"
              variant="outlined"
              required
              fullWidth
              id="phoneNumber"
              label="Phone Number"
              autoComplete="tel"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default SignUp;
