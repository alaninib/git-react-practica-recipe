import React from 'react';
import { FaPizzaSlice, FaHamburger } from 'react-icons/fa';
import { GiNoodles, GiAfrica } from 'react-icons/gi';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export default function Category(){
  return(
    <List>
      <SLink to="/cuisine/Italian">
        <FaPizzaSlice />
        <h4>Italian</h4>
      </SLink>
      <SLink to="/cuisine/American">
        <FaHamburger />
        <h4>American</h4>
      </SLink>
      <SLink to="/cuisine/Thai">
        <GiNoodles />
        <h4>Thai</h4>
      </SLink>
      <SLink to="/cuisine/African">
        <GiAfrica />
        <h4>African</h4>
      </SLink>
    </List>
  )
}

const List = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
`;

const SLink = styled(NavLink)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  text-decoration: none;
  background: linear-gradient(35deg, #494949, #313131);
  padding: 1rem;
  width: 8rem;
  height: 8rem;
  cursor: pointer;
  transform: scale(0.8);

  h4{
    flex: 1 1 10rem;
    width: 100%;
    color: white;
    font-size: 1rem;
    text-align: center;
  }
  svg{
    flex: 1 1 30rem;
    width: 100%;
    margin-bottom: .5rem;
    color: white;
    font-size: 3rem;
    text-align: center;
  }

  &.active{
    background: linear-gradient(to right, #f27121, #e94057);

    svg{
      color: white;
    }
    h4{
      color: white
    }
  }
`;