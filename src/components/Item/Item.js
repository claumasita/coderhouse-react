import '../../css/Item.css';
import React from "react";
import { useParams } from "react-router-dom";
import { useEffect  } from "react";
import { useState  } from "react";
import { doc, getDoc, getFirestore } from "firebase/firestore";

import ItemCount from "../ItemCount/ItemCount"

const Item = (  ) =>{
    const { id } = useParams();
    const [item, setItem] = useState(null);

    useEffect(() => {

        const db = getFirestore();
        const ref = doc(db,"products",id);
        getDoc(ref).then((snapshot)=>{
            if(snapshot.exists()){
                setItem({ id: snapshot.id, ...snapshot.data() });
            }
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
                            />
                        </div>
                    </div>
                    <div className="price-item">${parseFloat(item.price).toFixed(2)}</div>
                    <ItemCount item={ item }/>
                    <div className="stock-item">Stock available: {item.stock}</div>
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