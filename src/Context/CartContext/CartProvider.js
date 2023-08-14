import  CartContext  from "./cartContext";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { addDoc, collection, documentId, getFirestore, query, writeBatch, getDocs, where, Timestamp } from "firebase/firestore";

function CartProvider({ defaultValue = [], children }) {
    const [ products, setProducts ] = useState(defaultValue);
    const [ qty, setQty ] = useState(0);
    const [ total, setTotal ] = useState(0);
    const [ orderId, setOrderId ] = useState("");
    const [ generatingOrder, setGeneratingOrder ] = useState(false);

    useEffect(()=>{

        let acumQty = 0;
        let acumTotal = 0;

        products?.forEach(( product ) =>{
            acumQty   = acumQty + product.quantity
            acumTotal = acumTotal + product.total
        });

        setQty( acumQty );
        setTotal( acumTotal );

    },[products])

    function addProduct( item, quantity ) {

        const newProduct = {
            id:         item.id,
            name:       item.title,
            price:      item.price,
            quantity:   quantity,
            total:      item.price * quantity,
            stock:      item.stock
        }

        const newProducts = [...products];
        newProducts.push(newProduct);
        setProducts(newProducts);
        
        // Toast confirmando que el item fue agregado:
        toast.success('Item added to the Cart', {
            position: "bottom-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
    }

    function clearCart(){

        // Verifica Items en el Carrito antes de ejecutar ClearCart
        if(qty>0){

            Swal.fire({
                title: 'Clear Cart?',
                text: "Delete all items from cart",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Confirm'
            }).then((result) => {
                if (result.isConfirmed) {
                    setProducts([]);
                    Swal.fire(
                    'Done!',
                    'Items have been eliminated.',
                    'success'
                    )
                }
            })

        }else{
        // Informa que no hay items para eliminar en el Carrito
            Swal.fire(
                'Cart empty',
                'No items in the cart',
                'info'
            )
        }
    }

    function deleteItem(id){

        Swal.fire({
            title: 'Delete item?',
            text: "Delete selected item from cart",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirm'
        }).then((result) => {
            if (result.isConfirmed) {

                // Luego de la confirmación, elimina el item seleccionado
                const items = [...products];
                const index = items.findIndex((item)=>item.id===id);
                if (index >= 0){
                    items.splice(index, 1);
                }
                setProducts(items);

                // Toast confirmando que el item fue eliminado:
                toast.error('Item deleted.', {
                    position: "bottom-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
            }
        })
    }

    function isInCart(id){
        const index = products.findIndex((item)=>item?.id===id);
        if (index >= 0){
            return true
        }else{
            return false
        }
    }

    function addItem(id){
        const items = [...products];
        const index = items.findIndex((item)=>item.id===id);
        if (index >= 0){

            if (items[index].quantity < items[index].stock){
                items[index].quantity ++;
                items[index].total = items[index].price * items[index].quantity;
            }
            
        }
        setProducts(items);
    }

    function subtractItem(id){
        const items = [...products];
        const index = items.findIndex((item)=>item.id===id);
        if (index >= 0){
            if (items[index].quantity > 1){
                items[index].quantity --;
                items[index].total = items[index].price * items[index].quantity;
            }
        }
        setProducts(items);
    }

    async function confirmCheckout (name, phone, email){
        try{
            setGeneratingOrder(true)

            // Crea objeto Order con información sobre Cliente e Items a comprar
            const order = {
                buyer: { name: name, phone: phone, email: email },
                items: products.map((product)=>({
                    id: product.id,
                    title: product.name,
                    price: product.price,
                    qty: product.quantity,
                    subtotal: product.total
                })),
                total: total,
                date: Timestamp.fromDate(new Date())
            }
        
            // Obtiene referencias y documentos para posterior validación de Stock
            const db = getFirestore();
            const batch = writeBatch(db);
            const outOfStock = []
            const ids = products.map(prod => prod.id)
            const productsRef = collection(db,"products")
            const productsAdded = await getDocs(query(productsRef, where(documentId(), 'in', ids)))
            const { docs } = productsAdded

            // Recorre los documentos obtenidos para validar Stock
            docs.forEach(doc => {
                const dataDoc = doc.data()
                const stockDB = dataDoc.stock

                const productAddedToCart = products.find(prod => prod.id === doc.id)
                const prodQty = productAddedToCart?.quantity

                // Validación de Cantidades
                if(stockDB >= prodQty){
                    batch.update(doc.ref, { stock: stockDB - prodQty })
                }else{
                    outOfStock.push({ id: doc.id, ...dataDoc })
                }
            })

            // Verifica si detectó productos sin Stock
            if (outOfStock.length===0){
                await batch.commit()
                const ordersCollection = collection(db, "orders");
                addDoc(ordersCollection, order).then(({ id })=>{setOrderId(id) }) 
            }else{
                Swal.fire(
                    'Error',
                    'There are products out of stock',
                    'warning'
                )
            }

        }catch (error){
            // Informa errores (si los hubo)
            Swal.fire(
                'Error',
                'Error trying to connect to DB',
                'error'
            )
        }finally{
            setGeneratingOrder(false)
        }
    }

    // Resetea OrderID y Limpia el Carrito
    function clearOrderId(){
        setOrderId("");
        setProducts([]);
    }

    const valueProvided = {
        orderId,
        products,
        qty,
        total,
        generatingOrder,
        addProduct,
        clearCart,
        deleteItem,
        addItem,
        subtractItem,
        isInCart,
        confirmCheckout,
        clearOrderId
    }

    return (
        <CartContext.Provider value={ valueProvided }>
            { children }
        </CartContext.Provider>
    )
}

export default CartProvider;