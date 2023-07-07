import React from "react";
import Badge from 'react-bootstrap/Badge';
import ImgCart from "./assets/ShoppingCart.svg";
import '../../css/CartWidget.css';

const CartWidget = ({items}) => {
  return (
    <div className="cart-widget">
      <img 
        className="img-cart"
        src={ImgCart}
        alt="Shopping Cart"/>
        <Badge bg="secondary">{items}</Badge>
    </div>
  );
};

export default CartWidget;
