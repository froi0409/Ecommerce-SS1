import React, { useState,useEffect } from 'react'
import "./styles.css"
import { Container } from "@mui/material";
import Gallery from './DetailComponents/Gallery';
import DescriptionDetail from './DetailComponents/DescriptionDetail';
import { useLocation } from "react-router-dom";
import axios from 'axios';

const Detail = ({removeFromCart,addToCart,getQuantityInCart}) => {
  const location = useLocation();
  const idProduct = location.state.idProduct
  const [producto, setProducto] = useState([]);

  useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(process.env.REACT_APP_API_URL + '/api/getProduct/'+idProduct);
          setProducto(response.data);
        } catch (error) {
          console.error('Error al obtener datos de la API', error);
        }
      };
  
      fetchData();
    }, []);


  return (
    <Container>
        <section className="core">
        <Gallery producto={producto}/>
            <DescriptionDetail 
                removeFromCart = {removeFromCart}
                addToCart = {addToCart}
                getQuantityInCart = {getQuantityInCart}
                producto = {producto}
            >
            </DescriptionDetail>
        </section>      
    </Container>
  )
}

export default Detail