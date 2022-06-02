import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Cuisine from './Cuisine';
import Searched from './Searched';
import Recipe from './Recipe';
import NotFound from'../components/NotFound'

export default function Pages() {

  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/cuisine/:type" element={<Cuisine/>} />
      <Route path='/searched/:search' element={<Searched/>}/>
      <Route path='/recipe/:id' element={<Recipe />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}
