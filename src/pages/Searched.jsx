import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

export default function Searched() {
  const [searched, setSearched] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  const getSearched = async (name)=> {
    const check = JSON.parse(localStorage.getItem(`${name}`)) || [];
    if(check.length > 0){
      setSearched(check);
    }else{
      try {
        const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}`);
        if(!response.ok) throw new Error(`${response.status} - ${response.statusText}`);
        else{
          const data = await response.json();
          localStorage.setItem(`${name}`, JSON.stringify(data.results));
          setSearched(data.results);
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    getSearched(params.search)
  },[params.search])

  return (
    <Grid>
      {searched.length > 0
        ?searched.map(item => {
          const {id, image, title} = item;
          return(
            <Card key={id}>
              <Link to={'/recipe/' + id}>
                <img src={image} alt={title.substring(0, title.indexOf(" "))}/>
                <h4>{title}</h4>
              </Link>
            </Card>
          )
        })
        : navigate('/notFound')
      }
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
