import React from 'react';
import { useStyles } from './styles';

const Categorie = (props) => {
    const classes = useStyles()
    const category = props.category; // Accede a la propiedad "category" desde las props
    const categoryHandler = () => {
        // Usa la propiedad "category" en la función si es necesario
    }

    return (
        <li className={classes.categorie_li} onClick={categoryHandler}>
            {category.category_name} {/* Muestra el valor de "category" en el elemento */}
        </li>
    );
}

export default Categorie;
