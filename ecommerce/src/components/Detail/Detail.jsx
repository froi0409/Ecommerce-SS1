import React, { useState } from 'react'
import "./styles.css"
import { Container } from "@mui/material";
import Gallery from './DetailComponents/Gallery';
import DescriptionDetail from './DetailComponents/DescriptionDetail';
import { useLocation } from "react-router-dom";

const Detail = () => {
  const location = useLocation();
  const idProduct = location.state.idProduct
  const [quant, setQuant] = useState(0);
  const [orderedQuant, setOrderedQuant] = useState(0);
  const addQuant = () => {
      setQuant(quant + 1);
  };
  
  const removeQuant = () => {
    setQuant(quant - 1);
  };
  
  const resetQuant = () => {
      setQuant(0);
      setOrderedQuant(0);
  };
  return (
    <Container>
        <section className="core">
            <Gallery></Gallery>
            <DescriptionDetail 
                onQuant={quant}
                onAdd={addQuant}
                onRemove={removeQuant}
                onSetOrderedQuant={setOrderedQuant}
            >
            </DescriptionDetail>
        </section>
        {idProduct}
    </Container>
  )
}

export default Detail