import React, { useState, useEffect } from 'react'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/dist/css/splide.min.css';
import styled from 'styled-components';

export default function Popular() {
  const [popular, setPopular] = useState([]);

  const getPopular = async () => {
    const check = localStorage.getItem("popular");
    if(check){
      setPopular(JSON.parse(check));
    }else{
      try {
        const response = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`);
        if(!response.ok) throw new Error(`${response.status}${response.statusText}`);
        else{
          const data = await response.json();
          localStorage.setItem("popular", JSON.stringify(data.recipes))
          setPopular(data.recipes);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(()=>{
    getPopular();
  },[]);

  return (
    <div>
      <Wrapper>
        <h3>Popular Picks</h3>
        <Splide options={{
          perPage:4,
          arrows:false,
          pagination:false,
          drag:'free',
          gap:'3rem',
          }}>
          {popular.map((recipe) => {
              return(
                <SplideSlide key={recipe.id}>
                  <Card key={recipe.id}>
                    <p>{recipe.title}</p>
                    <img src={recipe.image} alt={recipe.title}/>
                    <Gradient />
                  </Card>
                </SplideSlide>
              )
            })
          }
        </Splide>
      </Wrapper>
    </div>
  )
}

const Wrapper = styled.div`
  margin: 4rem 0rem;
`;

const Card = styled.div`
  min-height: 25rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;

  img{
    border-radius: 2rem;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  p{
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 0%);
    color: white;
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  height: 100%;
  width: 100%;
  background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5));
`;