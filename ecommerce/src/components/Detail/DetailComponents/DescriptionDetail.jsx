import React from 'react'
import { ShoppingCart,Add,Remove } from '@mui/icons-material';
import {IconButton} from '@mui/material'


const DescriptionDetail = ({ removeFromCart,addToCart,getQuantityInCart ,producto}) => {
  const handleAddToCart = (id) => addToCart(id,producto.unit_price);

  const stock = producto.stock
  return (
    <section className="description">
      <p className="pre">FRIKISTUFF</p>
      <h1>{producto.product_name}</h1>
      <p className="desc">        
      {producto.description}
      </p>
      <div className="price">
          <div className="main-tag">
            <p>Q.{producto.unit_price}</p>
            <p></p>          
          </div>
      </div>
      <div className="buttons">
        <IconButton onClick={() => removeFromCart(producto.product_id)}>
          <Remove></Remove>
        </IconButton>                    
        <p>{getQuantityInCart(producto.product_id)}</p>
        <IconButton onClick={() => handleAddToCart(producto.product_id)} disabled={getQuantityInCart(producto.product_id) >= stock}>
          <Add></Add>
        </IconButton>
        <button
          className="add-to-cart"
          onClick={() => {
            //onSetOrderedQuant(onQuant);
          }}
        >
          <ShoppingCart />
          add to cart
        </button>
      </div>
    </section>
  )
}

/*
Por si sirve despues es la forma de mostrar descuentos:
<div className="price">
        <div className="main-tag">
          <p>Q675.00</p>
          <p>10%</p>
        </div>
        <s>Q750.00</s>
      </div>
*/

export default DescriptionDetail