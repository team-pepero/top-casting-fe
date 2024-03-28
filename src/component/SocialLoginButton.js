import React from "react";
import { Button } from "@mui/material";

const SocialLoginButton = (props) => {

    const frontUrl = props.frontUrl;
    const backUrl = props.backUrl;
    const url = `${backUrl}/socialLogin/${props.domain}?redirectUrl=${frontUrl}`;
    let img = null;
 
    if(props.domain == 'kakao'){
      img = "/img/kakao.png"
    }else if(props.domain == 'google'){
      img = "/img/google.png"
    }else if(props.domain == 'naver'){
      img = "/img/naver.png"
    }

    return (
      <div className="flex justify-center mt-3 h-12">
        <img 
          src={img} 
          onClick={() => window.location.href = url} // 외부 URL로 리다이렉트
        />
      </div>
      
      
    );
};

export default SocialLoginButton;
