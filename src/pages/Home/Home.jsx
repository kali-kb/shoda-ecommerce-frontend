import React from 'react';
import NavBar from "../../components/NavBar/NavBar"
import ProductCard from '../../components/ProductCard/ProductCard';
import "./home.css"


function Home(){
  return(
    <>
      <div id="parent">
        <NavBar />
        <h3 style={{transform: "translateX(26%)", display:"inline", position: "relative", left: "8%"}}>Home</h3>
        <div id="products">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
    </>
  )
};

export default Home