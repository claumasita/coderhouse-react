import React from "react";
import { useParams } from "react-router-dom";
import { useEffect  } from "react";
import { useState  } from "react";
import '../../css/Item.css';

const Item = (  ) =>{
    const { id } = useParams();
    const [item, setItem] = useState(null);

    useEffect(() => {
        const url = `https://fakestoreapi.com/products/${ id }`;
        fetch(url, { method: "GET"})
        .then(response => response.json())
        .then(result => {
            setItem(result);
        });
    }, [id]);

    if ( item !== null){
        return(
            <div className="item"> 
                <div className="item-detail">
                    <div className="img-title-item">
                        <div className="img-container">
                        <img
                            className="img-item"
                            src={`${item.image}`}
                            alt={item.title}
                        /></div>
                    </div>
                    <div className="price-item">${parseFloat(item.price).toFixed(2)}</div>
                </div>
                <div className="item-detail-description">
                    <div className="title-item">{item.title}</div>
                    <div className="description-text">{item.description}</div>
                </div>
            </div>
        )
    }else{
        return( <div className="item">loading...</div> )
    }
}

export default Item