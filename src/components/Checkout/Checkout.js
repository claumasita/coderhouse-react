import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CartContext  from '../../Context/CartContext/cartContext';

function CheckOut() {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const { confirmCheckout, orderId, clearOrderId, generatingOrder } = useContext(CartContext);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        reset( )
        if (orderId !== ""){
            clearOrderId();
        }
        
    }, [show])

    const onSubmit = (data) =>{
        if (!generatingOrder){
            confirmCheckout( data.name, data.phone, data.email );
        }
    }

    return (
        <>
            <button onClick={handleShow}>CheckOut</button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>
                        <h1 className="title">CheckOut</h1>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                {/* OrderID sin generar: Muestra formulario CheckOut */}
                <div style={{display:orderId !== "" ? "none":"block"}}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <input
                            type="text" 
                            placeholder="Full Name"
                            {...register('name',{
                                required: true
                            })}/>
                            {errors.name?.type === 'required' &&
                            <div className="error-input">Full Name is required</div> } 
                        </div>

                        <div>
                            <input 
                            type="tel"
                            placeholder="Phone Number"
                            {...register('phone',{
                                required: true
                            })}/>
                            {errors.phone?.type === 'required' &&
                            <div className="error-input">Phone Number is required</div> } 
                        </div>

                        <div>
                            <input
                            type="email"
                            placeholder="E-mail"
                            {...register('email',{
                                required: true,
                                pattern: /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/
                            })}/>
                            {errors.email?.type === 'pattern' &&
                            <div className="error-input">Invalid E-mail format</div>}
                            {errors.email?.type === 'required' &&
                            <div className="error-input">E-Mail is required</div> } 
                        </div>
                        <div style={{display:"flex", justifyContent:"center"}}>
                            <input
                                type="submit"
                                className="input-confirm-checkout"
                                value={!generatingOrder?"Confirm Order":"Generating Order..."}
                            />
                        </div>
                    </form>
                </div>

                {/* OrderID Generado: Muestra información de la Orden */}
                <div style={{display:orderId !== "" ? "block":"none"}}>
                    <div className="order-id"> 
                        Order Confirmed:
                    </div>
                    <div className="order-id">
                        {orderId}
                    </div>
                </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CheckOut;
