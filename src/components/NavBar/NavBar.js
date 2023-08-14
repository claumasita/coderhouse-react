import '../../css/NavBar.css';

import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import CartWidget from "../CartWidget/CartWidget";
import Logo from "./assets/Logo.png";
import { collection, getDocs, getFirestore } from "firebase/firestore";

const ButtonNav = ( {text} ) =>{
  return (
    <button className="button-nav">
      { text }
    </button>
  )
}

const NavBar = () =>{

  const [categories, setCategories] = useState([]);

  useEffect(() => {
      const db = getFirestore();
      const itemCollection = collection(db, "categories");
      getDocs(itemCollection).then((snapshot) => {
        setCategories(snapshot.docs.map((doc) => ({id:doc.id, ...doc.data()})));
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
          <div className="texto-marca-2">clothing & jewelery</div>
        </div>
        <div className="menu">

          {categories?.map((category, index)=>(
            <NavLink to={`/category/${category.id}`} key={index}>
              <ButtonNav text = {`${category.name}`} />
            </NavLink>
          ))}

        </div>
        <CartWidget/> 
      </div>
    </nav>
  )
}

export default NavBar