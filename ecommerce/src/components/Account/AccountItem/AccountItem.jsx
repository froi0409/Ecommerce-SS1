import React from 'react';
import Card from '@mui/material/Card';
import { Link, useNavigate } from 'react-router-dom'; // Importa useNavigate
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea } from '@mui/material';

const AccountItem = (props) => {
  const navigate = useNavigate(); // Obtiene la función de navegación
    const dataItem = props.dataItem;
    const actionHandler = () => {
      navigate(dataItem.link);
    }
    return (
        <Card sx={{ maxWidth: '21.7rem', backgroundColor: "#9EC5FE"}}>
        <CardActionArea onClick={actionHandler} sx={{ display: 'flex', p: "0px 0.5rem"}}>
          {/* <CardMedia
            component="img"
            sx={{ width: "9.81rem", height: "5.81rem", background: "#FFE9E9" }}
            image={dataItem.image}
            alt={dataItem.name}
          /> */}
          <Box  sx={{ display: 'flex', flexDirection: 'column' }} >
            <CardContent  sx={{ flex: '1 0 auto' }}>
              <Typography gutterBottom variant="h5" component="div">
                {dataItem.name}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                {dataItem.description}
              </Typography>
            </CardContent>
          </Box>
        </CardActionArea>
      </Card>
    );
}

export default AccountItem;
