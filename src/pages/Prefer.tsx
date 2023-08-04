import React, { useEffect,useState } from "react";
import { styled} from 'styled-components';
import Layout from "../components/Layout";
import serverURL from "../asset/Url";
import { IData } from "../components/Chart";


const chartCrawlingURL = `http://${serverURL}/v3/chartjson`;


const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    padding-top : 50px;
    
`

const Grid = styled.div`
   
    
    display : grid;
    grid-template-columns : repeat(6, 130px);
    grid-gap : 45px;
`

const ChartContainer = styled.div<{bgpath : string ; isClicked : boolean}>`

    border-radius : 10px;
    height : 130px;
    background-image : url(${prop => prop.bgpath});
    background-size : cover;
    background-position: center;
    position : relative;

    display : flex;
    align-items : center;
    justify-content : center;

    background-color: ${props => (props.isClicked ? "rgba(0,0,0,0.5)" : 'transparent')};
    background-blend-mode: multiply;

    
    
`

const SongTitle = styled.div`
    position : absolute;
    bottom : -50px;
    left : 0px;
    width : 100%;
    height : 3rem;
    padding-top : 5px;
    padding-left : 5px;
    text-align : center;
`;


interface IClick {
    genre : string;
    title : string;
    artist : string;
}




function Prefer(){

    const [chartData, setChartData] = useState<IData[]>([]);



    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await (await fetch(chartCrawlingURL,
              {
                method: "GET",
              }
            )).json();
            
            console.log(response);
            setChartData(response);
    
          }catch(err){
            console.log("실패!");
            console.log(err);
          }
        };
        fetchData();
    
        }, []);

    const [clicked, setClicked] = useState<IClick[]>([]);

        const clickPrefer = ( {title ,genre ,artist} : IClick) => {

            
            const index = clicked.findIndex((i) => i.title === title);
            
            if( index === -1)
            {
                const temp  = {title,genre,artist};
                setClicked([...clicked , temp]);
            }

            else{
            setClicked([ ...clicked.slice(0,index), ...clicked.slice(index+1) ] );
            }  

            console.log(clicked);
        }


    return(
        <Layout>
            <Wrapper>
                <Grid>
                {chartData?.map((song,i) => (
                    <ChartContainer  isClicked={clicked.some((item) => item.title === song.title)} key={i} bgpath={song.imgUrl} onClick={() =>clickPrefer({title : song.title, genre : song.genre, artist : song.artist} )}>
                       
                       <SongTitle>{song.title.length <= 20 ? song.title : song.title.slice(0,20) + '...' }</SongTitle>
                       
                       {clicked.some((item) => item.title === song.title) &&
                        
                        <svg xmlns="http://www.w3.org/2000/svg" fill="green" height="2.5em" viewBox="0 0 512 512" >
                        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>
                        
                        }


                    </ChartContainer>
                ))}

                </Grid>
            </Wrapper>
        </Layout>
    )

}

export default Prefer;