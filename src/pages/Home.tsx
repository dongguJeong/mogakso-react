import React from 'react';
import Layout from '../components/Layout';
import { styled } from 'styled-components';
import Chart from '../components/Chart';

import { IData } from '../components/Chart';

const Wrapper = styled.div`
  width : 80%;
  margin-left : 10%;
  padding-top : 80px;
  padding-bottom : 20px;
  
`
const LargeSearchBar = styled.input`
  width : 100%;
  height : 50px;
  border-radius : 30px;
  padding-left : 15px;
  margin-bottom : 30px;
  border : 2px solid var(--iconColor);


  &:focus{
    outline : none;
  }

  &::placeholder{
    font-size : 15px; 
    font-weight : 500;
  }

`;


interface songData{
  songData : IData[];
}

function Search({songData} : songData ) {
  
  

  return (
    <Layout>
   <Wrapper>

      <form>
        <LargeSearchBar placeholder='아티스트/노래 검색'/>
      </form>  

        <Chart title="인기 차트" btnTitle ="커버곡 만들러 가기" data = {songData}/>
      </Wrapper>
      </Layout>
  )
};


export default Search;



