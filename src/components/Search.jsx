import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';


export default function Form() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/searched/" + input);
  }

  const handleChange = (e) => {
    setInput(e.target.value);
  }

  return (
    <FormStyle onSubmit={handleSubmit}>
      <div className='form-group'>
        <FaSearch />
        <input type="text" value={input} onChange={handleChange}/>
      </div>
    </FormStyle>
  )
}

const FormStyle = styled.form`
  width: 100%;

  .form-group{
    position: relative;
    width: 90%;
    margin-right: auto;
    margin-left: auto;
    @media screen and (max-width: 450px){
      width: 100%;
    }
  }

  input{
    width: 100%;
    border: none;
    background: linear-gradient(35deg, #494949, #313131);
    font-size: 1.5rem;
    color: white;
    padding: 1rem 3rem;
    border-radius: 1rem;
    outline: none;
  }

  svg{
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(100%,-50%);
    color: white;
  }
`;
