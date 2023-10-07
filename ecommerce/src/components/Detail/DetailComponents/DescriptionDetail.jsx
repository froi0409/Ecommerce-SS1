import React from 'react'
import { ShoppingCart } from '@mui/icons-material';
import QuantityButton from './QuantityButton';

const DescriptionDetail = ({ onQuant, onAdd, onRemove, onSetOrderedQuant }) => {
  return (
    <section className="description">
      <p className="pre">FRIKISTUFF</p>
      <h1>JoyToy Warhammer 40K: Adeptus Mechanicus</h1>
      <p className="desc">
        JoyToy Warhammer 40K: Adeptus Mechanicus Kastelan Robot with Incendine Combustor 1:18 Scale Action Figure
        From JoyToy,
        Highly articulated figure,
        Meticulously crafted with detailed paintwork,
        Includes a removable gun accessory,
        Measures 9.4" tall
      </p>
      <div className="price">
        <div className="main-tag">
          <p>Q675.00</p>
          <p>10%</p>
        </div>
        <s>Q750.00</s>
      </div>
      <div className="buttons">
        <QuantityButton onQuant={onQuant} onRemove={onRemove} onAdd={onAdd} />
        <button
          className="add-to-cart"
          onClick={() => {
            onSetOrderedQuant(onQuant);
          }}
        >
          <ShoppingCart />
          add to cart
        </button>
      </div>
    </section>
  )
}

export default DescriptionDetail