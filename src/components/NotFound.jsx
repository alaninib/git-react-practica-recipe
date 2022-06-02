import React from 'react'
import styled from 'styled-components';

export default function NotFound() {
  return (
    <Msj>Not Found</Msj>
  )
}

const Msj = styled.div`
  font-size: 4rem;
  font-weight: bolder;
  letter-spacing: .3rem;
  color: black;
  text-align: center;
`;