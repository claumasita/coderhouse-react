import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import CartWidget from "../CartWidget/CartWidget";
import Logo from "./assets/Logo.png";
import '../../css/NavBar.css';

const ButtonNav = ( {text} ) =>{
  return (
    <button className="button-nav">
      { text }
    </button>
  )
}

const NavBar = () =>{

  const [categories, setCategories] = useState();

  useEffect(() => {
      fetch("https://fakestoreapi.com/products/categories", { method: "GET"})
      .then(response => response.json())
      .then(result => {
          // Orden por Categoría (DESCENDING)
          result.sort((a, b) =>{
            if ( a < b ){return 1;}
            if ( a > b ){return -1;}
            return 0;
        });
          setCategories(result);
      });
}, []);

  return (
    <nav className="nav-bar">
      <NavLink to={"/"} className="nav-link-logo">
        <img
          className = "img-logo"
          src = {Logo}
          alt = "Logo Tienda"
        />
      </NavLink>
      <div className="nav-barra">
        <div className="texto-marca">
          <div className="texto-marca-1">Caro Martinez</div>
          <div className="texto-marca-2">clothing & technology store</div>
        </div>
        <div className="menu">

          {categories?.map((category, index)=>(
            <NavLink to={`/category/${category}`} key={index}>
            <ButtonNav text = {`${category}`} />
          </NavLink>
          ))}

        </div>
        <CartWidget items={'3'}/> 
      </div>
    </nav>
  )
}

export default NavBar