import React, { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import '../../css/ItemListContainer.css';
import { collection, doc, getDoc, getDocs, getFirestore, query, where } from "firebase/firestore";

const ItemListContainer = ( {greeting} ) => {

    const { cate_id } = useParams();
    const [products, setProducts] = useState();
    const [category, setCategory] = useState();

    useEffect(() => {
        if (cate_id === undefined){
            mostrarTodos();
        }else{
            setProducts();
            mostrarCategoria(cate_id);
        }
    // eslint-disable-next-line
    },[cate_id]);

    const mostrarTodos = () => {
        const db = getFirestore();
        const itemCollection = collection(db, "products");
        getDocs(itemCollection).then((snapshot) => {
            setCategory(greeting);
            setProducts(snapshot.docs.map((doc) => ({id:doc.id, ...doc.data()})));
        });
    }

    const mostrarCategoria = (idCate) => {
        const db = getFirestore();
        obtenerCategoria(db, idCate);
        filtrarPorCategoria(db, idCate);
    }

    const obtenerCategoria = (db, idCate) =>{
        const ref = doc(db,"categories",idCate);
        getDoc(ref).then((snapshot)=>{
            if(snapshot.exists()){
                const data = snapshot.data();
                setCategory(data.name);
            }
        })
    }

    const filtrarPorCategoria = (db, idCate) =>{

        const q =   query(collection(db, "products"),
                    where("idCate", "==", idCate));

        getDocs(q).then((snapshot)=>{
            if (snapshot.size !==0 ){
                setProducts(snapshot.docs.map((doc) => ({id:doc.id, ...doc.data()})));
            }
        });
    }

    if (!products ){
        return(
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div className="title">
                    <h1>Loading...</h1>
                </div>
            </div>
        )
    }

    return(
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="title">
                <h1>{category}</h1>
            </div>
            <div className="products"> 
                
                {products?.map(product=>(
                    <NavLink to={`/item/${product.id}`} className="link-prod" key={product.id}>
                    <div key={product.id} className="card-prod">
                        <div className="img-title-prod">
                            <img
                                className="img-prod"
                                src={`${product.image}`}
                                alt={product.title}
                            />
                            <div className="title-prod">{product.title}</div>
                        </div>
                        <div className="price-prod">${parseFloat(product.price).toFixed(2)}</div>
                    </div>
                    </NavLink>
                ))}

            </div>
        </div>
    )
}

export default ItemListContainer