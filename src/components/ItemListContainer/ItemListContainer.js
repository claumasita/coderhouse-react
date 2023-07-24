import React, { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import '../../css/ItemListContainer.css';

const ItemListContainer = ( {greeting} ) => {
    const ENDPOINT = "https://fakestoreapi.com/products";

    const { cate_name } = useParams();
    const [products, setProducts] = useState();
    const [url, setUrl] = useState("");

    useEffect(() => {
        if (cate_name !== undefined){
            setUrl( ENDPOINT + "/category/" + cate_name );
        }else{
            setUrl( ENDPOINT );
        }
    },[cate_name]);

    useEffect(() => {
        if (url !== ""){
            fetch(url, { method: "GET"})
            .then(response => response.json())
            .then(result => {

                // Orden por Categoría (DESCENDING)
                result.sort((a, b) =>{
                    if (a.category < b.category){return 1;}
                    if (a.category > b.category){return -1;}
                    return 0;
                });
                setProducts(result);

            });
        }
    }, [url]);

    return(
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="title">
                <h1>{greeting}{cate_name}</h1>
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