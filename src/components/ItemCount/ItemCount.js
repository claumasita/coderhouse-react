import '../../css/ItemCount.css';
import React, { useState, useContext, useEffect  } from "react";
import { NavLink } from "react-router-dom";
import CartContext  from '../../Context/CartContext/cartContext';

const ItemCount = ( { item } ) =>{
    const [qty, setQty] = useState(1);
    const [inCart, setInCart] = useState(false);

    const handleOnClickIncre = () =>{
        if (qty < item.stock) setQty(qty+1);
    }
    
    const handleOnClickDecre = () =>{
        if (qty > 1) setQty(qty-1);
    }

    const { addProduct, isInCart } = useContext(CartContext);
    function handleAddToCart(){
        addProduct( item, qty );
        setInCart(true);
        setQty( 1 ) ;
    }

    useEffect(()=>{
        setInCart(isInCart(item.id));
    },[item])

    // El item ya se encuentra en el Carrito
    if (inCart){
        return(
            <div style={{marginTop:"20px"}}>
                <NavLink to={"/cart"}>
                    <button className='btn-agregar' style={{width:"250px"}}>Item is in the Cart</button>
                </NavLink>
            </div>
        )
    }

    // No hay Stock disponible
    if(item.stock < 1){
        return(
            <div style={{marginTop:"20px"}}>
                <NavLink to={"/"}>
                    <button className='btn-agregar' style={{width:"250px"}}>Go to home page</button>
                </NavLink>
            </div>
        )
    }

    // El item no se encuentra en el Carrito
    return(
        <div className="contenedor-add-to-cart">
            <div className="contenedor-buttons">
                <button className="btn-cantidades" onClick={handleOnClickDecre}>-</button>
                <div className="cantidad">{ qty }</div>
                <button className="btn-cantidades" onClick={handleOnClickIncre}>+</button>
            </div>
            <div>
                <button className="btn-agregar" onClick={ handleAddToCart }>Add to cart</button>
            </div>
        </div>
    )
}

export default ItemCount