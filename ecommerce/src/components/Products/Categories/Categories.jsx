import React from 'react';

import { useStyles } from "./styles";
import { Typography } from '@mui/material';
import Categorie from './Categorie/Categorie';

const Categories = () => {
    const classes = useStyles();
    // lista
    const categories = [
        {id: 1, name: 'Lorem Ip'},
        {id: 2, name: 'Lorem Ip'},
        {id: 3, name: 'Lorem Ip'},
        {id: 4, name: 'Lorem Ip'},
        {id: 5, name: 'Lorem Ip'},  
    ];
    return (
        <div className={classes.categories_box}>
            <Typography variant="h4" sx ={{
                // color: "white", 
                p: "1rem"}}>
                Categorias
            </Typography>
            <ul className={classes.categories_list} >
                {categories.map(category => (
                    <Categorie key={category.id} category={category} />
                ))}
            </ul>
        </div>
    );
}

export default Categories;
