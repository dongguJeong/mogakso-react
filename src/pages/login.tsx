import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";


const Wrapper = styled.div`
    width : 100vw;
    height : 100vh;
    display : flex;
    justify-content : center;
    align-items : center;
    background-color : ${prop => prop.theme.iconColor};
`

const Circle = styled.div`
    width: 48px;
    height: 48px;
    border-radius : 50%;
    border: 5px solid #FFF;
    border-bottom-color: #FF3D00;
    animation: rotation 1s linear infinite;

    @keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
    } 
`

const server = "3.35.0.114:8080";

export default function Redirect(){

    const movePage = useNavigate();


    const kakaoLogin = async(code : string | string[] | undefined) => {
        try {
          const res = await axios({
            method: "POST",
            url: `http://${server}/v2/login?authorizationCode=${code}`,
            withCredentials : true,
          })


          console.log("생성 : ", res);   
          movePage("/");
          
        } catch (err) {
          console.log("소셜로그인 에러", err);
          window.alert("로그인에 실패했습니다.");
          movePage("/");
        }
      };

       

        useEffect(()=> {

        let code = new URL(window.location.href).searchParams.get("code"); 
        
        if(code){
            console.log(code);
            kakaoLogin(code);
        }
        else{
            movePage("/");
        }
        },[kakaoLogin]);

    
    return (
       <Wrapper>
            <Circle/>
       </Wrapper>

    )
}