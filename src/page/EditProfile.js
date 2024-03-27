import React, { useState, useEffect, useContext } from 'react';
import { Container, TextField, Button, Typography, Grid } from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { LoginContext } from '../contexts/LoginContextProvider';

function EditProfile() {
    const navigate = useNavigate();
    const { userInfo } = useContext(LoginContext);
    const [memberInfo, setMemberInfo] = useState({
        nickname: '',
        password: '',
        passwordCheck: '',
        email: '',
        address1: '',
        address2: '',
        phoneNumber: '',
    });

    console.log(memberInfo);
    useEffect(() => {
        fetchMemberData()
    }, [userInfo])


    const fetchMemberData = async () => {
        const accessToken = Cookies.get('accessToken');
        if (!accessToken) {
            navigate('/login');
            return;
        }


        try {
            const response = await axios.get(`${process.env.REACT_APP_BACK_URL}/api/v1/members/${userInfo.no}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            console.log("ResponseData", response);
            setMemberInfo(response.data);
        } catch (error) {
            console.error('Error fetching member data:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMemberInfo({
            ...memberInfo,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const accessToken = Cookies.get('accessToken');
        if (!accessToken) {
            navigate('/login');
            return;
        }

        const updateData = {
            nickname: memberInfo.nickname,
            password: memberInfo.password,
            passwordCheck: memberInfo.passwordCheck,
            email: memberInfo.email,
            address1: memberInfo.address1,
            address2: memberInfo.address2,
            phoneNumber: memberInfo.phoneNumber,
        };

        try {
            await axios.patch(`${process.env.REACT_APP_BACK_URL}/api/v1/members/${userInfo.no}`, updateData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            alert('회원 정보가 성공적으로 업데이트되었습니다.');
            navigate('/mypage');
        } catch (error) {
            console.error('Error updating member profile:', error);
            alert('회원 정보 업데이트에 실패했습니다.');
        }
    };

    const handleCancel = () => {
        // 사용자가 취소 버튼을 클릭하면 실행될 로직
        navigate('/mypage'); // 사용자를 마이페이지 혹은 원하는 경로로 
        //마이페이지 구현해야함 ;;;;
    };

    return (
        <Container component="main" maxWidth="xs">
            <Typography component="h1" variant="h5">
                회원정보 수정
            </Typography>
            <form onSubmit={handleSubmit} noValidate>
                <Grid container spacing={2}>
                    {/* 닉네임 입력 필드 */}
                    <Grid item xs={12}>
                        <TextField
                            autoComplete="nickname"
                            name="nickname"
                            variant="outlined"
                            required
                            fullWidth
                            id="nickname"
                            label="닉네임"
                            autoFocus
                            value={memberInfo.nickname}
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    {/* 비밀번호 입력 필드 */}
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            label="비밀번호"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    {/* 비밀번호 확인 입력 필드 */}
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="passwordCheck"
                            label="비밀번호 확인"
                            type="password"
                            id="passwordCheck"
                            autoComplete="new-password"
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    {/* 이메일 입력 필드 */}
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="이메일"
                            name="email"
                            autoComplete="email"
                            value={memberInfo.email}
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    {/* 주소 입력 필드 */}
                    <Grid item xs={12}>
                        <TextField
                            name="address1"
                            variant="outlined"
                            required
                            fullWidth
                            id="address1"
                            label="주소"
                            value={memberInfo.address1}
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    {/* 상세 주소 입력 필드 */}
                    <Grid item xs={12}>
                        <TextField
                            name="address2"
                            variant="outlined"
                            required
                            fullWidth
                            id="address2"
                            label="상세 주소"
                            value={memberInfo.address2}
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    {/* 전화번호 입력 필드 */}
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"

                            required
                            fullWidth
                            id="phoneNumber"
                            label="전화번호"
                            name="phoneNumber"
                            autoComplete="tel"
                            value={memberInfo.phoneNumber}
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginTop: '20px' }}>
                    <Grid item xs={6}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            회원정보 수정
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={handleCancel}
                        >
                            취소
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}

export default EditProfile;