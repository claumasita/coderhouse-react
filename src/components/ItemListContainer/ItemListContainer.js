import React from "react";

const ItemListContainer = ( {greeting} ) => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            fontFamily: 'Advent Pro, sans-serif '
        }}>
            <h1 style={{fontSize: '45px'}}>{greeting}</h1>
        </div>
    )
}

export default ItemListContainer