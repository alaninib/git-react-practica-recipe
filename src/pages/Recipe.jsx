import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

export default function Recipe() {
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState("Instruction");
  const params = useParams();

  const fetchDetails = async () => {
    try {
      const response = await fetch(`https://api.spoonacular.com/recipes/${params.id}/information?apiKey=${process.env.REACT_APP_API_KEY}`);
      if(!response.ok) throw new Error(`${response.status} ${response.statusText}`);
      else{
        const data = await response.json()
        setDetails(data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchDetails()
  }, [params.id])

  return (
    <DetailsWrapper>
      <Principal>
        <h2>{details.title}</h2>
        <img src={details.image} alt={details.title} />
      </Principal>
      <Info>
        <Button 
          onClick={()=>setActiveTab('Instruction')} 
          className={ activeTab === 'Instruction' ? 'active' : ''}>
          Instruccion
        </Button>
        <Button 
          onClick={() => setActiveTab('Ingredientes')} 
          className={ activeTab === 'Ingredientes' ? 'active' : ''}>
          Ingredients
        </Button>
        {activeTab === 'Instruction' && (
          <div>
            <p dangerouslySetInnerHTML={{__html: details.summary}}></p>
            <p dangerouslySetInnerHTML={{__html: details.instructions}}></p>
          </div>
        )}
        {activeTab === 'Ingredientes' && (
          <ul>
            {details.extendedIngredients.map((ingredient) => (
              <li key={ingredient.id}>{ingredient.original}</li>
            ))}
          </ul>
        )}
      </Info>
    </DetailsWrapper>
  );
}

const DetailsWrapper = styled.div`
  margin-top: 10rem;
  margin-bottom: 5rem;
  display: flex;
  gap: 2rem;
  overflow: hidden;
  @media screen and (max-width: 450px){
    flex-direction: column;
  }

  .active{
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }

  img{
    width: 100%;
    object-fit: cover;
    @media screen and (max-width: 450px){
      height: 100%;
    }
  }

  h2{
    width: 100%;
    font-weight: bolder;
    font-size: 1.5rem;
    margin-bottom: 2rem;
    text-transform: capitalize;
  }

  li{
    font-size: 1.2rem;
    line-height: 2.5rem;
  }

  ul{
    margin-top: 2rem;
  }
`;

const Principal = styled.div`
  flex: 1 1 40rem;
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  border: 2px solid black;
  margin-top: 2rem;
  margin-right: 2rem;
  margin-bottom: 2rem;
  font-weight: 600;

  @media screen and (max-width: 450px){
    margin-top: 4rem
  }
`;

const Info = styled.div`
  flex: 1 1 50rem;
`;