import React from "react";
import { Link } from "react-router-dom"; // Link 컴포넌트를 임포트합니다.
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function Navibar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          TopCasting
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/join">
          회원가입
        </Button>
        <Button color="inherit" component={Link} to="/login">
          로그인
        </Button>
        <Button color="inherit" component={Link} to="/cart">
          장바구니
        </Button>{" "}
      </Toolbar>
    </AppBar>
  );
}

export default Navibar;
