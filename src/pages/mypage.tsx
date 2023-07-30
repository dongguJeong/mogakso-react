import React, { useState } from 'react';
import Layout from '../components/Layout';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { genreDB,IGenre } from '../components/GenreDB';

import "../styles/global.css";

const Wrapper = styled.div`
  width : 80%;
  margin-left : 10%;
  padding-top : 80px;
  position : relative;
`;



const Profile = styled.div`
  display : flex;
  margin-bottom : 40px;
  box-shadow : 0px 4px 6px -1px rgb(0,0,0,.3);
  border-radius : 15px;
  padding : 30px;
  background-color : white;

`;


const Square = styled.div`
    width : 200px;
    height : 200px;
    border-radius : 50%;
    background-color : gray;
    margin-right : 100px;
`;

const ProfileCol = styled.div`
    display : flex;
    flex-direction : column;
    
`;

const ProfileTitle = styled.div`
    
  margin-right : 50px;
  h3{
    color : rgba(0,0,0,0.4);

    font-size : 15px;
    margin-bottom : 10px;
  }

  h1{
    font-size : 30px;
  }

  margin-bottom  : 15px;
    
    
`
const ProfileSinger = styled.div`
    h3{
      color : rgba(0,0,0,0.4);
      font-size : 15px;
      margin-bottom : 10px;
    }

    h2{
      font-size : 25px;
    }
`

const ProfileInner = styled.div`
    display : flex;
`



const GenreContainer =styled.div`

`;
const GenreEdit = styled.div`
    display : flex;
    margin-top : 25px;
    margin-bottom : 20px;
    div:first-child {
      font-size : 25px;
    }

    div:last-child{

      color : var(--iconColor);
      margin-left : 5px;
      text-decoration : underline;
      cursor : pointer;
    }

    div:last-child:hover{
      color : #0013de;
    }

`;



const GenreList = styled.div``;

const Genre = styled.div`
    display : grid;
    grid-template-columns : repeat(2, 100px);
    grid-gap : 20px;

    list-style : none;
    font-size : 17px;
    
    svg{
      transform : rotateZ(20deg);
      margin-right : 10px;
    }

`;

const PreferBox = styled(motion.div)`
    position : absolute;
    top : 5%; 
    left : var(--PreferBox-ml);
    width : 800px;
    height : var(--PreferBox-height);
    background: #FFBA46;
    border-radius : 15px;
    box-shadow : 0px 4px 6px -1px rgb(0,0,0,.3);
    padding : 15px;
    overflow : scroll;

`;
const P_container = styled.div``;

const P_header = styled.div`
    display : flex;
    justify-content : space-between;
    width : 100%;
    height : 50px;
    background-color : white;
    border-radius : 15px;
    align-items : center;
    margin-bottom : 20px;
    padding-right : 10px;
    padding-left : 10px;
    box-shadow :  0px 4px 6px -1px rgb(0,0,0,.3);


`;

const P_body = styled.div`

    width : 90%;
  
    display : grid;
    grid-template-columns : repeat(4, 150px);
    grid-gap : 20px;
    margin : 0 auto;
    padding-left : 2%;

`;


const P_header_title = styled.div`


`;

const SF_closeBtn = styled.div`
    width : 30px;
    height : 30px;
    border-radius : 50%;
    color : white;
    background-color : rgba(0,0,0,0.3);
    
    display : flex;
    align-items : center;
    justify-content : center;
    cursor : pointer;

    svg{
        width : 17px;
        height : 17px;
    }
`;


const P_item_container = styled.div<{bgPath : string}>`

    background-color : white;
    display : flex;
    box-shadow : 0px 4px 6px -1px rgb(0,0,0,.3);

    
    align-items: center;
    justify-content : center;
    border-radius : 20px;
    height : 150px;
    align-items : end;
    background-image : url(${prop => prop.bgPath});
    background-size : cover;
    background-position: center;
    

    div{
      text-align : center;
    }

`;

const loginVars = {
  invisible : {
    y : 30,
    opacity : 0,
    
    transition : {
      type : "tween",
      duration : 0.5
    }
  },

  visible : {
    y : 0,
    opacity : 1,

    transition : {
      type : "tween",
      
    }
    
  },

  exit : {
    y : 30,
    opacity : 0,
   
    transition : {
      duration : 0.8
    }
  }

}




function MyPage() {


  const [edit, setEdit] = useState(false);
  const clickEdit = () => {
    setEdit((cur) => !cur);
  }

  const [ genre, setGenre] = useState<string[]>([]);


  const clickGenre = ( g : string) => {

    const index = genre.findIndex((i) => i === g);
    console.log(index);
    if( index === -1)
      {
        setGenre([...genre , g]);
      }

    else{
      setGenre([ ...genre.slice(0,index), ...genre.slice(index+1) ] );
    }  
  }


  return <Layout>
    
    <Wrapper>

      
      <Profile>
        <Square/>
        <ProfileCol>
          <ProfileInner>
          <ProfileTitle>
            <h3>이름</h3>
            <h1>홍길동</h1>
          </ProfileTitle>
          <ProfileSinger> 
            <h3>카카오톡 이메일</h3>
            <h2>qwerty@naver.com</h2>
          </ProfileSinger>
          </ProfileInner>
          <GenreContainer>
            
            <GenreEdit>
              <div>선호장르</div>
              <div onClick={clickEdit}>수정</div>
            </GenreEdit>
      

            <GenreList>
              <Genre>
                {genre.map ((g,i)=> 
                
                  <li key={i}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="17px" viewBox="0 0 384 512">
                      <path d="M96 96V256c0 53 43 96 96 96s96-43 96-96H208c-8.8 0-16-7.2-16-16s7.2-16 16-16h80V192H208c-8.8 0-16-7.2-16-16s7.2-16 16-16h80V128H208c-8.8 0-16-7.2-16-16s7.2-16 16-16h80c0-53-43-96-96-96S96 43 96 96zM320 240v16c0 70.7-57.3 128-128 128s-128-57.3-128-128V216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 89.1 66.2 162.7 152 174.4V464H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h72 72c13.3 0 24-10.7 24-24s-10.7-24-24-24H216V430.4c85.8-11.7 152-85.3 152-174.4V216c0-13.3-10.7-24-24-24s-24 10.7-24 24v24z"/>
                    </svg> 

                     {g}
                     
                  </li>
               )} 
               </Genre>
            </GenreList>
          </GenreContainer>
        </ProfileCol>   
      </Profile>
      

        <AnimatePresence>
          { edit &&
          <PreferBox variants={loginVars} initial = "invisible" animate="visible" exit ="exit">
            <P_container>
              <P_header>
                <P_header_title>
                  <span>선호장르를 선택해주세요 (4개)</span>
                </P_header_title>
                <SF_closeBtn onClick={clickEdit}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill='white'  viewBox="0 0 384 512"><path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/>
                            </svg>
                </SF_closeBtn>
              </P_header>
              
              <P_body>
                {genreDB.map((item) =>
                  <P_item_container key={item.genre} bgPath ={item.img_url || ""}  onClick={() =>clickGenre(item.genre)} >
                    <div>{item.genre}</div>
                  </P_item_container>
                )}

              </P_body>
            </P_container>
          </PreferBox>
          }
        </AnimatePresence>




        </Wrapper>

  </Layout>
   
  
}

export default MyPage;