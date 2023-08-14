import '../../css/CartWidget.css';
import React from "react";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import Badge from 'react-bootstrap/Badge';
import ImgCart from "./assets/ShoppingCart.svg";
import CartContext  from '../../Context/CartContext/cartContext';

const CartWidget = () => {

  const { qty } = useContext(CartContext);

  return (
      <NavLink to={"/cart"} className="cart-widget">
        <img 
          className="img-cart"
          src={ ImgCart }
          alt="Shopping Cart"/>
        <Badge bg="secondary" style={{display:qty<1?"none":"block"}}>{ qty }</Badge>
      </NavLink>
  );
};

export default CartWidget;
