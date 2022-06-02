import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
/* import { motion } from 'framer-motion'; */
import { Link, useParams } from 'react-router-dom';

export default function Cuisine(){
  const [cuisine, setCuisine] = useState([]);
  const params = useParams();

  const getCuisine = async (name)=> {
    const check = JSON.parse(localStorage.getItem(`${name}`)) || [];
    if(check.length > 0){
      setCuisine(check);
    }else{
      try {
        const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}`);
        if(!response.ok) throw new Error(`${response.status} - ${response.statusText}`);
        else{
          const data = await response.json();
          console.log(data)
          localStorage.setItem(`${name}`, JSON.stringify(data.results));
          setCuisine(data.results);
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    getCuisine(params.type);
  }, [params.type])


  return(
    <Grid>
      {cuisine.map(item => {
        const {id, title, image, imageType } = item;
        return(
          <Card key={id}>
            <Link to={'/recipe/' + id}>
              <img src={image} alt={title.substring(0, title.indexOf(' '))}/>
              <h4>{title}</h4>
            </Link>
          </Card>
        )
      })}
    </Grid>
  )
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  gap: 3rem;
`;

const Card = styled.div`
  img{
    width: 100%;
    border-radius: 2rem;
  }
  a{
    text-decoration: none;
  }
  h4{
    text-align: center;
    padding: 1rem;
  }
`;