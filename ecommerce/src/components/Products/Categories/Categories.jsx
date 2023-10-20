import React, { useEffect, useState } from 'react';

import { useStyles } from "./styles";
import { Typography } from '@mui/material';
import Categorie from './Categorie/Categorie';

import axios from 'axios';

const Categories = () => {
    const classes = useStyles();
    const [categories, setCategories] = useState([])
    // lista
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:3001/api/getCategories');
            setCategories(response.data);
          } catch (error) {
            console.error('Error al obtener datos de la API', error);
          }
        };
        fetchData();
      }, []);
      console.log("asdfasfd");
      console.log(categories);
    return (
        <div className={classes.categories_box}>
            <Typography variant="h4" sx ={{
                // color: "white", 
                p: "1rem"}}>
                Categorias
            </Typography>
            <ul className={classes.categories_list} >
                {categories.map(category => (
                    <Categorie key={category.category_name} category={category} />
                ))}
            </ul>
        </div>
    );
}

export default Categories;
