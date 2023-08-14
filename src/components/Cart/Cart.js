import '../../css/Cart.css';
import ImgDelete from "./assets/garbage.png";
import React from "react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import CartContext  from '../../Context/CartContext/cartContext';
import CheckOut from '../Checkout/Checkout';

const Cart = () =>{

    const { products, total, qty : totalQty, clearCart, deleteItem, addItem, subtractItem } = useContext(CartContext);

    function handleDeleteItem(id){
        deleteItem(id);
    }

    function handleClearCart(){
        clearCart();
    }

    function handleAddItem(id){
        addItem(id);
    }

    function handleSubtractItem(id){
        subtractItem(id);
    }

    // Carrito vacío
    if ( totalQty === 0 ){
        return(
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div className="title">
                    <h1>No items in the cart</h1>
                </div>
            </div>
        )
    }

    // Carrito con artículos
    return(
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems:"center" }}>
            <div className="title">
                <h1>Cart</h1>
            </div>
            <div className='cart'>
                <table className='table-cart'>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Unit Price</th>
                            <th style={{textAlign:"center"}}>Quantity</th>
                            <th style={{minWidth:"130px", textAlign:"center"}}>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                    { products?.map(product=>(
                        <tr key={product.id}>
                            <td style={{maxWidth:"400px"}}>
                                <NavLink to={`/item/${product.id}`} style={{textDecoration:"none", color:"black"}}>
                                    { product.name }
                                </NavLink>
                            </td>
                            <td>${ parseFloat(product.price).toFixed(2) }</td>
                            <td>
                                <div style={{display:"flex", flexDirection:"row"}}>
                                    <button className="btn-qty-cart" onClick={()=>handleSubtractItem(product.id)}>-</button>
                                    <div style={{width:"30px"}}>
                                        { product.quantity }
                                    </div>
                                    <button className="btn-qty-cart" onClick={()=>handleAddItem(product.id)}>+</button>
                                </div>
                            </td>
                            <td>${ parseFloat(product.total).toFixed(2) }</td>
                            <td style={{ borderBottom:"none" }}>
                                <button className='btn-delete-item'
                                        onClick={()=>handleDeleteItem(product.id) }>
                                    <img src={ ImgDelete } alt="Delete item from cart" />
                                </button>
                            </td>
                        </tr>
                    )) }
                    </tbody>
                    <tfoot style={{ fontWeight:"bold" }}>
                        <tr>
                            <td colSpan={2}>Total</td>
                            <td>{ totalQty }</td>
                            <td>${ parseFloat(total).toFixed(2) }</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <div className='checkout'>
                <button onClick={ handleClearCart }>Clear Cart</button>
                <CheckOut />
            </div>
        </div>
    )
}

export default Cart;