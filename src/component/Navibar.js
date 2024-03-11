import React, { useContext } from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { LoginContext } from "../contexts/LoginContextProvider";
import { Link } from 'react-router-dom';


function Navibar() {

    const { isLogin, logout, userInfo } = useContext(LoginContext);

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    TopCasting
                </Typography>
                {/* 공통 */}
                <Button color="inherit" component={Link} to="/login">Home</Button>
                {isLogin ? 
                <>
                <Button color="inherit" component={Link} onClick={() => logout()}>로그아웃</Button>
                <Button color="inherit" component={Link} to="/">{userInfo.userId}</Button>
                </>
                :
                <>
                <Button color="inherit" component={Link} to="/join">회원가입</Button>
                <Button color="inherit" component={Link} to="/login">로그인</Button>
                </>
                }
                
            </Toolbar>
        </AppBar>
    );
}

export default Navibar;