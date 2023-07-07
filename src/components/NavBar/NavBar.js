import React from "react";
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
  return (
    <nav className="nav-bar">
      <img
        className = "img-logo"
        src = {Logo}
        alt = "Logo Tienda"
      />
      <div className="nav-barra">
        <div className="texto-marca">
          <div className="texto-marca-1">Caro Martinez</div>
          <div className="texto-marca-2">Indumentaria Femenina</div>
        </div>
        <div className="menu">
          <ButtonNav text = {'Indumentaria'} />
          <ButtonNav text = {'Calzado'} />
          <ButtonNav text = {'Accesorios'} />
        </div>
        <CartWidget items={'3'}/> 
      </div>
    </nav>
  )
}

export default NavBar