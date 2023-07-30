import React, { useState ,ChangeEvent} from "react";
import styled from "styled-components";
import "../styles/font.css";
import { Link, useNavigate } from "react-router-dom";

const Wrapper = styled.div`

    width : var(--navigation-width);
    min-height : 100vh;
    position : fixed ;
    top : 0 ;
    left : 0;
    border-right :  1px solid #586Bff;  
    display : flex;
    background-color : #0077B6;
    color : white;

`;

const Container = styled.div`

    width : 100%;
    height : 100%;
    padding : 10px 25px;
    
    
`
const ItemList = styled.ul``;


const HeaderContainer = styled.div`
    
    margin-bottom : 40px;
`

const HeaderTitle = styled.span`
  font-family : "ingrid_darling";
  font-size : 30px;
`

const HeaderIcon = styled.img`
    width : 40px;
    height : 40px;
`

const SearchBarForm = styled.form`
    width : 100%;
    position : relative;
    margin-bottom : 30px;
    
   
`

const SearchBar = styled.input` 
    
    width : 100%;
    height : 35px;
    padding : 6px 15px 5px 15px;
    outline : none;
    border-radius : 30px;
    border : none;
    outline : none;
    box-shadow : 0 2px 5px 1px rgba(64,60,67,.16);

    &:focus {
        box-shadow : 0 2px 5px 1px rgba(255,255,255,.3);
    }
    
`

const Svg = styled.svg`
    width : 15px; 
    height : 15px;
    position : absolute;
    top : 7px;
    right : 10px;
    z-index : 1;
    cursor : pointer;
    

`

const Item = styled.li`
    width : 80%;
    padding : 15px 15px;
    margin-bottom  : 20px;
    display : flex;
    align-items : center;

    &:hover{
        background-color : white;
        border-radius : 30px;
        color : #010043;
    }

    svg{
        color : white;
        height : 1em; 
        margin-right : 10px;
    }

    &:hover > svg {
        color: #010043;
    }
      
    
`



function LeftMenu(){

    const [search, setSearch] = useState("");
    const movePage = useNavigate();

    const handleChange = (e :ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        
    };

    const handleSubmit = (e :React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(search === "")
            return;
        movePage("/아무노래");
        setSearch("");
    }

    return (
        <Wrapper>
         <Container>
         <HeaderContainer>
             <HeaderIcon src='/img/music_note.png' /> 
             <HeaderTitle >Song SSam</HeaderTitle>
         </HeaderContainer>
          <ItemList>
          <SearchBarForm onSubmit={handleSubmit}>
            <SearchBar placeholder="아티스트/노래 검색" value={search} onChange={handleChange}>
            </SearchBar>
            
            <Svg  fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path>
            </Svg>
            </SearchBarForm> 
            <Item>

            <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" strokeWidth="2" viewBox="0 0 512 512">
                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
            </svg>
                <Link to="/" >노래 검색하기</Link>
            </Item>
            
            <Item>
                <svg  fill="currentColor" xmlns="http://www.w3.org/2000/svg" strokeWidth="2"  viewBox="0 0 448 512">
                    <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"/>
                </svg>

                <Link to="/mypage" >내 정보</Link>
            </Item>

            
            <Item>
                <Link to="singing">목소리 샘플링(test)</Link>

            </Item>

          </ItemList>
         </Container>
        </Wrapper>
    )
}

export default LeftMenu;