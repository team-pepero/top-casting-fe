import React from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


function Navibar() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    My Website
                </Typography>
                <Button color="inherit" href="/">Home</Button>
                <Button color="inherit" href="/join">회원가입</Button>
                <Button color="inherit" href="/login">로그인</Button>
            </Toolbar>
        </AppBar>
    );
}

export default Navibar;