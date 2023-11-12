import React, {useEffect} from 'react';
import { useStyles } from './styles';
import axios from 'axios';
import API_URL from '../../../../config/paths';

const Categorie = ({category,setProductos}) => {
    const classes = useStyles()
    //const category = props.category; // Accede a la propiedad "category" desde las props

    const fetchData = async (categoryClassName) => {
      try {
        if (categoryClassName !== undefined){
          if (categoryClassName === "Todos"){
            // const response = await axios.get('http://localhost:3001/api/getAllProducts');
            const response = await axios.get(`${API_URL}/getAllProducts/`);
            setProductos(response.data);
          }else{
            // const response = await axios.get('http://localhost:3001/api/getProductsByCategory/'+categoryClassName);            
            const response = await axios.get(`${API_URL}/getProductsByCategory/`+categoryClassName);
            setProductos(response.data);
          }
          
        }
      } catch (error) {
        console.error('Error al obtener datos de la API', error);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const categoryHandler = (categoryClassName) => {
      fetchData(categoryClassName);
    };

    return (
        <li className={classes.categorie_li} onClick={() => categoryHandler(category.category_name)}>
            {category.category_name} {/* Muestra el valor de "category" en el elemento */}
        </li>
    );
}

export default Categorie;
