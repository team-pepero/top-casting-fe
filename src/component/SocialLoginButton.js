import React from "react";
import { Button } from "@mui/material";

const SocialLoginButton = (props) => {

    const frontUrl = props.frontUrl;
    const backUrl = props.backUrl;
    const url = `${backUrl}/socialLogin/${props.domain}?redirectUrl=${frontUrl}`;
    console.log(url);
    return (
      <Button
        variant="contained"
        fullWidth
        onClick={() => window.location.href = url} // 외부 URL로 리다이렉트
      >
        {props.domain} 로그인
        
      </Button>
    );
};

export default SocialLoginButton;
