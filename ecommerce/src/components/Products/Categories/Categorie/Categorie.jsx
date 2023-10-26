import React, {useEffect} from 'react';
import { useStyles } from './styles';
import axios from 'axios';

const Categorie = (props) => {
    const classes = useStyles()
    const category = props.category; // Accede a la propiedad "category" desde las props

    const fetchData = async (categoryClassName) => {
      try {
        if (categoryClassName != undefined){
          const response = await axios.get('http://localhost:3001/api/getProductsByCategory/'+categoryClassName);
          props.setProductos(response.data);
        }else if (categoryClassName == "Todos"){
          const response = await axios.get('http://localhost:3001/api/getAllProducts');
          props.setProductos(response.data);
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
